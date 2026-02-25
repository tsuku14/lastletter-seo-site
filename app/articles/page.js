import Link from 'next/link';
import { getAllArticles, getAllCategories } from '../../lib/articles';
import { getCategorySlug } from '../../lib/categorySlugMap';

export const metadata = {
  title: '記事一覧 | 終活・相続情報センター',
  description: '終活・相続・エンディングノートに関する専門記事を120件以上掲載。カテゴリ別に探せます。',
  alternates: { canonical: '/articles' },
};

export default function ArticlesPage({ searchParams }) {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const selectedCategory = searchParams?.category || '';

  // カテゴリフィルタリング
  const filteredArticles = selectedCategory
    ? articles.filter(a => a.frontmatter.category === selectedCategory)
    : articles;

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* パンくずリスト */}
      <nav style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>ホーム</Link>
        {' > '}
        <span>記事一覧</span>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e3a5f', marginBottom: '0.5rem' }}>
            記事一覧
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
            {selectedCategory ? `「${selectedCategory}」の記事` : '全記事'} {filteredArticles.length}件
          </p>
        </div>
      </div>

      {/* カテゴリフィルタ */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link
          href="/articles"
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: '600',
            textDecoration: 'none',
            background: !selectedCategory ? '#1e3a5f' : '#f3f4f6',
            color: !selectedCategory ? '#fff' : '#374151',
            border: '1px solid',
            borderColor: !selectedCategory ? '#1e3a5f' : '#e5e7eb',
          }}
        >
          すべて（{articles.length}件）
        </Link>
        {categories.map(cat => {
          const count = articles.filter(a => a.frontmatter.category === cat).length;
          const isSelected = selectedCategory === cat;
          return (
            <Link
              key={cat}
              href={`/articles?category=${encodeURIComponent(cat)}`}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '500',
                textDecoration: 'none',
                background: isSelected ? '#1e3a5f' : '#f3f4f6',
                color: isSelected ? '#fff' : '#374151',
                border: '1px solid',
                borderColor: isSelected ? '#1e3a5f' : '#e5e7eb',
              }}
            >
              {cat}（{count}件）
            </Link>
          );
        })}
      </div>

      {/* 記事グリッド */}
      {filteredArticles.length > 0 ? (
        <div className="article-grid">
          {filteredArticles.map(article => (
            <Link key={article.slug} href={`/articles/${article.slug}`}>
              <article className="article-card">
                <div className="article-card-content">
                  <span className="article-category">{article.frontmatter.category}</span>
                  <h2 className="article-title">{article.frontmatter.title}</h2>
                  <p className="article-description">{article.frontmatter.description}</p>
                  <time className="article-date">{article.frontmatter.date}</time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '3rem' }}>
          このカテゴリの記事はまだありません。
        </p>
      )}

      {/* カテゴリ別ページへのリンク */}
      <section style={{ marginTop: '4rem', padding: '2rem', background: '#f9fafb', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '1rem' }}>
          カテゴリ別に見る
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${getCategorySlug(cat)}`}
              style={{
                padding: '0.5rem 1.25rem',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#1e3a5f',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
