const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// OpenAI APIキーの確認
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('エラー: OPENAI_API_KEYが設定されていません');
  process.exit(1);
}

// 30個のキーワードリスト
const keywords = [
  '終活 始め方 初心者',
  'エンディングノート テンプレート 無料',
  '遺言書 自筆証書遺言 書き方',
  '相続税 計算方法 基礎控除',
  '葬儀費用 平均 地域別',
  '墓じまい 手順 費用',
  '生前整理 やり方 チェックリスト',
  'デジタル遺産 管理方法',
  '成年後見制度 手続き 費用',
  '介護保険 申請方法 要介護認定',
  '高齢者施設 種類 選び方',
  '老後資金 必要額 計算',
  '年金 受給額 計算方法',
  '医療費控除 確定申告 必要書類',
  '介護費用 平均 在宅介護',
  '終活カウンセラー 資格 仕事',
  '家族信託 メリット デメリット',
  '任意後見契約 公正証書 費用',
  '死後事務委任契約 内容 費用',
  '永代供養 費用 種類',
  '散骨 海洋散骨 手続き',
  '樹木葬 費用 メリット',
  '遺品整理 業者 選び方',
  '形見分け マナー 時期',
  '香典返し 相場 マナー',
  '喪中はがき 文例 出す時期',
  '相続放棄 手続き 期限',
  '遺産分割協議書 書き方 必要書類',
  '相続登記 義務化 期限',
  '死亡保険金 税金 非課税枠'
];

// OpenAI API呼び出し関数（既存のものと同じ）
async function callOpenAI(keyword) {
  return new Promise((resolve, reject) => {
    const prompt = `「${keyword}」について、日本語で3000文字以上の非常に詳しい解説記事を書いてください。絶対に3000文字以上書いてください。

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
          const parsed = JSON.parse(responseBody);
          
          if (res.statusCode !== 200) {
            console.error('APIエラー:', res.statusCode, responseBody);
            reject(new Error(`API Error: ${res.statusCode}`));
            return;
          }
          
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            resolve(parsed.choices[0].message.content);
          } else {
            reject(new Error('予期しないレスポンス形式'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(requestData);
    req.end();
  });
}

// 遅延関数（API制限対策）
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// メイン処理
async function generateBatchArticles() {
  const articlesDir = path.join(process.cwd(), 'articles');
  await fs.mkdir(articlesDir, { recursive: true });
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    console.log(`\n[${i + 1}/${keywords.length}] 記事生成中: ${keyword}`);
    
    try {
      // OpenAI APIで記事生成
      const articleContent = await callOpenAI(keyword);
      console.log(`✅ 生成成功！文字数: ${articleContent.length}`);
      
      // ファイル名を生成
      const date = new Date();
      date.setDate(date.getDate() - i); // 日付をずらす
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const filename = `${dateStr}-${keyword.replace(/\s+/g, '-')}.md`;
      const filepath = path.join(articlesDir, filename);
      
      // マークダウン形式で保存
      const fullContent = `# ${keyword}

*作成日: ${date.toLocaleDateString('ja-JP')}*

${articleContent}

---
*この記事は自動生成されました。*`;
      
      await fs.writeFile(filepath, fullContent, 'utf8');
      successCount++;
      
      // API制限対策で3秒待機
      console.log('⏳ 3秒待機中...');
      await delay(3000);
      
    } catch (error) {
      console.error(`❌ エラー: ${error.message}`);
      errorCount++;
      
      // エラーでも続行
      await delay(5000); // エラー時は5秒待機
    }
  }
  
  console.log('\n========== 完了 ==========');
  console.log(`✅ 成功: ${successCount}記事`);
  console.log(`❌ 失敗: ${errorCount}記事`);
}

// 実行
generateBatchArticles()
  .then(() => console.log('\n🎉 バッチ処理完了！'))
  .catch(err => console.error('最終エラー:', err));
