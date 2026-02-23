import Link from 'next/link';

export default function ArticleCTA() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
      borderRadius: '16px',
      padding: '2rem',
      margin: '2.5rem 0',
      color: '#ffffff',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.8, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
        LAST LETTER 公式サービス
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem', lineHeight: '1.4' }}>
        大切な人へ、想いを遺す準備を
      </h2>
      <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
        エンディングノートの作成、遺言書の準備、家族へのメッセージ。
        LAST LETTERが、あなたの「もしも」に寄り添います。
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href="https://lastletter.jp"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#ffffff',
            color: '#1e3a5f',
            fontWeight: '700',
            padding: '0.75rem 1.75rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'transform 0.2s',
          }}
        >
          LAST LETTERを見る →
        </a>
        <Link
          href="/about"
          style={{
            display: 'inline-block',
            background: 'transparent',
            color: '#ffffff',
            fontWeight: '600',
            padding: '0.75rem 1.75rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            border: '2px solid rgba(255,255,255,0.5)',
          }}
        >
          このサイトについて
        </Link>
      </div>
    </section>
  );
}
