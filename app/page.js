import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function getArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    console.log('=== HOMEPAGE DEBUG ===')
    const filenames = fs.readdirSync(articlesDirectory)
    console.log('All files found:', filenames)
    
    const markdownFiles = filenames.filter(filename => filename.endsWith('.md'))
    console.log('Markdown files:', markdownFiles)
    
    const articles = markdownFiles.map(filename => {
      const filePath = path.join(articlesDirectory, filename)
      
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const lines = fileContents.split('\n')
        let title = filename.replace('.md', '')
        
        // タイトル抽出
        for (let line of lines) {
          if (line.startsWith('# ')) {
            title = line.replace('# ', '').trim()
            break
          }
        }
        
        const slug = filename.replace('.md', '')
        console.log(`Processed: ${filename} -> slug: ${slug}`)
        
        return {
          slug: slug,
          title: title,
          filename: filename
        }
      } catch (error) {
        console.error('Error reading file:', filename, error)
        return null
      }
    }).filter(article => article !== null)
    
    const sortedArticles = articles.sort((a, b) => b.filename.localeCompare(a.filename))
    console.log('Final article slugs:', sortedArticles.map(a => a.slug))
    
    return sortedArticles
  } catch (error) {
    console.error('Error in getArticles:', error)
    return []
  }
}

export default function HomePage() {
  const articles = getArticles()
  
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '2rem',
        color: '#333',
        textAlign: 'center'
      }}>
        終活・相続の総合情報サイト
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        marginBottom: '3rem', 
        lineHeight: '1.8',
        textAlign: 'center',
        color: '#666'
      }}>
        終活、エンディングノート、相続手続きなど、
        大切な人のために知っておくべき情報を分かりやすく解説します。
      </p>
      
      <h2 style={{ 
        fontSize: '2rem', 
        marginBottom: '2rem',
        color: '#333'
      }}>
        最新記事 ({articles.length}記事)
      </h2>
      
      {articles.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p>記事がまだありません。</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {articles.map((article, index) => (
            <div 
              key={article.slug}
              style={{
                border: '1px solid #e0e0e0',
                padding: '2rem',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>
                <Link 
                  href={`/articles/${article.slug}/`}
                  style={{ 
                    color: '#333', 
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  {article.title}
                </Link>
              </h3>
              
              <div style={{ 
                color: '#888', 
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}>
                📝 {article.filename}
              </div>
              
              <Link 
                href={`/articles/${article.slug}/`}
                style={{ 
                  color: '#0066cc',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                記事を読む →
              </Link>
              
              {/* デバッグ情報 */}
              <div style={{
                marginTop: '1rem',
                padding: '0.5rem',
                background: '#f0f0f0',
                borderRadius: '4px',
                fontSize: '0.8rem',
                color: '#666'
              }}>
                Debug: slug = {article.slug}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div style={{
        marginTop: '3rem',
        padding: '1rem',
        background: '#e3f2fd',
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        <h3>🔧 システム情報</h3>
        <p>総記事数: {articles.length}</p>
        <p>最新記事: {articles.length > 0 ? articles[0].filename : 'なし'}</p>
      </div>
    </div>
  )
}
