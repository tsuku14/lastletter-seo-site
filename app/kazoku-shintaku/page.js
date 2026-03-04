import Link from 'next/link';
import CtaLink from '../../components/CtaLink';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '家族信託とは？成年後見制度との違い・費用・手続きを専門家が解説',
  description: '家族信託で認知症による財産凍結を防ぐ。費用・手続き・成年後見制度との違いをわかりやすく解説。司法書士・弁護士への無料相談で認知症対策と相続対策を同時に実現。',
  alternates: { canonical: '/kazoku-shintaku' },
  openGraph: {
    title: '家族信託とは？認知症対策・費用・手続きの完全ガイド',
    description: '家族信託の仕組み・費用・手続き・成年後見制度との比較を専門家が解説。認知症で口座が凍結される前に準備を。',
    url: `${siteUrl}/kazoku-shintaku`,
    type: 'website',
  },
};

// 家族信託 vs 成年後見制度 vs 遺言書 比較データ
const comparisonItems = [
  {
    label: '家族信託',
    icon: '🏦',
    cost: '初期費用50〜100万円（公証・登記含む）',
    flexibity: '◎ 高い（本人の意思で設計）',
    dementia: '◎ 認知症後も有効',
    inheritance: '○ 可（受益者設定で対応）',
    court: '不要（当事者間で締結）',
    bestFor: '認知症前・資産管理・不動産オーナー',
    color: '#1e3a5f',
  },
  {
    label: '任意後見制度',
    icon: '👨‍⚖️',
    cost: '月額報酬1〜5万円（後見人）',
    flexibity: '○ やや高い（後見監督人あり）',
    dementia: '◎ 認知症後に発動',
    inheritance: '× 不可（相続対策は別途）',
    court: '必要（家庭裁判所への申立て）',
    bestFor: '認知症後の財産管理・判断能力が落ちた後',
    color: '#0e7490',
  },
  {
    label: '遺言書',
    icon: '✍️',
    cost: '公正証書遺言5〜10万円〜',
    flexibity: '△ 死亡時のみ効力',
    dementia: '× 認知症後は作成不可',
    inheritance: '◎ 相続指定が主目的',
    court: '検認手続き必要（公正証書は不要）',
    bestFor: '死後の財産承継のみ',
    color: '#065f46',
  },
];

// 家族信託の設定手順
const setupSteps = [
  { step: 1, title: '専門家（司法書士・弁護士）への相談', detail: '信託の目的・委託財産・受託者・受益者を整理。費用の見積もりを取る。', icon: '💬' },
  { step: 2, title: '信託契約書の作成', detail: '専門家が信託契約書のドラフトを作成。委託者・受託者・受益者が内容を確認・修正。', icon: '📝' },
  { step: 3, title: '公正証書化（推奨）', detail: '公証役場で公正証書として作成。証拠力が高まり金融機関の対応がスムーズになる。', icon: '⚖️' },
  { step: 4, title: '信託口口座の開設', detail: '受託者名義の信託専用口座を開設。信託財産と個人財産を明確に分離する。', icon: '🏦' },
  { step: 5, title: '不動産の信託登記（不動産がある場合）', detail: '法務局で信託登記を申請。所有権は受託者に移転し、受益権は委託者（＝受益者）が保持。', icon: '📋' },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '家族信託とは何ですか？わかりやすく教えてください',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '家族信託とは、財産の管理・処分を信頼できる家族（受託者）に任せる契約です。認知症になって判断能力が低下しても、受託者が財産を継続管理できます。銀行口座の凍結を防ぎ、不動産の売却や管理も可能です。',
      },
    },
    {
      '@type': 'Question',
      name: '家族信託の費用はどのくらいかかりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '家族信託の初期費用は、信託財産の規模によりますが一般的に50〜100万円程度です。内訳は、司法書士・弁護士報酬（30〜60万円）、公正証書作成費用（5〜10万円）、信託登記費用（信託財産の0.2〜0.4%）などです。成年後見制度の月額報酬（毎月1〜5万円）と比べると長期的にはコストを抑えられることがあります。',
      },
    },
    {
      '@type': 'Question',
      name: '家族信託と成年後見制度どちらを選べばいいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '認知症になる前に準備できるなら家族信託が柔軟性が高く有利です。認知症がすでに進行している場合は任意後見（または法定後見）しか選択できません。家族信託は相続対策も兼ねられますが、成年後見は財産管理のみが目的です。専門家に相談して状況に合わせて選択してください。',
      },
    },
    {
      '@type': 'Question',
      name: '家族信託は誰でも設定できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '委託者（財産を任せる人）に判断能力が必要です。認知症が進行して意思能力がない状態では家族信託を締結できません。「親が元気なうちに」設定することが重要で、70〜80代でも意思能力があれば設定可能です。迷っているなら早めに専門家に相談することをお勧めします。',
      },
    },
  ],
};

export default async function KazokuShintakuPage() {
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(a => ['信託制度', '家族信託', '法的制度'].includes(a.frontmatter.category))
    .slice(0, 6);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
        color: '#ffffff',
        padding: '4rem 1rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            {['🏦 認知症対策の最先端', '🔐 口座凍結を防ぐ', '💡 相続対策も同時に'].map(badge => (
              <span key={badge} style={{
                background: 'rgba(255,255,255,0.15)', color: '#fff',
                fontSize: '0.78rem', fontWeight: '700', padding: '4px 12px',
                borderRadius: '20px', border: '1px solid rgba(255,255,255,0.4)',
              }}>{badge}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '900', lineHeight: '1.3', marginBottom: '1rem' }}>
            家族信託で認知症から<br />大切な財産を守る
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            認知症になると銀行口座が凍結され、不動産の売却もできなくなります。<br />
            家族信託は「元気なうち」に準備する、最も柔軟な認知症・相続対策です
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CtaLink
              href="https://www.bengo4.com/"
              serviceName="弁護士ドットコム 家族信託相談"
              lpName="kazoku-shintaku"
              position="hero"
              style={{
                display: 'inline-block',
                background: '#3b82f6',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              🏦 【無料】専門家に相談する →
            </CtaLink>
            <CtaLink
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent('家族信託 手続き 本')}&tag=dream32045hot-22`}
              serviceName="Amazon 家族信託書籍"
              lpName="kazoku-shintaku"
              position="hero"
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
              📚 家族信託の解説書を見る
            </CtaLink>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※相談は無料（PR・広告を含みます）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 認知症警告バナー */}
        <div style={{
          background: '#eff6ff',
          border: '2px solid #3b82f6',
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ fontWeight: '800', color: '#1e3a5f', marginBottom: '4px' }}>
              認知症になってからでは遅い！家族信託は元気なうちに
            </p>
            <p style={{ fontSize: '0.875rem', color: '#1e40af', margin: 0, lineHeight: '1.6' }}>
              意思能力が低下すると家族信託の締結ができません。
              <strong>65歳以上の約5人に1人が認知症</strong>（2025年推計）。
              「まだ大丈夫」と思っているうちに準備するのが鉄則です。
            </p>
          </div>
        </div>

        {/* 比較表 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1e3a5f' }}>
            家族信託 vs 成年後見制度 vs 遺言書の違い
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
            目的・費用・自由度・認知症対応で比較
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comparisonItems.map((item, i) => (
              <div key={i} style={{
                border: `2px solid ${item.color}`,
                borderRadius: '12px',
                padding: '1.25rem',
                background: '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: item.color, margin: 0 }}>
                    {item.label}
                  </h3>
                  {i === 0 && (
                    <span style={{
                      background: item.color, color: '#fff',
                      fontSize: '0.68rem', fontWeight: '800',
                      padding: '2px 10px', borderRadius: '20px',
                    }}>おすすめ</span>
                  )}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '0.75rem',
                }}>
                  {[
                    { label: '初期費用', value: item.cost },
                    { label: '柔軟性', value: item.flexibity },
                    { label: '認知症対応', value: item.dementia },
                    { label: '相続対策', value: item.inheritance },
                    { label: '裁判所関与', value: item.court },
                    { label: 'おすすめ対象', value: item.bestFor },
                  ].map((row, j) => (
                    <div key={j} style={{ background: '#f9fafb', borderRadius: '6px', padding: '8px 10px' }}>
                      <p style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: '600', margin: '0 0 2px' }}>
                        {row.label}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: '#1a1a1a', margin: 0, fontWeight: row.label === 'おすすめ対象' ? '700' : '400' }}>
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 中間CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a5f, #0f2744)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: '0.5rem' }}>
            「家族信託と後見制度どちらが合うか」迷ったら専門家へ
          </p>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem' }}>
            家族の状況に合わせた<br />最適な対策を無料で相談
          </h3>
          <CtaLink
            href="https://www.bengo4.com/"
            serviceName="弁護士ドットコム 家族信託相談"
            lpName="kazoku-shintaku"
            position="middle"
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: '#fff',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            🏦 無料で専門家に相談する →
          </CtaLink>
          <p style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: '0.75rem' }}>
            ※相談料無料（PR・広告）
          </p>
        </div>

        {/* 設定の5ステップ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            家族信託の設定：5ステップの流れ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {setupSteps.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.25rem',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
              }}>
                <div style={{
                  background: '#1e3a5f',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  flexShrink: 0,
                }}>
                  {s.step}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', color: '#1e3a5f', marginBottom: '4px', fontSize: '0.95rem' }}>
                    {s.icon} {s.title}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            よくある質問（FAQ）
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqLd.mainEntity.map((faq, i) => (
              <div key={i} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '1.25rem',
                background: '#fff',
              }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.5rem' }}>
                  Q{i + 1}. {faq.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0, lineHeight: '1.7' }}>
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 関連記事 */}
        {relatedArticles.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#1e3a5f' }}>
              家族信託・後見制度に関する詳細記事
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {relatedArticles.map(article => (
                <Link key={article.slug} href={`/articles/${article.slug}`} style={{
                  display: 'block', padding: '1rem', background: '#f9fafb',
                  border: '1px solid #e5e7eb', borderRadius: '8px', textDecoration: 'none',
                }}>
                  <span style={{ fontSize: '0.72rem', color: '#1e3a5f', fontWeight: '600' }}>
                    {article.frontmatter.category}
                  </span>
                  <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1a1a1a', margin: '4px 0 0' }}>
                    {article.frontmatter.title}
                  </p>
                </Link>
              ))}
            </div>
            <Link href="/category/trust-system" style={{
              display: 'inline-block', marginTop: '1rem', fontSize: '0.875rem',
              color: '#1e3a5f', textDecoration: 'underline',
            }}>
              信託制度の記事をもっと見る →
            </Link>
          </section>
        )}

        {/* ボトムCTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a5f, #0f2744)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            家族信託・任意後見の準備<br />今すぐ専門家に無料相談
          </h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: '1.25rem' }}>
            認知症になる前に。司法書士・弁護士が最適な方法を提案します。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CtaLink
              href="https://www.bengo4.com/"
              serviceName="弁護士ドットコム 家族信託相談"
              lpName="kazoku-shintaku"
              position="bottom"
              style={{
                display: 'inline-block',
                background: '#3b82f6',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              🏦 無料で専門家に相談 →
            </CtaLink>
            <CtaLink
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent('家族信託 認知症対策 本')}&tag=dream32045hot-22`}
              serviceName="Amazon 家族信託書籍"
              lpName="kazoku-shintaku"
              position="bottom"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              📚 解説書を確認する
            </CtaLink>
          </div>
          <p style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: '0.75rem' }}>
            ※PR・広告を含みます
          </p>
        </div>
      </div>
    </main>
  );
}
