'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  // 検索の実行
  const performSearch = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
      setShowResults(true);
    } catch (error) {
      console.error('検索エラー:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 入力時の処理（デバウンス付き）
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 既存のタイムアウトをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 新しいタイムアウトを設定（300ms後に検索実行）
    timeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // クリックアウトサイドで結果を非表示
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles['search-box']} ref={searchRef}>
      <div className={styles['search-input-wrapper']}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="記事を検索..."
          className={styles['search-input']}
          aria-label="サイト内検索"
        />
        <svg
          className={styles['search-icon']}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 19L14.65 14.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showResults && (query.length >= 2 || results.length > 0) && (
        <div className={styles['search-results']}>
          {isLoading ? (
            <div className={styles['search-loading']}>検索中...</div>
          ) : results.length > 0 ? (
            <ul className={styles['search-results-list']}>
              {results.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    onClick={() => {
                      setShowResults(false);
                      setQuery('');
                    }}
                  >
                    <div className={styles['search-result-item']}>
                      <div className={styles['search-result-title']}>
                        {article.frontmatter.title}
                      </div>
                      <div className={styles['search-result-meta']}>
                        <span className={styles['search-result-category']}>
                          {article.frontmatter.category}
                        </span>
                        <span className={styles['search-result-date']}>
                          {article.frontmatter.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles['search-no-results']}>
              「{query}」に一致する記事が見つかりませんでした
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;