const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const siteUrl = 'https://lastletter.jp'; // ご自身のサイトURLに変更してください

  try {
    const filenames = fs.readdirSync(articlesDirectory);
    const urls = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        return `
  <url>
    <loc>${siteUrl}/articles/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls.join('')}
</urlset>`;

    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

    console.log('✅ sitemap.xmlが正常に生成されました。');

  } catch (error) {
    console.error('❌ sitemap.xmlの生成中にエラーが発生しました:', error);
  }
}

// 実行
if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;