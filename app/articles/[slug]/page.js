import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

// 静的生成を強制
export const dynamic = 'force-static'

function getArticle(slug) {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    console.log('=== ARTICLE DEBUG ===')
    console.log('Requested slug:', slug)
    console.log('Decoded slug:', decodeURIComponent(slug))
    
    // 全ファイルを取得
    const allFiles = fs.readdirSync(articlesDirectory)
    const mdFiles = allFiles.filter(file => file.endsWith('.md'))
    console.log('Available files:', mdFiles)
    
    // 複数のマッチング方法を試行
    const matchingMethods = [
      // 方法1: 完全一致
      (file) => file.replace('.md', '') === slug,
      // 方法2: URLデコード後の一致
      (file) => file.replace('.md', '') === decodeURIComponent(slug),
      // 方法3: エンコード後の一致
      (file) => encodeURIComponent(file.replace('.md', '')) === slug,
      // 方法4: 部分一致
      (file) => file.replace('.md', '').includes(slug.replace(/%20/g, ' ')),
    ]
    
    for (let i = 0; i < matchingMethods.length; i++) {
      const matchingFile = mdFiles.find(matchingMethods[i])
      if (matchingFile) {
        console.log(`Found match using method ${i + 1}:`, matchingFile)
        const filePath = path.join(articlesDirectory, matchingFile)
        const content = fs.readFileSync(filePath, 'utf8')
        return { slug, content, foundFile: matchingFile }
      }
    }
    
    console.log('No matching file found for slug:', slug)
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
    
    console.log('=== STATIC PARAMS DEBUG ===')
    console.log('Generated slugs:', slugs)
    
    return slugs
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  // URLエンコードせずにそのまま返す
  return slugs.map(slug => ({ 
    slug: slug
  }))
}

export async function generateMetadata({ params }) {
  const article = getArticle(params.slug)
  
  if (!article) {
    return {
      title: '記事が見つかりません | 終活・相続の総合情報サイト'
    }
  }
  
  // タイトルを抽出
  const titleMatch = article.content.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : params.slug
  
  return {
    title: `${title} | 終活・相続の総合情報サイト`,
    description: `${title}について詳しく解説します。`,
  }
}

export default function ArticlePage({ params }) {
  console.log('ArticlePage rendering with params:', params)
  
  const article = getArticle(params.slug)
  
  if (!article) {
    console.log('Article not found, showing 404')
    notFound()
  }
  
  console.log('Article found:', article.foundFile)
  
  // マークダウンをHTMLに変換
  const htmlContent = article.content
    .split('\n')
    .map(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith('# ')) {
        return `<h1 style="font-size: 2rem; margin: 2rem 0 1rem 0; color: #333;">${trimmed.substring(2)}</h1>`
      } else if (trimmed.startsWith('## ')) {
        return `<h2 style="font-size: 1.5rem; margin: 1.5rem 0 1rem 0; color: #444;">${trimmed.substring(3)}</h2>`
      } else if (trimmed.startsWith('### ')) {
        return `<h3 style="font-size: 1.25rem; margin: 1rem 0 0.5rem 0; color: #555;">${trimmed.substring(4)}</h3>`
      } else if (trimmed === '') {
        return '<div style="height: 0.5rem;"></div>'
      } else if (trimmed === '---') {
        return '<hr style="margin: 2rem 0; border: none; border-top: 1px solid #eee;">'
      } else if (trimmed.startsWith('*') && trimmed.endsWith('*') && trimmed.length > 2) {
        return `<p style="font-style: italic; color: #666; margin: 0.5rem 0;">${trimmed.slice(1, -1)}</p>`
      } else {
        return `<p style="line-height: 1.8; margin: 1rem 0; color: #333;">${line}</p>`
      }
    })
    .join('\n')
  
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      
      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #eee' }} />
      
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <a 
          href="/" 
          style={{ 
            color: '#0066cc', 
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            border: '1px solid #0066cc',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          ← トップページに戻る
        </a>
      </div>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '8px', 
        fontSize: '0.9rem', 
        color: '#666',
        marginTop: '2rem'
      }}>
        <p>デバッグ情報: ファイル名 = {article.foundFile}</p>
        <p>リクエストされたslug = {params.slug}</p>
      </div>
    </article>
  )
}
