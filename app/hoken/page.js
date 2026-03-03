import Link from 'next/link';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '生命保険と相続税対策｜死亡保険金の非課税枠を活用した節税方法',
  description: '生命保険の死亡保険金は「500万円×法定相続人数」まで相続税非課税。終身保険・医療保険・がん保険の種類別比較と相続税対策への活用法を解説します。',
  alternates: { canonical: '/hoken' },
  openGraph: {
    title: '生命保険と相続税対策｜死亡保険金の非課税枠を活用した節税方法',
    description: '生命保険の非課税枠活用・種類別比較・受取人設定のポイントを専門家が解説。',
    url: `${siteUrl}/hoken`,
    type: 'website',
  },
};

const insuranceComparison = [
  {
    name: '終身保険',
    cost: '月1.5〜3万円程度',
    coverage: '一生涯の死亡保障',
    inheritance: '◎ 最も有効',
    feature: '解約返戻金あり・貯蓄性あり',
    highlight: '相続税対策に最適',
    color: '#0e7490',
    bg: '#ecfeff',
  },
  {
    name: '定期保険',
    cost: '月3,000〜1万円程度',
    coverage: '一定期間の死亡保障',
    inheritance: '△ 限定的',
    feature: '掛け捨て型・保障は大きい',
    highlight: '保障を重視',
    color: '#0c4a6e',
    bg: '#eff6ff',
  },
  {
    name: '医療保険',
    cost: '月3,000〜8,000円程度',
    coverage: '入院・手術給付',
    inheritance: '△ 入院給付金は非課税',
    feature: '入院・手術で給付金受取',
    highlight: '老後の医療費対策',
    color: '#065f46',
    bg: '#ecfdf5',
  },
  {
    name: 'がん保険',
    cost: '月2,000〜5,000円程度',
    coverage: 'がん診断・入院・手術',
    inheritance: '△ 診断給付金は非課税',
    feature: 'がん特化・診断一時金',
    highlight: 'がんリスク対策',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
];

const faqs = [
  {
    q: '生命保険の死亡保険金は相続財産に含まれますか？',
    a: '死亡保険金は「みなし相続財産」として相続税の対象になりますが、非課税枠が設けられています。「500万円×法定相続人数」までは相続税がかかりません。例えば法定相続人が3人なら1,500万円まで非課税です。ただし、受取人が被相続人（故人）自身の場合は別の扱いになるため、受取人設定が重要です。',
  },
  {
    q: '生命保険の受取人は誰にするのがよいですか？',
    a: '相続税対策として最も有効なのは「相続人（配偶者・子など）」を受取人にすることです。受取人が相続人であれば非課税枠（500万円×相続人数）が使えます。内縁のパートナーや孫など、法定相続人以外を受取人にすることも可能ですが、その場合は相続税の非課税枠が使えないため注意が必要です。',
  },
  {
    q: '相続税対策に終身保険が有効な理由は何ですか？',
    a: '終身保険が相続税対策に有効な理由は3つあります。①非課税枠（500万円×相続人数）の活用、②受取人を指定することで遺産分割の対象にならず、特定の人に確実に渡せる、③解約返戻金という現金資産を貯蓄しながら保障も受けられる。また、相続税の申告期限（10ヶ月）までの納税資金確保にも使えます。',
  },
  {
    q: '保険の見直し・加入に最適な時期はいつですか？',
    a: '相続税対策目的なら、健康状態が良好なうちに加入することが最重要です。持病があると終身保険に加入できなかったり、割増保険料が発生します。50代〜60代前半での加入が一般的に有利です。また、子どもの独立や退職などライフイベント時も、必要保障額が変わるため見直しのタイミングです。無料のFP相談（保険見直しラボ等）でシミュレーションしてもらうのが確実です。',
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

// Amazon アソシエイト直リンク
const amazonInsuranceUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent('生命保険 相続 節税')}&tag=dream32045hot-22`;

export default function HokenPage() {
  const allArticles = getAllArticles();
  const hokenArticles = allArticles
    .filter(a => a.frontmatter.category === '保険・税務')
    .slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #0e7490 0%, #0c4a6e 100%)',
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', marginBottom: '1rem' }}>
            🛡️ 生命保険で相続税を「合法的に」節税
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.4' }}>
            生命保険の死亡保険金は<br />
            <span style={{ color: '#67e8f9' }}>500万円×相続人数まで非課税</span>
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            終身保険・定期保険・医療保険・がん保険を徹底比較<br />
            相続税対策・受取人設定・見直しのポイントを専門家が解説
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.hoken-minaoshi.co.jp/"
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
              🛡️ 【無料】FP相談で保険を見直す →
            </a>
            <a
              href={amazonInsuranceUrl}
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
              📚 生命保険×相続 入門書籍
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※相談料無料（PR・広告）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 非課税枠バナー */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%)',
          border: '2px solid #0e7490',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}>
          <p style={{ fontWeight: '800', color: '#0c4a6e', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
            💡 生命保険の相続税非課税枠
          </p>
          <p style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: '800', color: '#0e7490', margin: '0 0 0.5rem' }}>
            500万円 × 法定相続人数
          </p>
          <p style={{ color: '#374151', margin: 0, fontSize: '0.9rem' }}>
            例）法定相続人が3人 → <strong>1,500万円まで相続税ゼロ</strong>
          </p>
        </div>

        {/* 保険種類比較表 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            生命保険4種類の比較
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#0e7490', color: '#fff' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>種類</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>月額目安</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>保障内容</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>相続税対策</th>
                </tr>
              </thead>
              <tbody>
                {insuranceComparison.map((ins, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ display: 'block', fontWeight: '700' }}>{ins.name}</span>
                      <span style={{ display: 'inline-block', background: ins.color, color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>{ins.highlight}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#374151' }}>{ins.cost}</td>
                    <td style={{ padding: '0.75rem', color: '#374151', fontSize: '0.82rem' }}>{ins.coverage}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#0e7490' }}>{ins.inheritance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
            ※保険料は年齢・性別・健康状態・保険会社により大きく変動します
          </p>
        </section>

        {/* 中央CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #0e7490 0%, #0c4a6e 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            保険の見直し・相続税対策を無料で相談
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            FP（ファイナンシャルプランナー）が無料で保険を診断。<br />
            相続税対策・受取人設定・老後の保障設計をトータルサポート。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.hoken-minaoshi.co.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
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
              🛡️ 保険見直しラボ（無料FP相談）
            </a>
            <a
              href="https://www.bengo4.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#0e7490',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              相続・保険の法律相談
            </a>
          </div>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 初回相談無料</p>
        </section>

        {/* 保険活用3ステップ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            生命保険で相続税を節税する3ステップ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: 1, title: '現在の相続財産と相続税を試算', desc: '総財産額・法定相続人数から相続税の概算を計算。基礎控除（3,000万円＋600万円×相続人数）との差額を把握します。' },
              { step: 2, title: '終身保険の加入・増額で非課税枠を活用', desc: '「500万円×相続人数」の非課税枠に合わせた保険金設定。50〜60代前半の健康なうちに加入・増額が重要です。' },
              { step: 3, title: '受取人を相続人に指定（定期的に見直し）', desc: '受取人は相続人（配偶者・子）にすることで非課税枠適用。離婚・再婚・子どもの増減時に必ず見直しを。' },
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
                  background: '#0e7490', color: '#fff',
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
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: '#0e7490', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        {hokenArticles.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
              保険・税務に関する詳細記事
            </h2>
            <div className="article-grid">
              {hokenArticles.map(article => (
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
              <Link href="/category/insurance-tax" style={{
                display: 'inline-block', background: '#0e7490', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '50px',
                textDecoration: 'none', fontWeight: '600',
              }}>
                保険・税務の記事をすべて見る →
              </Link>
            </div>
          </section>
        )}

        {/* 関連LPへのナビゲーション */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#1e3a5f' }}>
            関連する相続対策
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { href: '/sozoku-zei', label: '💰 相続税の申告相談', color: '#7c3aed' },
              { href: '/yuigonsho', label: '✍️ 遺言書の作成相談', color: '#065f46' },
              { href: '/kaigo-shisetsu', label: '🏥 介護施設の選び方', color: '#dc2626' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'block',
                padding: '1rem',
                background: '#f9fafb',
                border: `1px solid ${link.color}30`,
                borderLeft: `4px solid ${link.color}`,
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#1a1a1a',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* 最終CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #0e7490 0%, #083344 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            今すぐ保険の見直しで相続税を節税
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            健康なうちの早期加入が節税効果を最大化します。<br />
            FPへの無料相談でシミュレーションを確認しましょう。
          </p>
          <a
            href="https://www.hoken-minaoshi.co.jp/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#0e7490',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            🛡️ 無料FP相談で保険を見直す →
          </a>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 初回相談無料</p>
        </section>

      </div>
    </div>
  );
}
