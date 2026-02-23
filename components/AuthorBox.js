export default function AuthorBox() {
  return (
    <aside style={{
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.25rem 1.5rem',
      margin: '2rem 0',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    }}>
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
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '6px', margin: '6px 0 0' }}>
          ※本記事はAI（GPT-4）を活用して生成された情報を含みます。
          詳細は<a href="/disclaimer" style={{ color: '#2563eb' }}>免責事項</a>をご覧ください。
        </p>
      </div>
    </aside>
  );
}
