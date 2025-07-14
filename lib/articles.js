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
    
    // tagsからcategoryを推測
    if (!data.category && data.tags && data.tags.length > 0) {
      // タグからカテゴリをマッピング
      const tagToCategoryMap = {
        '成年後見制度': '法的制度',
        '保険': '保険・税務',
        '相続税': '保険・税務',
        'デジタル終活': 'デジタル終活',
        'エンディングノート': 'エンディングノート',
        '永代供養': '葬儀・お墓',
        '葬儀': '葬儀・お墓',
        'お墓': '葬儀・お墓',
        '介護': '介護・福祉',
        '遺言書': '遺言書',
        '遺産分割': '相続手続き',
        '相続': '相続手続き',
        '生前整理': '生前準備',
        '訃報': '訃報・連絡'
      };
      
      // 最初のタグからカテゴリを決定
      for (const tag of data.tags) {
        if (tagToCategoryMap[tag]) {
          data.category = tagToCategoryMap[tag];
          break;
        }
      }
      
      // マッチしない場合はデフォルト
      if (!data.category) {
        data.category = 'その他';
      }
    }
    
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