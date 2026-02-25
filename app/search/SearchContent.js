'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(q);
  const [searched, setSearched] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState('');

  useEffect(() => {
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [q]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) return;
    setIsLoading(true);
    setSearched(true);
    setSearchedQuery(searchQuery);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
      const url = new URL(window.location);
      url.searchParams.set('q', query.trim());
      window.history.pushState({}, '', url);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '1.5rem' }}>
        🔍 記事を検索
      </h1>

      {/* 検索フォーム */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="キーワードを入力（例：相続税、遺言書、介護）"
            style={{
              flex: 1,
              padding: '0.875rem 1rem',
              border: '2px solid #1e3a5f',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#1e3a5f',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.875rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            検索
          </button>
        </div>
      </form>

      {/* 結果表示 */}
      {isLoading && (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0' }}>検索中...</p>
      )}

      {!isLoading && searched && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            「{searchedQuery}」に一致する記事が見つかりませんでした。
          </p>
          <p>別のキーワードでお試しください。</p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/articles" style={{
              background: '#1e3a5f', color: '#fff', padding: '0.75rem 2rem',
              borderRadius: '8px', textDecoration: 'none', fontWeight: '600',
            }}>
              全記事一覧を見る →
            </Link>
          </div>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
            「{searchedQuery}」の検索結果：{results.length}件
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  background: '#fff',
                  transition: 'box-shadow 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      background: '#1e3a5f',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      {article.category}
                    </span>
                    <time style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{article.date}</time>
                  </div>
                  <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.5rem', lineHeight: '1.5' }}>
                    {article.title}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                    {article.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!searched && !isLoading && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
            よく検索されるキーワード
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['相続税', '遺言書', 'エンディングノート', '葬儀費用', '介護保険', '相続放棄', '生前整理', '成年後見', '贈与税', '相続登記'].map(keyword => (
              <button
                key={keyword}
                onClick={() => { setQuery(keyword); performSearch(keyword); }}
                style={{
                  background: '#eff6ff',
                  color: '#1e3a5f',
                  border: '1px solid #bfdbfe',
                  borderRadius: '20px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
