const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function generateSitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';
  let articlesData = [];

  try {
    // articlesディレクトリから直接読み込み
    const articlesDir = path.join(process.cwd(), 'articles');
    if (fs.existsSync(articlesDir)) {
      const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

      articlesData = files.map(file => {
        const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
        const slug = file.replace(/\.(md|mdx)$/, '');
        const { data } = matter(content);
        
        return {
          slug,
          frontmatter: data
        };
      });
      
      console.log(`📂 articlesディレクトリから${articlesData.length}件の記事を読み込みました`);
    } else {
      console.log('⚠️  articlesディレクトリが存在しません。空のサイトマップを生成します');
    }

    const today = new Date().toISOString().split('T')[0];

    const urls = articlesData.map(article => {
      // dateがundefinedや不正な値の場合はtodayを使用
      const lastmod = article.frontmatter.date && /^\d{4}-\d{2}-\d{2}$/.test(article.frontmatter.date)
        ? article.frontmatter.date
        : today;
      return `
  <url>
    <loc>${siteUrl}/articles/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // トップページとカテゴリページのURLも追加（undefinedカテゴリを除外）
    const categories = [...new Set(
      articlesData
        .map(article => article.frontmatter.category)
        .filter(cat => cat && cat !== 'undefined')
    )];
    categories.forEach(category => {
      urls.push(`
  <url>
    <loc>${siteUrl}/category/${encodeURIComponent(category)}</loc>
    <lastmod>${today}</lastmod>
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

    // publicディレクトリが存在しない場合は作成
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log('📁 publicディレクトリを作成しました');
    }
    
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

    console.log(`✅ sitemap.xmlが正常に生成されました。（${articlesData.length}件の記事）`);

  } catch (error) {
    console.error('❌ sitemap.xmlの生成中にエラーが発生しました:', error.message);
    
    // エラーが発生しても基本的なサイトマップを生成
    try {
      const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fallbackSitemap, 'utf-8');
      console.log('⚠️  基本的なサイトマップを生成しました');
    } catch (fallbackError) {
      console.error('❌ フォールバックサイトマップの生成も失敗しました:', fallbackError.message);
      process.exit(1);
    }
  }
}

// 実行
if (require.main === module) {
  generateSitemap();
  process.exit(0);
}

module.exports = generateSitemap;