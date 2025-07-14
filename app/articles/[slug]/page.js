import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import { getArticleData, getAllArticles } from '../../../lib/articles';

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
      url: `https://lastletter.jp/articles/${article.slug}`,
      type: 'article',
      images: [
        {
          url: 'https://lastletter.jp/ogp-default.png',
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
      images: ['https://lastletter.jp/ogp-default.png'],
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
  // URLエンコーディングをデコード
  const decodedSlug = decodeURIComponent(params.slug);
  const article = await processArticleData(decodedSlug);

  if (!article) {
    notFound();
  }

  // 同じカテゴリの関連記事を抽出
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(a => a.frontmatter.category === article.category && a.slug !== article.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // JSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    keywords: Array.isArray(article.keywords) ? article.keywords.join(', ') : '',
    datePublished: article.date,
    dateModified: article.date,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'LAST LETTER',
      url: 'https://lastletter.jp'
    },
    publisher: {
        '@type': 'Organization',
        name: 'LAST LETTER',
        logo: {
            '@type': 'ImageObject',
            url: 'https://lastletter.jp/logo.png',
        },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lastletter.jp/articles/${article.slug}`
    }
  };

  return (
    <article className="article-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
          <div className="article-meta-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5.5H14M10 2V5.5M6 2V5.5M5 14H11C12.1046 14 13 13.1046 13 12V5.5C13 4.39543 12.1046 3.5 11 3.5H5C3.89543 3.5 3 4.39543 3 5.5V12C3 13.1046 3.89543 14 5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{article.category}</span>
          </div>
        </div>
      </div>

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

      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

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
    </article>
  );
}