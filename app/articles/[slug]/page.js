import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

function getArticle(slug) {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    console.log('Requested slug:', slug)
    
    // すべてのファイルを取得
    const allFiles = fs.readdirSync(articlesDirectory)
    const mdFiles = allFiles.filter(file => file.endsWith('.md'))
    
    console.log('Available md files:', mdFiles)
    
    // 完全一致を探す
    const exactMatch = mdFiles.find(file => file.replace('.md', '') === slug)
    if (exactMatch) {
      const filePath = path.join(articlesDirectory, exactMatch)
      const content = fs.readFileSync(filePath, 'utf8')
      console.log('Found exact match:', exactMatch)
      return { slug, content }
    }
    
    // URLデコードして再試行
    const decodedSlug = decodeURIComponent(slug)
    const decodedMatch = mdFiles.find(file => file.replace('.md', '') === decodedSlug)
    if (decodedMatch) {
      const filePath = path.join(articlesDirectory, decodedMatch)
      const content = fs.readFileSync(filePath, 'utf8')
      console.log('Found decoded match:', decodedMatch)
      return { slug, content }
    }
    
    console.log('No match found for slug:', slug)
    return null
  } catch (error) {
    console.error('Error in getArticle:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const articlesDirectory = path.join(process.cwd(), 'articles')
    const filenames = fs.readdirSync(articlesDirectory)
    const slugs = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => filename.replace('.md', ''))
    
    console.log('Generating static params for slugs:', slugs)
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default function ArticlePage({ params }) {
  console.log('ArticlePage called with params:', params)
  
  const article = getArticle(params.slug)
  
  if (!article) {
    console.log('Article not found, returning 404')
    notFound()
  }
  
  // 簡易Markdownパーサー
  const htmlContent = article.content
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`
      if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
      if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`
      if (line.trim() === '') return '<br>'
      if (line.trim() === '---') return '<hr>'
      return `<p>${line}</p>`
    })
    .join('\n')
  
  return (
    <article>
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
      />
      <hr style={{ margin: '3rem 0' }} />
      <p>
        <a href="/" style={{ color: '#0066cc' }}>← トップページに戻る</a>
      </p>
    </article>
  )
}
