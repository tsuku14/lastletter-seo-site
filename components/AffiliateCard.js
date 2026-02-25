// カテゴリ別アフィリエイトCTAコンポーネント
// Amazon A8.net アフィリエイトタグ: a8-affi-321840-22 (a8mat: 1ZT775+10WXTU+249K+BWGDT)
// 審査中プログラム: みんなの介護(s00000024591001), 終活と相続のまどぐち(s00000025765001),
//   保険見直しラボ(s00000017791001), よりそうお葬式(s00000016461001), 税理士ドットコム(s00000014783001)

// A8.net Amazon アフィリエイトURL生成ヘルパー
const amazonA8Link = (keyword) =>
  `https://px.a8.net/svt/ejp?a8mat=1ZT775+10WXTU+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D${encodeURIComponent(encodeURIComponent(keyword))}%26tag%3Da8-affi-321840-22`;

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
        url: amazonA8Link('相続手続き 本'),
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
        url: amazonA8Link('相続税 申告 本'),
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
        url: amazonA8Link('遺言書 書き方'),
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
        url: amazonA8Link('葬儀 準備 本'),
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
        url: 'https://px.a8.net/svt/ejp?a8mat=1ZT775+10WXTU+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2582%25A8%25E3%2583%25B3%25E3%2583%2587%25E3%2582%25A3%25E3%2583%25B3%25E3%2582%25B0%25E3%2583%258E%25E3%2583%25BC%25E3%2583%2588%26tag%3Da8-affi-321840-22',
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
        url: amazonA8Link('生命保険 相続 節税'),
        badge: 'Amazon',
        color: '#FF9900',
      },
    ],
  },
  '介護・福祉': {
    title: '老人ホーム・介護施設の選び方',
    description: '費用や立地、ケアの質など、施設選びは専門家のサポートを受けると安心です。',
    items: [
      {
        name: 'みんなの介護 無料相談',
        description: '老人ホーム・介護施設を無料で紹介・見学手配（A8.net提携申請中）',
        url: 'https://www.minkaigo.jp/',  // TODO: 審査承認後、A8.netアフィリエイトURLに更新（資料請求2,300円、確定率83%）
        badge: '無料紹介',
        color: '#c81e1e',
      },
      {
        name: '介護・老人ホーム 選び方ガイド（Amazon）',
        description: '介護施設の種類・費用・選び方を解説',
        url: amazonA8Link('老人ホーム 選び方 本'),
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
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      border: '1px solid #bae6fd',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
    }}>
      <p style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '600' }}>
        PR・広告
      </p>
      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.5rem' }}>
        {data.title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '1rem', lineHeight: '1.6' }}>
        {data.description}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.items.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#ffffff',
              border: `1px solid ${item.color}22`,
              borderLeft: `4px solid ${item.color}`,
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div>
              <span style={{
                display: 'inline-block',
                background: item.color,
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '4px',
                marginBottom: '4px',
              }}>
                {item.badge}
              </span>
              <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                {item.name}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
                {item.description}
              </p>
            </div>
            <span style={{ color: item.color, fontSize: '1.2rem', marginLeft: '0.5rem' }}>→</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
