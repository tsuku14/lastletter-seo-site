import Link from 'next/link';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '老人ホーム・介護施設の選び方と費用｜無料相談で最適な施設を見つける',
  description: '親の介護施設探しで後悔しないために。グループホーム・特養・有料老人ホームの費用・条件を徹底比較。専門家に無料相談で最適な施設を提案してもらえます。',
  alternates: { canonical: '/kaigo-shisetsu' },
  openGraph: {
    title: '老人ホーム・介護施設の選び方と費用｜無料相談で最適な施設を見つける',
    description: '親の介護施設探しで後悔しないために。専門家に無料相談で最適な施設を提案してもらえます。',
    url: `${siteUrl}/kaigo-shisetsu`,
    type: 'website',
  },
};

// 施設比較データ
const facilityComparison = [
  {
    name: 'グループホーム',
    target: '認知症の方（要支援2〜）',
    cost: '月12〜18万円',
    waitTime: '比較的短い',
    highlight: '認知症専門',
    color: '#dc2626',
    bg: '#fef2f2',
  },
  {
    name: '特別養護老人ホーム（特養）',
    target: '要介護3以上の方',
    cost: '月7〜15万円',
    waitTime: '数ヶ月〜数年',
    highlight: '最安・終身',
    color: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    name: '介護付有料老人ホーム',
    target: '要介護状態の方',
    cost: '月15〜35万円',
    waitTime: 'すぐ入居可',
    highlight: '充実サービス',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    name: '介護老人保健施設（老健）',
    target: 'リハビリが必要な方',
    cost: '月8〜14万円',
    waitTime: '比較的短い',
    highlight: 'リハビリ特化',
    color: '#065f46',
    bg: '#ecfdf5',
  },
  {
    name: 'サービス付き高齢者住宅',
    target: '自立〜軽度要介護',
    cost: '月12〜25万円',
    waitTime: 'すぐ入居可',
    highlight: '自宅感覚',
    color: '#9a3412',
    bg: '#fff7ed',
  },
];

// FAQデータ
const faqs = [
  {
    q: '施設探しは早めに始めた方がいいですか？',
    a: 'はい、特に特養は待機が数年かかることがあります。要介護認定後はすぐに情報収集を始め、特養には早期申し込みを。民間施設も人気施設は空き待ちになることが多いため、早めの行動が重要です。',
  },
  {
    q: '無料相談サービスは本当に無料ですか？',
    a: 'はい。施設紹介サービスは、施設側から紹介手数料を受け取るビジネスモデルのため、入居希望者は完全無料で利用できます。見学の手配から契約サポートまで一貫して無料です。',
  },
  {
    q: '親が「施設には入りたくない」と言っています',
    a: 'まずはデイサービスや短期入所（ショートステイ）から慣れてもらうのが効果的です。施設のデイサービスに通ううちに施設の雰囲気に慣れ、考えが変わるケースも多くあります。',
  },
  {
    q: '費用が払えなくなったらどうなりますか？',
    a: '低所得の方には「補足給付（負担限度額認定）」「高額介護サービス費」などの公的制度があります。生活保護受給者も特養には入居できます。まずはケアマネジャーに相談を。',
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

export default function KaigoShisetsuPage() {
  const allArticles = getAllArticles();
  const kaigoArticles = allArticles
    .filter(a => a.frontmatter.category === '介護・福祉')
    .slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', marginBottom: '1rem' }}>
            ⚠️ 施設選びは早めの行動が重要です
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.4' }}>
            老人ホーム・介護施設の選び方と費用<br />
            <span style={{ color: '#fbbf24' }}>専門家に無料相談</span>で最適な施設を見つける
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            グループホーム・特養・有料老人ホームなど<br />
            施設の種類・費用・入居条件を徹底比較
          </p>
          {/* CTA ボタン群 */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.senshincare.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
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
              🏥 【無料】施設を相談して探す →
            </a>
            <a
              href="https://www.minkaigo.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              口コミ・料金を比較する
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※相談・見学手配・紹介サービスはすべて無料です（PR・広告）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 緊急性バナー */}
        <div style={{
          background: '#fef3c7',
          border: '2px solid #f59e0b',
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⏰</span>
          <div>
            <p style={{ fontWeight: '700', color: '#92400e', margin: '0 0 0.25rem' }}>
              特養（特別養護老人ホーム）は全国で約27万人が待機中
            </p>
            <p style={{ color: '#78350f', margin: 0, fontSize: '0.9rem' }}>
              都市部では数年待ちになることも。要介護3以上の認定を受けたら
              <strong>すぐに情報収集と申し込みを開始</strong>することが重要です。
            </p>
          </div>
        </div>

        {/* 施設比較表 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            主な介護施設の種類と費用一覧
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#1e3a5f', color: '#fff' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>施設種別</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>対象</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>月額費用</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>待機期間</th>
                </tr>
              </thead>
              <tbody>
                {facilityComparison.map((f, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ display: 'block', fontWeight: '700' }}>{f.name}</span>
                      <span style={{ display: 'inline-block', background: f.color, color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>{f.highlight}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#374151' }}>{f.target}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#1e3a5f' }}>{f.cost}</td>
                    <td style={{ padding: '0.75rem', color: '#374151' }}>{f.waitTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
            ※費用は目安です。地域・施設グレード・要介護度によって異なります
          </p>
        </section>

        {/* 無料相談CTA（中央） */}
        <section style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5986 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            どの施設が合っているか、専門家に無料で相談できます
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            全国3,500施設以上の中から、ご家族の状況・予算・立地に合った施設を<br />
            無料でご提案。見学の手配まで一貫してサポートします。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.senshincare.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{
                display: 'inline-block',
                background: '#ef4444',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              🏥 シニアのあんしん相談室（無料）
            </a>
            <a
              href="https://www.minkaigo.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#1e3a5f',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              みんなの介護で比較する
            </a>
          </div>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 相談・紹介・見学手配はすべて無料</p>
        </section>

        {/* 施設選びの5ステップ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            失敗しない施設選び5ステップ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: 1, title: '要介護認定を確認・更新する', desc: '現在の要介護度を確認。適切な施設の種類が変わります。認定が古い場合は区分変更申請も検討を。' },
              { step: 2, title: 'ケアマネジャーに相談する', desc: '担当ケアマネジャーに施設入居の希望を伝え、適切な種類の施設候補をリストアップしてもらいます。' },
              { step: 3, title: '無料相談サービスで候補を絞る', desc: '施設紹介サービス（無料）を活用して、条件に合った施設を効率的に検索・比較します。' },
              { step: 4, title: '複数施設を見学する', desc: '最低2〜3施設を実際に見学。スタッフの対応・清潔感・入居者の雰囲気を自分の目で確認します。' },
              { step: 5, title: '早めに申し込む', desc: '特養は早期申し込みが重要。民間施設も人気施設は空き待ちになるため、複数施設に申し込みを。' },
            ].map(item => (
              <div key={item.step} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.25rem',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
              }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem',
                  background: '#1e3a5f', color: '#fff',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: '800', fontSize: '1.1rem', flexShrink: 0,
                }}>{item.step}</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.25rem' }}>{item.title}</p>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            よくある質問
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
              }}>
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: '#1e3a5f', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Q. {faq.q}</span>
                  <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>＋</span>
                </summary>
                <p style={{ marginTop: '0.75rem', color: '#374151', lineHeight: '1.7', fontSize: '0.9rem' }}>
                  A. {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 関連記事 */}
        {kaigoArticles.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
              介護・老人ホームに関する詳細記事
            </h2>
            <div className="article-grid">
              {kaigoArticles.map(article => (
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
              <Link href="/category/care-welfare" style={{
                display: 'inline-block', background: '#7c3aed', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '50px',
                textDecoration: 'none', fontWeight: '600',
              }}>
                介護・福祉の記事をすべて見る →
              </Link>
            </div>
          </section>
        )}

        {/* 最終CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            今すぐ無料相談を始めましょう
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            施設選びに迷ったら、まずはプロに相談するのが近道です。<br />
            電話・オンラインで気軽にご相談いただけます。
          </p>
          <a
            href="https://www.senshincare.jp/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#dc2626',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            🏥 無料で老人ホームを探す →
          </a>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 相談無料・24時間受付</p>
        </section>

      </div>
    </div>
  );
}
