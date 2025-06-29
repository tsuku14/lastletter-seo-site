import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

function getArticle(slug) {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  const filePath = path.join(articlesDirectory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return {
      slug,
      content: fileContents
    }
  } catch (error) {
    console.error('Article not found:', slug, error)
    return null
  }
}

function getAllArticleSlugs() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    const filenames = fs.readdirSync(articlesDirectory)
    return filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => filename.replace('.md', ''))
  } catch (error) {
    console.error('Error reading articles directory:', error)
    return []
  }
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  console.log('Generated slugs:', slugs) // デバッグ用
  return slugs.map(slug => ({ slug }))
}

// SEO用のメタデータを生成
export async function generateMetadata({ params }) {
  const article = getArticle(params.slug)
  
  if (!article) {
    return {}
  }
  
  // タイトルを抽出
  const titleMatch = article.content.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : params.slug
  
  // 最初の段落を説明文として使用
  const paragraphs = article.content.split('\n').filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('*'))
  const description = paragraphs[0] ? paragraphs[0].substring(0, 160) : `${title}について詳しく解説します。`
  
  return {
    title: `${title} | 終活・相続の総合情報サイト`,
    description: description,
    keywords: `${title},終活,相続,エンディングノート,遺言書,訃報連絡`,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: `https://lastletter-seo-site.vercel.app/articles/${params.slug}/`,
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
    },
    alternates: {
      canonical: `https://lastletter-seo-site.vercel.app/articles/${params.slug}/`,
    },
  }
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug)
  
  if (!article) {
    notFound()
  }
  
  // 構造化データ用のタイトル抽出
  const titleMatch = article.content.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : params.slug
  
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
  
  // 構造化データ（JSON-LD）
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": {
      "@type": "Organization",
      "name": "LAST LETTER Info"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LAST LETTER Info",
      "url": "https://lastletter-seo-site.vercel.app"
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://lastletter-seo-site.vercel.app/articles/${params.slug}/`
    }
  }
  
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
