const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function cacheArticles() {
  console.log('Caching articles data...');
  const articlesDirectory = path.join(process.cwd(), 'articles');
  try {
    const filenames = fs.readdirSync(articlesDirectory);
    const articles = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(articlesDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
          slug: filename.replace(/\.md$/, ''),
          frontmatter: data,
          content: content, // 全文もキャッシュに含める
        };
      });

    // キャッシュディレクトリがなければ作成
    const cacheDir = path.join(process.cwd(), '.cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    fs.writeFileSync(
      path.join(cacheDir, 'articles.json'),
      JSON.stringify(articles)
    );
    console.log('Successfully cached articles data to .cache/articles.json');
  } catch (error) {
    console.error('Failed to cache articles data:', error);
    process.exit(1); // エラーがあればビルドを失敗させる
  }
}

cacheArticles();
