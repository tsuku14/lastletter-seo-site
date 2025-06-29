const fs = require('fs').promises;
const path = require('path');

// OpenAI APIキーの確認
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('エラー: OPENAI_API_KEYが設定されていません');
  process.exit(1);
}

// キーワードリスト
const keywords = [
  '終活とは',
  'エンディングノート 書き方',
  '相続手続き 流れ',
  '訃報連絡 マナー',
  '遺言書 種類'
];

// 今日の記事を選択
const today = new Date();
const dayIndex = today.getDate() % keywords.length;
const todayKeyword = keywords[dayIndex];

console.log(`本日のキーワード: ${todayKeyword}`);
console.log('記事生成を開始します...');

// テスト用の記事生成
async function generateArticle() {
  const article = {
    title: `${todayKeyword}について知っておくべきこと`,
    content: `# ${todayKeyword}について知っておくべきこと\n\nこの記事では${todayKeyword}について詳しく解説します。\n\n## はじめに\n\n${todayKeyword}は重要なテーマです。\n\n## まとめ\n\n以上、${todayKeyword}について解説しました。`,
    date: today.toISOString(),
    keyword: todayKeyword
  };
  
  // articlesフォルダを作成
  const dir = path.join(process.cwd(), 'articles');
  await fs.mkdir(dir, { recursive: true });
  
  // ファイル名を生成
  const filename = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${todayKeyword.replace(/\s+/g, '-')}.md`;
  const filepath = path.join(dir, filename);
  
  // ファイルに保存
  await fs.writeFile(filepath, article.content);
  
  console.log(`記事を生成しました: ${filename}`);
  return article;
}

// 実行
generateArticle()
  .then(() => console.log('完了！'))
  .catch(err => console.error('エラー:', err));
