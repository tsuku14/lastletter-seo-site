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
        const title = fileContents.split('\n')[0].replace('# ', '') || filename.replace('.md', '')
        
        return {
          slug: filename.replace('.md', ''),
          title: title,
          filename: filename
        }
      })
      .sort((a, b) => b.filename.localeCompare(a.filename))
    
    return articles
  } catch (error) {
    return []
  }
}

export default function HomePage() {
  const articles = getArticles()
  
  return (
    <div>
      <h1>終活・相続の総合情報サイト</h1>
      <p>終活、エンディングノート、相続手続きなど、大切な人のための情報を分かりやすく解説します。</p>
      <h2>最新記事</h2>
      
      {articles.length === 0 ? (
        <p>記事がまだありません。</p>
      ) : (
        <div>
          {articles.map(article => (
            <div key={article.slug} style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
              <h3>
                <Link href={`/articles/${article.slug}/`}>
                  {article.title}
                </Link>
              </h3>
              <p>{article.filename}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
