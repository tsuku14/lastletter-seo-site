import Link from 'next/link';
import CtaLink from '../../components/CtaLink';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '相続税の無料相談・申告サポート｜税理士紹介で節税対策',
  description: '相続税の申告は死亡後10ヶ月が期限。専門の税理士に相談することで節税・手続きミスを防げます。無料で税理士を紹介、相続税の計算・控除の使い方を解説。',
  alternates: { canonical: '/sozoku-zei' },
  openGraph: {
    title: '相続税の無料相談・申告サポート｜税理士紹介で節税対策',
    description: '相続税の申告は死亡後10ヶ月が期限。専門の税理士に無料相談できます。',
    url: `${siteUrl}/sozoku-zei`,
    type: 'website',
  },
};

const taxPoints = [
  { icon: '⏰', title: '申告期限は10ヶ月', desc: '相続開始を知った翌日から10ヶ月以内。延滞税・無申告加算税を避けるため早めの着手が重要' },
  { icon: '💰', title: '基礎控除を超える場合のみ申告', desc: '3,000万円 + 600万円×法定相続人数が基礎控除額。これを超える遺産がある場合のみ申告が必要' },
  { icon: '🏠', title: '小規模宅地の特例で最大80%減額', desc: '自宅の土地（330㎡以内）は評価額を最大80%減額できる。配偶者や同居親族が相続する場合に適用' },
  { icon: '👫', title: '配偶者控除で1.6億円まで非課税', desc: '配偶者が相続する場合、1億6千万円または法定相続分のいずれか多い金額まで相続税が課されない' },
];

const faqs = [
  {
    q: '相続税の申告は自分でできますか？',
    a: '財産がシンプルで金額も少ない場合は自分でできますが、不動産・株式・非上場株など評価が複雑な財産がある場合や、節税対策を検討する場合は税理士への依頼を強くおすすめします。相続税申告の経験が豊富な税理士を選ぶことが重要です。',
  },
  {
    q: '税理士への報酬はどれくらいかかりますか？',
    a: '一般的に相続財産の0.5〜1%程度が目安です。遺産が5,000万円の場合、25〜50万円程度。一見高額に思えますが、節税効果がこれを上回ることが多く、また申告ミスによる追徴課税（最大40%）を避けられるメリットがあります。',
  },
  {
    q: '相続税の申告期限に間に合わなかったらどうなりますか？',
    a: '無申告加算税（最大30%）と延滞税が課されます。ただし「正当な理由がある場合」は一部免除される場合もあります。できるだけ早く税理士に相談して対処することが重要です。',
  },
  {
    q: '遺産を相続してから税理士を探しても大丈夫ですか？',
    a: '申告期限（10ヶ月）内であれば問題ありません。ただし、税理士の確保・財産調査・申告書作成には時間がかかるため、相続開始後できるだけ早く（3〜4ヶ月以内）に税理士を選ぶことを推奨します。',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SozokuZeiPage() {
  const allArticles = getAllArticles();
  const zeiArticles = allArticles
    .filter(a => a.frontmatter.category === '相続税')
    .slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', marginBottom: '1rem' }}>
            ⚠️ 申告期限は相続開始から10ヶ月以内
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.4' }}>
            相続税の申告・節税対策は<br />
            <span style={{ color: '#fbbf24' }}>専門税理士への相談</span>が近道
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            控除の使い忘れ・評価ミスで数百万円の損失に。<br />
            相続税に強い税理士に無料で相談できます。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CtaLink
              href="https://www.zeiri4.com/"
              serviceName="税理士ドットコム 相続税申告"
              lpName="sozoku-zei"
              position="cta"
              style={{
                display: 'inline-block',
                background: '#fbbf24',
                color: '#1a1a1a',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              💰 【無料】相続税専門の税理士を探す →
            </CtaLink>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※税理士紹介は無料（PR・広告）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 相続税の基本ポイント */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            相続税を理解する4つのポイント
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {taxPoints.map((p, i) => (
              <div key={i} style={{
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '10px',
                padding: '1.25rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#374151', margin: 0, lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 基礎控除計算ツール */}
        <section style={{
          background: '#f0fdf4',
          border: '1px solid #86efac',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '3rem',
        }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#15803d', marginBottom: '1rem' }}>
            📊 基礎控除額の早見表
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#15803d', color: '#fff' }}>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>法定相続人数</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>基礎控除額</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>申告が必要なケース</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: '1人', amount: '3,600万円', note: '遺産が3,600万円超の場合' },
                { n: '2人', amount: '4,200万円', note: '遺産が4,200万円超の場合' },
                { n: '3人', amount: '4,800万円', note: '遺産が4,800万円超の場合' },
                { n: '4人', amount: '5,400万円', note: '遺産が5,400万円超の場合' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: '600' }}>{row.n}</td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', fontWeight: '700', color: '#15803d', fontSize: '1rem' }}>{row.amount}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#374151' }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
            ※遺産総額 = プラスの財産 − 債務・葬儀費用。生命保険金の非課税枠（500万円×相続人数）なども考慮が必要です
          </p>
        </section>

        {/* 税理士相談CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            相続税の申告は専門家に任せて節税を最大化
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            控除の活用・財産評価・申告書作成まで一括サポート。<br />
            相続税に強い税理士を無料で紹介しています。
          </p>
          <CtaLink
            href="https://www.zeiri4.com/"
            serviceName="税理士ドットコム 相続税申告"
            lpName="sozoku-zei"
            position="cta"
            style={{
              display: 'inline-block',
              background: '#fbbf24',
              color: '#1a1a1a',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            💰 相続税専門の税理士を無料で探す →
          </CtaLink>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 無料相談・全国対応</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            よくある質問
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: '#1e3a5f', listStyle: 'none' }}>
                  Q. {faq.q}
                </summary>
                <p style={{ marginTop: '0.75rem', color: '#374151', lineHeight: '1.7', fontSize: '0.9rem' }}>
                  A. {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 関連記事 */}
        {zeiArticles.length > 0 && (
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
              相続税に関する詳細記事
            </h2>
            <div className="article-grid">
              {zeiArticles.map(article => (
                <Link key={article.slug} href={`/articles/${article.slug}`}>
                  <article className="article-card">
                    <div className="article-card-content">
                      <span className="article-category">{article.frontmatter.category}</span>
                      <h3 className="article-title">{article.frontmatter.title}</h3>
                      <p className="article-description">{article.frontmatter.description}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link href="/category/inheritance-tax" style={{
                display: 'inline-block', background: '#1e3a5f', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '50px',
                textDecoration: 'none', fontWeight: '600',
              }}>
                相続税の記事をすべて見る →
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
