import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

// 静的生成を完全無効化
export const dynamic = 'force-dynamic'
export const revalidate = 0

// generateStaticParams を削除
// export async function generateStaticParams() { ... } ← これを削除

export default function ArticlePage({ params }) {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  // リアルタイムでファイルを検索
  try {
    const allFiles = fs.readdirSync(articlesDirectory)
    const mdFiles = allFiles.filter(file => file.endsWith('.md'))
    
    // 複数の方法でマッチング
    let targetFile = null
    
    // 方法1: 完全一致
    targetFile = mdFiles.find(file => file.replace('.md', '') === params.slug)
    
    // 方法2: URLデコード
    if (!targetFile) {
      const decodedSlug = decodeURIComponent(params.slug)
      targetFile = mdFiles.find(file => file.replace('.md', '') === decodedSlug)
    }
    
    // 方法3: 部分マッチング
    if (!targetFile) {
      targetFile = mdFiles.find(file => 
        file.toLowerCase().includes(params.slug.toLowerCase()) ||
        params.slug.toLowerCase().includes(file.replace('.md', '').toLowerCase())
      )
    }
    
    if (!targetFile) {
      notFound()
    }
    
    const filePath = path.join(articlesDirectory, targetFile)
    const content = fs.readFileSync(filePath, 'utf8')
    
    const htmlContent = content
      .split('\n')
      .map(line => {
        if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`
        if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`
        if (line.trim() === '') return '<br>'
        return `<p>${line}</p>`
      })
      .join('\n')
    
    return (
      <article>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <hr />
        <p><a href="/">← トップページに戻る</a></p>
        <div style={{ background: '#f0f0f0', padding: '1rem', marginTop: '2rem' }}>
          <p>デバッグ: 使用ファイル = {targetFile}</p>
          <p>リクエストslug = {params.slug}</p>
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
