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
      const fileContents = fs.readFileSync(filePath, 'utf8').trimStart(); // trimStart: 先頭改行でfrontmatter解析失敗を防ぐ
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
    const fileContents = fs.readFileSync(filePath, 'utf8').trimStart(); // trimStart: 先頭改行でfrontmatter解析失敗を防ぐ
    const { data } = matter(fileContents);
    
    // tagsからcategoryを推測
    if (!data.category && data.tags && data.tags.length > 0) {
      // タグからカテゴリをマッピング（v2: 大幅拡張）
      const tagToCategoryMap = {
        // 介護・福祉（最高単価アフィリエイトカテゴリ: 15,000〜30,000円/成約）
        '介護': '介護・福祉',
        '介護保険': '介護・福祉',
        '介護費用': '介護・福祉',
        '介護施設': '介護・福祉',
        '老人ホーム': '介護・福祉',
        '高齢者施設': '介護・福祉',
        '高齢者': '介護・福祉',
        '認知症': '介護・福祉',
        '訪問介護': '介護・福祉',
        '在宅介護': '介護・福祉',
        // 相続手続き
        '相続': '相続手続き',
        '遺産分割': '相続手続き',
        '遺産分割協議': '相続手続き',
        '遺産分割協議書': '相続手続き',
        '遺留分': '相続手続き',
        '相続放棄': '相続手続き',
        '法定相続': '相続手続き',
        // 相続税
        '相続税': '相続税',
        '税理士': '相続税',
        '申告': '相続税',
        '節税': '相続税',
        // 遺言書
        '遺言書': '遺言書',
        '遺言': '遺言書',
        '公正証書': '遺言書',
        '任意後見': '遺言書',
        // 法的制度
        '成年後見制度': '法的制度',
        '成年後見': '法的制度',
        '死後事務委任契約': '法的制度',
        // 信託制度
        '家族信託': '信託制度',
        '信託': '信託制度',
        // 葬儀・お墓
        '葬儀': '葬儀・お墓',
        'お墓': '葬儀・お墓',
        '永代供養': '葬儀・お墓',
        '供養': '葬儀・お墓',
        '香典返し': '葬儀・お墓',
        '散骨': '葬儀・お墓',
        '墓じまい': '葬儀・お墓',
        '遺品整理': '葬儀・お墓',
        // エンディングノート
        'エンディングノート': 'エンディングノート',
        // デジタル終活
        'デジタル終活': 'デジタル終活',
        'デジタル遺品': 'デジタル終活',
        'SNS': 'デジタル終活',
        // 保険・税務
        '保険': '保険・税務',
        '生命保険': '保険・税務',
        '死亡保険金': '保険・税務',
        '年金': '保険・税務',
        '税金': '保険・税務',
        '医療費控除': '保険・税務',
        // 生前準備
        '生前整理': '生前準備',
        '終活': '生前準備',
        '老後': '生前準備',
        'やることリスト': '生前準備',
        '退職': '生前準備',
        // 訃報・連絡
        '訃報': '訃報・連絡',
        'マナー': '訃報・連絡',
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