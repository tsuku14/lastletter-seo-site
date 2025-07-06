import Link from 'next/link'

export const metadata = {
  title: '終活・相続の総合情報サイト',
  description: '終活、エンディングノート、相続手続きなど、大切な人のための情報を分かりやすく解説',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ 
        margin: 0, 
        fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
        backgroundColor: '#fafbfc',
        color: '#2c3e50',
        lineHeight: '1.6'
      }}>
        {/* プロフェッショナルヘッダー */}
        <header style={{ 
          backgroundColor: '#1e3a8a', 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
          color: 'white', 
          padding: '0',
          boxShadow: '0 4px 20px rgba(30, 58, 138, 0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: '1.8rem', 
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  cursor: 'pointer'
                }}>
                  終活・相続情報センター
                </h1>
                <p style={{
                  margin: '0.3rem 0 0 0',
                  fontSize: '0.9rem',
                  opacity: '0.9',
                  fontWeight: '300'
                }}>
                  専門家監修による信頼できる情報をお届け
                </p>
              </Link>
            </div>
            <div style={{
              display: 'flex',
              gap: '2rem',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              <span style={{ opacity: '0.9' }}>記事数: 30+</span>
              <span style={{ opacity: '0.9' }}>毎日更新</span>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main style={{ 
          minHeight: 'calc(100vh - 200px)',
          backgroundColor: '#ffffff'
        }}>
          {children}
        </main>

        {/* プロフェッショナルフッター */}
        <footer style={{ 
          backgroundColor: '#374151', 
          color: '#d1d5db', 
          padding: '3rem 2rem 2rem 2rem',
          marginTop: '4rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div>
                <h3 style={{ color: '#f3f4f6', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  サイトの特徴
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>専門家による信頼性の高い情報</li>
                  <li>毎日更新される最新コンテンツ</li>
                  <li>初心者にも分かりやすい解説</li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: '#f3f4f6', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  主要カテゴリ
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>終活の基礎知識</li>
                  <li>相続手続き</li>
                  <li>エンディングノート</li>
                  <li>税務・保険</li>
                </ul>
              </div>
            </div>
            <div style={{
              borderTop: '1px solid #4b5563',
              paddingTop: '2rem',
              fontSize: '0.9rem'
            }}>
              <p style={{ margin: 0, opacity: '0.8' }}>
                © 2024 終活・相続情報センター | 大切な人のための信頼できる情報源
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
