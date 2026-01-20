
# 🚀 Step-by-Step Cloudflare Deployment Guide

This guide will walk you through deploying the **Nepal Notice Hub** using Cloudflare Pages (Frontend), Cloudflare Workers (Backend), and Cloudflare D1 (Database).

---

## 🏗️ Step 1: Database Setup (Cloudflare D1)
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **D1**.
3. Click **Create database** > **Dashboard**.
4. Name your database `notice_hub_db` and click **Create**.
5. Once created, click on the database name and go to the **Console** tab.
6. Paste the following SQL command and click **Execute**:
   ```sql
   CREATE TABLE notices (
     id TEXT PRIMARY KEY,
     title TEXT,
     category TEXT,
     content TEXT,
     fileUrl TEXT,
     tags TEXT,
     createdAt TEXT,
     viewCount INTEGER DEFAULT 0
   );
   ```

---

## 📂 Step 2: Storage Setup (Cloudflare R2)
1. In the Cloudflare sidebar, go to **R2**.
2. Click **Create bucket**.
3. Name it `notice-hub-storage` and click **Create bucket**.
4. Go to the **Settings** tab of your new bucket.
5. Under **Public Access**, click **Connect Domain** (if you have one) or enable the **R2.dev subdomain** for testing (note: .dev subdomains are for testing only).

---

## ⚙️ Step 3: Backend Deployment (Cloudflare Workers)
1. Go to **Workers & Pages** > **Overview** > **Create application** > **Create Worker**.
2. Give it a name (e.g., `notice-hub-api`) and click **Deploy**.
3. Click **Edit Code**.
4. Delete the default code and paste the entire content of `worker.js` from this project.
5. Click **Save and Deploy**.
6. **Critical Step: Link Database and Storage**
   - Go back to your Worker's main page in the dashboard.
   - Go to **Settings** > **Variables**.
   - Under **D1 Database Bindings**, click **Add binding**.
     - Variable name: `DB`
     - D1 database: Select `notice_hub_db`.
   - Under **R2 Bucket Bindings**, click **Add binding**.
     - Variable name: `BUCKET`
     - R2 bucket: Select `notice-hub-storage`.
   - Click **Save and Deploy** again.
7. **Copy your Worker URL** (e.g., `https://notice-hub-api.yourname.workers.dev`).

---

## 🌐 Step 4: Frontend Deployment (Cloudflare Pages)
### Preparation
Before deploying, open `services/apiService.ts` and replace the `API_BASE_URL` with your actual Worker URL from Step 3.

### Option A: Direct Upload (Fastest for testing)
1. In your Cloudflare Dashboard, go to **Workers & Pages** > **Overview** > **Create application** > **Pages**.
2. Select **Upload assets**.
3. Name your project (e.g., `notice-hub-portal`).
4. Drag and drop your project folder (ensure it contains `index.html`, `index.tsx`, etc.).
5. Click **Deploy site**.

### Option B: Git Integration (Best for updates)
1. Push your code to a GitHub or GitLab repository.
2. In Cloudflare Pages, select **Connect to Git**.
3. Choose your repository.
4. **Build settings**:
   - Framework preset: `None` (or `Create React App` if using a standard build tool).
   - Build command: `npm run build` (if applicable).
   - Build output directory: `.` (if uploading raw files with ESM).
5. Click **Save and Deploy**.

---

## 🔑 Step 5: Firebase Setup (Admin Auth)
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a project named `NepalNoticeHub`.
3. Click the **Web icon (`</>`)** to register your app.
4. Copy the `firebaseConfig` object.
5. Paste these values into `firebaseConfig.ts` in your local project.
6. In Firebase, go to **Authentication** > **Sign-in method** and enable:
   - **Email/Password**
   - **Google**
7. Go to **Settings** > **Authorized Domains** and add your Cloudflare Pages URL (e.g., `notice-hub-portal.pages.dev`).

---

## ✅ Step 6: Final Verification
1. Visit your Cloudflare Pages URL.
2. Navigate to `/admin` to test the login.
3. Try creating a notice; it will call the Worker, save data to D1, and upload any PDFs to R2.
4. Check the Home page to see your new notice live!

---
**SEO Tip:** Don't forget to submit your `pages.dev` URL to Google Search Console to start appearing in search results for keywords like "Loksewa Notice" or "Myadi Police Result".
