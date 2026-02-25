const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// カテゴリ名→スラッグ変換（lib/categorySlugMap.js と同期）
const categorySlugMap = {
  '相続税': 'inheritance-tax',
  '相続手続き': 'inheritance-procedures',
  '信託制度': 'trust-system',
  '法的制度': 'legal-system',
  '生前準備': 'lifetime-preparation',
  '遺言書': 'will',
  'エンディングノート': 'ending-note',
  'デジタル終活': 'digital-ending',
  '保険・税務': 'insurance-tax',
  '訃報・連絡': 'obituary-notice',
  '葬儀・お墓': 'funeral-grave',
  '介護・福祉': 'care-welfare',
  'その他': 'others',
  // バッチ生成で使われる可能性があるカテゴリ
  '地域情報': 'regional',
  '不動産相続': 'real-estate',
  '生前贈与': 'lifetime-gift',
};

function getCategorySlug(categoryName) {
  if (!categoryName) return 'others';
  return categorySlugMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

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
      const slug = getCategorySlug(category);
      urls.push(`
  <url>
    <loc>${siteUrl}/category/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
    });

    // 静的ページのURL追加
    const staticPages = [
      { path: '/articles',        priority: '0.9', changefreq: 'daily'   },
      { path: '/search',          priority: '0.6', changefreq: 'weekly'  },
      { path: '/about',           priority: '0.6', changefreq: 'monthly' },
      { path: '/faq',             priority: '0.7', changefreq: 'monthly' },
      { path: '/glossary',        priority: '0.7', changefreq: 'monthly' },
      { path: '/download',        priority: '0.8', changefreq: 'monthly' },
      { path: '/privacy-policy',  priority: '0.4', changefreq: 'yearly'  },
      { path: '/terms',           priority: '0.4', changefreq: 'yearly'  },
      { path: '/disclaimer',      priority: '0.4', changefreq: 'yearly'  },
    ];
    staticPages.forEach(page => {
      urls.push(`
  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
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