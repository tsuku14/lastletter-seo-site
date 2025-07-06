'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  // クライアントサイドで記事データを取得
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error('記事の取得に失敗しました:', error)
        // フォールバック: 静的なサンプルデータ
        setArticles([
          {
            slug: '2024-12-01-yuigon-sakusei',
            title: '遺言書の作成方法と注意点',
            category: '遺言書',
            publishDate: '2024-12-01',
            viewCount: 1250,
            content: '遺言書の作成は人生の重要な準備の一つです...'
          },
          {
            slug: '2024-11-30-souzoku-zeikin',
            title: '相続税の基礎知識と計算方法',
            category: '相続',
            publishDate: '2024-11-30',
            viewCount: 980,
            content: '相続税について正しく理解することは...'
          },
          {
            slug: '2024-11-29-ending-note',
            title: 'エンディングノートの書き方完全ガイド',
            category: 'エンディングノート',
            publishDate: '2024-11-29',
            viewCount: 1500,
            content: 'エンディングノートは家族への大切なメッセージです...'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])
  
  const categories = ['all', ...new Set(articles.map(a => a.category))]
  
  // 検索・フィルタリング・ソート処理
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles
    
    // 検索フィルタ
    if (searchQuery.trim()) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // カテゴリフィルタ
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }
    
    // ソート
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category))
        break
      default: // newest
        filtered.sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    }
    
    return filtered
  }, [articles, searchQuery, sortBy, selectedCategory])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#64748b'
      }}>
        記事を読み込み中...
      </div>
    )
  }

  return (
    <div>
      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '4rem 2rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            color: '#1e3a8a',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            終活・相続の総合情報センター
          </h1>
          
          <p style={{ 
            fontSize: '1.3rem', 
            marginBottom: '3rem', 
            lineHeight: '1.7',
            color: '#475569',
            maxWidth: '800px',
            margin: '0 auto 3rem auto'
          }}>
            人生の重要な準備について、専門家による信頼できる情報を分かりやすくお届けします。<br/>
            大切な人のために、今できることから始めませんか。
          </p>

          {/* 検索窓 */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="記事を検索（例：遺言書、相続税、エンディングノート）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1rem',
                fontSize: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '50px',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3730a3'
                e.target.style.boxShadow = '0 4px 20px rgba(55, 48, 163, 0.2)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>
              検索
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a' }}>{articles.length}+</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>専門記事</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a' }}>毎日</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>新規更新</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a' }}>信頼性</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>専門家監修</div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* フィルタ・ソートコントロール */}
        <div style={{
          marginBottom: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            margin: 0,
            color: '#1e3a8a',
            fontWeight: '600'
          }}>
            記事一覧 ({filteredAndSortedArticles.length}件)
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {/* カテゴリフィルタ */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="all">すべてのカテゴリ</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {/* ソート */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="newest">新着順</option>
              <option value="popular">よく読まれている順</option>
              <option value="category">カテゴリ順</option>
            </select>
          </div>
        </div>

        {/* 記事グリッド */}
        {filteredAndSortedArticles.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              {searchQuery ? `「${searchQuery}」に関する記事が見つかりませんでした。` : '記事を準備中です...'}
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredAndSortedArticles.map((article, index) => (
              <Link 
                key={article.slug}
                href={`/articles/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '2rem',
                  height: 'auto',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* 人気記事バッジ */}
                  {sortBy === 'popular' && index < 3 && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      人気{index + 1}位
                    </div>
                  )}
                  
                  {/* カテゴリバッジ */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#1e3a8a',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {article.category}
                  </div>

                  <h3 style={{ 
                    margin: sortBy === 'popular' && index < 3 ? '2rem 5rem 1rem 0' : '0 5rem 1rem 0', 
                    fontSize: '1.3rem',
                    color: '#1e3a8a',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    {article.title}
                  </h3>
                  
                  <div style={{ 
                    color: '#64748b', 
                    fontSize: '0.9rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span>更新: {new Date(article.publishDate).toLocaleDateString('ja-JP')}</span>
                    {sortBy === 'popular' && (
                      <span>閲覧: {article.viewCount.toLocaleString()}回</span>
                    )}
                  </div>
                  
                  <div style={{ 
                    color: '#3730a3',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>続きを読む</span>
                    <span>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* LAST LETTER CTA */}
        <section style={{
          marginTop: '5rem',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            LAST LETTER - 大切な人への最後の手紙
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            もしもの時に、大切な人への連絡を自動化。<br/>
            終活の一環として、今から準備しませんか？
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            生前に登録した連絡先に、自動で訃報をお知らせするサービスです
          </div>
        </section>
      </section>
    </div>
  )
}
