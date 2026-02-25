import EmailCapture from '../../components/EmailCapture';
import Link from 'next/link';

export const metadata = {
  title: '終活チェックリスト（PDF）無料ダウンロード | 終活・相続情報センター',
  description: '終活で必要な手続き50項目をまとめた無料チェックリストPDFを配布中。エンディングノート・相続手続き・遺言書の基本をカバーした実用的な一覧表です。',
  alternates: { canonical: '/download' },
};

export default function DownloadPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* パンくずリスト */}
      <nav style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>ホーム</Link>
        {' > '}
        <span>無料チェックリスト</span>
      </nav>

      {/* メールキャプチャフォーム（フル版） */}
      <EmailCapture variant="full" />

      {/* チェックリストの内容プレビュー */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '1.5rem' }}>
          📋 チェックリストの内容
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              title: '① エンディングノート（10項目）',
              items: ['基本情報・家族連絡先', '財産・資産一覧', '医療・介護の希望', 'デジタルアカウント情報', 'ペットの世話・葬儀の希望'],
            },
            {
              title: '② 相続手続き（15項目）',
              items: ['相続人の確定・戸籍収集', '相続財産の調査', '遺産分割協議書の作成', '相続税申告（10ヶ月以内）', '不動産・金融口座の名義変更'],
            },
            {
              title: '③ 遺言書の準備（10項目）',
              items: ['遺言書の種類を選ぶ', '公正証書遺言の作成', '法務局での保管申請', '遺言執行者の選任', '定期的な見直しと更新'],
            },
            {
              title: '④ 生前準備・その他（15項目）',
              items: ['生前贈与の計画', '生命保険の確認・見直し', '介護・医療費の準備', '葬儀社の事前相談', 'デジタル遺品の整理'],
            },
          ].map((section, i) => (
            <div key={i} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '1.25rem',
              background: '#f9fafb',
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.75rem' }}>
                {section.title}
              </h3>
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem', lineHeight: '1.5' }}>
                    {item}
                  </li>
                ))}
                <li style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  ...他{section.title.match(/\d+/)[0] - section.items.length}項目
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 再度メールキャプチャ */}
      <div style={{ marginTop: '3rem' }}>
        <EmailCapture variant="compact" />
      </div>

      {/* 関連記事へのリンク */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '1rem' }}>
          関連する記事
        </h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { href: '/articles/2025-01-14-shukatu-toha', label: '終活とは？今すぐ始めるべき理由と具体的な始め方' },
            { href: '/articles/2025-01-19-shukatu-note-kakikata', label: 'エンディングノートの書き方・書くべき内容完全ガイド' },
            { href: '/articles/2025-01-20-igonsho-kakikata', label: '遺言書の書き方と種類｜公正証書遺言vs自筆証書遺言' },
            { href: '/articles/2025-01-15-souzokuzei-kakaranai', label: '相続税がかからない財産・控除の一覧' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '0.875rem 1rem',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                color: '#1d4ed8',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              📖 {link.label} →
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
