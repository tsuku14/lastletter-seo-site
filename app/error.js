'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#dc2626', marginBottom: '1rem' }}>500</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>エラーが発生しました</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        申し訳ありません。ページの読み込み中に問題が発生しました。
        しばらく経ってから再度お試しください。
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#1e3a8a',
            color: '#fff',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          再読み込み
        </button>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#f3f4f6',
          color: '#1e3a8a',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
