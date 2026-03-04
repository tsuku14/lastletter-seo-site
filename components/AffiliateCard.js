'use client';
// カテゴリ別アフィリエイトCTAコンポーネント
// Amazon アソシエイト StoreID: dream32045hot-22
// 審査中プログラム: みんなの介護(s00000024591001), 終活と相続のまどぐち(s00000025765001),
//   保険見直しラボ(s00000017791001), よりそうお葬式(s00000016461001), 税理士ドットコム(s00000014783001)

// Amazon アソシエイト 直リンク生成ヘルパー
const amazonLink = (keyword) =>
  `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=dream32045hot-22`;

const affiliateData = {
  '相続手続き': {
    title: '相続手続きでお困りですか？',
    description: '弁護士・司法書士への無料相談で、複雑な相続手続きをスムーズに解決できます。',
    items: [
      {
        name: '終活と相続のまどぐち 無料相談',
        description: '相続・終活の専門家が無料でサポート（A8.net提携申請中）',
        url: 'https://souzoku-madoguchi.com/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新
        badge: '無料相談',
        color: '#1a56db',
      },
      {
        name: '相続手続き おすすめ書籍（Amazon）',
        description: 'わかりやすい相続手続きの解説書を確認',
        url: amazonLink('相続手続き 本'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '相続税': {
    title: '相続税の申告・節税対策は専門家へ',
    description: '相続税は期限（10ヶ月）があります。早めの相談が節税につながります。',
    items: [
      {
        name: '税理士ドットコム 相続税申告',
        description: '相続税申告の実績豊富な税理士を即日紹介（A8.net提携申請中）',
        url: 'https://www.zeiri4.com/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新（相続問合せ5,000円）
        badge: '無料紹介',
        color: '#c81e1e',
      },
      {
        name: '相続税 解説書籍（Amazon）',
        description: '相続税の計算・申告をわかりやすく解説',
        url: amazonLink('相続税 申告 本'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '遺言書': {
    title: '遺言書の作成・保管を専門家に相談',
    description: '自筆証書遺言は法務局での保管制度を利用すると安心です。公正証書遺言は公証人が作成を支援します。',
    items: [
      {
        name: '終活と相続のまどぐち 遺言書相談',
        description: '遺言書作成から執行まで専門家がサポート（A8.net提携申請中）',
        url: 'https://souzoku-madoguchi.com/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新
        badge: '専門家相談',
        color: '#1a56db',
      },
      {
        name: '遺言書 書き方ガイド（Amazon）',
        description: '自筆証書・公正証書遺言の書き方を解説',
        url: amazonLink('遺言書 書き方'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '葬儀・お墓': {
    title: '葬儀・お墓のことは事前に備えを',
    description: '事前に葬儀社を比較・相談しておくと、いざという時に慌てずに済みます。',
    items: [
      {
        name: 'よりそうお葬式',
        description: '業界最安水準。全国対応・24時間365日受付（A8.net提携申請中）',
        url: 'https://www.yorisou.jp/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新（資料請求2,000円、確定率95%）
        badge: '最安水準',
        color: '#374151',
      },
      {
        name: '葬儀・お墓 準備ガイド（Amazon）',
        description: '葬儀の流れ・費用・お墓の選び方を解説',
        url: amazonLink('葬儀 準備 本'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  'エンディングノート': {
    title: 'エンディングノートを今すぐ始めよう',
    description: '書き方がわからなくても大丈夫。専用ノートやアプリを活用しましょう。',
    items: [
      {
        name: 'エンディングノート おすすめ書籍',
        description: 'Amazonで人気のエンディングノートを確認',
        url: `https://www.amazon.co.jp/s?k=${encodeURIComponent('エンディングノート')}&tag=dream32045hot-22`,
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '保険・税務': {
    title: '生命保険の見直しで相続対策を',
    description: '死亡保険金の非課税枠（500万円×法定相続人数）を活用した節税策を専門家に相談できます。',
    items: [
      {
        name: '保険見直しラボ 無料FP相談',
        description: '生命保険を無料で見直し・FP相談（A8.net提携申請中）',
        url: 'https://www.hoken-minaoshi.co.jp/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新（無料相談10,000円、確定率59%）
        badge: '無料FP相談',
        color: '#057a55',
      },
      {
        name: '相続と生命保険 解説書籍（Amazon）',
        description: '生命保険を活用した相続対策をわかりやすく解説',
        url: amazonLink('生命保険 相続 節税'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '介護・福祉': {
    title: '老人ホーム・介護施設の無料相談サービス',
    description: '「親の介護どうすればいい？」施設の種類・費用・入居条件を無料で専門家に相談できます。早めの情報収集が、後悔しない施設選びの鍵です。',
    items: [
      {
        name: 'シニアのあんしん相談室 【入居相談無料】',
        description: '全国3,500施設以上から最適な老人ホームを無料でご提案。見学から入居まで一貫サポート',
        url: 'https://www.senshincare.jp/',  // TODO: アフィリエイト承認後URLに更新（成約15,000〜30,000円）
        badge: '🔥 専門家無料相談',
        color: '#dc2626',
      },
      {
        name: 'みんなの介護 施設検索・無料相談',
        description: '介護施設の口コミ・料金・空き状況を比較。全国対応・24時間受付（A8.net提携申請中）',
        url: 'https://www.minkaigo.jp/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新（資料請求2,300円）
        badge: '無料施設紹介',
        color: '#c81e1e',
      },
      {
        name: '介護・老人ホーム 選び方ガイド（Amazon）',
        description: '介護施設の種類・費用・選び方を徹底解説',
        url: amazonLink('老人ホーム 選び方 本'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '生前準備': {
    title: 'もしもの時に備えるLAST LETTER',
    description: '大切な人へのメッセージや、自分の意思を今のうちに残しておきましょう。',
    items: [
      {
        name: 'LAST LETTER 公式サービス',
        description: '終活・エンディングノートの作成支援サービス',
        url: 'https://lastletter.jp',
        badge: '自社サービス',
        color: '#1a56db',
      },
    ],
  },
  '不動産相続': {
    title: '相続した不動産の売却・活用を専門家に相談',
    description: '相続登記の義務化（2024年〜）で手続きが急増。売却・賃貸・そのまま維持の最適解を無料で査定・相談できます。',
    items: [
      {
        name: 'イエウール 不動産一括査定（相続特化）',
        description: '全国1,900社以上に一括査定依頼。相続不動産の最高額での売却をサポート',
        url: 'https://ieul.jp/',  // TODO: A8.net承認後にアフィリエイトURLに更新（査定1件2,000〜5,000円）
        badge: '無料一括査定',
        color: '#d97706',
      },
      {
        name: '相続不動産・空き家 解説書籍（Amazon）',
        description: '相続した実家・空き家の売却・活用・相続放棄を解説',
        url: amazonLink('相続 不動産 売却 本'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  'default': {
    title: '終活・相続のご相談はお気軽に',
    description: '専門家への相談で、不安を解消しましょう。',
    items: [
      {
        name: '弁護士ドットコム 無料相談',
        description: '終活・相続に関する法律相談を無料で',
        url: 'https://www.bengo4.com/',
        badge: '無料相談',
        color: '#1a56db',
      },
    ],
  },
};

export default function AffiliateCard({ category }) {
  const data = affiliateData[category] || affiliateData['default'];

  return (
    <aside style={{
      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
      borderRadius: '16px',
      padding: '1.75rem',
      margin: '2rem 0',
    }}>
      {/* ヘッダー */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.4', flex: 1 }}>
          {data.title}
        </h3>
        <span style={{
          fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)',
          fontWeight: '600', marginLeft: '0.75rem', whiteSpace: 'nowrap',
          background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '20px',
        }}>
          PR・広告
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.25rem', lineHeight: '1.65' }}>
        {data.description}
      </p>
      {/* CTAリスト */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {data.items.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              window.gtag?.('event', 'affiliate_click', {
                event_category: 'affiliate',
                event_label: item.name,
                affiliate_category: category,
                affiliate_service: item.name,
                value: 1,
              });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#ffffff',
              borderRadius: '10px',
              padding: '0.875rem 1.125rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              borderLeft: `4px solid ${item.color}`,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-block',
                  background: item.color,
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  padding: '2px 9px',
                  borderRadius: '20px',
                  letterSpacing: '0.03em',
                }}>
                  {item.badge}
                </span>
                <p style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                  {item.name}
                </p>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>
            <span style={{
              color: item.color,
              fontSize: '1.3rem',
              marginLeft: '0.75rem',
              fontWeight: '700',
              flexShrink: 0,
            }}>›</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
