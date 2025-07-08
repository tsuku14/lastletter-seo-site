const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 重複記事を削除するためのリスト
const duplicateFilesToDelete = [];

function cacheArticles() {
  console.log('Caching articles data...');
  const articlesDirectory = path.join(process.cwd(), 'articles');
  
  try {
    const filenames = fs.readdirSync(articlesDirectory);
    const uniqueArticles = new Map(); // 重複を排除するためのMap

    filenames
      .filter(filename => filename.endsWith('.md'))
      .forEach(filename => {
        const filePath = path.join(articlesDirectory, filename);
        let fileContents;

        // 強制的にUTF-8として読み込み、BOMなしで書き戻す
        try {
          fileContents = fs.readFileSync(filePath, 'utf8');
          fs.writeFileSync(filePath, fileContents, 'utf8'); // BOMなしUTF-8で上書き
        } catch (encodingError) {
          console.warn(`⚠️  Warning: Could not read/write ${filename} as UTF-8. Skipping for now.`, encodingError.message);
          return; // 読み書きできないファイルはスキップ
        }

        const { data, content } = matter(fileContents);
        const slug = filename.replace(/\.md$/, '');

        // 重複検出ロジック
        // タイトルと日付が同じ記事を重複とみなす
        const key = `${data.title}-${data.date}`;
        if (uniqueArticles.has(key)) {
          const existingArticle = uniqueArticles.get(key);
          // より新しいファイル名（日付が新しい、またはソート順で後）を優先
          if (slug > existingArticle.slug) {
            duplicateFilesToDelete.push(existingArticle.slug + '.md');
            uniqueArticles.set(key, { slug, frontmatter: data, content });
          } else {
            duplicateFilesToDelete.push(filename);
          }
        } else {
          uniqueArticles.set(key, { slug, frontmatter: data, content });
        }
      });

    const articles = Array.from(uniqueArticles.values());

    // キャッシュディレクトリがなければ作成
    const cacheDir = path.join(process.cwd(), '.cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    fs.writeFileSync(
      path.join(cacheDir, 'articles.json'),
      JSON.stringify(articles, null, 2) // 整形して保存
    );
    console.log('Successfully cached articles data to .cache/articles.json');
    console.log(`Detected ${duplicateFilesToDelete.length} duplicate articles for deletion.`);

  } catch (error) {
    console.error('Failed to cache articles data:', error);
    process.exit(1); // エラーがあればビルドを失敗させる
  }
}

cacheArticles();

// 外部から削除リストにアクセスできるようにエクスポート
module.exports = { cacheArticles, duplicateFilesToDelete };