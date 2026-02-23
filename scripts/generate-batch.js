const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 高品質記事のトピックデータベース（100トピック）
const topics = [
  // ── 遺言書（10件）──
  { title: "遺言書作成の完全ガイド", keywords: ["遺言書", "作成方法", "公正証書遺言", "自筆証書遺言", "法的効力"], category: "遺言書", difficulty: "初級" },
  { title: "公正証書遺言と自筆証書遺言の違い・選び方", keywords: ["公正証書遺言", "自筆証書遺言", "違い", "選び方", "メリット"], category: "遺言書", difficulty: "初級" },
  { title: "遺言書の書き方ルールと無効になるケース", keywords: ["遺言書 書き方", "無効", "ルール", "日付", "署名"], category: "遺言書", difficulty: "初級" },
  { title: "遺言書の検認手続きと流れ", keywords: ["遺言書 検認", "家庭裁判所", "手続き", "流れ", "費用"], category: "遺言書", difficulty: "中級" },
  { title: "遺言書で財産を特定の人に残す方法", keywords: ["遺言書 財産", "特定遺贈", "受遺者", "指定", "方法"], category: "遺言書", difficulty: "中級" },
  { title: "遺留分とは？遺留分侵害額請求の手続き", keywords: ["遺留分", "遺留分侵害額請求", "計算方法", "請求期限", "相続人"], category: "遺言書", difficulty: "中級" },
  { title: "遺言執行者の役割と選び方", keywords: ["遺言執行者", "役割", "選び方", "弁護士", "報酬"], category: "遺言書", difficulty: "中級" },
  { title: "遺言書の保管方法と法務局への預け方", keywords: ["遺言書 保管", "法務局", "自筆証書遺言保管制度", "費用", "手続き"], category: "遺言書", difficulty: "初級" },
  { title: "遺言書がない場合の相続の進め方", keywords: ["遺言書なし", "法定相続", "遺産分割", "相続人", "協議"], category: "遺言書", difficulty: "初級" },
  { title: "エンディングノートと遺言書の違いと使い分け", keywords: ["エンディングノート", "遺言書", "違い", "法的効力", "使い分け"], category: "遺言書", difficulty: "初級" },

  // ── 相続税（10件）──
  { title: "相続税の計算と節税対策", keywords: ["相続税", "基礎控除", "節税", "税率", "申告期限"], category: "相続税", difficulty: "中級" },
  { title: "相続税の基礎控除をわかりやすく解説", keywords: ["相続税 基礎控除", "3000万円", "600万円", "法定相続人", "計算方法"], category: "相続税", difficulty: "初級" },
  { title: "相続税がかかる財産・かからない財産の一覧", keywords: ["相続税 かかる財産", "非課税財産", "生命保険", "墓地", "仏壇"], category: "相続税", difficulty: "初級" },
  { title: "相続税の申告期限と延滞した場合のペナルティ", keywords: ["相続税 申告期限", "10ヶ月", "延滞税", "加算税", "ペナルティ"], category: "相続税", difficulty: "中級" },
  { title: "配偶者控除で相続税を大幅に減らす方法", keywords: ["配偶者控除", "1億6000万円", "配偶者の税額軽減", "相続税", "節税"], category: "相続税", difficulty: "中級" },
  { title: "小規模宅地等の特例で土地の相続税を80%減額する", keywords: ["小規模宅地等の特例", "80%減額", "居住用宅地", "事業用宅地", "適用要件"], category: "相続税", difficulty: "上級" },
  { title: "相続税の税率表と速算表の使い方", keywords: ["相続税 税率", "速算表", "累進課税", "計算方法", "控除額"], category: "相続税", difficulty: "中級" },
  { title: "生前贈与で相続税を節税する方法と注意点", keywords: ["生前贈与", "相続税 節税", "暦年贈与", "贈与税", "7年加算"], category: "相続税", difficulty: "中級" },
  { title: "相続税の物納・延納制度の使い方", keywords: ["物納", "延納", "相続税 納付", "不動産", "分割払い"], category: "相続税", difficulty: "上級" },
  { title: "二次相続まで考えた相続税の節税対策", keywords: ["二次相続", "相続税 節税", "配偶者", "子ども", "対策"], category: "相続税", difficulty: "上級" },

  // ── 相続手続き（10件）──
  { title: "相続登記の義務化対応ガイド", keywords: ["相続登記", "義務化", "期限", "手続き", "必要書類"], category: "相続手続き", difficulty: "中級" },
  { title: "相続手続きの全体スケジュールと期限一覧", keywords: ["相続手続き", "スケジュール", "期限", "流れ", "チェックリスト"], category: "相続手続き", difficulty: "初級" },
  { title: "相続放棄の手続きと3ヶ月の期限", keywords: ["相続放棄", "3ヶ月", "家庭裁判所", "手続き", "借金"], category: "相続手続き", difficulty: "中級" },
  { title: "遺産分割協議書の作成ポイント", keywords: ["遺産分割", "協議書", "作成方法", "注意点", "法的効力"], category: "相続手続き", difficulty: "中級" },
  { title: "銀行口座の相続手続き・凍結解除の方法", keywords: ["相続 銀行口座", "凍結解除", "手続き", "必要書類", "残高"], category: "相続手続き", difficulty: "初級" },
  { title: "不動産の相続登記を自分でする方法", keywords: ["相続登記 自分で", "法務局", "申請書", "費用", "必要書類"], category: "相続手続き", difficulty: "中級" },
  { title: "限定承認とは？メリット・デメリットと手続き", keywords: ["限定承認", "メリット", "デメリット", "手続き", "借金"], category: "相続手続き", difficulty: "上級" },
  { title: "相続人が行方不明の場合の対処法", keywords: ["相続人 行方不明", "不在者財産管理人", "失踪宣告", "手続き", "対処法"], category: "相続手続き", difficulty: "上級" },
  { title: "株式・投資信託の相続手続き完全ガイド", keywords: ["株式 相続", "投資信託 相続", "名義変更", "証券会社", "手続き"], category: "相続手続き", difficulty: "中級" },
  { title: "農地・山林を相続した場合の手続きと注意点", keywords: ["農地 相続", "山林 相続", "農業委員会", "許可", "手続き"], category: "相続手続き", difficulty: "上級" },

  // ── エンディングノート（8件）──
  { title: "エンディングノートの書き方と活用法", keywords: ["エンディングノート", "書き方", "項目", "家族", "準備"], category: "エンディングノート", difficulty: "初級" },
  { title: "エンディングノートに書くべき項目チェックリスト", keywords: ["エンディングノート 項目", "チェックリスト", "書くべきこと", "財産", "医療"], category: "エンディングノート", difficulty: "初級" },
  { title: "おすすめエンディングノートの選び方と比較", keywords: ["エンディングノート おすすめ", "選び方", "比較", "種類", "無料"], category: "エンディングノート", difficulty: "初級" },
  { title: "デジタルエンディングノートのメリットと使い方", keywords: ["デジタルエンディングノート", "アプリ", "メリット", "使い方", "おすすめ"], category: "エンディングノート", difficulty: "初級" },
  { title: "エンディングノートに医療・介護の希望を書く方法", keywords: ["エンディングノート 医療", "延命治療", "介護", "希望", "書き方"], category: "エンディングノート", difficulty: "初級" },
  { title: "エンディングノートと遺言書の違いをわかりやすく解説", keywords: ["エンディングノート 遺言書 違い", "法的効力", "使い分け", "どちらが必要"], category: "エンディングノート", difficulty: "初級" },
  { title: "親にエンディングノートを書いてもらう伝え方", keywords: ["親 エンディングノート", "伝え方", "書いてもらう", "切り出し方", "コツ"], category: "エンディングノート", difficulty: "初級" },
  { title: "エンディングノートの保管場所と家族への伝え方", keywords: ["エンディングノート 保管場所", "家族に伝える", "どこに置く", "見つけやすい"], category: "エンディングノート", difficulty: "初級" },

  // ── 生前準備（8件）──
  { title: "生前整理で家族の負担を軽減する方法", keywords: ["生前整理", "断捨離", "家族", "負担軽減", "整理術"], category: "生前準備", difficulty: "初級" },
  { title: "40代・50代からの終活チェックリスト", keywords: ["終活 40代", "終活 50代", "チェックリスト", "始め方", "いつから"], category: "生前準備", difficulty: "初級" },
  { title: "60代・70代の終活でやること優先順位", keywords: ["終活 60代", "終活 70代", "やること", "優先順位", "老後準備"], category: "生前準備", difficulty: "初級" },
  { title: "生前贈与のタイミングと正しい手続き", keywords: ["生前贈与 タイミング", "贈与税 非課税", "手続き", "暦年贈与", "教育資金"], category: "生前準備", difficulty: "中級" },
  { title: "墓じまいの手続きと費用・トラブル回避法", keywords: ["墓じまい", "手続き", "費用", "トラブル", "改葬許可"], category: "生前準備", difficulty: "中級" },
  { title: "終活で決めておくべき葬儀の希望と伝え方", keywords: ["終活 葬儀", "生前予約", "希望", "伝え方", "家族"], category: "生前準備", difficulty: "初級" },
  { title: "老後の住まいをどう決める？施設・自宅のメリット比較", keywords: ["老後 住まい", "施設入居", "自宅", "メリット", "費用比較"], category: "生前準備", difficulty: "初級" },
  { title: "生命保険の見直し・整理で老後に備える", keywords: ["生命保険 見直し", "老後", "整理", "解約", "終活"], category: "生前準備", difficulty: "初級" },

  // ── 法的制度（8件）──
  { title: "成年後見制度の活用方法", keywords: ["成年後見", "任意後見", "法定後見", "認知症", "財産管理"], category: "法的制度", difficulty: "中級" },
  { title: "任意後見契約の締結方法と費用", keywords: ["任意後見契約", "締結方法", "費用", "公証役場", "手続き"], category: "法的制度", difficulty: "中級" },
  { title: "法定後見制度の種類と申立て手続き", keywords: ["法定後見", "補助", "保佐", "後見", "申立て"], category: "法的制度", difficulty: "上級" },
  { title: "死後事務委任契約とは？内容と締結方法", keywords: ["死後事務委任契約", "内容", "締結", "費用", "死後手続き"], category: "法的制度", difficulty: "中級" },
  { title: "尊厳死宣言書（リビングウィル）の作成方法", keywords: ["尊厳死宣言書", "リビングウィル", "作成方法", "延命治療拒否", "効力"], category: "法的制度", difficulty: "中級" },
  { title: "相続人調査と戸籍謄本の集め方", keywords: ["相続人調査", "戸籍謄本", "集め方", "法定相続情報", "手続き"], category: "法的制度", difficulty: "中級" },
  { title: "法定相続分とは？相続人ごとの取り分を解説", keywords: ["法定相続分", "相続人", "取り分", "配偶者", "子ども"], category: "法的制度", difficulty: "初級" },
  { title: "特別受益と寄与分で相続分はどう変わる？", keywords: ["特別受益", "寄与分", "相続分", "計算", "調整"], category: "法的制度", difficulty: "上級" },

  // ── 保険・税務（8件）──
  { title: "死亡保険金の相続税非課税枠活用術", keywords: ["死亡保険金", "非課税枠", "相続税対策", "生命保険", "受取人"], category: "保険・税務", difficulty: "中級" },
  { title: "生命保険を使った相続税対策の基本", keywords: ["生命保険 相続税対策", "非課税枠", "活用方法", "加入のポイント", "節税"], category: "保険・税務", difficulty: "中級" },
  { title: "医療保険・介護保険と公的保険の違い", keywords: ["医療保険", "介護保険", "公的保険", "違い", "民間保険"], category: "保険・税務", difficulty: "初級" },
  { title: "相続した不動産の売却と税金の注意点", keywords: ["相続 不動産 売却", "譲渡所得税", "取得費", "特別控除", "注意点"], category: "保険・税務", difficulty: "中級" },
  { title: "死亡退職金の相続税と手続き", keywords: ["死亡退職金", "相続税", "非課税枠", "手続き", "受取人"], category: "保険・税務", difficulty: "中級" },
  { title: "相続税の税務調査と対策", keywords: ["相続税 税務調査", "対策", "調査される割合", "注意点", "申告"], category: "保険・税務", difficulty: "上級" },
  { title: "準確定申告とは？被相続人の所得税申告方法", keywords: ["準確定申告", "被相続人", "所得税", "申告方法", "期限"], category: "保険・税務", difficulty: "中級" },
  { title: "贈与税の基礎控除と非課税制度まとめ", keywords: ["贈与税 基礎控除", "110万円", "非課税制度", "住宅資金", "教育資金"], category: "保険・税務", difficulty: "初級" },

  // ── 信託制度（5件）──
  { title: "家族信託による認知症対策", keywords: ["家族信託", "認知症対策", "財産管理", "委託者", "受益者"], category: "信託制度", difficulty: "上級" },
  { title: "家族信託の仕組みと設定費用", keywords: ["家族信託 仕組み", "設定費用", "メリット", "デメリット", "手続き"], category: "信託制度", difficulty: "上級" },
  { title: "家族信託と成年後見制度の違い・使い分け", keywords: ["家族信託", "成年後見", "違い", "使い分け", "メリット"], category: "信託制度", difficulty: "上級" },
  { title: "遺言代用信託の仕組みと活用事例", keywords: ["遺言代用信託", "仕組み", "活用事例", "金融機関", "信託"], category: "信託制度", difficulty: "上級" },
  { title: "不動産信託で相続・認知症対策をする方法", keywords: ["不動産信託", "相続対策", "認知症対策", "アパート管理", "収益物件"], category: "信託制度", difficulty: "上級" },

  // ── デジタル終活（6件）──
  { title: "デジタル遺品の整理と対策", keywords: ["デジタル遺品", "SNS", "パスワード", "デジタル終活", "アカウント"], category: "デジタル終活", difficulty: "初級" },
  { title: "SNSアカウントの死後の対応と追悼設定", keywords: ["SNS 死後", "追悼設定", "Facebook", "Instagram", "アカウント削除"], category: "デジタル終活", difficulty: "初級" },
  { title: "パスワード管理と終活のデジタルノート", keywords: ["パスワード 終活", "デジタルノート", "管理方法", "家族に残す", "安全"], category: "デジタル終活", difficulty: "初級" },
  { title: "オンライン銀行・証券口座の相続手続き", keywords: ["オンライン銀行 相続", "ネット証券 相続", "手続き", "口座確認", "対処法"], category: "デジタル終活", difficulty: "中級" },
  { title: "デジタル資産（仮想通貨・NFT）の相続方法", keywords: ["仮想通貨 相続", "NFT 相続", "デジタル資産", "秘密鍵", "対策"], category: "デジタル終活", difficulty: "上級" },
  { title: "スマートフォンのデータを家族に残す方法", keywords: ["スマホ 終活", "データ 家族に残す", "写真", "連絡先", "バックアップ"], category: "デジタル終活", difficulty: "初級" },

  // ── 葬儀・お墓（8件）──
  { title: "葬儀の種類と費用の相場を徹底比較", keywords: ["葬儀 費用", "一般葬", "家族葬", "直葬", "費用相場"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "家族葬のメリット・デメリットと注意点", keywords: ["家族葬", "メリット", "デメリット", "費用", "参列者"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "樹木葬・海洋散骨・永代供養の選び方", keywords: ["樹木葬", "海洋散骨", "永代供養", "選び方", "費用"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "お墓の種類と費用・選び方ガイド", keywords: ["お墓 種類", "費用", "選び方", "霊園", "民営墓地"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "葬儀社の選び方と見積もりのポイント", keywords: ["葬儀社 選び方", "見積もり", "比較", "注意点", "値段交渉"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "お通夜・告別式のマナーと流れ", keywords: ["お通夜 マナー", "告別式", "流れ", "服装", "香典"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "香典の金額相場と書き方・渡し方", keywords: ["香典 金額", "相場", "書き方", "渡し方", "袋の選び方"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "四十九日・一周忌・三回忌の法要の進め方", keywords: ["四十九日", "一周忌", "三回忌", "法要", "準備"], category: "葬儀・お墓", difficulty: "初級" },

  // ── 介護・福祉（8件）──
  { title: "介護保険サービスの種類と利用方法", keywords: ["介護保険", "サービス", "利用方法", "要介護認定", "費用"], category: "介護・福祉", difficulty: "初級" },
  { title: "要介護認定の申請方法と審査の流れ", keywords: ["要介護認定", "申請方法", "審査", "流れ", "介護度"], category: "介護・福祉", difficulty: "初級" },
  { title: "老人ホームの種類と費用・選び方完全ガイド", keywords: ["老人ホーム 種類", "費用", "選び方", "特別養護老人ホーム", "有料老人ホーム"], category: "介護・福祉", difficulty: "初級" },
  { title: "親の認知症に気づいたら最初にすること", keywords: ["親 認知症", "気づき", "最初にすること", "病院受診", "対処法"], category: "介護・福祉", difficulty: "初級" },
  { title: "在宅介護の費用と支援サービス活用法", keywords: ["在宅介護", "費用", "支援サービス", "ヘルパー", "デイサービス"], category: "介護・福祉", difficulty: "初級" },
  { title: "介護離職を防ぐための制度と支援", keywords: ["介護離職", "防ぐ", "介護休業", "制度", "支援"], category: "介護・福祉", difficulty: "中級" },
  { title: "高齢者の一人暮らし見守りサービスの選び方", keywords: ["高齢者 一人暮らし", "見守りサービス", "選び方", "種類", "費用"], category: "介護・福祉", difficulty: "初級" },
  { title: "介護費用の節税・控除（医療費控除の活用）", keywords: ["介護費用 控除", "医療費控除", "節税", "確定申告", "対象費用"], category: "介護・福祉", difficulty: "中級" },

  // ── 訃報・連絡（4件）──
  { title: "訃報の連絡方法と文例集", keywords: ["訃報 連絡方法", "文例", "電話", "メール", "LINE"], category: "訃報・連絡", difficulty: "初級" },
  { title: "死亡届の提出方法と期限", keywords: ["死亡届", "提出方法", "期限", "7日以内", "必要書類"], category: "訃報・連絡", difficulty: "初級" },
  { title: "年金受給者が亡くなったときの手続き", keywords: ["年金 死亡", "受給停止", "手続き", "未支給年金", "期限"], category: "訃報・連絡", difficulty: "初級" },
  { title: "死亡後の公共料金・各種契約の解約手続き", keywords: ["死亡後 解約", "公共料金", "携帯", "クレジットカード", "手続き"], category: "訃報・連絡", difficulty: "初級" },
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
