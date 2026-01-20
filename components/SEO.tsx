
import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, url = 'https://noticehub.com.np', type = 'website' }) => {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "NoticeHub Nepal",
      "logo": "https://noticehub.com.np/logo.png"
    }
  };

  React.useEffect(() => {
    document.title = `${title} | NoticeHub Nepal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    
    const metaKeys = document.querySelector('meta[name="keywords"]');
    if (metaKeys) metaKeys.setAttribute('content', keywords);
  }, [title, description, keywords]);

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaOrgJSONLD)}
    </script>
  );
};

export default SEO;
