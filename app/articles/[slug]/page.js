import fs from 'fs'
import path from 'path'
import ClientHomePage from './components/ClientHomePage'

// サーバーサイドでの記事読み込み関数
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
        
        // 記事のカテゴリを推定
        let category = '一般'
        if (title.includes('終活')) category = '終活'
        else if (title.includes('相続') || title.includes('遺産')) category = '相続'
        else if (title.includes('エンディング') || title.includes('ノート')) category = 'エンディングノート'
        else if (title.includes('遺言')) category = '遺言書'
        else if (title.includes('保険') || title.includes('税金')) category = '税務・保険'
        
        // ファイル名から日付を抽出
        const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/)
        const publishDate = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
        
        // 仮の閲覧数（実際はアクセス解析から取得）
        const viewCount = Math.floor(Math.random() * 1000) + 100
        
        return {
          slug: filename.replace('.md', ''),
          title: title,
          filename: filename,
          category: category,
          publishDate: publishDate,
          viewCount: viewCount,
          content: fileContents.substring(0, 500) // 検索用に一部内容を含める
        }
      })
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    
    return articles
  } catch (error) {
    return []
  }
}

export default function HomePage() {
  const articles = getArticles()
  
  return <ClientHomePage articles={articles} />
}
