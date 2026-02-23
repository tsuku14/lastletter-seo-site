// カテゴリ別アフィリエイトCTAコンポーネント
// 各リンクはA8.net・もしもアフィリエイト等に登録後、URLを差し替えてください

const affiliateData = {
  '相続手続き': {
    title: '相続手続きでお困りですか？',
    description: '弁護士・司法書士への無料相談で、複雑な相続手続きをスムーズに解決できます。',
    items: [
      {
        name: '弁護士ドットコム 無料法律相談',
        description: '全国の弁護士に今すぐ無料相談',
        url: 'https://www.bengo4.com/',  // アフィリエイトリンクに差し替え
        badge: '無料相談',
        color: '#1a56db',
      },
      {
        name: '相続手続きサポートセンター',
        description: '司法書士が相続登記・遺産整理をサポート',
        url: 'https://lastletter-seo-site.vercel.app/about',
        badge: '専門家対応',
        color: '#057a55',
      },
    ],
  },
  '相続税': {
    title: '相続税の申告・節税対策は専門家へ',
    description: '相続税は期限（10ヶ月）があります。早めの相談が節税につながります。',
    items: [
      {
        name: '相続税専門の税理士を無料紹介',
        description: '相続税申告の実績豊富な税理士を即日紹介',
        url: 'https://www.zeirishi-hoken.co.jp/',  // アフィリエイトリンクに差し替え
        badge: '無料紹介',
        color: '#c81e1e',
      },
      {
        name: '相続税シミュレーター',
        description: '3分で相続税の目安額を無料試算',
        url: 'https://lastletter-seo-site.vercel.app/articles/2025-06-26-相続税-計算方法-基礎控除',
        badge: '無料試算',
        color: '#1a56db',
      },
    ],
  },
  '遺言書': {
    title: '遺言書の作成・保管を専門家に相談',
    description: '自筆証書遺言は法務局での保管制度を利用すると安心です。公正証書遺言は公証人が作成を支援します。',
    items: [
      {
        name: '遺言書作成サービス',
        description: 'オンラインで遺言書の下書きから公証人手続きまでサポート',
        url: 'https://www.legal-matters.jp/',  // アフィリエイトリンクに差し替え
        badge: 'オンライン対応',
        color: '#1a56db',
      },
    ],
  },
  '葬儀・お墓': {
    title: '葬儀・お墓のことは事前に備えを',
    description: '事前に葬儀社を比較・相談しておくと、いざという時に慌てずに済みます。',
    items: [
      {
        name: 'よりそうお葬式',
        description: '業界最安水準。全国対応・24時間365日受付',
        url: 'https://www.yorisou.jp/',  // A8.netアフィリエイトリンクに差し替え
        badge: '最安水準',
        color: '#374151',
      },
      {
        name: '小さなお葬式',
        description: '定額・明朗会計の家族葬・直葬プラン',
        url: 'https://www.osohshiki.jp/',  // アフィリエイトリンクに差し替え
        badge: '定額プラン',
        color: '#1a56db',
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
        url: 'https://www.amazon.co.jp/s?k=エンディングノート',  // Amazonアソシエイトリンクに差し替え
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
        name: '保険スクエアbang!',
        description: '生命保険を無料で一括比較・FP相談',
        url: 'https://www.hokensquare.com/',  // バリューコマースリンクに差し替え
        badge: '無料FP相談',
        color: '#057a55',
      },
    ],
  },
  '介護・福祉': {
    title: '老人ホーム・介護施設の選び方',
    description: '費用や立地、ケアの質など、施設選びは専門家のサポートを受けると安心です。',
    items: [
      {
        name: 'シニアのあんしん相談室',
        description: '老人ホーム・介護施設を無料で紹介・見学手配',
        url: 'https://www.anshin-kaigo.com/',  // A8.netアフィリエイトリンクに差し替え
        badge: '無料紹介',
        color: '#c81e1e',
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
