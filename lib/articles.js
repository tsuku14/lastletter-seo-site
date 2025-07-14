import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 記事データを取得する関数
export function getArticleData(slug) {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  
  // .md と .mdx の両方を試す
  const extensions = ['.md', '.mdx'];
  
  for (const ext of extensions) {
    const filePath = path.join(articlesDirectory, `${slug}${ext}`);
    
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        frontmatter: data,
        content
      };
    } catch (error) {
      // ファイルが見つからない場合は次の拡張子を試す
      continue;
    }
  }
  
  return null;
}

// すべての記事データを取得する関数
export function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory).filter(file => 
    file.endsWith('.md') || file.endsWith('.mdx')
  );
  
  const articles = filenames.map(filename => {
    const slug = filename.replace(/\.(md|mdx)$/, '');
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      frontmatter: data
    };
  });
  
  // 日付順にソート（新しい順）
  return articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || 0);
    const dateB = new Date(b.frontmatter.date || 0);
    return dateB - dateA;
  });
}

// カテゴリ一覧を取得する関数
export function getAllCategories() {
  const articles = getAllArticles();
  const categories = [...new Set(articles.map(article => article.frontmatter.category).filter(Boolean))];
  return categories.sort();
}