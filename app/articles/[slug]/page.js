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
    return []
  }
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug)
  
  if (!article) {
    notFound()
  }
  
  const htmlContent = article.content
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
    </article>
  )
}
