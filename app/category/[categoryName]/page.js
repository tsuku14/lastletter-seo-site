import Link from 'next/link';
import { getAllArticles, getAllCategories } from '../../../lib/articles';
import { getCategoryName, getCategorySlug } from '../../../lib/categorySlugMap';

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const categoryName = getCategoryName(params.categoryName);
  return {
    title: `${categoryName}の記事一覧`,
    description: `「${categoryName}」に関する専門記事の一覧です。終活・相続に関する実用的な情報をお届けします。`,
    openGraph: {
      title: `${categoryName}の記事一覧 | 終活・相続情報センター`,
      description: `「${categoryName}」に関する専門記事の一覧`,
      url: `https://lastletter.jp/category/${params.categoryName}`,
      type: 'website',
    },
  };
}

// 静的なパス（カテゴリ）を生成
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(category => ({
    categoryName: getCategorySlug(category),
  }));
}

export default function CategoryPage({ params }) {
  const categoryName = getCategoryName(params.categoryName);
  const allArticles = getAllArticles();
  const articles = allArticles.filter(article => article.frontmatter.category === categoryName);

  return (
    <div className="container">
      <div className="category-header" style={{ marginBottom: '3rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
          {categoryName}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', marginTop: '1rem' }}>
          {categoryName}に関する記事が{articles.length}件あります
        </p>
      </div>
      
      {articles.length > 0 ? (
        <div className="article-grid">
          {articles.map(article => (
            <Link key={article.slug} href={`/articles/${article.slug}`}>
              <article className="article-card">
                <div className="article-card-content">
                  <span className="article-category">{article.frontmatter.category}</span>
                  <h3 className="article-title">{article.frontmatter.title}</h3>
                  <p className="article-description">{article.frontmatter.description}</p>
                  <time className="article-date">{article.frontmatter.date}</time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.125rem' }}>
          このカテゴリの記事はまだありません。
        </p>
      )}

      {/* 他のカテゴリへのリンク */}
      <section style={{ marginTop: '5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem' }}>
          他のカテゴリも見る
        </h2>
        <div className="category-list">
          {getAllCategories()
            .filter(cat => cat !== categoryName)
            .map(category => (
              <Link 
                key={category} 
                href={`/category/${getCategorySlug(category)}`}
                className="category-tag"
              >
                {category}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}