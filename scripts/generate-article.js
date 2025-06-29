const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// OpenAI APIキーの確認
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('エラー: OPENAI_API_KEYが設定されていません');
  process.exit(1);
}

console.log('APIキー確認: OK');

// キーワードリスト
const keywords = [
  '終活の始め方',
  'エンディングノートの書き方',
  '相続手続きの流れ',
  '訃報連絡の文例',
  '遺言書の種類と特徴'
];

// OpenAI API呼び出し（シンプル版）
async function callOpenAI(keyword) {
  return new Promise((resolve, reject) => {
const prompt = `「${keyword}」について、日本語で3000文字以上の非常に詳しい解説記事を書いてください。絶対に3000文字以上書いてください。文字数が少ない場合は受け付けません。

以下の構成で、それぞれ必ず指定の文字数以上で書いてください：
1. はじめに（なぜこのテーマが重要か、現代社会での意義）- 400文字以上
2. 基本知識の解説（定義、種類、歴史的背景など）- 700文字以上
3. 具体的な手順や方法（番号付きリストで7つ以上、各項目に具体例を含む）- 1000文字以上
4. よくある間違いや注意点（5つ以上、それぞれ詳しく解説）- 600文字以上
5. 実践的なアドバイス（専門家の視点から）- 400文字以上
6. まとめと今後の展望 - 300文字以上

各セクションで具体的な事例、統計データ、専門家の意見などを含めて、読者に本当に役立つ充実した内容にしてください。`;
    const requestData = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは日本の終活・相続の専門家です。分かりやすく丁寧な日本語で記事を書いてください。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3500
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(requestData)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        try {
          console.log('APIレスポンスステータス:', res.statusCode);
          const parsed = JSON.parse(responseBody);
          
          if (res.statusCode !== 200) {
            console.error('APIエラー:', responseBody);
            reject(new Error(`API Error: ${res.statusCode}`));
            return;
          }
          
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            resolve(parsed.choices[0].message.content);
          } else {
            reject(new Error('予期しないレスポンス形式'));
          }
        } catch (error) {
          console.error('パースエラー:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('リクエストエラー:', error);
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}

// メイン処理
async function generateArticle() {
  const today = new Date();
  const dayIndex = today.getDate() % keywords.length;
  const todayKeyword = keywords[dayIndex];
  
  console.log(`本日のキーワード: ${todayKeyword}`);
  console.log('OpenAI APIを呼び出し中...');
  
  try {
    // OpenAI APIで記事生成
    const articleContent = await callOpenAI(todayKeyword);
    console.log('記事生成成功！文字数:', articleContent.length);
    
    // articlesフォルダを作成
    const dir = path.join(process.cwd(), 'articles');
    await fs.mkdir(dir, { recursive: true });
    
    // ファイル名を生成（日付とキーワード）
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const filename = `${dateStr}-${todayKeyword.replace(/\s+/g, '-')}.md`;
    const filepath = path.join(dir, filename);
    
    // マークダウン形式で保存
    const fullContent = `# ${todayKeyword}

*作成日: ${today.toLocaleDateString('ja-JP')}*

${articleContent}

---
*この記事は自動生成されました。*`;
    
    await fs.writeFile(filepath, fullContent, 'utf8');
    
    console.log(`✅ 記事を保存しました: ${filename}`);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    // エラーでも空のファイルを作成（デバッグ用）
    const dir = path.join(process.cwd(), 'articles');
    await fs.mkdir(dir, { recursive: true });
    const errorFile = path.join(dir, `error-${Date.now()}.txt`);
    await fs.writeFile(errorFile, `Error: ${error.message}\n${error.stack}`, 'utf8');
    process.exit(1);
  }
}

// 実行
generateArticle()
  .then(() => console.log('🎉 完了！'))
  .catch(err => {
    console.error('最終エラー:', err);
    process.exit(1);
  });
