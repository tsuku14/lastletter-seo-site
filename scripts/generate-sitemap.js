const fs = require('fs').promises;
const path = require('path');

async function generateSitemap() {
  const baseUrl = 'https://lastletter-seo-site.vercel.app';
  const articlesDir = path.join(process.cwd(), 'articles');
  
  try {
    // articlesフォルダのファイル一覧を取得
    const files = await fs.readdir(articlesDir);
    const articles = files.filter(file => file.endsWith('.md'));
    
    // サイトマップXMLを生成
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // 各記事のURLを追加
    for (const article of articles) {
      const slug = article.replace('.md', '');
      const stats = await fs.stat(path.join(articlesDir, article));
      const lastmod = stats.mtime.toISOString();
      
      sitemap += `
  <url>
    <loc>${baseUrl}/articles/${slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
    
    sitemap += '\n</urlset>';
    
    // publicフォルダに保存
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);
    
    console.log('✅ サイトマップを生成しました: public/sitemap.xml');
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

generateSitemap();
