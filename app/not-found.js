import Link from 'next/link';

export const metadata = {
  title: 'ページが見つかりません | 終活・相続情報センター',
};

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#1e3a8a', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>ページが見つかりません</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        お探しのページは移動・削除されたか、URLが間違っている可能性があります。
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#1e3a8a',
          color: '#fff',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          トップページへ戻る
        </Link>
        <Link href="/articles" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#f3f4f6',
          color: '#1e3a8a',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          記事一覧を見る
        </Link>
      </div>
    </div>
  );
}
