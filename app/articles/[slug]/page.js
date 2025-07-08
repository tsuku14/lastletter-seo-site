import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'articles')

// 記事データを取得する関数
async function getArticleData(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Frontmatterをパース
  const matterResult = matter(fileContents)

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...matterResult.data
  }
}

// 動的なメタデータを生成
export async function generateMetadata({ params }) {
  const article = await getArticleData(params.slug)
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
  }
}

// 静的なパスを生成
export async function generateStaticParams() {
  const filenames = fs.readdirSync(articlesDirectory)
  return filenames.map(filename => ({
    slug: filename.replace(/\.md$/, ''),
  }))
}

// 記事ページコンポーネント
export default async function ArticlePage({ params }) {
  const article = await getArticleData(params.slug)

  // JSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    keywords: article.keywords.join(', '),
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