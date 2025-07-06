import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getArticle(slug) {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    const allFiles = fs.readdirSync(articlesDirectory)
    const mdFiles = allFiles.filter(file => file.endsWith('.md'))
    
    let targetFile = null
    
    targetFile = mdFiles.find(file => file.replace('.md', '') === slug)
    
    if (!targetFile) {
      const decodedSlug = decodeURIComponent(slug)
      targetFile = mdFiles.find(file => file.replace('.md', '') === decodedSlug)
    }
    
    if (!targetFile) {
      targetFile = mdFiles.find(file => 
        file.toLowerCase().includes(slug.toLowerCase()) ||
        slug.toLowerCase().includes(file.replace('.md', '').toLowerCase())
      )
    }
    
    if (!targetFile) return null
    
    const filePath = path.join(articlesDirectory, targetFile)
    const content = fs.readFileSync(filePath, 'utf8')
    
    return { slug, content, filename: targetFile }
  } catch (error) {
    return null
  }
}

function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  try {
    const filenames = fs.readdirSync(articlesDirectory)
    return filenames
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
  } catch (error) {
    return []
  }
}

function generateTableOfContents(content) {
  const lines = content.split('\n')
  const headings = []
  
  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      headings.push({
        level: 2,
        text: line.replace('## ', '').trim(),
        id: `heading-${index}`
      })
    } else if (line.startsWith('### ')) {
      headings.push({
        level: 3,
        text: line.replace('### ', '').trim(),
        id: `heading-${index}`
      })
    }
  })
  
  return headings
}

function estimateReadingTime(content) {
  const wordsPerMinute = 400
  const wordCount = content.length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return minutes
}

function addGlossaryTooltips(text) {
  const glossary = {
    '終活': '人生の終わりに向けた準備活動のこと',
    '相続': '故人の財産や権利義務を相続人が引き継ぐこと',
    'エンディングノート': '自分に万が一のことがあった時に備えて書き残すノート',
    '遺言書': '自分の死後の財産分割などについて書き残した法的文書',
    '遺産分割': '相続財産を相続人間で分配すること',
    '相続税': '相続により取得した財産に課される税金',
    '法定相続人': '法律で定められた相続する権利のある人',
    '遺留分': '法定相続人に保障される最低限の相続分'
  }
  
  let result = text
  Object.entries(glossary).forEach(([term, definition]) => {
    const regex = new RegExp(`(${term})`, 'g')
    result = result.replace(regex, `<span class="glossary-term" title="${definition}" style="border-bottom: 1px dotted #3730a3; cursor: help; color: #3730a3;">$1</span>`)
  })
  
  return result
}

export async function generateStaticParams() {
  try {
    const articlesDirectory = path.join(process.cwd(), 'articles')
    const filenames = fs.readdirSync(articlesDirectory)
    const slugs = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => filename.replace('.md', ''))
    
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const article = getArticle(decodedSlug)
  
  if (!article) return {}
  
  const titleMatch = article.content.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : decodedSlug
  
  const paragraphs = article.content.split('\n').filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('*'))
  const description = paragraphs[0] ? paragraphs[0].substring(0, 160) : `${title}について詳しく解説します。`
  
  return {
    title: `${title} | 終活・相続情報センター`,
    description: description,
    keywords: `${title},終活,相続,エンディングノート,遺言書,LAST LETTER`,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
    },
  }
}

export default function ArticlePage({ params }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const article = getArticle(decodedSlug)
  
  if (!article) notFound()
  
  const allArticles = getAllArticles()
  const currentIndex = allArticles.findIndex(a => a.slug === article.slug)
  const relatedArticles = allArticles
    .filter((_, index) => index !== currentIndex)
    .slice(0, 3)
  
  const tableOfContents = generateTableOfContents(article.content)
  const readingTime = estimateReadingTime(article.content)
  
  const titleMatch = article.content.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : article.slug
  
  const htmlContent = article.content
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('# ')) {
        return `<h1 id="main-title" style="font-size: 2.5rem; color: #1e3a8a; margin: 2rem 0; font-weight: 700; line-height: 1.3;">${line.substring(2)}</h1>`
      } else if (line.startsWith('## ')) {
        return `<h2 id="heading-${index}" style="font-size: 1.8rem; color: #1e3a8a; margin: 2.5rem 0 1rem 0; font-weight: 600; padding-bottom: 0.5rem; border-bottom: 2px solid #e0e7ff;">${line.substring(3)}</h2>`
      } else if (line.startsWith('### ')) {
        return `<h3 id="heading-${index}" style="font-size: 1.4rem; color: #374151; margin: 2rem 0 1rem 0; font-weight: 600;">${line.substring(4)}</h3>`
      } else if (line.startsWith('#### ')) {
        return `<h4 style="font-size: 1.2rem; color: #4b5563; margin: 1.5rem 0 0.5rem 0; font-weight: 600;">${line.substring(5)}</h4>`
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        return `<li style="margin: 0.5rem 0; padding-left: 0.5rem;">${addGlossaryTooltips(line.substring(2))}</li>`
      } else if (line.startsWith('1. ') || /^\d+\. /.test(line)) {
        const number = line.match(/^(\d+)\. (.+)$/);
        if (number) {
          return `<li style="margin: 0.5rem 0; padding-left: 0.5rem;">${addGlossaryTooltips(number[2])}</li>`
        }
      } else if (line.trim() === '') {
        return '<div style="height: 1rem;"></div>'
      } else if (line.trim() === '---') {
        return '<hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />'
      } else if (line.trim().length > 0) {
        return `<p style="margin: 1.2rem 0; line-height: 1.8; color: #374151; font-size: 1.1rem;">${addGlossaryTooltips(line)}</p>`
      }
      return ''
    })
    .join('\n')
  
  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '2rem',
      backgroundColor: '#ffffff'
    }}>
      {/* パンくずナビゲーション */}
      <nav style={{ 
        marginBottom: '2rem',
        fontSize: '0.9rem',
        color: '#6b7280'
      }}>
        <Link href="/" style={{ color: '#3730a3', textDecoration: 'none' }}>
          ホーム
        </Link>
        <span style={{ margin: '0 0.5rem' }}>›</span>
        <span>記事</span>
        <span style={{ margin: '0 0.5rem' }}>›</span>
        <span style={{ color: '#374151' }}>{title}</span>
      </nav>

      {/* 記事メタ情報 */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: '#64748b'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            読了時間: 約{readingTime}分
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            更新日: {new Date().toLocaleDateString('ja-JP')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            カテゴリ: 終活・相続
          </span>
        </div>
      </div>

      {/* 目次 */}
      {tableOfContents.length > 0 && (
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '3rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            color: '#0369a1',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>この記事の内容</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {tableOfContents.map((heading, index) => (
              <li key={index} style={{
                margin: '0.5rem 0',
                paddingLeft: heading.level === 3 ? '1rem' : '0'
              }}>
                <a 
                  href={`#${heading.id}`}
                  style={{
                    color: '#0369a1',
                    textDecoration: 'none',
                    fontSize: heading.level === 2 ? '1rem' : '0.9rem',
                    fontWeight: heading.level === 2 ? '500' : '400'
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 記事本文 */}
      <article style={{ marginBottom: '4rem' }}>
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ lineHeight: '1.8' }}
        />
      </article>

      {/* LAST LETTER CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '16px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          LAST LETTER - 大切な人への最後の手紙
        </h3>
        <p style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.1rem',
          opacity: '0.9',
          lineHeight: '1.6'
        }}>
          もしもの時に、大切な人への連絡を自動化。<br/>
          終活の一環として、今から準備しませんか？
        </p>
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          生前に登録した連絡先に、自動で訃報をお知らせするサービスです
        </div>
      </div>

      {/* 関連記事 */}
      {relatedArticles.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#1e3a8a',
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            関連記事
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {relatedArticles.map(relatedArticle => (
              <Link
                key={relatedArticle.slug}
                href={`/articles/${relatedArticle.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'all 0.2s ease'
                }}>
                  <h4 style={{
                    margin: '0 0 0.5rem 0',
                    color: '#1e3a8a',
                    fontSize: '1rem',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    {relatedArticle.title}
                  </h4>
                  <p style={{
                    margin: 0,
                    color: '#64748b',
                    fontSize: '0.9rem'
                  }}>
                    続きを読む →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* シェア・ナビゲーション */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <Link 
          href="/" 
          style={{ 
            color: '#3730a3',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          ← 記事一覧に戻る
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>シェア:</span>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1da1f2',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            Twitter
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1877f2',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  )
}
