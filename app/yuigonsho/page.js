import Link from 'next/link';
import { getAllArticles } from '../../lib/articles';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

export const metadata = {
  title: '遺言書の作成・相談｜公正証書遺言・自筆証書遺言の費用と手続きを解説',
  description: '遺言書の種類（自筆証書・公正証書・秘密証書）の費用・要件・確実性を比較。弁護士・司法書士への無料相談で遺言書を確実に作成する方法を紹介します。',
  alternates: { canonical: '/yuigonsho' },
  openGraph: {
    title: '遺言書の作成・相談｜公正証書遺言・自筆証書遺言の費用と手続きを解説',
    description: '遺言書の種類・費用・作成手順を徹底比較。専門家への無料相談で確実に作成。',
    url: `${siteUrl}/yuigonsho`,
    type: 'website',
  },
};

const willComparison = [
  {
    name: '自筆証書遺言',
    cost: '実費のみ（ほぼ無料）',
    requirement: '全文・日付・署名を自書＋押印',
    certainty: '△ 無効リスクあり',
    storage: '自宅保管 or 法務局保管',
    highlight: '費用ゼロ',
    color: '#065f46',
    bg: '#ecfdf5',
  },
  {
    name: '公正証書遺言',
    cost: '3〜10万円程度',
    requirement: '公証人・証人2名が必要',
    certainty: '◎ 最も確実',
    storage: '公証役場で原本保管',
    highlight: '最も確実',
    color: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    name: '秘密証書遺言',
    cost: '1〜3万円程度',
    requirement: '公証人・証人2名が必要',
    certainty: '○ 内容は秘密',
    storage: '自宅保管（封印済み）',
    highlight: '内容秘密',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
];

const faqs = [
  {
    q: '遺言書はどの種類がおすすめですか？',
    a: '財産が多い・家族関係が複雑・確実に実行したい方は「公正証書遺言」が最もおすすめです。公証人が内容を確認するため法的に無効になるリスクがなく、原本が公証役場に保管されるため紛失・改ざんの心配もありません。費用はかかりますが確実性では圧倒的です。',
  },
  {
    q: '自筆証書遺言を法務局に預けると何が違いますか？',
    a: '2020年から始まった「自筆証書遺言書保管制度」を使えば、法務局（遺言書保管所）に保管できます。紛失・改ざん防止になるほか、死後に家庭裁判所での「検認」手続きが不要になります。費用は3,900円（1件）と安価で、法的有効性のチェックも受けられます。',
  },
  {
    q: '遺言書がないと相続はどうなりますか？',
    a: '遺言書がない場合は「法定相続」か「遺産分割協議」になります。法定相続は民法で定められた割合での分割、遺産分割協議は相続人全員の合意が必要です。配偶者・子ども以外への遺贈、内縁のパートナーへの財産移転、特定の財産を特定の人に渡したい場合は遺言書が必須です。',
  },
  {
    q: '遺言書作成に弁護士・司法書士は必要ですか？',
    a: '法律上は必須ではありませんが、専門家への依頼を強くおすすめします。自分で作成すると形式不備で無効になるリスク、相続トラブルを招く表現になるリスクがあります。公正証書遺言なら公証役場への手続きを代行してもらえ、遺言の内容も法的に適切に整えてもらえます。費用は3〜15万円程度（財産規模による）が相場です。',
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

export default function YuigonshoPage() {
  const allArticles = getAllArticles();
  const yuigonshoArticles = allArticles
    .filter(a => a.frontmatter.category === '遺言書')
    .slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
        color: '#fff',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', marginBottom: '1rem' }}>
            ✍️ 遺言書は「早めに」が鉄則
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.4' }}>
            遺言書の作成・相談<br />
            <span style={{ color: '#6ee7b7' }}>専門家に無料相談</span>で確実・安心
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.7' }}>
            公正証書・自筆証書・秘密証書遺言の費用・要件を徹底比較<br />
            弁護士・司法書士への無料相談で家族トラブルを未然に防ぐ
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.bengo4.com/inheritance/"
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
              ✍️ 【無料】弁護士に遺言書を相談 →
            </a>
            <a
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent('遺言書 作成')}&tag=dream32045hot-22`}
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
              📚 遺言書の書き方ガイドブック
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>
            ※相談料無料（PR・広告）
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* 重要性バナー */}
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
            <p style={{ fontWeight: '700', color: '#92400e', margin: '0 0 0.25rem' }}>
              遺言書がないと「意図しない相続」が起きる可能性があります
            </p>
            <p style={{ color: '#78350f', margin: 0, fontSize: '0.9rem' }}>
              内縁のパートナー・お世話になった人への遺贈、特定の財産を特定の人に渡したい場合は
              <strong>遺言書が唯一の方法</strong>です。
            </p>
          </div>
        </div>

        {/* 遺言書3種類比較表 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            遺言書3種類の比較
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#065f46', color: '#fff' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>種類</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>費用</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>要件</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>確実性</th>
                </tr>
              </thead>
              <tbody>
                {willComparison.map((w, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ display: 'block', fontWeight: '700' }}>{w.name}</span>
                      <span style={{ display: 'inline-block', background: w.color, color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>{w.highlight}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#374151' }}>{w.cost}</td>
                    <td style={{ padding: '0.75rem', color: '#374151', fontSize: '0.82rem' }}>{w.requirement}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#065f46' }}>{w.certainty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
            ※費用は財産規模・依頼内容により変動します
          </p>
        </section>

        {/* 中央CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            遺言書の内容・手続きを専門家に無料で相談
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            弁護士・司法書士がオンラインで対応。遺言書の種類選びから<br />
            公正証書遺言の手続きまでサポートします。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.bengo4.com/inheritance/"
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
              ✍️ 弁護士ドットコム（無料相談）
            </a>
            <a
              href="https://www.zeiri4.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#065f46',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              司法書士に相談する
            </a>
          </div>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 初回相談無料</p>
        </section>

        {/* 遺言書作成の4ステップ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
            公正証書遺言の作成ステップ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: 1, title: '財産の洗い出しと相続人の確認', desc: '預金・不動産・保険・有価証券など全財産をリストアップ。法定相続人（配偶者・子など）を確認します。' },
              { step: 2, title: '遺言書の内容を決める', desc: '誰にどの財産を渡すか、遺言執行者は誰にするかを決めます。専門家への相談がこの段階で最も重要です。' },
              { step: 3, title: '公証人に原案を提出', desc: '専門家または自分で原案を作成し、公証役場（公証人）に提出。証人2名の準備も必要です。' },
              { step: 4, title: '公証役場で署名・完成', desc: '公証人が作成した遺言書を確認し、署名押印。原本は公証役場に保管され、謄本を受け取ります。' },
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
                  background: '#065f46', color: '#fff',
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
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: '#065f46', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        {yuigonshoArticles.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e3a5f' }}>
              遺言書に関する詳細記事
            </h2>
            <div className="article-grid">
              {yuigonshoArticles.map(article => (
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
              <Link href="/category/will" style={{
                display: 'inline-block', background: '#065f46', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '50px',
                textDecoration: 'none', fontWeight: '600',
              }}>
                遺言書の記事をすべて見る →
              </Link>
            </div>
          </section>
        )}

        {/* 最終CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            今すぐ遺言書の相談を始めましょう
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            相続は突然やってきます。元気なうちに準備することが<br />
            家族への最大の贈り物です。
          </p>
          <a
            href="https://www.bengo4.com/inheritance/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#065f46',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            ✍️ 無料で遺言書を相談する →
          </a>
          <p style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '1rem' }}>PR・広告 | 初回相談無料</p>
        </section>

      </div>
    </div>
  );
}
