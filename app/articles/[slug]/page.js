import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

// キャッシュを無効化
export const dynamic = 'force-dynamic'

function getArticle(slug) {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    // URLデコードされたslugも試す
    const possibleFilenames = [
      `${slug}.md`,
      `${decodeURIComponent(slug)}.md`
    ]
    
    console.log('Looking for file with slug:', slug)
    console.log('Possible filenames:', possibleFilenames)
    
    for (let filename of possibleFilenames) {
      const filePath = path.join(articlesDirectory, filename)
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        console.log('Found file:', filename)
        return {
          slug,
          content: fileContents
        }
      } catch (error) {
        console.log('File not found:', filename)
      }
    }
    
    // 全ファイルを検索してマッチするものを探す
    const allFiles = fs.readdirSync(articlesDirectory)
    console.log('All files in directory:', allFiles)
    
    for (let filename of allFiles) {
      if (filename.endsWith('.md')) {
        const fileSlug = filename.replace('.md', '')
        if (fileSlug === slug || encodeURIComponent(fileSlug) === slug || decodeURIComponent(slug) === fileSlug) {
          const filePath = path.join(articlesDirectory, filename)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          console.log('Matched file:', filename)
          return {
            slug,
            content: fileContents
          }
        }
      }
    }
    
    console.error('Article not found for slug:', slug)
    return null
  } catch (error) {
    console.error('Error in getArticle:', error)
    return null
  }
}

function getAllArticleSlugs() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    const filenames = fs.readdirSync(articlesDirectory)
    const slugs = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => filename.replace('.md', ''))
    
    console.log('Generated slugs for static params:', slugs)
    return slugs
  } catch (error) {
    console.error('Error reading articles directory:', error)
    return []
  }
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map(slug => ({ slug: encodeURIComponent(slug) }))
}

// SEO用のメタデータを生成
export async function generateMetadata({ params }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const article = getArticle(decodedSlug)
  
  if (!article) {
    return {}
  }
  
  // タイトルを抽出
  const titleMatch = article.content.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : decodedSlug
  
  // 最初の段落を説明文として使用
  const paragraphs = article.content.split('\n').filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('*'))
  const description = paragraphs[0] ? paragraphs[0].substring(0, 160) : `${title}について詳しく解説します。`
  
  return {
    title: `${title} | 終活・相続の総合情報サイト`,
    description: description,
    keywords: `${title},終活,相続,エンディングノート,遺言書,訃報連絡`,
  }
}

export default function ArticlePage({ params }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const article = getArticle(decodedSlug)
  
  if (!article) {
    console.error('Article not found, calling notFound()')
    notFound()
  }
  
  // 簡易的なMarkdownパーサー
  const htmlContent = article.content
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) {
        return `<h1>${line.substring(2)}</h1>`
      } else if (line.startsWith('## ')) {
        return `<h2>${line.substring(3)}</h2>`
      } else if (line.startsWith('### ')) {
        return `<h3>${line.substring(4)}</h3>`
      } else if (line.startsWith('*') && line.endsWith('*')) {
        return `<p><em>${line.slice(1, -1)}</em></p>`
      } else if (line.trim() === '') {
        return '<br>'
      } else if (line.trim() === '---') {
        return '<hr>'
      } else {
        return `<p>${line}</p>`
      }
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
