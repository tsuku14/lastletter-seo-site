const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 高品質記事のトピックデータベース
const topics = [
  {
    title: "遺言書作成の完全ガイド",
    keywords: ["遺言書", "作成方法", "公正証書遺言", "自筆証書遺言", "法的効力"],
    category: "遺言書",
    difficulty: "初級"
  },
  {
    title: "相続税の計算と節税対策",
    keywords: ["相続税", "基礎控除", "節税", "税率", "申告期限"],
    category: "相続税",
    difficulty: "中級"
  },
  {
    title: "エンディングノートの書き方と活用法",
    keywords: ["エンディングノート", "書き方", "項目", "家族", "準備"],
    category: "エンディングノート",
    difficulty: "初級"
  },
  {
    title: "相続登記の義務化対応ガイド",
    keywords: ["相続登記", "義務化", "期限", "手続き", "必要書類"],
    category: "相続手続き",
    difficulty: "中級"
  },
  {
    title: "生前整理で家族の負担を軽減する方法",
    keywords: ["生前整理", "断捨離", "家族", "負担軽減", "整理術"],
    category: "生前準備",
    difficulty: "初級"
  },
  {
    title: "成年後見制度の活用方法",
    keywords: ["成年後見", "任意後見", "法定後見", "認知症", "財産管理"],
    category: "法的制度",
    difficulty: "中級"
  },
  {
    title: "死亡保険金の相続税非課税枠活用術",
    keywords: ["死亡保険金", "非課税枠", "相続税対策", "生命保険", "受取人"],
    category: "保険・税務",
    difficulty: "中級"
  },
  {
    title: "家族信託による認知症対策",
    keywords: ["家族信託", "認知症対策", "財産管理", "委託者", "受益者"],
    category: "信託制度",
    difficulty: "上級"
  },
  {
    title: "遺産分割協議書の作成ポイント",
    keywords: ["遺産分割", "協議書", "作成方法", "注意点", "法的効力"],
    category: "相続手続き",
    difficulty: "中級"
  },
  {
    title: "デジタル遺品の整理と対策",
    keywords: ["デジタル遺品", "SNS", "パスワード", "デジタル終活", "アカウント"],
    category: "デジタル終活",
    difficulty: "初級"
  }
];

// 超高品質記事生成プロンプト
function generateEnhancedPrompt(topic) {
  // プロンプトに要約生成の指示を追加
  return `あなたは終活・相続分野の専門家として、以下の条件で高品質な記事を作成してください。

【記事テーマ】
タイトル: ${topic.title}
カテゴリ: ${topic.category}
対象読者: ${topic.difficulty}レベル
重要キーワード: ${topic.keywords.join(', ')}

【記事作成の厳格な条件】

■ 構造と文字数
- 3000-4000文字の専門的で実用的な記事
- 見出し構造: # メインタイトル → ## 大見出し → ### 小見出し
- 最低6つの## 大見出しを含む

■ 専門性・権威性の確保
- 法的根拠や制度の正確な説明を含む
- 具体的な数値、期限、金額を明記
- 最新の法改正情報を反映（2024年基準）
- 「○○法第○条」などの法的根拠を適切に引用
- 統計データや事例を活用

■ 実用性の徹底
- 読者が今すぐ実行できる具体的なステップを提示
- チェックリストや手順を番号付きで明記
- 必要書類や費用の具体的な情報
- 「よくある失敗例」と「成功事例」を含む
- 専門家に相談すべきタイミングを明示

■ 読者エンゲージメント
- 読者の不安や悩みに共感する導入
- 「このような経験はありませんか？」等の問いかけ
- 実際の体験談や事例を交える
- 難しい専門用語には分かりやすい解説を併記

■ SEO最適化
- タイトルにメインキーワードを含む
- 各見出しに関連キーワードを自然に配置
- ロングテールキーワードを意識した文章
- 読者の検索意図に完全に応える内容
- **記事の冒頭で、この記事を読むことで読者が何を得られるかを簡潔にまとめた120文字程度の要約（description）を生成してください。**

■ LAST LETTERサービスとの自然な連携
- 記事内容に関連する場面で、以下のような自然な紹介を1-2箇所に含める：
  「大切な人への連絡方法を事前に準備しておくことも重要です。LAST LETTERのような事前登録サービスを活用すれば、もしもの時に確実に必要な人に連絡が届きます。」
- 終活の一環としてのデジタル準備の重要性を説明
- 家族の負担軽減の文脈で言及

■ 記事の信頼性向上
- 「専門家監修」の視点で執筆
- 免責事項的な注意書きを適切に配置
- 最新情報の確認を促す文言を含む

【出力形式】
- **重要：生成する記事の本文のみを出力してください。Frontmatterはこちらで追加するため、絶対に含めないでください。**
- Markdown形式で出力
- # で始まるメインタイトル
- ## と ### を使った階層的な見出し構造
- 箇条書きには - を使用
- 重要な部分は**太字**で強調

【記事の流れ例】
1. 導入（読者の悩みに共感）
2. 基本的な定義・概要
3. 法的根拠・制度の説明
4. 具体的な手順・方法
5. 注意点・よくある失敗例
6. 専門家のアドバイス・まとめ

それでは、上記の条件を満たす高品質な記事を作成してください。`;
}

// 記事生成とファイル保存
async function generateArticle(topic, dateStr, retryCount = 0) {
  const maxRetries = 3;
  try {
    console.log(`📝 記事生成開始: ${topic.title}`);
    
    const prompt = generateEnhancedPrompt(topic);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは終活・相続分野の専門家です。正確で実用的な情報を、読者に分かりやすく伝える高品質な記事を作成します。法的な正確性と実用性を重視し、読者の不安を解消する内容を心がけてください."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const articleBody = completion.choices[0].message.content;
    
    // 記事の冒頭から要約を抽出（最初の200文字から探すなど、簡易的な方法）
    const description = articleBody.substring(0, 200).replace(/\n/g, ' ').trim();

    // Frontmatterを生成
    const frontmatter = `---
title: "${topic.title}"
date: "${dateStr}"
category: "${topic.category}"
keywords: [${topic.keywords.map(k => `"${k}"`).join(', ')}]
description: "${description.substring(0, 120)}"
---

`;

    const content = frontmatter + articleBody;
    const filename = `${dateStr}-${topic.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}.md`;
    const filepath = path.join(process.cwd(), 'articles', filename);
    
    // 記事の品質チェック
    const wordCount = content.length;
    const headingCount = (content.match(/^##/gm) || []).length;
    
    if (wordCount < 2000) {
      console.log(`⚠️  警告: 記事が短すぎます (${wordCount}文字) - ${topic.title}`);
    }
    
    if (headingCount < 4) {
      console.log(`⚠️  警告: 見出しが少なすぎます (${headingCount}個) - ${topic.title}`);
    }
    
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`✅ 記事生成完了: ${filename} (${wordCount}文字, ${headingCount}見出し)`);
    
    return {
      filename,
      title: topic.title,
      category: topic.category,
      wordCount,
      headingCount
    };
    
  } catch (error) {
    console.error(`❌ 記事生成エラー: ${topic.title}`, error.message);
    
    // APIエラーの種類を判別
    if (error.response?.status === 429) {
      console.log(`⚠️  APIレート制限に達しました。待機してリトライします...`);
      const waitTime = Math.min(30000, 5000 * (retryCount + 1));
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      if (retryCount < maxRetries) {
        return generateArticle(topic, dateStr, retryCount + 1);
      }
    } else if (error.response?.status === 401) {
      console.error(`🔐 認証エラー: OpenAI APIキーが無効または設定されていません`);
      process.exit(1);
    } else if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      console.log(`🌐 ネットワークエラーが発生しました。リトライします...`);
      
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return generateArticle(topic, dateStr, retryCount + 1);
      }
    }
    
    console.error(`リトライ回数の上限に達しました。この記事はスキップされます。`);
    return null;
  }
}

// メイン実行関数
async function generateBatch() {
  const batchSize = parseInt(process.argv[2]) || 10;
  const startDate = new Date(process.argv[3]) || new Date();
  
  // OpenAI APIキーの確認
  if (!process.env.OPENAI_API_KEY) {
    console.error(`❌ エラー: OPENAI_API_KEYが設定されていません`);
    process.exit(1);
  }
  
  // articlesディレクトリの存在確認
  const articlesDir = path.join(process.cwd(), 'articles');
  if (!fs.existsSync(articlesDir)) {
    console.log(`📝 articlesディレクトリを作成します`);
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  console.log(`🚀 高品質記事バッチ生成開始`);
  console.log(`📊 生成数: ${batchSize}記事`);
  console.log(`📅 開始日: ${startDate.toISOString().split('T')[0]}`);
  console.log(`🎯 品質レベル: 専門家監修相当`);
  
  const results = [];
  const selectedTopics = topics.slice(0, batchSize);
  
  for (let i = 0; i < selectedTopics.length; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const result = await generateArticle(selectedTopics[i], dateStr);
    if (result) {
      results.push(result);
    }
    
    // API制限対策の待機時間
    if (i < selectedTopics.length - 1) {
      console.log('⏳ API制限対策で3秒待機...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // 生成結果サマリー
  console.log('\n📈 バッチ生成完了サマリー:');
  console.log(`✅ 成功: ${results.length}/${batchSize}記事`);
  
  if (results.length > 0) {
    const avgWordCount = Math.round(results.reduce((sum, r) => sum + r.wordCount, 0) / results.length);
    const avgHeadings = Math.round(results.reduce((sum, r) => sum + r.headingCount, 0) / results.length);
    
    console.log(`📝 平均文字数: ${avgWordCount}文字`);
    console.log(`📋 平均見出し数: ${avgHeadings}個`);
    
    console.log('\n📚 生成された記事:');
    results.forEach(result => {
      console.log(`  • ${result.title} (${result.category})`);
    });
  }
  
  console.log('\n🎉 高品質記事バッチ生成が完了しました！');
}

// 実行
if (require.main === module) {
  generateBatch().catch(error => {
    console.error(`❌ バッチ生成中に致命的なエラーが発生しました:`, error);
    process.exit(1);
  });
}

module.exports = { generateBatch, generateArticle, topics };
