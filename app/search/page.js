import { Suspense } from 'react';
import SearchContent from './SearchContent';

export const metadata = {
  title: '記事を検索 | 終活・相続情報センター',
  description: '終活・相続・エンディングノートに関する記事をキーワードで検索できます。',
  alternates: { canonical: '/search' },
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#1e3a5f' }}>🔍 記事を検索</h1>
        <p style={{ color: '#6b7280' }}>読み込み中...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
