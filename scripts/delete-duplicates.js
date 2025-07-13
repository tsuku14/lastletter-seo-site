const fs = require('fs');
const path = require('path');
const { duplicateFilesToDelete } = require('./cache-articles'); // cache-articles.jsから重複リストをインポート

function deleteDuplicateArticles() {
  console.log('Deleting duplicate articles...');
  const articlesDirectory = path.join(process.cwd(), 'articles');

  if (duplicateFilesToDelete.length === 0) {
    console.log('No duplicate articles to delete.');
    return;
  }

  duplicateFilesToDelete.forEach(filename => {
    const filePath = path.join(articlesDirectory, filename);
    try {
      fs.unlinkSync(filePath);
      console.log(`Successfully deleted: ${filename}`);
    } catch (error) {
      console.error(`Failed to delete ${filename}:`, error);
    }
  });
  console.log('Finished deleting duplicate articles.');
}

deleteDuplicateArticles();
