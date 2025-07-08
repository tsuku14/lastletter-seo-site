const fs = require('fs');
const path = require('path');
const articlesData = require('../.cache/articles.json'); // キャッシュされたデータを読み込む

function generateSitemap() {
  const siteUrl = 'https://lastletter.jp'; // ご自身のサイトURLに変更してください

  try {
    const urls = articlesData.map(article => {
      return `
  <url>
    <loc>${siteUrl}/articles/${article.slug}</loc>
    <lastmod>${article.frontmatter.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // トップページとカテゴリページのURLも追加
    const categories = [...new Set(articlesData.map(article => article.frontmatter.category))];
    categories.forEach(category => {
      urls.push(`
  <url>
    <loc>${siteUrl}/category/${encodeURIComponent(category)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
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
