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

// lib/articles.js と同期: タグからカテゴリを推測（mdxファイル用）
const tagToCategoryMap = {
  '介護': '介護・福祉', '介護保険': '介護・福祉', '介護費用': '介護・福祉',
  '介護施設': '介護・福祉', '老人ホーム': '介護・福祉', '高齢者施設': '介護・福祉',
  '高齢者': '介護・福祉', '認知症': '介護・福祉',
  '相続': '相続手続き', '遺産分割': '相続手続き', '遺産分割協議': '相続手続き',
  '遺産分割協議書': '相続手続き', '遺留分': '相続手続き', '相続放棄': '相続手続き',
  '相続税': '相続税', '税理士': '相続税', '申告': '相続税', '節税': '相続税',
  '遺言書': '遺言書', '遺言': '遺言書', '公正証書': '遺言書', '任意後見': '遺言書',
  '成年後見制度': '法的制度', '成年後見': '法的制度', '死後事務委任契約': '法的制度',
  '家族信託': '信託制度', '信託': '信託制度',
  '葬儀': '葬儀・お墓', 'お墓': '葬儀・お墓', '永代供養': '葬儀・お墓', '供養': '葬儀・お墓',
  '香典返し': '葬儀・お墓', '遺品整理': '葬儀・お墓',
  'エンディングノート': 'エンディングノート',
  'デジタル終活': 'デジタル終活', 'デジタル遺品': 'デジタル終活',
  '保険': '保険・税務', '生命保険': '保険・税務', '死亡保険金': '保険・税務',
  '年金': '保険・税務', '税金': '保険・税務', '医療費控除': '保険・税務',
  '生前整理': '生前準備', '終活': '生前準備', '老後': '生前準備',
  '訃報': '訃報・連絡', 'マナー': '訃報・連絡',
};

function inferCategoryFromTags(tags) {
  if (!Array.isArray(tags)) return null;
  for (const tag of tags) {
    if (tagToCategoryMap[tag]) return tagToCategoryMap[tag];
  }
  return 'その他';
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
        const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8').trimStart(); // trimStart: 先頭改行でfrontmatter解析失敗を防ぐ
        const slug = file.replace(/\.(md|mdx)$/, '');
        const { data } = matter(content);

        // categoryがない場合はtagsから推測
        if (!data.category && data.tags) {
          data.category = inferCategoryFromTags(data.tags);
        }

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
      { path: '/articles',         priority: '0.9', changefreq: 'daily'   },
      { path: '/kaigo-shisetsu',   priority: '0.9', changefreq: 'weekly'  }, // 高単価アフィリエイトLP
      { path: '/sozoku-zei',       priority: '0.9', changefreq: 'weekly'  }, // 相続税LP
      { path: '/yuigonsho',        priority: '0.9', changefreq: 'weekly'  }, // 遺言書LP
      { path: '/sogi',             priority: '0.9', changefreq: 'weekly'  }, // 葬儀・お墓LP
      { path: '/hoken',            priority: '0.8', changefreq: 'weekly'  }, // 保険・税務LP
      { path: '/fudosan-souzoku', priority: '0.9', changefreq: 'weekly'  }, // 不動産相続LP
      { path: '/kazoku-shintaku', priority: '0.9', changefreq: 'weekly'  }, // 家族信託LP
      { path: '/search',           priority: '0.6', changefreq: 'weekly'  },
      { path: '/about',            priority: '0.6', changefreq: 'monthly' },
      { path: '/faq',              priority: '0.7', changefreq: 'monthly' },
      { path: '/glossary',         priority: '0.7', changefreq: 'monthly' },
      { path: '/download',         priority: '0.8', changefreq: 'monthly' },
      { path: '/privacy-policy',   priority: '0.4', changefreq: 'yearly'  },
      { path: '/terms',            priority: '0.4', changefreq: 'yearly'  },
      { path: '/disclaimer',       priority: '0.4', changefreq: 'yearly'  },
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