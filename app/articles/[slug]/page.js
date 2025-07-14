import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 記事データを取得する関数
function getArticleData(slug) {
  const filePath = path.join(process.cwd(), 'articles', `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      frontmatter: data,
      content
    };
  } catch (error) {
    return null;
  }
}

// すべての記事データを取得する関数
function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory).filter(file => file.endsWith('.md'));
  
  return filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      frontmatter: data
    };
  });
}

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
    const id = text.replace(/\s+/g, '-').toLowerCase(); // シンプルなID生成
    headings.push({ level, text, id });
  }

  return {
    slug,
    contentHtml,
    headings,
    ...article.frontmatter,
  };
}

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const article = await processArticleData(params.slug);
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
          url: 'https://lastletter.jp/ogp-default.png', // デフォルトOGP画像
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
  const article = await processArticleData(params.slug);

  if (!article) {
    notFound();
  }

  // 同じカテゴリの関連記事を抽出
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(a => a.frontmatter.category === article.category && a.slug !== article.slug)
    .sort(() => 0.5 - Math.random()) // ランダムソート
    .slice(0, 3); // 最大3件

  // JSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    keywords: Array.isArray(article.keywords) ? article.keywords.join(', ') : '',
    datePublished: article.date,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'LAST LETTER',
    },
    publisher: {
        '@type': 'Organization',
        name: 'LAST LETTER',
        logo: {
            '@type': 'ImageObject',
            url: 'https://lastletter.jp/logo.png', // 仮のロゴURL
        },
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{article.title}</h1>
      <div>
        <span>公開日: {article.date}</span>
        <span>カテゴリ: {article.category}</span>
      </div>

      {/* 目次 */}
      {article.headings && article.headings.length > 0 && (
        <nav style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', background: '#f9fafb' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>目次</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {article.headings.map(heading => (
              <li key={heading.id} style={{ marginLeft: heading.level === 3 ? '1.5rem' : '0' }}>
                <a href={`#${heading.id}`} style={{ textDecoration: 'none', color: '#4f46e5', display: 'block', padding: '0.25rem 0' }}>
                  {heading.level === 3 ? '・' : ''}{heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

      {/* 関連記事 */}
      {relatedArticles.length > 0 && (
        <section style={{ marginTop: '4rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>関連記事</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {relatedArticles.map(related => (
              <Link key={related.slug} href={`/articles/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', transition: 'box-shadow 0.3s' }}>
                  <div style={{ padding: '1rem' }}>
                    <p style={{ color: '#4f46e5', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{related.frontmatter.category}</p>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{related.frontmatter.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{related.frontmatter.description.substring(0, 80)}...</p>
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