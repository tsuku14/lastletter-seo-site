import Link from 'next/link';
import { getAllArticles, getAllCategories } from '../lib/articles';
import { getCategorySlug } from '../lib/categorySlugMap';

export default function HomePage() {
  const articles = getAllArticles();
  const latestArticles = articles.slice(0, 6);
  const categories = getAllCategories();

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">もしもに備える、信頼の知識を</h1>
          <p className="hero-subtitle">
            終活・相続からエンディングノートまで。専門家が監修した正確で実用的な情報で、
            あなたの「今」と「未来」をサポートします。
          </p>
        </div>
      </section>

      <div className="container">
        {/* 最新記事セクション */}
        <section>
          <h2 className="section-title">新着記事</h2>
          {latestArticles.length > 0 ? (
            <div className="article-grid">
              {latestArticles.map(article => (
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
            <p>現在、記事を準備中です。</p>
          )}
        </section>

        {/* カテゴリセクション */}
        <section style={{ marginTop: '4rem' }}>
          <h2 className="section-title">カテゴリから探す</h2>
          <div className="category-list">
            {categories.map(category => (
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

        {/* CTAセクション */}
        <section className="cta-section" style={{ 
          marginTop: '5rem', 
          padding: '3rem', 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            大切な人へ、あなたの想いを届けませんか？
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            LAST LETTERは、もしもの時に大切な人へメッセージを届けるサービスです。
          </p>
          <a 
            href="https://lastletter.jp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
          >
            LAST LETTERを詳しく見る
          </a>
        </section>
      </div>
    </div>
  );
}