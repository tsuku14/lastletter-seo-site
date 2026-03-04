import Link from 'next/link';
import CtaLink from '../../components/CtaLink';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '相続した不動産の売却・活用・相続放棄｜実家・空き家の最適解を専門家に相談',
  description: '相続不動産（実家・空き家・土地）の売却・賃貸・相続放棄の判断基準を解説。2024年から相続登記が義務化。不動産一括査定で最高額での売却を実現する方法を紹介します。',
  alternates: { canonical: '/fudosan-souzoku' },
  openGraph: {
    title: '相続した不動産の売却・活用・相続放棄｜実家・空き家の最適解',
    description: '相続登記義務化（2024年〜）・実家の売却・空き家対策・相続放棄の判断基準を専門家が解説。',
    url: `${siteUrl}/fudosan-souzoku`,
    type: 'website',
  },
};

// 不動産の処分方法比較データ
const disposalOptions = [
  {
    method: '売却',
    icon: '💰',
    cost: '仲介手数料3%+6万円',
    merit: '現金化・維持費ゼロ・相続税対策',
    demerit: '売却に時間がかかる場合あり',
    bestFor: '活用予定のない実家・遠方の土地',
    color: '#d97706',
  },
  {
    method: '賃貸・活用',
    icon: '🏠',
    cost: 'リフォーム費用50〜200万円',
    merit: '継続的な家賃収入・節税効果',
    demerit: '管理の手間・空室リスク',
    bestFor: '立地の良い物件・資産保有目的',
    color: '#059669',
  },
  {
    method: 'そのまま維持',
    icon: '⚠️',
    cost: '固定資産税・管理費（年10〜20万円）',
    merit: '判断を先延ばしにできる',
    demerit: '固定資産税・特定空家指定リスク',
    bestFor: '近く活用予定がある場合のみ',
    color: '#6b7280',
  },
  {
    method: '相続放棄',
    icon: '📋',
    cost: '申請費用3,000円〜（弁護士費用別）',
    merit: '負動産・負債ごと手放せる',
    demerit: '他の相続財産も放棄（3ヶ月以内要手続）',
    bestFor: '借金付き・価値のない土地・管理不能物件',
    color: '#7c3aed',
  },
];

// 相続登記の義務化チェックリスト
const registrationChecklist = [
  { item: '不動産を相続で取得した', required: true },
  { item: '相続発生から3年以内に登記申請が必要', required: true, note: '2024年4月1日〜義務化' },
  { item: '正当な理由なく申請しない場合：10万円以下の過料', required: true },
  { item: '2024年4月以前の相続も対象（猶予期間あり）', required: false },
  { item: '相続人申告登記（簡易手続）も選択肢のひとつ', required: false },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '相続した実家は売った方がいいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '活用予定がなく、固定資産税や管理費が負担なら売却が有利です。売却価格は査定で確認し、特例（3,000万円控除など）を活用すれば譲渡所得税を大幅に減らせます。',
      },
    },
    {
      '@type': 'Question',
      name: '相続登記はいつまでに行う必要がありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2024年4月1日から相続登記が義務化され、相続を知った日から3年以内に登記が必要です。正当な理由なく申請しない場合は10万円以下の過料が科されます。',
      },
    },
    {
      '@type': 'Question',
      name: '相続不動産の売却にかかる税金はいくらですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '譲渡所得（売却価格－取得費－譲渡費用）に20.315%の税率が適用されます。相続してから3年10ヶ月以内の売却で相続税額の一部を取得費に加算できる特例があります。',
      },
    },
    {
      '@type': 'Question',
      name: '「負動産」（価値のない不動産）は相続放棄できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '相続放棄は相続を知った日から3ヶ月以内に家庭裁判所で申請します。ただし不動産だけを放棄することはできず、全財産を放棄することになります。2023年から相続土地国庫帰属制度も利用可能です。',
      },
    },
  ],
};

export default async function FudosanSouzokuPage() {
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(a => ['相続手続き', '相続税', '不動産相続'].includes(a.frontmatter.category))
    .slice(0, 4);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
        color: '#ffffff',
        padding: '4rem 1rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            {['🏠 相続登記義務化2024', '💰 一括査定で最高額', '⚖️ 専門家無料相談'].map(badge => (
              <span key={badge} style={{
                background: 'rgba(255,255,255,0.2)', color: '#fff',
                fontSize: '0.78rem', fontWeight: '700', padding: '4px 12px',
                borderRadius: '20px', border: '1px solid rgba(255,255,255,0.4)',
              }}>{badge}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '900', lineHeight: '1.3', marginBottom: '1rem' }}>
            相続した実家・不動産<br />売る？貸す？放棄する？
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            2024年4月〜相続登記が義務化。3年以内に登記しないと10万円以下の過料<br />
            無料査定で最高額を確認し、最適な選択を専門家と一緒に決めましょう
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CtaLink
              href="https://ieul.jp/"
              serviceName="イエウール 不動産一括査定"
              lpName="fudosan-souzoku"
              position="hero"
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
              🏠 【無料】不動産を一括査定 →
            </CtaLink>
            <CtaLink
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent('相続 不動産 売却 本')}&tag=dream32045hot-22`}
              serviceName="Amazon 相続不動産書籍"
              lpName="fudosan-souzoku"
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
              📚 相続不動産の売却ガイド
            </CtaLink>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※査定・相談は無料（PR・広告）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 相続登記義務化バナー */}
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
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ fontWeight: '800', color: '#92400e', marginBottom: '4px' }}>
              2024年4月〜 相続登記が義務化されました
            </p>
            <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, lineHeight: '1.6' }}>
              相続を知った日から<strong>3年以内</strong>に登記申請が必要です。
              正当な理由なく放置すると<strong>10万円以下の過料</strong>が科されます。
              2024年4月以前の相続も対象となるため、早急な確認をお勧めします。
            </p>
          </div>
        </div>

        {/* 処分方法比較表 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            相続不動産の4つの選択肢を比較
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {disposalOptions.map((opt, i) => (
              <div key={i} style={{
                border: `2px solid ${opt.color}`,
                borderRadius: '12px',
                padding: '1.25rem',
                background: '#fff',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{opt.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: opt.color, marginBottom: '0.75rem' }}>
                  {opt.method}
                </h3>
                <div style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '600', marginBottom: '2px' }}>費用目安</p>
                  <p style={{ fontSize: '0.82rem', color: '#374151', margin: 0 }}>{opt.cost}</p>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600', marginBottom: '2px' }}>✓ メリット</p>
                  <p style={{ fontSize: '0.82rem', color: '#374151', margin: 0 }}>{opt.merit}</p>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: '600', marginBottom: '2px' }}>✗ デメリット</p>
                  <p style={{ fontSize: '0.82rem', color: '#374151', margin: 0 }}>{opt.demerit}</p>
                </div>
                <div style={{
                  background: `${opt.color}15`,
                  borderRadius: '6px',
                  padding: '6px 10px',
                }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '700', color: opt.color, margin: 0 }}>
                    おすすめ: {opt.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 中間CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #92400e, #78350f)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: '0.5rem' }}>
            「売るか・貸すか・放棄するか」迷ったら、まず査定金額を確認
          </p>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem' }}>
            無料一括査定で相続不動産の<br />適正価格を確認する
          </h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CtaLink
              href="https://ieul.jp/"
              serviceName="イエウール 不動産一括査定"
              lpName="fudosan-souzoku"
              position="middle"
              style={{
                display: 'inline-block',
                background: '#fbbf24',
                color: '#1a1a1a',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              🏠 無料で不動産を査定する →
            </CtaLink>
          </div>
          <p style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: '0.75rem' }}>
            ※査定は無料・1分で完了（PR・広告）
          </p>
        </div>

        {/* 相続登記チェックリスト */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            相続登記義務化チェックリスト
          </h2>
          <div style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            {registrationChecklist.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem 0',
                borderBottom: i < registrationChecklist.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}>
                <span style={{
                  fontSize: '1.1rem',
                  flexShrink: 0,
                  color: item.required ? '#dc2626' : '#059669',
                }}>
                  {item.required ? '⚠️' : '✓'}
                </span>
                <div>
                  <p style={{ margin: 0, fontWeight: item.required ? '700' : '400', color: '#1a1a1a', fontSize: '0.9rem' }}>
                    {item.item}
                  </p>
                  {item.note && (
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#dc2626', fontWeight: '600' }}>
                      {item.note}
                    </p>
                  )}
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
              関連記事
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {relatedArticles.map(article => (
                <Link key={article.slug} href={`/articles/${article.slug}`} style={{
                  display: 'block', padding: '1rem', background: '#f9fafb',
                  border: '1px solid #e5e7eb', borderRadius: '8px', textDecoration: 'none',
                }}>
                  <span style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: '600' }}>
                    {article.frontmatter.category}
                  </span>
                  <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1a1a1a', margin: '4px 0 0' }}>
                    {article.frontmatter.title}
                  </p>
                </Link>
              ))}
            </div>
            <Link href="/category/sozoku" style={{
              display: 'inline-block', marginTop: '1rem', fontSize: '0.875rem',
              color: '#92400e', textDecoration: 'underline',
            }}>
              相続手続きの記事をもっと見る →
            </Link>
          </section>
        )}

        {/* ボトムCTA */}
        <div style={{
          background: 'linear-gradient(135deg, #92400e, #78350f)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            相続不動産の売却・活用<br />まずは無料査定から始めよう
          </h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: '1.25rem' }}>
            1分で完了。全国1,900社以上から査定結果を比較。
          </p>
          <CtaLink
            href="https://ieul.jp/"
            serviceName="イエウール 不動産一括査定"
            lpName="fudosan-souzoku"
            position="bottom"
            style={{
              display: 'inline-block',
              background: '#fbbf24',
              color: '#1a1a1a',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            🏠 無料で不動産を査定する →
          </CtaLink>
          <p style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: '0.75rem' }}>
            ※PR・広告を含みます
          </p>
        </div>
      </div>
    </main>
  );
}
