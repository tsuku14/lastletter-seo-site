const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// SEO最適化された終活関連トピックデータベース
const seoTopics = [
  // 【高検索ボリューム】終活の基本
  {
    title: "終活とは？いつから始める？40代・50代・60代の終活チェックリスト",
    keywords: ["終活とは", "終活 いつから", "終活 チェックリスト", "終活 40代", "終活 50代"],
    category: "生前準備",
    searchVolume: "high",
    difficulty: "初級"
  },
  {
    title: "終活ノートの書き方完全ガイド｜無料テンプレート付き【2024年版】",
    keywords: ["終活ノート", "終活ノート 書き方", "終活ノート テンプレート", "終活ノート 無料", "終活ノート ダウンロード"],
    category: "エンディングノート",
    searchVolume: "high",
    difficulty: "初級"
  },
  {
    title: "【2024年最新】終活アプリおすすめ10選｜無料で使える人気アプリ比較",
    keywords: ["終活アプリ", "終活アプリ 無料", "終活アプリ おすすめ", "終活 スマホ", "デジタル終活"],
    category: "デジタル終活",
    searchVolume: "medium",
    difficulty: "初級"
  },
  
  // 【相続・遺言関連】
  {
    title: "公正証書遺言の作成費用はいくら？必要書類と手続きの流れ【2024年版】",
    keywords: ["公正証書遺言", "公正証書遺言 費用", "公正証書遺言 必要書類", "公正証書遺言 手続き", "公正証書遺言 作り方"],
    category: "遺言書",
    searchVolume: "high",
    difficulty: "中級"
  },
  {
    title: "相続税がかからない財産一覧｜非課税枠を最大限活用する方法",
    keywords: ["相続税 かからない", "相続税 非課税", "相続税 いくらから", "相続税 基礎控除", "相続税 計算"],
    category: "相続税",
    searchVolume: "high",
    difficulty: "中級"
  },
  {
    title: "相続手続きの期限一覧表｜3ヶ月・4ヶ月・10ヶ月以内にやること",
    keywords: ["相続手続き 期限", "相続 3ヶ月", "相続 10ヶ月", "相続手続き 一覧", "相続手続き 流れ"],
    category: "相続手続き",
    searchVolume: "high",
    difficulty: "中級"
  },
  
  // 【葬儀・お墓関連】
  {
    title: "家族葬の費用相場は？20万円〜100万円の内訳と安くする方法",
    keywords: ["家族葬 費用", "家族葬 相場", "家族葬 安い", "家族葬とは", "家族葬 メリット"],
    category: "葬儀・お墓",
    searchVolume: "high",
    difficulty: "初級"
  },
  {
    title: "墓じまいの費用と手続き｜離檀料・撤去費用の相場と注意点",
    keywords: ["墓じまい", "墓じまい 費用", "墓じまい 手続き", "離檀料", "墓じまい トラブル"],
    category: "葬儀・お墓",
    searchVolume: "medium",
    difficulty: "中級"
  },
  {
    title: "海洋散骨の費用と法律｜違法にならないための手続きガイド",
    keywords: ["海洋散骨", "海洋散骨 費用", "海洋散骨 違法", "海洋散骨 手続き", "散骨 法律"],
    category: "葬儀・お墓",
    searchVolume: "medium",
    difficulty: "中級"
  },
  
  // 【生前整理・断捨離】
  {
    title: "生前整理はいつから？40代・50代・60代の断捨離チェックリスト",
    keywords: ["生前整理", "生前整理 いつから", "生前整理 やり方", "断捨離 終活", "生前整理 チェックリスト"],
    category: "生前準備",
    searchVolume: "high",
    difficulty: "初級"
  },
  {
    title: "遺品整理業者の選び方｜料金相場と悪徳業者を見分ける5つのポイント",
    keywords: ["遺品整理業者", "遺品整理 費用", "遺品整理 相場", "遺品整理業者 選び方", "遺品整理 トラブル"],
    category: "生前準備",
    searchVolume: "high",
    difficulty: "中級"
  },
  
  // 【医療・介護関連】
  {
    title: "延命治療の意思表示カード｜尊厳死宣言書の書き方と法的効力",
    keywords: ["延命治療 意思表示", "尊厳死宣言書", "延命治療しない", "リビングウィル", "終末期医療"],
    category: "医療・介護",
    searchVolume: "medium",
    difficulty: "中級"
  },
  {
    title: "介護保険の申請方法｜要介護認定の流れと認定基準【2024年版】",
    keywords: ["介護保険 申請", "要介護認定", "介護保険 手続き", "要介護認定 基準", "介護保険 いつから"],
    category: "介護・福祉",
    searchVolume: "high",
    difficulty: "中級"
  },
  
  // 【デジタル遺品】
  {
    title: "デジタル遺品整理の方法｜パスワード管理と引き継ぎ準備リスト",
    keywords: ["デジタル遺品", "デジタル遺品整理", "パスワード 引き継ぎ", "SNS 死後", "デジタル終活"],
    category: "デジタル終活",
    searchVolume: "medium",
    difficulty: "初級"
  },
  {
    title: "故人のスマホのロック解除方法｜iPhone・Android別対処法",
    keywords: ["故人 スマホ ロック解除", "iPhone ロック解除 死亡", "Android ロック解除 故人", "デジタル遺品 パスワード"],
    category: "デジタル終活",
    searchVolume: "medium",
    difficulty: "上級"
  },
  
  // 【地域別・年代別】
  {
    title: "東京都の終活支援サービス一覧｜無料相談窓口と補助金制度",
    keywords: ["終活 東京", "終活支援 東京都", "終活相談 無料", "終活 補助金", "終活セミナー 東京"],
    category: "地域情報",
    searchVolume: "medium",
    difficulty: "初級"
  },
  {
    title: "30代・40代の終活｜若い世代が今やるべき5つの準備",
    keywords: ["終活 30代", "終活 40代", "終活 若い", "終活 独身", "終活 子供がいない"],
    category: "生前準備",
    searchVolume: "medium",
    difficulty: "初級"
  },
  
  // 【費用・お金関連】
  {
    title: "終活にかかる費用総額｜項目別の相場と節約ポイント",
    keywords: ["終活 費用", "終活 お金", "終活 費用 総額", "終活 節約", "終活 予算"],
    category: "生前準備",
    searchVolume: "high",
    difficulty: "初級"
  },
  {
    title: "老後資金2000万円問題の真実｜本当に必要な金額と準備方法",
    keywords: ["老後資金 2000万円", "老後資金 いくら", "老後資金 準備", "老後 お金", "定年後 生活費"],
    category: "保険・税務",
    searchVolume: "high",
    difficulty: "中級"
  },
  
  // 【トレンド・最新情報】
  {
    title: "2024年相続法改正のポイント｜遺産分割のルールはこう変わる",
    keywords: ["相続法改正 2024", "相続法 改正", "相続 新しい法律", "相続ルール 変更", "相続法改正 いつから"],
    category: "法的制度",
    searchVolume: "high",
    difficulty: "上級"
  },
  {
    title: "終活カウンセラーになるには？資格取得方法と仕事内容・年収",
    keywords: ["終活カウンセラー", "終活カウンセラー 資格", "終活カウンセラー なるには", "終活アドバイザー", "終活 仕事"],
    category: "その他",
    searchVolume: "medium",
    difficulty: "中級"
  },
  
  // 【具体的な手続き】
  {
    title: "死亡届の提出期限と書き方｜土日でも提出できる？必要書類一覧",
    keywords: ["死亡届", "死亡届 提出期限", "死亡届 書き方", "死亡届 土日", "死亡届 必要書類"],
    category: "相続手続き",
    searchVolume: "high",
    difficulty: "初級"
  },
  {
    title: "銀行口座の相続手続き｜凍結解除の方法と必要書類【銀行別】",
    keywords: ["銀行口座 相続", "口座凍結 解除", "相続 銀行手続き", "銀行口座 名義変更", "相続 必要書類"],
    category: "相続手続き",
    searchVolume: "high",
    difficulty: "中級"
  },
  
  // 【ペット関連】
  {
    title: "ペットの終活｜飼い主が亡くなった後の準備と信託契約",
    keywords: ["ペット 終活", "ペット信託", "ペット 飼い主 死亡", "ペット 相続", "ペット 遺言"],
    category: "その他",
    searchVolume: "medium",
    difficulty: "中級"
  },
  
  // 【一人暮らし・独身】
  {
    title: "おひとりさまの終活完全ガイド｜身寄りがない人の準備リスト",
    keywords: ["おひとりさま 終活", "一人暮らし 終活", "独身 終活", "身寄りがない", "孤独死対策"],
    category: "生前準備",
    searchVolume: "high",
    difficulty: "中級"
  },
  
  // 【不動産関連】
  {
    title: "実家の相続どうする？空き家にしない3つの選択肢と税金対策",
    keywords: ["実家 相続", "空き家 相続", "実家 処分", "相続 不動産", "実家 売却"],
    category: "相続手続き",
    searchVolume: "high",
    difficulty: "中級"
  }
];

// SEO最適化された記事生成プロンプト
function generateSEOPrompt(topic) {
  return `あなたは終活・相続分野のSEO専門ライターです。以下の条件で、検索エンジン上位表示を狙える高品質な記事を作成してください。

【記事情報】
タイトル: ${topic.title}
メインキーワード: ${topic.keywords[0]}
関連キーワード: ${topic.keywords.slice(1).join(', ')}
カテゴリ: ${topic.category}
検索ボリューム: ${topic.searchVolume}

【SEO最適化の必須要件】

1. **タイトルタグ最適化**
   - メインキーワードを必ず含める
   - 32文字以内で興味を引く
   - 数字や【】を効果的に使用

2. **見出し構造（重要）**
   - H1: タイトルと同じ
   - H2: 5-8個（各見出しに関連キーワードを自然に含める）
   - H3: 必要に応じて2-3個

3. **キーワード密度**
   - メインキーワード: 2-3%
   - 関連キーワード: 各1-2%
   - 自然な文章を保ちながら配置

4. **コンテンツ構成（4000-5000文字）**
   - 導入部: 読者の悩みに共感し、この記事で解決できることを明示（200文字）
   - 本文: 具体的で実用的な情報を論理的に展開
   - まとめ: 要点を箇条書きで整理（300文字）

5. **E-E-A-T対策**
   - Experience（経験）: 実例や体験談を含める
   - Expertise（専門性）: 正確な法律・制度情報を記載
   - Authoritativeness（権威性）: 公的機関の情報を引用
   - Trustworthiness（信頼性）: 最新の情報（2024年）であることを明記

6. **ユーザーエンゲージメント**
   - 目次を冒頭に配置（読者の利便性向上）
   - FAQ形式のセクションを含める
   - チェックリストや表を活用
   - 行動を促すCTAを配置

7. **内部リンク対策**
   - 関連する他の記事への自然なリンクを3-5個含める
   - アンカーテキストは説明的に

8. **構造化データ対応**
   - FAQ、HowTo、記事の構造化データに対応した記述

9. **モバイルファースト**
   - 短い段落（3-4行）
   - 箇条書きを多用
   - 重要な情報は太字で強調

10. **検索意図の完全満足**
    - ユーザーが求める情報を網羅的に提供
    - 次のアクションを明確に提示

【記事の基本構造】

# ${topic.title}

## 目次
- [見出し1]
- [見出し2]
- ...

導入文（200文字程度で読者の悩みに共感）

## メイン見出し1（キーワードを含む）
具体的な内容...

### サブ見出し（必要に応じて）
詳細情報...

## メイン見出し2（関連キーワードを含む）
具体的な内容...

## よくある質問（FAQ）
Q1: 質問内容
A1: 回答内容

## まとめ｜今すぐできる○つのポイント
- ポイント1
- ポイント2
- ...

## LAST LETTERサービスの紹介（自然に）
記事内容に関連して、LAST LETTERサービスがどう役立つかを説明。

【出力形式】
Markdown形式で、SEOに最適化された完全な記事を出力してください。`;
}

// 記事生成とファイル保存
async function generateSEOArticle(topic, index) {
  try {
    console.log(`🚀 SEO記事生成開始 [${index + 1}]: ${topic.title}`);
    
    const prompt = generateSEOPrompt(topic);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "あなたは終活・相続分野のSEO専門ライターです。Google検索で1位を獲得できる、読者に価値を提供する記事を作成します。"
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
    
    // Frontmatterを生成
    const date = new Date();
    date.setDate(date.getDate() + index); // 日付をずらす
    const dateStr = date.toISOString().split('T')[0];
    
    const frontmatter = `---
title: "${topic.title}"
date: "${dateStr}"
category: "${topic.category}"
keywords: [${topic.keywords.map(k => `"${k}"`).join(', ')}]
description: "${topic.title.substring(0, 120)}..."
---

`;

    const content = frontmatter + articleContent;
    const filename = `${dateStr}-seo-${topic.keywords[0].replace(/\s+/g, '-')}.md`;
    const filepath = path.join(process.cwd(), 'articles', filename);
    
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`✅ SEO記事生成完了: ${filename}`);
    
    return { success: true, filename };
    
  } catch (error) {
    console.error(`❌ 記事生成エラー: ${topic.title}`, error.message);
    return { success: false, error: error.message };
  }
}

// メイン実行関数
async function generateSEOArticles() {
  console.log(`🎯 SEO最適化記事の大量生成開始`);
  console.log(`📊 生成予定: ${seoTopics.length}記事`);
  
  const results = [];
  
  // バッチサイズを設定（API制限を考慮）
  const batchSize = 5;
  
  for (let i = 0; i < seoTopics.length; i += batchSize) {
    const batch = seoTopics.slice(i, i + batchSize);
    console.log(`\n📦 バッチ ${Math.floor(i / batchSize) + 1} 処理中...`);
    
    // バッチ内の記事を順次生成
    for (let j = 0; j < batch.length; j++) {
      const result = await generateSEOArticle(batch[j], i + j);
      results.push(result);
      
      // API制限対策
      if (j < batch.length - 1) {
        console.log('⏳ API制限対策で5秒待機...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    // バッチ間の待機
    if (i + batchSize < seoTopics.length) {
      console.log('⏳ 次のバッチまで10秒待機...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  // 結果サマリー
  const successful = results.filter(r => r.success).length;
  console.log('\n📈 SEO記事生成完了サマリー:');
  console.log(`✅ 成功: ${successful}/${seoTopics.length}記事`);
  
  if (successful > 0) {
    console.log('\n🎉 SEO最適化された終活記事の生成が完了しました！');
    console.log('📍 次のステップ:');
    console.log('  1. 生成された記事を確認');
    console.log('  2. サイトマップを更新');
    console.log('  3. Google Search Consoleでインデックス登録');
  }
}

// 実行
if (require.main === module) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ エラー: OPENAI_API_KEYが設定されていません');
    process.exit(1);
  }
  
  generateSEOArticles().catch(error => {
    console.error('❌ 致命的なエラー:', error);
    process.exit(1);
  });
}

module.exports = { generateSEOArticles, seoTopics };