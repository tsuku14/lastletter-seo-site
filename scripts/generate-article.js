const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// OpenAI APIキーの確認
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('エラー: OPENAI_API_KEYが設定されていません');
  process.exit(1);
}

// キーワードリスト（より具体的に）
const keywords = [
  { main: '終活 始め方', sub: ['終活とは', '終活 年齢', '終活 チェックリスト'] },
  { main: 'エンディングノート 書き方', sub: ['エンディングノート テンプレート', 'エンディングノート 項目', 'エンディングノート 無料'] },
  { main: '相続手続き 流れ', sub: ['相続手続き 期限', '相続手続き 必要書類', '相続手続き 費用'] },
  { main: '訃報連絡 文例', sub: ['訃報連絡 マナー', '訃報連絡 LINE', '訃報連絡 メール'] },
  { main: '遺言書 書き方', sub: ['遺言書 種類', '遺言書 費用', '遺言書 保管方法'] }
];

// OpenAI API呼び出し関数
async function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは終活・相続の専門家です。SEOに最適化された、読者に価値のある記事を書いてください。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2500,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          if (response.choices && response.choices[0]) {
            resolve(response.choices[0].message.content);
          } else {
            reject(new Error('Invalid response from OpenAI'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 記事生成プロンプト
function createPrompt(keyword) {
  return `
「${keyword.main}」について、以下の構成で2000文字以上の詳細な記事を書いてください。

【記事構成】
1. 導入（読者の悩みに共感）- 200文字
2. ${keyword.main}の基本知識 - 400文字
3. 具体的な方法・手順（箇条書きを含む）- 600文字
4. 注意点やポイント - 400文字
5. よくある質問（3つ）- 300文字
6. まとめ - 100文字

【重要な指示】
- 関連キーワード「${keyword.sub.join('、')}」を自然に含める
- 読者の感情に寄り添う温かい文体
- 具体例を豊富に含める
- 専門用語は分かりやすく解説
- マークダウン形式で出力（見出しは##を使用）
`;
}

// メイン処理
async function generateArticle() {
  const today = new Date();
  const dayIndex = today.getDate() % keywords.length;
  const todayKeyword = keywords[dayIndex];
  
  console.log(`本日のキーワード: ${todayKeyword.main}`);
  console.log('OpenAI APIで記事を生成中...');
  
  try {
    // OpenAI APIで記事生成
    const content = await callOpenAI(createPrompt(todayKeyword));
    
    // articlesフォルダを作成
    const dir = path.join(process.cwd(), 'articles');
    await fs.mkdir(dir, { recursive: true });
    
    // ファイル名を生成
    const filename = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${todayKeyword.main.replace(/\s+/g, '-')}.md`;
    const filepath = path.join(dir, filename);
    
    // フロントマターを追加
    const fullContent = `---
title: "${todayKeyword.main}について知っておくべきこと"
date: "${today.toISOString()}"
keywords: ["${todayKeyword.main}", "${todayKeyword.sub.join('", "')}"]
description: "${todayKeyword.main}について詳しく解説。初心者にも分かりやすく、実践的な情報をお届けします。"
---

${content}`;
    
    // ファイルに保存
    await fs.writeFile(filepath, fullContent);
    
    console.log(`✅ 記事を生成しました: ${filename}`);
    console.log(`文字数: ${content.length}文字`);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

// 実行
generateArticle()
  .then(() => console.log('🎉 完了！'))
  .catch(err => console.error('エラー:', err));
