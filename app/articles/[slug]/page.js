import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import { getArticleData, getAllArticles } from '../../../lib/articles';
import { getCategorySlug } from '../../../lib/categorySlugMap';
import AdSenseAd from '../../../components/AdSenseAd';
import AffiliateCard from '../../../components/AffiliateCard';
import ArticleCTA from '../../../components/ArticleCTA';
import AuthorBox from '../../../components/AuthorBox';
import EmailCapture from '../../../components/EmailCapture';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

// 記事データを処理する関数
async function processArticleData(slug) {
  const article = getArticleData(slug);
  if (!article) {
    return null;
  }

  const processedContent = await remark().use(html).process(article.content);
  const contentHtml = processedContent.toString();

  // 目次生成
  const headings = [];
  const headingRegex = /<h([2-3])>(.*?)<\/h[2-3]>/g;
  let match;
  while ((match = headingRegex.exec(contentHtml)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2];
    const id = text.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
    headings.push({ level, text, id });
  }

  // contentHtmlにIDを追加
  let updatedContent = contentHtml;
  headings.forEach(heading => {
    const regex = new RegExp(`<h${heading.level}>${heading.text}</h${heading.level}>`, 'g');
    updatedContent = updatedContent.replace(regex, `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`);
  });

  return {
    slug,
    contentHtml: updatedContent,
    headings,
    ...article.frontmatter,
  };
}

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const article = await processArticleData(decodedSlug);
  if (!article) {
    return { title: '記事が見つかりません', description: '' };
  }
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${siteUrl}/articles/${article.slug}`,
      type: 'article',
      images: [
        {
          url: `${siteUrl}/ogp-default.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [`${siteUrl}/ogp-default.png`],
    },
  };
}

// 静的なパスを生成
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({
    slug: article.slug,
  }));
}

// 記事ページコンポーネント
export default async function ArticlePage({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const article = await processArticleData(decodedSlug);

  if (!article) {
    notFound();
  }

  // 関連記事：キーワード共通数でスコアリング（ランダムから改善）
  const allArticles = getAllArticles();
  const articleKeywords = Array.isArray(article.keywords) ? article.keywords : [];
  const relatedArticles = allArticles
    .filter(a => a.frontmatter.category === article.category && a.slug !== article.slug)
    .map(a => {
      const aKeywords = Array.isArray(a.frontmatter.keywords) ? a.frontmatter.keywords : [];
      const commonCount = aKeywords.filter(k => articleKeywords.includes(k)).length;
      return { ...a, _score: commonCount };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, 4);

  // JSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    keywords: Array.isArray(article.keywords) ? article.keywords.join(', ') : '',
    datePublished: article.date,
    dateModified: article.date,
    description: article.description,
    author: [
      {
        '@type': 'Organization',
        name: '終活・相続情報センター 編集部',
        url: siteUrl
      },
      {
        '@type': 'Organization',
        name: 'LAST LETTER',
        url: 'https://lastletter.jp'
      }
    ],
    publisher: {
      '@type': 'Organization',
      name: 'LAST LETTER',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${article.slug}`
    },
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/ogp-default.png`,
      width: 1200,
      height: 630
    }
  };

  // パンくずリストの構造化データ
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category,
        item: `${siteUrl}/category/${getCategorySlug(article.category)}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${siteUrl}/articles/${article.slug}`
      }
    ]
  };

  // FAQ構造化データ
  const faqItems = [];
  const faqRegex = /<h3[^>]*>Q\d+:\s*(.*?)<\/h3>\s*<p><strong>A\d+:<\/strong>\s*(.*?)<\/p>/g;
  let faqMatch;
  while ((faqMatch = faqRegex.exec(article.contentHtml)) !== null) {
    faqItems.push({
      '@type': 'Question',
      name: faqMatch[1].replace(/<[^>]*>/g, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqMatch[2].replace(/<[^>]*>/g, '')
      }
    });
  }

  const faqLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems
  } : null;

  return (
    <article className="article-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* AI生成・免責事項バナー */}
      <div style={{
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        fontSize: '0.85rem',
        color: '#0369a1'
      }}>
        🤖 本記事はAI（GPT-4）を活用して生成された情報を含みます。法律・税務等の専門的アドバイスではありません。
        実際の手続きには専門家（弁護士・税理士等）にご相談ください。
        詳しくは<Link href="/disclaimer" style={{ color: '#0369a1', fontWeight: 'bold' }}>免責事項</Link>をご確認ください。
      </div>

      <div className="article-header">
        <h1 className="article-page-title">{article.title}</h1>
        <div className="article-meta">
          <div className="article-meta-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <time>{article.date}</time>
          </div>
          {article.category && (
            <div className="article-meta-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5.5H14M10 2V5.5M6 2V5.5M5 14H11C12.1046 14 13 13.1046 13 12V5.5C13 4.39543 12.1046 3.5 11 3.5H5C3.89543 3.5 3 4.39543 3 5.5V12C3 13.1046 3.89543 14 5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link href={`/category/${getCategorySlug(article.category)}`} className="article-category-link">
                {article.category}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 著者ボックス（記事上部） */}
      <AuthorBox />

      {/* 目次 */}
      {article.headings && article.headings.length > 0 && (
        <nav className="toc">
          <h2 className="toc-title">目次</h2>
          <ul className="toc-list">
            {article.headings.map(heading => (
              <li key={heading.id} className={`toc-item level-${heading.level}`}>
                <a href={`#${heading.id}`} className="toc-link">
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 広告①：目次直下 */}
      <AdSenseAd slot="1234567890" />

      {/* 本文 */}
      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

      {/* 広告②：本文末尾 */}
      <AdSenseAd slot="0987654321" />

      {/* アフィリエイトCTA（カテゴリ別） */}
      <AffiliateCard category={article.category} />

      {/* LAST LETTER 自社CTA */}
      <ArticleCTA />

      {/* メール登録（終活チェックリスト無料配布） */}
      <EmailCapture variant="compact" placement="article-footer" />

      {/* 関連記事 */}
      {relatedArticles.length > 0 && (
        <section className="related-section">
          <h2 className="related-title">関連記事</h2>
          <div className="article-grid">
            {relatedArticles.map(related => (
              <Link key={related.slug} href={`/articles/${related.slug}`}>
                <article className="article-card">
                  <div className="article-card-content">
                    <span className="article-category">{related.frontmatter.category}</span>
                    <h3 className="article-title">{related.frontmatter.title}</h3>
                    <p className="article-description">{related.frontmatter.description}</p>
                    <time className="article-date">{related.frontmatter.date}</time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 広告③：関連記事後 */}
      <AdSenseAd slot="1122334455" />
    </article>
  );
}
