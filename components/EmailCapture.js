'use client';
// メールリスト登録コンポーネント（終活チェックリスト無料配布）
// Brevo APIキー設定: NEXT_PUBLIC_BREVO_FORM_UID（Brevo管理画面のフォームIDを設定）
// またはサーバーサイドAPI: /api/subscribe を使用

import { useState } from 'react';

export default function EmailCapture({ variant = 'default', placement = 'inline' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage('有効なメールアドレスを入力してください');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('ご登録ありがとうございます！チェックリストをお送りしました。');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.message || '登録に失敗しました。しばらく後にお試しください。');
      }
    } catch {
      setStatus('error');
      setMessage('通信エラーが発生しました。しばらく後にお試しください。');
    }
  };

  // コンパクト版（記事下部・サイドバー用）
  if (variant === 'compact') {
    return (
      <aside style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5986 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        margin: '2rem 0',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>📋</span>
          <div>
            <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>無料プレゼント</p>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: '0.25rem 0' }}>
              終活チェックリスト（PDF）を無料配布中
            </h3>
            <p style={{ fontSize: '0.82rem', opacity: 0.9, margin: 0, lineHeight: '1.5' }}>
              いつか必要になる手続き50項目を1枚にまとめました
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
          }}>
            ✅ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
              required
              style={{
                flex: '1 1 200px',
                padding: '0.6rem 0.875rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: '#f59e0b',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '6px',
                padding: '0.6rem 1.25rem',
                fontWeight: '700',
                fontSize: '0.875rem',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? '送信中...' : '無料で受け取る'}
            </button>
            {status === 'error' && (
              <p style={{ width: '100%', margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#fca5a5' }}>
                ⚠️ {message}
              </p>
            )}
          </form>
        )}
        <p style={{ fontSize: '0.7rem', opacity: 0.6, margin: '0.5rem 0 0', textAlign: 'center' }}>
          スパムメールは送りません。いつでも配信停止できます。
        </p>
      </aside>
    );
  }

  // フル版（ダウンロードページ・専用セクション用）
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
      borderRadius: '16px',
      padding: '2.5rem 2rem',
      margin: '2rem 0',
      color: '#fff',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
      <p style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        無料プレゼント
      </p>
      <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', lineHeight: '1.4' }}>
        終活チェックリスト（PDF）
        <br />
        <span style={{ fontSize: '1.1rem', fontWeight: '400', opacity: 0.9 }}>
          いつか必要になる手続き50項目を1枚で確認
        </span>
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        margin: '1.5rem 0',
        fontSize: '0.875rem',
      }}>
        {['✅ エンディングノートの書き方', '✅ 相続手続きの期限一覧', '✅ 必要書類チェックリスト', '✅ 専門家に相談するタイミング'].map((item) => (
          <span key={item} style={{ color: '#bfdbfe' }}>{item}</span>
        ))}
      </div>

      {status === 'success' ? (
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '12px',
          padding: '1.5rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
          <p style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
            登録が完了しました！
          </p>
          <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>{message}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="お名前（任意）"
            style={{
              padding: '0.875rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#1a1a1a',
              outline: 'none',
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス（必須）"
            required
            style={{
              padding: '0.875rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#1a1a1a',
              outline: 'none',
            }}
          />
          {status === 'error' && (
            <p style={{ color: '#fca5a5', fontSize: '0.875rem', margin: 0 }}>
              ⚠️ {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2rem',
              fontWeight: '800',
              fontSize: '1.05rem',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            {status === 'loading' ? '送信中...' : '📩 無料でチェックリストを受け取る'}
          </button>
        </form>
      )}

      <p style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: '1rem' }}>
        ご入力いただいたメールアドレスは、資料送付および関連情報のお知らせのみに使用します。<br />
        いつでも配信停止できます。スパムメールは一切送りません。
      </p>
    </section>
  );
}
