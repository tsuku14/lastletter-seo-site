import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function getArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    console.log('=== DEBUG: Reading articles directory ===')
    const filenames = fs.readdirSync(articlesDirectory)
    console.log('All files found:', filenames)
    
    const markdownFiles = filenames.filter(filename => filename.endsWith('.md'))
    console.log('Markdown files:', markdownFiles)
    
    const articles = markdownFiles.map(filename => {
      console.log('Processing file:', filename)
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
        console.log('Generated slug:', slug)
        
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
    
    console.log('Final articles array:', articles.map(a => a.slug))
    return articles.sort((a, b) => b.filename.localeCompare(a.filename))
  } catch (error) {
    console.error('Error in getArticles:', error)
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
      
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        最新記事 (デバッグ: {articles.length}記事検出)
      </h2>
      
      {articles.length === 0 ? (
        <p>記事がまだありません。</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {articles.slice(0, 5).map(article => (
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
                ファイル名: {article.filename}<br/>
                Slug: {article.slug}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
