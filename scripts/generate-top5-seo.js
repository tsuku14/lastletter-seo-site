const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 最も検索ボリュームの高いトップ5記事
const top5Topics = [
  {
    title: "終活とは？いつから始める？40代・50代・60代の終活チェックリスト",
    keywords: ["終活とは", "終活 いつから", "終活 チェックリスト", "終活 40代", "終活 50代"],
    category: "生前準備",
    description: "終活の意味や始めるタイミング、年代別のチェックリストを詳しく解説。40代・50代・60代それぞれの終活ポイントをわかりやすく紹介します。"
  },
  {
    title: "相続税がかからない財産一覧｜非課税枠を最大限活用する方法",
    keywords: ["相続税 かからない", "相続税 非課税", "相続税 いくらから", "相続税 基礎控除"],
    category: "相続税",
    description: "相続税がかからない財産や非課税枠について詳しく解説。基礎控除の計算方法から、生命保険や不動産を使った節税対策まで網羅的に紹介。"
  },
  {
    title: "相続手続きの期限一覧表｜3ヶ月・4ヶ月・10ヶ月以内にやること",
    keywords: ["相続手続き 期限", "相続 3ヶ月", "相続 10ヶ月", "相続手続き 一覧"],
    category: "相続手続き",
    description: "相続手続きの期限を一覧表でわかりやすく解説。相続放棄の3ヶ月、準確定申告の4ヶ月、相続税申告の10ヶ月など、期限別に必要な手続きを紹介。"
  },
  {
    title: "家族葬の費用相場は？20万円〜100万円の内訳と安くする方法",
    keywords: ["家族葬 費用", "家族葬 相場", "家族葬 安い", "家族葬とは"],
    category: "葬儀・お墓",
    description: "家族葬の費用相場を詳しく解説。20万円から100万円まで幅がある理由と、費用を抑えるポイント、一般葬との違いをわかりやすく説明。"
  },
  {
    title: "生前整理はいつから？40代・50代・60代の断捨離チェックリスト",
    keywords: ["生前整理", "生前整理 いつから", "生前整理 やり方", "断捨離 終活"],
    category: "生前準備",
    description: "生前整理を始めるタイミングと具体的な方法を年代別に解説。40代から始める断捨離のコツと、家族に迷惑をかけない整理術を紹介。"
  }
];

// SEO最適化された記事生成関数
async function generateTopSEOArticle(topic, index) {
  const prompt = `あなたは日本一のSEO専門ライターです。以下の条件で、Google検索1位を獲得できる記事を作成してください。

【記事情報】
タイトル: ${topic.title}
キーワード: ${topic.keywords.join(', ')}
カテゴリ: ${topic.category}

【必須要件】
1. 4000文字以上の充実した内容
2. 検索意図を120%満たす網羅的な情報
3. E-E-A-Tを満たす専門的で信頼できる内容
4. 読みやすく、モバイルフレンドリーな構成
5. 2024年の最新情報を含める

【記事構成】
# ${topic.title}

## 目次

（導入文：200文字で読者の悩みに共感し、この記事で解決できることを明示）

## 各メイン見出し（H2）
- キーワードを自然に含める
- 具体的で実用的な内容
- 表や箇条書きを効果的に使用

## よくある質問（FAQ）
- 5つ以上の質問と回答
- 構造化データ対応

## まとめ
- 要点を箇条書きで整理
- 次のアクションを明確に提示

## 関連情報
- LAST LETTERサービスの自然な紹介

Markdown形式で出力してください。`;

  try {
    console.log(`📝 生成開始: ${topic.title}`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "あなたは終活・相続分野の日本一のSEO専門ライターです。読者に最高の価値を提供し、Google検索で1位を獲得する記事を作成します。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const articleContent = completion.choices[0].message.content;
    
    // 日付生成
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dateStr = date.toISOString().split('T')[0];
    
    // Frontmatter生成
    const frontmatter = `---
title: "${topic.title}"
date: "${dateStr}"
category: "${topic.category}"
keywords: [${topic.keywords.map(k => `"${k}"`).join(', ')}]
description: "${topic.description}"
---

`;

    const content = frontmatter + articleContent;
    const slug = topic.keywords[0].replace(/\s+/g, '-').toLowerCase();
    const filename = `${dateStr}-${slug}.md`;
    const filepath = path.join(process.cwd(), 'articles', filename);
    
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`✅ 完了: ${filename}`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ エラー: ${topic.title}`, error.message);
    return false;
  }
}

// メイン実行
async function main() {
  console.log('🚀 トップ5 SEO記事の生成開始\n');
  
  for (let i = 0; i < top5Topics.length; i++) {
    await generateTopSEOArticle(top5Topics[i], i);
    
    if (i < top5Topics.length - 1) {
      console.log('⏳ 待機中...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log('\n✅ すべての記事生成が完了しました！');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateTopSEOArticle, top5Topics };