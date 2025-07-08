import Link from 'next/link';
import articlesData from '../../../.cache/articles.json';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';

// 記事データを取得する関数
async function getArticleData(slug) {
  const article = articlesData.find(a => a.slug === slug);
  if (!article) {
    return null;
  }
  const processedContent = await remark().use(html).process(article.content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    contentHtml,
    ...article.frontmatter,
  };
}

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const article = await getArticleData(params.slug);
  if (!article) {
    return { title: '記事が見つかりません', description: '' };
  }
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
  };
}

// 静的なパスを生成
export async function generateStaticParams() {
  return articlesData.map(article => ({
    slug: article.slug,
  }));
}

// 記事ページコンポーネント
export default async function ArticlePage({ params }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    notFound();
  }

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
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </article>
  );
}
