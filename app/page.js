import fs from 'fs'
import path from 'path'
import Link from 'next/link'

function getArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    const filenames = fs.readdirSync(articlesDirectory)
    
    const articles = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(articlesDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const title = fileContents.split('\n')[0].replace('# ', '')
        
        return {
          slug: filename.replace('.md', ''),
          title: title || filename.replace('.md', ''),
          filename: filename
        }
      })
      .reverse() // 新しい記事を上に
    
    return articles
  } catch (error) {
    return []
  }
}

export default function HomePage() {
  const articles = getArticles()
  
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        終活・相続の総合情報サイト
      </h1>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', lineHeight: '1.8' }}>
        終活、エンディングノート、相続手続きなど、
        大切な人のために知っておくべき情報を分かりやすく解説します。
      </p>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>最新記事</h2>
      
      {articles.length === 0 ? (
        <p>記事がまだありません。</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {articles.map(article => (
            <div 
              key={article.slug}
              style={{
                border: '1px solid #ddd',
                padding: '1.5rem',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>
                <Link 
                  href={`/articles/${article.slug}`}
                  style={{ color: '#333', textDecoration: 'none' }}
                >
                  {article.title}
                </Link>
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                {article.filename}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
