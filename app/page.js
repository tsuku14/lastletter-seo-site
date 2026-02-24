import Link from 'next/link';
import { getAllArticles, getAllCategories } from '../lib/articles';
import { getCategorySlug } from '../lib/categorySlugMap';

// カテゴリ別アイコン・色設定
const categoryConfig = {
  '相続手続き':  { icon: '📋', color: '#1e3a5f', bg: '#eff6ff' },
  '相続税':      { icon: '💰', color: '#7c3aed', bg: '#f5f3ff' },
  '遺言書':      { icon: '✍️', color: '#065f46', bg: '#ecfdf5' },
  '葬儀・お墓':  { icon: '⛩️', color: '#374151', bg: '#f9fafb' },
  '介護・福祉':  { icon: '💊', color: '#b45309', bg: '#fffbeb' },
  'エンディングノート': { icon: '📔', color: '#0e7490', bg: '#ecfeff' },
  '生前準備':    { icon: '🗓️', color: '#be185d', bg: '#fdf2f8' },
  'デジタル終活': { icon: '💻', color: '#1d4ed8', bg: '#eff6ff' },
  '保険・税務':  { icon: '🛡️', color: '#15803d', bg: '#f0fdf4' },
  '法的制度':    { icon: '⚖️', color: '#9a3412', bg: '#fff7ed' },
  '信託制度':    { icon: '🏛️', color: '#4f46e5', bg: '#eef2ff' },
};

// 注目カテゴリ（高単価アフィリエイト優先）
const featuredCategories = ['介護・福祉', '葬儀・お墓', '相続税', '遺言書', '生前準備', 'エンディングノート'];

export default function HomePage() {
  const articles = getAllArticles();
  const latestArticles = articles.slice(0, 9);
  const categories = getAllCategories();

  // カテゴリ別注目記事（各カテゴリから最新1件）
  const featuredArticlesByCategory = featuredCategories.map(cat => {
    const catArticles = articles.filter(a => a.frontmatter.category === cat);
    return catArticles.length > 0 ? { category: cat, article: catArticles[0] } : null;
  }).filter(Boolean);

  // 記事総数
  const totalArticles = articles.length;

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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.5rem 1.2rem', fontSize: '0.9rem', color: '#fff' }}>
              📚 {totalArticles}件以上の専門記事
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.5rem 1.2rem', fontSize: '0.9rem', color: '#fff' }}>
              ✅ 専門家監修・AI生成コンテンツ
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.5rem 1.2rem', fontSize: '0.9rem', color: '#fff' }}>
              🔄 毎日更新
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* カテゴリ別注目記事 */}
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">カテゴリ別注目記事</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {featuredArticlesByCategory.map(({ category, article }) => {
              const config = categoryConfig[category] || { icon: '📄', color: '#374151', bg: '#f9fafb' };
              return (
                <Link key={category} href={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: config.bg,
                    border: `1px solid ${config.color}22`,
                    borderLeft: `4px solid ${config.color}`,
                    borderRadius: '10px',
                    padding: '1.25rem',
                    height: '100%',
                    transition: 'box-shadow 0.2s',
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{config.icon}</div>
                    <span style={{
                      display: 'inline-block',
                      background: config.color,
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      marginBottom: '0.5rem',
                    }}>{category}</span>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.4rem', lineHeight: '1.5' }}>
                      {article.frontmatter.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                      {article.frontmatter.description?.substring(0, 60)}...
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 新着記事セクション（9件） */}
        <section style={{ marginTop: '4rem' }}>
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
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/category/souzoku-tetsuzuki" style={{
              display: 'inline-block',
              background: '#1e3a5f',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}>
              すべての記事を見る →
            </Link>
          </div>
        </section>

        {/* カテゴリセクション */}
        <section style={{ marginTop: '4rem' }}>
          <h2 className="section-title">カテゴリから探す</h2>
          <div className="category-list">
            {categories.map(category => {
              const config = categoryConfig[category] || { icon: '📄', color: '#374151' };
              return (
                <Link
                  key={category}
                  href={`/category/${getCategorySlug(category)}`}
                  className="category-tag"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <span>{config.icon}</span> {category}
                </Link>
              );
            })}
          </div>
        </section>

        {/* 人気コンテンツ：3つの強み */}
        <section style={{ marginTop: '4rem' }}>
          <h2 className="section-title">このサイトの特徴</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '⚖️', title: '法的根拠に基づく情報', desc: '民法・相続税法など最新の法令に基づいた正確な情報を提供します' },
              { icon: '👥', title: '専門家監修', desc: '弁護士・税理士・司法書士の知見を参考に内容を構成しています' },
              { icon: '🔄', title: '毎日更新', desc: 'AI技術を活用し最新情報を継続的にアップデートしています' },
              { icon: '📊', title: '具体的な数値・手順', desc: '費用相場・期限・チェックリストなど実践的な情報を掲載' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
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
