import Link from 'next/link';
import articlesData from '../.cache/articles.json';

// 全記事のメタデータを取得する関数
function getArticlesMetadata() {
  return articlesData.map(article => ({
    slug: article.slug,
    ...article.frontmatter,
  }));
}

export default function HomePage() {
  const articles = getArticlesMetadata();
  const latestArticles = articles.slice(0, 6); // 最新記事を6件表示
  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <div>
      {/* ヒーローセクション */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem', marginBottom: '4rem', background: '#f9fafb', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>もしもに備える、信頼の知識を</h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto' }}>
          終活・相続からエンディングノートまで。専門家が監修した正確で実用的な情報で、あなたの「今」と「未来」をサポートします。
        </p>
      </section>

      {/* 最新記事セクション */}
      <section>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>新着記事</h2>
        {latestArticles.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {latestArticles.map(article => (
              <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', transition: 'box-shadow 0.3s' }}>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ color: '#4f46e5', fontWeight: '600', marginBottom: '0.5rem' }}>{article.category}</p>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', minHeight: '50px' }}>{article.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem', minHeight: '70px' }}>{article.description}</p>
                    <time style={{ color: '#6b7280', fontSize: '0.8rem' }}>{article.date}</time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p>現在、記事を準備中です。</p>
        )}
      </section>

      {/* カテゴリセクション */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>カテゴリから探す</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {categories.map(category => (
            <Link key={category} href={`/category/${encodeURIComponent(category)}`} style={{ textDecoration: 'none', color: '#374151', background: '#f3f4f6', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontWeight: '500', transition: 'background-color 0.3s' }}>
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}