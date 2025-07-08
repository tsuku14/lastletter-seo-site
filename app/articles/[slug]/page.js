import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'articles')

// 記事データを取得する関数
async function getArticleData(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
      slug,
      contentHtml,
      ...matterResult.data
    }
  } catch (error) {
    console.error(`Error reading article data for slug: ${slug}`, error)
    // エラーが発生した場合、ページが見つからないという状態にする
    return null
  }
}

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const article = await getArticleData(params.slug)
  if (!article) {
    return { title: '記事が見つかりません', description: '' }
  }
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
  }
}

// 静的なパスを生成
export async function generateStaticParams() {
  try {
    const filenames = fs.readdirSync(articlesDirectory)
    console.log('Found article files:', filenames) // デバッグログを追加
    return filenames.map(filename => ({
      slug: filename.replace(/\.md$/, ''),
    }))
  } catch (error) {
    console.error('Could not read articles directory:', error)
    return []
  }
}

// 記事ページコンポーネント
export default async function ArticlePage({ params }) {
  const article = await getArticleData(params.slug)

  if (!article) {
    // notFound() を呼び出すと、Next.jsの404ページが表示される
    const { notFound } = require('next/navigation');
    notFound();
  }

  // JSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    keywords: Array.isArray(article.keywords) ? article.keywords.join(', ') : '',
    datePublished: article.date,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'LAST LETTER',
    },
    publisher: {
        '@type': 'Organization',
        name: 'LAST LETTER',
        logo: {
            '@type': 'ImageObject',
            url: 'https://lastletter.jp/logo.png', // 仮のロゴURL
        },
    },
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{article.title}</h1>
      <div>
        <span>公開日: {article.date}</span>
        <span>カテゴリ: {article.category}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </article>
  )
}