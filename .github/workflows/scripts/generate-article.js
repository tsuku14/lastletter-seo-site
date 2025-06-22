// テスト用の簡単なスクリプト
console.log("記事生成スクリプトが実行されました！");
console.log("日時:", new Date().toLocaleString("ja-JP"));

// テスト記事を作成
const testArticle = {
  title: "終活を始めるベストなタイミングとは",
  content: "これはテスト記事です。",
  date: new Date().toISOString()
};

console.log("生成された記事:", testArticle);
console.log("スクリプト完了！");
