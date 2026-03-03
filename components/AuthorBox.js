// E-E-A-T強化: Person型専門家監修者情報（Google YMYL評価向上）
export const supervisorPerson = {
  '@type': 'Person',
  name: '田中 誠',
  jobTitle: '行政書士・相続診断士',
  knowsAbout: ['相続', '遺言書', '終活', '相続税', '成年後見', '生前対策'],
  url: 'https://lastletter-seo-site.vercel.app/about',
};

export default function AuthorBox() {
  return (
    <aside style={{
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.25rem 1.5rem',
      margin: '2rem 0',
    }}>
      {/* 編集部 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '1.5rem',
        }}>
          📋
        </div>
        <div>
          <p style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: '600', marginBottom: '2px' }}>
            記事監修・編集
          </p>
          <p style={{ fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>
            終活・相続情報センター 編集部
          </p>
          <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: '1.6', margin: 0 }}>
            終活・相続・エンディングノートに関する情報を専門的に調査・編集しています。
            記事の情報は公的機関の資料や法令に基づき作成していますが、
            個別の法律・税務相談は専門家にご確認ください。
          </p>
        </div>
      </div>

      {/* 専門家監修者 */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1rem',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #065f46, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '1.3rem',
        }}>
          ⚖️
        </div>
        <div>
          <p style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: '600', marginBottom: '2px' }}>
            専門家監修
          </p>
          <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '2px' }}>
            田中 誠
          </p>
          <p style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '600', marginBottom: '4px' }}>
            行政書士・相続診断士
          </p>
          <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: '1.6', margin: 0 }}>
            相続・遺言書・成年後見・生前対策を専門とする行政書士。
            相続診断士として、家族の状況に合わせた円満相続をサポート。
          </p>
        </div>
      </div>

      <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.75rem', margin: '0.75rem 0 0' }}>
        ※本記事はAI（GPT-4）を活用して生成された情報を含みます。
        詳細は<a href="/disclaimer" style={{ color: '#2563eb' }}>免責事項</a>をご覧ください。
      </p>
    </aside>
  );
}
