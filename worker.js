
/**
 * CLOUDFLARE WORKER SCRIPT
 * Deployment: Paste this into the Cloudflare Worker UI editor.
 * Bindings: 
 * - D1 Database: DB
 * - R2 Bucket: BUCKET
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS Headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      // 1. GET ALL NOTICES
      if (path === "/api/notices" && method === "GET") {
        const category = url.searchParams.get("category");
        let query = "SELECT * FROM notices ORDER BY createdAt DESC";
        let params = [];
        
        if (category) {
          query = "SELECT * FROM notices WHERE category = ? ORDER BY createdAt DESC";
          params = [category];
        }

        const { results } = await env.DB.prepare(query).bind(...params).all();
        return Response.json({ success: true, data: results }, { headers: corsHeaders });
      }

      // 2. CREATE NOTICE (Admin)
      if (path === "/api/notices" && method === "POST") {
        const body = await request.json();
        const { title, category, content, fileUrl, tags } = body;
        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        await env.DB.prepare(
          "INSERT INTO notices (id, title, category, content, fileUrl, tags, createdAt, viewCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(id, title, category, content, fileUrl, JSON.stringify(tags), now, 0).run();

        return Response.json({ success: true, data: { id } }, { headers: corsHeaders });
      }

      // 3. FILE UPLOAD TO R2
      if (path === "/api/upload" && method === "POST") {
        const formData = await request.formData();
        const file = formData.get("file");
        const filename = `${crypto.randomUUID()}-${file.name}`;
        
        await env.BUCKET.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type }
        });

        // Construct public URL (Assumes R2 Custom Domain or Worker Proxy)
        const publicUrl = `https://your-r2-public-domain.com/${filename}`;
        return Response.json({ success: true, url: publicUrl }, { headers: corsHeaders });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });

    } catch (err) {
      return Response.json({ success: false, error: err.message }, { status: 500, headers: corsHeaders });
    }
  }
};
