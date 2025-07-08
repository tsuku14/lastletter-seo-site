import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'articles');

// 全記事のメタデータを取得するヘルパー関数
function getAllArticlesMetadata() {
  const filenames = fs.readdirSync(articlesDirectory);
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: filename.replace(/\.md$/, ''),
        ...data,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const categoryName = decodeURIComponent(params.categoryName);
  return {
    title: `${categoryName}の記事一覧 | LAST LETTER`,
    description: `「${categoryName}」に関する専門記事の一覧です。`,
  };
}

// 静的なパス（カテゴリ）を生成
export async function generateStaticParams() {
  const articles = getAllArticlesMetadata();
  const categories = [...new Set(articles.map(article => article.category))];
  return categories.map(category => ({
    categoryName: encodeURIComponent(category),
  }));
}

export default function CategoryPage({ params }) {
  const categoryName = decodeURIComponent(params.categoryName);
  const allArticles = getAllArticlesMetadata();
  const articles = allArticles.filter(article => article.category === categoryName);

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        カテゴリ: {categoryName}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {articles.map(article => (
          <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', height: '100%' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{article.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>{article.description}</p>
                <time style={{ color: '#6b7280', fontSize: '0.8rem' }}>{article.date}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
