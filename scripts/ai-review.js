const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// 環境変数から情報を取得
const { OPENAI_API_KEY, GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;
const [owner, repo] = GITHUB_REPOSITORY.split('/');

// レビュー対象のファイルパスをコマンドライン引数から取得
const articlePath = process.argv[2];
if (!articlePath) {
  console.error('Error: No article path provided.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// AIレビューを依頼するプロンプト
function createReviewPrompt(content) {
  return `あなたは、日本の終活・相続分野を専門とする超一流のコンテンツアーキテクト兼校正者です。
以下の記事が、専門性、正確性、信頼性、そして読者の共感という観点から最高品質基準を満たしているか、厳しくレビューしてください。

レビューのポイント：
1.  **ファクトチェック:** 法律、税制、手続きに関する情報（例：控除額、期限、必要書類）は、2024年現在の日本の公式情報（国税庁、法務省など）と一致していますか？間違いがあれば具体的に指摘してください。
2.  **情報の網羅性:** 読者が知るべき重要な情報（例：メリットだけでなくデメリット、注意点）が欠けていませんか？
3.  **文字化け・誤字脱字:** 不自然な日本語や文字化け、誤字脱字はありませんか？
4.  **表現の分かりやすさ:** 専門用語が多すぎませんか？より平易で、読者に寄り添った表現にできる箇所はありますか？

以上の観点から、具体的な改善点を箇条書きで提案してください。問題がなければ「この記事は専門的観点から見て問題ありません。」と評価してください。

---
【レビュー対象の記事】

${content}`;
}

// GitHubにIssueを作成する関数
async function createGithubIssue(title, body) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ title, body, labels: ['AI Review'] }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(`Successfully created issue: ${data.html_url}`);
    } else {
      console.error('Failed to create issue:', data);
    }
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
  }
}

// メインの実行関数
async function main() {
  console.log(`Starting review for: ${articlePath}`);
  
  // APIキーの確認
  if (!OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY is not set');
    process.exit(1);
  }
  
  if (!GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN is not set');
    process.exit(1);
  }
  
  const absolutePath = path.join(process.cwd(), articlePath);

  // 1. ファイル内容の読み込みと文字化けチェック
  let content;
  let encodingCheckResult = '✅ 問題は見つかりませんでした。';
  try {
    content = fs.readFileSync(absolutePath, 'utf8');
    if (content.includes('')) {
      encodingCheckResult = '⚠️ **警告:** ファイル内にUnicode置換文字()が含まれています。文字化けの可能性があります。';
    }
  } catch (error) {
    console.error(`Error reading file: ${articlePath}`, error);
    return;
  }

  // 2. AIによるレビューの実行
  let aiReviewResult;
  let retryCount = 0;
  const maxRetries = 3;
  
  while (retryCount < maxRetries) {
    try {
      const prompt = createReviewPrompt(content);
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      });
      aiReviewResult = completion.choices[0].message.content;
      break;
    } catch (error) {
      console.error(`AI review error (attempt ${retryCount + 1}/${maxRetries}):`, error.message);
      
      if (error.response?.status === 429) {
        console.log('⚠️  Rate limit reached. Waiting before retry...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      } else if (error.response?.status === 401) {
        console.error('🔐 Authentication error: Invalid OpenAI API key');
        process.exit(1);
      }
      
      retryCount++;
      if (retryCount >= maxRetries) {
        aiReviewResult = `AIによるレビュー中にエラーが発生しました。\n\nエラー詳細: ${error.message}`;
      }
    }
  }

  // 3. GitHub Issueの作成
  const issueTitle = `AI Review for: ${path.basename(articlePath)}`;
  const issueBody = `## 📝 AIによる自動品質レビュー

レビュー対象ファイル: `${articlePath}`

---

### 1. 文字化けチェック

${encodingCheckResult}

---

### 2. AIによる専門的レビュー

${aiReviewResult}
`;

  await createGithubIssue(issueTitle, issueBody);
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
