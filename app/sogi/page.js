import Link from 'next/link';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '葬儀・お墓の費用と手続き｜直葬・家族葬・一般葬の比較と事前準備',
  description: '直葬・家族葬・一般葬・自然葬の費用・参列人数・特徴を徹底比較。葬儀社の無料資料請求で事前準備を万全に。葬儀後の手続きも解説します。',
  alternates: { canonical: '/sogi' },
  openGraph: {
    title: '葬儀・お墓の費用と手続き｜直葬・家族葬・一般葬の比較と事前準備',
    description: '葬儀の種類・費用・お墓の選び方を徹底比較。無料資料請求で事前準備を。',
    url: `${siteUrl}/sogi`,
    type: 'website',
  },
};

const funeralComparison = [
  {
    name: '直葬（火葬式）',
    cost: '10〜30万円',
    attendees: '家族・ごく近親のみ',
    feature: '通夜・告別式なしで火葬のみ',
    highlight: '最安・最小',
    color: '#374151',
    bg: '#f9fafb',
  },
  {
    name: '家族葬',
    cost: '30〜80万円',
    attendees: '家族・親族20名程度まで',
    feature: '小規模で故人らしい式が可能',
    highlight: '近年主流',
    color: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    name: '一般葬',
    cost: '100〜200万円',
    attendees: '50〜300名以上',
    feature: '社会的な格式・香典収入あり',
    highlight: '格式・伝統',
    color: '#9a3412',
    bg: '#fff7ed',
  },
  {
    name: '自然葬（散骨・樹木葬）',
    cost: '5〜50万円',
    attendees: '家族のみ',
    feature: '墓不要・自然に還る形式',
    highlight: '墓管理不要',
    color: '#065f46',
    bg: '#ecfdf5',
  },
];

const faqs = [
  {
    q: '葬儀費用の相場はいくらですか？',
    a: '葬儀の種類によって大きく異なります。直葬（火葬式）は10〜30万円、家族葬は30〜80万円、一般葬は100〜200万円以上が相場です。なお「葬儀費用」とは別に、飲食代・香典返し・お布施・霊柩車代などの費用もかかります。総費用の平均は家族葬で約70〜100万円、一般葬で約150〜200万円程度と言われています。',
  },
  {
    q: '葬儀の事前相談・事前予約はした方がいいですか？',
    a: 'はい、強くおすすめします。葬儀は突然のことで冷静な判断が難しい中で決断が迫られます。事前に複数の葬儀社に資料請求・相談しておくと、価格比較・サービス比較ができ、平均で20〜30万円程度費用を抑えられることもあります。事前相談・資料請求は無料で行えます。',
  },
  {
    q: 'お墓の種類と費用を教えてください',
    a: 'お墓の種類は①一般墓（墓石・永代使用料50〜200万円＋管理費）②納骨堂（年間管理費型・3〜100万円）③樹木葬（5〜70万円）④永代供養墓（10〜100万円・承継者不要）⑤散骨（5〜30万円）があります。後継者がいない方、費用を抑えたい方には永代供養墓・樹木葬が近年人気です。',
  },
  {
    q: '喪主として葬儀後にやることは何ですか？',
    a: '葬儀後には①死亡届の提出（7日以内）②火葬許可証の受け取り③健康保険・年金の脱退手続き④相続税の申告（10ヶ月以内）⑤遺産分割協議⑥各種名義変更（不動産・金融口座・車など）が必要です。これらの手続きは「相続専門家」に一括依頼することもできます（有料）。',
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

export default function SogiPage() {
  const allArticles = getAllArticles();
  const sogiArticles = allArticles
    .filter(a => a.frontmatter.category === '葬儀・お墓')
    .slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', marginBottom: '1rem' }}>
            ⛩️ 「もしもの時」に後悔しないための事前準備
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.4' }}>
            葬儀・お墓の費用と手続き<br />
            <span style={{ color: '#d1d5db' }}>事前準備</span>で家族の負担を減らす
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            直葬・家族葬・一般葬・自然葬の費用を徹底比較<br />
            無料資料請求で葬儀社を比べ、納得の選択を
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.yorisou.jp/"
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
              ⛩️ 【無料】葬儀の資料請求・相談 →
            </a>
            <a
              href="https://www.amazon.co.jp/s?k=%E8%91%AC%E5%84%80+%E6%89%8B%E9%85%8D%E3%82%8A&tag=lastletter-22"
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
              📚 葬儀・相続の手続きガイド
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※資料請求・相談は無料（PR・広告）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 費用バナー */}
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
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ fontWeight: '700', color: '#92400e', margin: '0 0 0.25rem' }}>
              事前に葬儀社を比較した人は平均20〜30万円費用を抑えられます
            </p>
            <p style={{ color: '#78350f', margin: 0, fontSize: '0.9rem' }}>
              急いでいる中での葬儀社選びは後悔につながることも。
              <strong>生前に資料請求・比較しておくことが最善</strong>の準備です。
            </p>
          </div>
        </div>

        {/* 葬儀比較表 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            葬儀の種類と費用比較
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#374151', color: '#fff' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>葬儀の種類</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>費用目安</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>参列人数</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>特徴</th>
                </tr>
              </thead>
              <tbody>
                {funeralComparison.map((f, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ display: 'block', fontWeight: '700' }}>{f.name}</span>
                      <span style={{ display: 'inline-block', background: f.color, color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>{f.highlight}</span>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#1e3a5f' }}>{f.cost}</td>
                    <td style={{ padding: '0.75rem', color: '#374151' }}>{f.attendees}</td>
                    <td style={{ padding: '0.75rem', color: '#374151', fontSize: '0.82rem' }}>{f.feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
            ※費用は地域・葬儀社・規模によって異なります。飲食代・お布施は別途
          </p>
        </section>

        {/* 中央CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            葬儀社の費用・プランを無料で比較できます
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            全国対応の葬儀社を比較・資料請求。急いでいないからこそ<br />
            じっくり選んで後悔のない葬儀を準備できます。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.yorisou.jp/"
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
              ⛩️ よりそうお葬式（資料請求）
            </a>
            <a
              href="https://www.yorisou.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#374151',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              費用・プランを比較する
            </a>
          </div>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 資料請求・相談は無料</p>
        </section>

        {/* 葬儀後の手続き */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            葬儀後にやること チェックリスト
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: '3日以内', title: '死亡届・火葬許可証の手続き', desc: '死亡診断書をもとに市区町村役場で死亡届を提出。火葬許可証を取得します。' },
              { step: '14日以内', title: '健康保険・年金の手続き', desc: '国民健康保険・後期高齢者医療保険の資格喪失届。厚生年金・国民年金の死亡届も必要です。' },
              { step: '3ヶ月以内', title: '相続放棄の判断', desc: '借金が財産を上回る場合、相続放棄（家庭裁判所）を検討。期限は「相続を知った日から3ヶ月」です。' },
              { step: '4ヶ月以内', title: '準確定申告（収入があった場合）', desc: '故人が事業収入・不動産収入等を得ていた場合、相続人が代わりに確定申告を行います。' },
              { step: '10ヶ月以内', title: '相続税申告', desc: '遺産が基礎控除（3,000万円＋600万円×相続人数）を超える場合、相続税の申告・納付が必要です。' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.25rem',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
              }}>
                <div style={{
                  minWidth: '5rem', height: '2.5rem',
                  background: '#374151', color: '#fff',
                  borderRadius: '8px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '0.78rem', flexShrink: 0,
                  padding: '0 0.5rem',
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
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: '#374151', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        {sogiArticles.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
              葬儀・お墓に関する詳細記事
            </h2>
            <div className="article-grid">
              {sogiArticles.map(article => (
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
              <Link href="/category/funeral-grave" style={{
                display: 'inline-block', background: '#374151', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '50px',
                textDecoration: 'none', fontWeight: '600',
              }}>
                葬儀・お墓の記事をすべて見る →
              </Link>
            </div>
          </section>
        )}

        {/* 最終CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            葬儀の事前準備を今すぐ始めましょう
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            急いでいないからこそ、納得のいく葬儀社選びができます。<br />
            無料の資料請求・相談でまずは情報収集から。
          </p>
          <a
            href="https://www.yorisou.jp/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#374151',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            ⛩️ 無料で葬儀を相談・比較する →
          </a>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 資料請求・相談無料</p>
        </section>

      </div>
    </div>
  );
}
