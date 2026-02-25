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

  // ── 介護・福祉（追加30件）──
  { title: "特別養護老人ホームの入居条件と待機期間の短縮法", keywords: ["特別養護老人ホーム", "入居条件", "待機期間", "要介護3", "申込方法"], category: "介護・福祉", difficulty: "初級" },
  { title: "有料老人ホームの費用・月額の内訳と節約法", keywords: ["有料老人ホーム 費用", "月額", "内訳", "節約", "入居一時金"], category: "介護・福祉", difficulty: "初級" },
  { title: "グループホームとは？認知症の人が入居できる施設", keywords: ["グループホーム", "認知症", "入居条件", "費用", "特徴"], category: "介護・福祉", difficulty: "初級" },
  { title: "サービス付き高齢者向け住宅（サ高住）の選び方", keywords: ["サービス付き高齢者向け住宅", "サ高住", "選び方", "費用", "特徴"], category: "介護・福祉", difficulty: "初級" },
  { title: "デイサービスとデイケアの違いと選び方", keywords: ["デイサービス", "デイケア", "違い", "選び方", "介護保険"], category: "介護・福祉", difficulty: "初級" },
  { title: "ショートステイの利用方法と費用・泊まれる日数", keywords: ["ショートステイ", "利用方法", "費用", "日数", "介護保険"], category: "介護・福祉", difficulty: "初級" },
  { title: "訪問介護（ホームヘルプ）の利用方法と費用", keywords: ["訪問介護", "ホームヘルプ", "利用方法", "費用", "サービス内容"], category: "介護・福祉", difficulty: "初級" },
  { title: "訪問看護の利用方法と医療保険・介護保険の違い", keywords: ["訪問看護", "利用方法", "医療保険", "介護保険", "違い"], category: "介護・福祉", difficulty: "中級" },
  { title: "認知症の種類と症状・早期発見のサイン", keywords: ["認知症 種類", "症状", "早期発見", "アルツハイマー", "血管性認知症"], category: "介護・福祉", difficulty: "初級" },
  { title: "認知症の人との接し方・コミュニケーション術", keywords: ["認知症 接し方", "コミュニケーション", "介護", "怒らない", "対応方法"], category: "介護・福祉", difficulty: "初級" },
  { title: "認知症の進行を遅らせる生活習慣と予防法", keywords: ["認知症 予防", "進行を遅らせる", "生活習慣", "運動", "食事"], category: "介護・福祉", difficulty: "初級" },
  { title: "MCI（軽度認知障害）の症状と対処法", keywords: ["MCI", "軽度認知障害", "症状", "対処法", "認知症予防"], category: "介護・福祉", difficulty: "中級" },
  { title: "ケアマネジャーの選び方と上手な付き合い方", keywords: ["ケアマネジャー", "選び方", "付き合い方", "担当変更", "ケアプラン"], category: "介護・福祉", difficulty: "初級" },
  { title: "介護保険の自己負担割合と高額介護サービス費", keywords: ["介護保険 自己負担", "1割", "2割", "高額介護サービス費", "上限額"], category: "介護・福祉", difficulty: "中級" },
  { title: "在宅介護と施設介護どちらが向いている？判断基準", keywords: ["在宅介護", "施設介護", "比較", "判断基準", "メリット デメリット"], category: "介護・福祉", difficulty: "初級" },
  { title: "介護ストレスの解消法と燃え尽きない介護術", keywords: ["介護ストレス", "解消法", "燃え尽き", "介護疲れ", "レスパイトケア"], category: "介護・福祉", difficulty: "初級" },
  { title: "老人ホーム入居の契約前に必ず確認すること", keywords: ["老人ホーム 契約", "確認事項", "重要事項説明書", "注意点", "入居前"], category: "介護・福祉", difficulty: "中級" },
  { title: "介護施設での虐待を防ぐためのチェックポイント", keywords: ["介護施設 虐待", "防ぐ", "チェックポイント", "相談窓口", "サイン"], category: "介護・福祉", difficulty: "中級" },
  { title: "高齢者の転倒予防と住宅改修のポイント", keywords: ["高齢者 転倒予防", "住宅改修", "介護保険", "手すり", "バリアフリー"], category: "介護・福祉", difficulty: "初級" },
  { title: "介護食・嚥下食の作り方と市販品の選び方", keywords: ["介護食", "嚥下食", "作り方", "市販品", "とろみ"], category: "介護・福祉", difficulty: "初級" },
  { title: "おむつ交換・排泄介助の正しい方法とポイント", keywords: ["おむつ交換", "排泄介助", "方法", "負担軽減", "介護技術"], category: "介護・福祉", difficulty: "初級" },
  { title: "介護ベッド・車椅子など福祉用具のレンタルと購入", keywords: ["福祉用具", "レンタル", "購入", "介護保険", "介護ベッド"], category: "介護・福祉", difficulty: "初級" },
  { title: "老老介護・認認介護の実態と支援策", keywords: ["老老介護", "認認介護", "実態", "支援策", "社会問題"], category: "介護・福祉", difficulty: "中級" },
  { title: "遠距離介護の課題と上手な対処法", keywords: ["遠距離介護", "課題", "対処法", "見守り", "支援サービス"], category: "介護・福祉", difficulty: "中級" },
  { title: "介護休業・介護休暇の申請方法と給付金", keywords: ["介護休業", "介護休暇", "申請方法", "給付金", "雇用保険"], category: "介護・福祉", difficulty: "中級" },
  { title: "高齢者の薬管理と薬の飲み間違いを防ぐ方法", keywords: ["高齢者 薬管理", "飲み間違い", "防ぐ方法", "お薬手帳", "副作用"], category: "介護・福祉", difficulty: "初級" },
  { title: "高齢者向け住宅改修の費用と介護保険適用", keywords: ["高齢者 住宅改修", "費用", "介護保険", "補助金", "バリアフリー"], category: "介護・福祉", difficulty: "中級" },
  { title: "障害者手帳の取得方法と受けられるサービス", keywords: ["障害者手帳", "取得方法", "サービス", "割引", "支援"], category: "介護・福祉", difficulty: "初級" },
  { title: "生活保護と介護保険の関係と申請方法", keywords: ["生活保護", "介護保険", "関係", "申請方法", "受給条件"], category: "介護・福祉", difficulty: "中級" },
  { title: "高齢者施設の見学チェックリストと見るべきポイント", keywords: ["老人ホーム 見学", "チェックリスト", "ポイント", "雰囲気", "スタッフ"], category: "介護・福祉", difficulty: "初級" },

  // ── 葬儀・お墓（追加25件）──
  { title: "直葬（火葬式）のメリット・デメリットと費用", keywords: ["直葬", "火葬式", "メリット", "デメリット", "費用"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "一日葬の流れと費用・メリット", keywords: ["一日葬", "流れ", "費用", "メリット", "家族葬との違い"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "社葬の手続きと費用・会社負担の範囲", keywords: ["社葬", "手続き", "費用", "会社負担", "流れ"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "葬儀の生前予約・生前契約のメリットと注意点", keywords: ["葬儀 生前予約", "生前契約", "メリット", "注意点", "費用"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "永代供養墓の種類・費用と選び方", keywords: ["永代供養墓", "種類", "費用", "選び方", "合祀"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "散骨（海洋散骨・山林散骨）の法律と手続き", keywords: ["散骨", "海洋散骨", "山林散骨", "法律", "手続き"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "樹木葬の種類・費用と後悔しない選び方", keywords: ["樹木葬", "種類", "費用", "後悔しない", "選び方"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "納骨堂の種類と費用・メリット・デメリット", keywords: ["納骨堂", "種類", "費用", "メリット", "デメリット"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "お墓の継承問題と解決策・墓じまいの判断基準", keywords: ["お墓 継承", "解決策", "墓じまい", "判断基準", "後継者"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "改葬（お墓の引越し）の手続きと費用", keywords: ["改葬", "お墓 引越し", "手続き", "費用", "改葬許可証"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "無縁墓・無縁仏にならないための対策", keywords: ["無縁墓", "無縁仏", "ならない", "対策", "永代供養"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "葬儀費用を安くする方法と節約のコツ", keywords: ["葬儀費用 安くする", "節約", "コツ", "比較", "相見積もり"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "お布施の金額相場と渡し方・マナー", keywords: ["お布施", "金額相場", "渡し方", "マナー", "封筒"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "葬儀の参列マナー・弔電・供花の贈り方", keywords: ["葬儀 参列マナー", "弔電", "供花", "贈り方", "服装"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "喪主の役割と葬儀の挨拶文例・スピーチ", keywords: ["喪主", "役割", "挨拶文例", "スピーチ", "葬儀"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "法要の種類と時期・準備するもの一覧", keywords: ["法要 種類", "時期", "準備", "一覧", "七回忌"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "お盆・お彼岸の迎え方とお墓参りの正しいマナー", keywords: ["お盆", "お彼岸", "お墓参り", "マナー", "迎え方"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "位牌の種類・選び方と開眼供養の流れ", keywords: ["位牌", "種類", "選び方", "開眼供養", "流れ"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "仏壇の選び方・置き場所と飾り方", keywords: ["仏壇 選び方", "置き場所", "飾り方", "種類", "費用"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "遺骨の自宅保管は違法？手元供養の方法", keywords: ["遺骨 自宅保管", "違法", "手元供養", "方法", "法律"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "葬儀社の見積もりトラブル事例と対策", keywords: ["葬儀社 見積もり", "トラブル", "事例", "対策", "追加費用"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "死後1週間以内にすべき手続きチェックリスト", keywords: ["死後 手続き", "1週間以内", "チェックリスト", "優先順位", "流れ"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "クレマチオン（海外火葬）の実態と日本との違い", keywords: ["海外葬儀", "クレマチオン", "火葬", "日本との違い", "海外で亡くなった"], category: "葬儀・お墓", difficulty: "中級" },
  { title: "ペットの葬儀・お墓の選び方と費用", keywords: ["ペット 葬儀", "お墓", "選び方", "費用", "ペット葬"], category: "葬儀・お墓", difficulty: "初級" },
  { title: "神式・キリスト教式葬儀のマナーと流れ", keywords: ["神式 葬儀", "キリスト教式", "マナー", "流れ", "仏式との違い"], category: "葬儀・お墓", difficulty: "中級" },

  // ── 相続税（追加20件）──
  { title: "相続税の申告書の書き方と提出方法", keywords: ["相続税 申告書", "書き方", "提出方法", "税務署", "様式"], category: "相続税", difficulty: "中級" },
  { title: "相続財産の評価方法（土地・建物・株式）", keywords: ["相続財産 評価", "土地", "建物", "株式", "路線価"], category: "相続税", difficulty: "中級" },
  { title: "路線価とは？相続税の土地評価をわかりやすく解説", keywords: ["路線価", "相続税 土地評価", "倍率方式", "計算方法", "わかりやすく"], category: "相続税", difficulty: "中級" },
  { title: "相続税の障害者控除・未成年者控除の計算方法", keywords: ["相続税 障害者控除", "未成年者控除", "計算方法", "控除額", "適用条件"], category: "相続税", difficulty: "中級" },
  { title: "相続税の申告が不要な場合の判断基準", keywords: ["相続税 申告不要", "判断基準", "基礎控除以下", "小規模宅地", "確認方法"], category: "相続税", difficulty: "初級" },
  { title: "名義預金とは？相続税調査で問題になるケース", keywords: ["名義預金", "相続税", "調査", "問題", "対策"], category: "相続税", difficulty: "中級" },
  { title: "相続時精算課税制度の改正と2024年以降の活用法", keywords: ["相続時精算課税", "改正", "2024年", "活用法", "110万円非課税"], category: "相続税", difficulty: "中級" },
  { title: "アパート・収益物件を相続した場合の税金対策", keywords: ["アパート 相続", "収益物件", "税金対策", "貸家建付地", "節税"], category: "相続税", difficulty: "上級" },
  { title: "海外資産・外国人の相続税の扱い", keywords: ["海外資産 相続税", "外国人", "二重課税", "条約", "申告"], category: "相続税", difficulty: "上級" },
  { title: "会社経営者の事業承継と相続税の特例", keywords: ["事業承継", "相続税 特例", "経営承継円滑化法", "猶予", "免除"], category: "相続税", difficulty: "上級" },
  { title: "相続税の連帯納付義務とは？注意点と対策", keywords: ["相続税 連帯納付", "義務", "注意点", "対策", "未払い"], category: "相続税", difficulty: "上級" },
  { title: "生命保険の死亡保険金と相続税の計算方法", keywords: ["生命保険 死亡保険金", "相続税 計算", "非課税枠", "受取人", "申告"], category: "相続税", difficulty: "中級" },
  { title: "相続税の更正の請求（払いすぎた相続税の還付）", keywords: ["相続税 更正の請求", "払いすぎ", "還付", "期限", "手続き"], category: "相続税", difficulty: "上級" },
  { title: "相続財産の中に借金・債務がある場合の対処法", keywords: ["相続 借金", "債務", "相続税 控除", "債務控除", "対処法"], category: "相続税", difficulty: "中級" },
  { title: "教育資金贈与の一括非課税と2026年以降の動向", keywords: ["教育資金 贈与", "一括非課税", "1500万円", "2026年", "延長"], category: "相続税", difficulty: "中級" },
  { title: "自社株の相続税評価額を下げる方法", keywords: ["自社株 相続税", "評価額", "下げる", "非上場株式", "純資産価額"], category: "相続税", difficulty: "上級" },
  { title: "相続税の還付申告で払いすぎを取り戻す方法", keywords: ["相続税 還付申告", "払いすぎ", "取り戻す", "減額更正", "手続き"], category: "相続税", difficulty: "上級" },
  { title: "孫への生前贈与で相続税を節税する戦略", keywords: ["孫 生前贈与", "相続税 節税", "暦年贈与", "3年以内", "持ち戻し"], category: "相続税", difficulty: "中級" },
  { title: "農地の相続税の納税猶予と申請方法", keywords: ["農地 相続税", "納税猶予", "申請方法", "農業継続", "要件"], category: "相続税", difficulty: "上級" },
  { title: "相続税がかかる人の割合と課税対象になるボーダーライン", keywords: ["相続税 割合", "課税対象", "ボーダーライン", "基礎控除", "統計"], category: "相続税", difficulty: "初級" },

  // ── 地域別相続情報（20件）──
  { title: "東京都の相続税・相続手続きの特徴と注意点", keywords: ["東京 相続税", "相続手続き", "特徴", "注意点", "路線価"], category: "相続手続き", difficulty: "中級" },
  { title: "大阪府の相続手続きの流れと地域の専門家活用法", keywords: ["大阪 相続", "手続き", "流れ", "専門家", "税理士"], category: "相続手続き", difficulty: "中級" },
  { title: "愛知県（名古屋）の相続税と不動産評価の特徴", keywords: ["愛知 相続税", "名古屋", "不動産評価", "路線価", "特徴"], category: "相続税", difficulty: "中級" },
  { title: "神奈川県の相続登記と不動産相続の注意点", keywords: ["神奈川 相続登記", "不動産相続", "注意点", "横浜", "川崎"], category: "相続手続き", difficulty: "中級" },
  { title: "埼玉県の相続手続きと農地・山林の承継", keywords: ["埼玉 相続", "農地", "山林", "承継", "手続き"], category: "相続手続き", difficulty: "中級" },
  { title: "千葉県の相続と田舎の土地・空き家問題の対処法", keywords: ["千葉 相続", "田舎 土地", "空き家", "問題", "対処法"], category: "相続手続き", difficulty: "中級" },
  { title: "北海道の相続と広大な土地・農地の評価方法", keywords: ["北海道 相続", "広大な土地", "農地 評価", "路線価", "特殊"], category: "相続税", difficulty: "上級" },
  { title: "福岡県の相続手続きとよくある相談事例", keywords: ["福岡 相続", "手続き", "相談事例", "専門家", "費用"], category: "相続手続き", difficulty: "中級" },
  { title: "兵庫県の相続と不動産の現状・評価のポイント", keywords: ["兵庫 相続", "不動産", "評価", "神戸", "阪神"], category: "相続手続き", difficulty: "中級" },
  { title: "京都府の相続と町家・古民家の評価と活用", keywords: ["京都 相続", "町家", "古民家", "評価", "活用法"], category: "相続手続き", difficulty: "上級" },
  { title: "沖縄県の相続の特徴と門中（ムンチュー）制度", keywords: ["沖縄 相続", "門中", "ムンチュー", "特徴", "慣習"], category: "相続手続き", difficulty: "中級" },
  { title: "地方の空き家相続の対処法と活用・売却戦略", keywords: ["空き家 相続", "地方", "対処法", "活用", "売却"], category: "相続手続き", difficulty: "中級" },
  { title: "農村部の相続と農地法の許可手続き", keywords: ["農村 相続", "農地法", "許可", "手続き", "農業委員会"], category: "相続手続き", difficulty: "中級" },
  { title: "山林の相続と固定資産税・活用方法", keywords: ["山林 相続", "固定資産税", "活用方法", "売却", "管理"], category: "相続手続き", difficulty: "中級" },
  { title: "相続した空き家を売るか貸すか活用するかの判断基準", keywords: ["空き家 売る", "貸す", "活用", "判断基準", "相続不動産"], category: "相続手続き", difficulty: "初級" },
  { title: "相続した不動産の名義変更を放置するリスク", keywords: ["相続不動産 名義変更", "放置", "リスク", "義務化", "ペナルティ"], category: "相続手続き", difficulty: "初級" },
  { title: "共有不動産の相続トラブルと解決策", keywords: ["共有不動産 相続", "トラブル", "解決策", "共有持分", "裁判"], category: "相続手続き", difficulty: "中級" },
  { title: "相続した土地の分筆・合筆の手続きと費用", keywords: ["土地 分筆", "合筆", "手続き", "費用", "法務局"], category: "相続手続き", difficulty: "中級" },
  { title: "タワーマンションの相続税評価と2024年改正の影響", keywords: ["タワーマンション 相続税", "評価", "2024年改正", "影響", "節税"], category: "相続税", difficulty: "上級" },
  { title: "相続した借地権・底地の処理方法と注意点", keywords: ["借地権 相続", "底地", "処理方法", "注意点", "評価"], category: "相続手続き", difficulty: "上級" },

  // ── 生前準備（追加20件）──
  { title: "終活とは何か？始めるタイミングとやること", keywords: ["終活 とは", "始めるタイミング", "やること", "意味", "目的"], category: "生前準備", difficulty: "初級" },
  { title: "終活ノートの書き方と項目一覧", keywords: ["終活ノート", "書き方", "項目", "一覧", "何を書く"], category: "生前準備", difficulty: "初級" },
  { title: "介護が必要になる前に準備すること10選", keywords: ["介護 準備", "前に", "やること", "10選", "生前準備"], category: "生前準備", difficulty: "初級" },
  { title: "老後の生活費はいくら必要？シミュレーション", keywords: ["老後 生活費", "いくら", "シミュレーション", "2000万円問題", "計算"], category: "生前準備", difficulty: "初級" },
  { title: "終活セミナー・相談会の活用法と探し方", keywords: ["終活セミナー", "相談会", "活用法", "探し方", "無料"], category: "生前準備", difficulty: "初級" },
  { title: "生前整理の業者選びと不用品の処分方法", keywords: ["生前整理 業者", "選び方", "不用品", "処分方法", "費用"], category: "生前準備", difficulty: "初級" },
  { title: "断捨離のコツと思い出品・写真の整理法", keywords: ["断捨離 コツ", "思い出品", "写真", "整理法", "終活"], category: "生前準備", difficulty: "初級" },
  { title: "デジタル終活でやること・アカウント整理", keywords: ["デジタル終活", "やること", "アカウント整理", "SNS", "パスワード"], category: "生前準備", difficulty: "初級" },
  { title: "高齢者向け見守りサービスの種類と費用比較", keywords: ["高齢者 見守りサービス", "種類", "費用比較", "GPS", "センサー"], category: "生前準備", difficulty: "初級" },
  { title: "老後に住む場所の選択肢とそれぞれのメリット", keywords: ["老後 住む場所", "選択肢", "メリット", "施設", "自宅リフォーム"], category: "生前準備", difficulty: "初級" },
  { title: "老後の医療費を抑える健康保険の活用法", keywords: ["老後 医療費", "健康保険", "活用法", "高額療養費", "節約"], category: "生前準備", difficulty: "中級" },
  { title: "高額療養費制度の申請方法と自己負担限度額", keywords: ["高額療養費制度", "申請方法", "自己負担限度額", "計算方法", "払い戻し"], category: "生前準備", difficulty: "中級" },
  { title: "持病があっても入れる医療保険・生命保険の選び方", keywords: ["持病 保険", "医療保険", "生命保険", "引受緩和型", "選び方"], category: "生前準備", difficulty: "初級" },
  { title: "iDeCo（個人型確定拠出年金）で老後に備える方法", keywords: ["iDeCo", "個人型確定拠出年金", "老後", "節税", "運用"], category: "生前準備", difficulty: "中級" },
  { title: "NISAで老後資産を作る方法と引き出しタイミング", keywords: ["NISA", "老後資産", "作る方法", "引き出し", "タイミング"], category: "生前準備", difficulty: "中級" },
  { title: "公証役場での手続き一覧と事前準備のポイント", keywords: ["公証役場", "手続き", "一覧", "事前準備", "費用"], category: "生前準備", difficulty: "中級" },
  { title: "老人性うつと認知症の違い・家族ができること", keywords: ["老人性うつ", "認知症 違い", "家族", "できること", "対処法"], category: "生前準備", difficulty: "初級" },
  { title: "高齢ドライバーの運転免許返納と代替交通手段", keywords: ["高齢ドライバー", "免許返納", "代替交通手段", "サポート", "特典"], category: "生前準備", difficulty: "初級" },
  { title: "終末期医療の選択と家族への意思表示方法", keywords: ["終末期医療", "選択", "意思表示", "家族", "事前指示書"], category: "生前準備", difficulty: "中級" },
  { title: "入院・手術に備えた保険請求と手続きの流れ", keywords: ["入院 手術", "保険請求", "手続き", "流れ", "必要書類"], category: "生前準備", difficulty: "初級" },

  // ── 遺言書（追加15件）──
  { title: "遺言書の訂正・修正の正しい方法", keywords: ["遺言書 訂正", "修正", "正しい方法", "ルール", "無効にならない"], category: "遺言書", difficulty: "中級" },
  { title: "共同遺言が禁止されている理由と夫婦の対処法", keywords: ["共同遺言 禁止", "理由", "夫婦", "対処法", "それぞれ作成"], category: "遺言書", difficulty: "中級" },
  { title: "遺言書で相続廃除をする方法と条件", keywords: ["相続廃除", "遺言書", "方法", "条件", "不正行為"], category: "遺言書", difficulty: "上級" },
  { title: "遺言書の偽造・変造を防ぐための対策", keywords: ["遺言書 偽造", "変造", "防ぐ", "対策", "公正証書"], category: "遺言書", difficulty: "中級" },
  { title: "遺言書に書けないこと・書いても効力がないこと", keywords: ["遺言書 書けないこと", "効力がない", "付言事項", "限界", "内容"], category: "遺言書", difficulty: "中級" },
  { title: "遺言書の発見後の対応・隠したらどうなる？", keywords: ["遺言書 発見", "対応", "隠す", "罰則", "開封禁止"], category: "遺言書", difficulty: "初級" },
  { title: "条件付き遺言（停止条件・解除条件）の活用法", keywords: ["条件付き遺言", "停止条件", "解除条件", "活用法", "設定方法"], category: "遺言書", difficulty: "上級" },
  { title: "遺言書で相続人に付言事項を残す書き方", keywords: ["遺言書 付言事項", "書き方", "メッセージ", "家族へ", "感謝"], category: "遺言書", difficulty: "初級" },
  { title: "認知症発症前に遺言書を作成すべき理由と手順", keywords: ["認知症 遺言書", "発症前", "作成", "理由", "手順"], category: "遺言書", difficulty: "初級" },
  { title: "遺言書の内容と遺産分割協議どちらが優先されるか", keywords: ["遺言書", "遺産分割協議", "優先", "どちら", "法的効力"], category: "遺言書", difficulty: "中級" },
  { title: "外国人が日本で遺言書を作成する際の注意点", keywords: ["外国人 遺言書", "日本", "作成", "注意点", "準拠法"], category: "遺言書", difficulty: "上級" },
  { title: "遺言書の相続割合の決め方と兄弟間の公平な配分", keywords: ["遺言書 相続割合", "決め方", "兄弟", "公平", "配分"], category: "遺言書", difficulty: "初級" },
  { title: "胎児への遺贈は可能？生まれる前の相続の扱い", keywords: ["胎児 遺贈", "生まれる前", "相続", "扱い", "法律"], category: "遺言書", difficulty: "上級" },
  { title: "遺言書の証人の条件と証人になれない人", keywords: ["遺言書 証人", "条件", "なれない人", "相続人", "受遺者"], category: "遺言書", difficulty: "中級" },
  { title: "相続人のいない人の遺産はどこへ行く？対策方法", keywords: ["相続人なし", "遺産", "どこへ", "国庫", "対策方法"], category: "遺言書", difficulty: "中級" },

  // ── デジタル終活（追加15件）──
  { title: "Google・Appleアカウントの死後の手続き方法", keywords: ["Google アカウント 死後", "Apple アカウント", "手続き", "継承", "削除"], category: "デジタル終活", difficulty: "初級" },
  { title: "Facebookの追悼アカウント設定と管理者の指定方法", keywords: ["Facebook 追悼アカウント", "設定", "管理者", "指定方法", "死後"], category: "デジタル終活", difficulty: "初級" },
  { title: "LINE・メールアカウントの死後の対応と注意点", keywords: ["LINE 死後", "メール", "対応", "注意点", "アカウント削除"], category: "デジタル終活", difficulty: "初級" },
  { title: "ネット銀行・ネット証券の相続で困らない準備", keywords: ["ネット銀行 相続", "ネット証券", "困らない", "準備", "パスワード"], category: "デジタル終活", difficulty: "中級" },
  { title: "クレジットカードの死後の解約手続きと未払い処理", keywords: ["クレジットカード 死後", "解約", "手続き", "未払い", "相続"], category: "デジタル終活", difficulty: "初級" },
  { title: "サブスクリプションの解約方法と死後の対応", keywords: ["サブスクリプション 解約", "死後", "対応", "Netflix", "Amazonプライム"], category: "デジタル終活", difficulty: "初級" },
  { title: "デジタル写真・動画の整理と家族への引き継ぎ方", keywords: ["デジタル写真", "動画", "整理", "引き継ぎ", "クラウド"], category: "デジタル終活", difficulty: "初級" },
  { title: "パスワードマネージャーの活用と終活での管理", keywords: ["パスワードマネージャー", "活用", "終活", "管理", "おすすめ"], category: "デジタル終活", difficulty: "初級" },
  { title: "ビットコイン・仮想通貨を相続させるための準備", keywords: ["ビットコイン 相続", "仮想通貨", "準備", "秘密鍵", "ウォレット"], category: "デジタル終活", difficulty: "上級" },
  { title: "ブログ・YouTubeチャンネルの死後の扱いと収益", keywords: ["ブログ 死後", "YouTubeチャンネル", "収益", "相続", "引き継ぎ"], category: "デジタル終活", difficulty: "中級" },
  { title: "個人情報の死後の取り扱いと遺族の権利", keywords: ["個人情報 死後", "取り扱い", "遺族", "権利", "GDPR"], category: "デジタル終活", difficulty: "中級" },
  { title: "スマートホームデバイスの相続と引き継ぎ", keywords: ["スマートホーム", "相続", "引き継ぎ", "Alexa", "Google Home"], category: "デジタル終活", difficulty: "初級" },
  { title: "オンラインゲームアカウントの相続と引き継ぎの可否", keywords: ["オンラインゲーム 相続", "アカウント", "引き継ぎ", "可否", "規約"], category: "デジタル終活", difficulty: "中級" },
  { title: "電子書籍・デジタルコンテンツは相続できるか？", keywords: ["電子書籍 相続", "デジタルコンテンツ", "相続できるか", "Kindle", "ライセンス"], category: "デジタル終活", difficulty: "中級" },
  { title: "デジタル終活チェックリスト：今すぐできる10のこと", keywords: ["デジタル終活 チェックリスト", "今すぐ", "10のこと", "準備", "手順"], category: "デジタル終活", difficulty: "初級" },

  // ── 法的制度（追加7件）──
  { title: "遺産分割調停の申立て方法と流れ", keywords: ["遺産分割調停", "申立て", "方法", "流れ", "家庭裁判所"], category: "法的制度", difficulty: "中級" },
  { title: "相続財産管理人の選任と費用", keywords: ["相続財産管理人", "選任", "費用", "手続き", "相続人不存在"], category: "法的制度", difficulty: "上級" },
  { title: "配偶者居住権の活用と登記手続き", keywords: ["配偶者居住権", "活用", "登記", "手続き", "2020年改正"], category: "法的制度", difficulty: "中級" },
  { title: "特別縁故者として財産を受け取る方法", keywords: ["特別縁故者", "財産", "受け取る", "手続き", "申立て"], category: "法的制度", difficulty: "上級" },
  { title: "相続人全員の同意なしに遺産分割できるケース", keywords: ["相続人 同意なし", "遺産分割", "できるケース", "特例", "単独申請"], category: "法的制度", difficulty: "上級" },
  { title: "民法改正で変わった相続ルール（2024年最新版）", keywords: ["民法改正 相続", "変わったルール", "2024年", "最新", "改正点"], category: "法的制度", difficulty: "中級" },
  { title: "相続税の申告期限後に遺言書が見つかった場合の対処法", keywords: ["申告期限後 遺言書", "発見", "対処法", "更正請求", "修正申告"], category: "法的制度", difficulty: "上級" },

  // ── エンディングノート（追加4件）──
  { title: "エンディングノートに書く緊急連絡先と医療情報", keywords: ["エンディングノート 緊急連絡先", "医療情報", "書き方", "病院", "薬"], category: "エンディングノート", difficulty: "初級" },
  { title: "エンディングノートのデジタル版アプリ比較2026", keywords: ["エンディングノート アプリ", "デジタル版", "比較", "2026", "おすすめ"], category: "エンディングノート", difficulty: "初級" },
  { title: "エンディングノートを夫婦で一緒に書くメリット", keywords: ["エンディングノート 夫婦", "一緒に書く", "メリット", "コミュニケーション", "共有"], category: "エンディングノート", difficulty: "初級" },
  { title: "子どもに残すエンディングノートの書き方と渡し方", keywords: ["エンディングノート 子ども", "残す", "書き方", "渡し方", "メッセージ"], category: "エンディングノート", difficulty: "初級" },

  // ── 保険・税務（追加10件）──
  { title: "終身保険と定期保険の違い・老後に残すべき保険", keywords: ["終身保険", "定期保険", "違い", "老後", "選び方"], category: "保険・税務", difficulty: "初級" },
  { title: "個人年金保険の相続税と解約返戻金の扱い", keywords: ["個人年金保険 相続税", "解約返戻金", "扱い", "受取人", "課税"], category: "保険・税務", difficulty: "中級" },
  { title: "相続した不動産の固定資産税と相続後の維持費", keywords: ["相続 固定資産税", "不動産", "維持費", "空き家", "節税"], category: "保険・税務", difficulty: "初級" },
  { title: "確定申告が必要な相続財産とその申告方法", keywords: ["確定申告 相続財産", "申告方法", "譲渡所得", "配当", "必要なケース"], category: "保険・税務", difficulty: "中級" },
  { title: "相続と贈与の税率比較・どちらが有利かシミュレーション", keywords: ["相続税 贈与税 比較", "税率", "有利", "シミュレーション", "節税戦略"], category: "保険・税務", difficulty: "中級" },
  { title: "住宅取得資金贈与の非課税制度と申告方法", keywords: ["住宅取得資金贈与", "非課税", "申告方法", "上限額", "条件"], category: "保険・税務", difficulty: "中級" },
  { title: "民事信託（家族信託）の税務上の取り扱い", keywords: ["民事信託", "家族信託", "税務", "取り扱い", "課税関係"], category: "保険・税務", difficulty: "上級" },
  { title: "相続した株式の取得費と売却時の税金計算", keywords: ["相続 株式", "取得費", "売却", "税金計算", "譲渡所得"], category: "保険・税務", difficulty: "中級" },
  { title: "老後の確定申告：年金・医療費・ふるさと納税", keywords: ["老後 確定申告", "年金", "医療費控除", "ふるさと納税", "シニア"], category: "保険・税務", difficulty: "初級" },
  { title: "相続財産の調査方法と隠し財産の発見法", keywords: ["相続財産 調査", "隠し財産", "発見", "名寄せ", "金融機関"], category: "保険・税務", difficulty: "中級" },
];

// 超高品質記事生成プロンプト
function generateEnhancedPrompt(topic, relatedArticles = []) {
  // 内部リンクセクション（関連記事がある場合のみ）
  const internalLinkSection = relatedArticles.length > 0 ? `
■ 内部リンクの自然な挿入（SEO重要）
以下の関連記事へのリンクを、自然な文脈で記事内に2〜3箇所挿入してください。
Markdownの [リンクテキスト](/articles/スラッグ) 形式を使用してください。

利用可能な関連記事:
${relatedArticles.map(a => `- [${a.title}](/articles/${a.slug})`).join('\n')}

挿入例: 「相続税の計算方法について詳しくは[相続税の基礎控除をわかりやすく解説](/articles/2025-01-15-souzokuzei-kakaranai)をご参照ください。」
` : '';

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
${internalLinkSection}

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
- **重要：必ず最初の1行目に SLUG: your-english-slug 形式でURLスラッグを出力してください（例: SLUG: ending-note-basic-guide）。スラッグは英数字とハイフンのみ。**
- **2行目以降に記事本文を出力。Frontmatterは絶対に含めないでください。**
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
7. よくある質問（FAQ）

■ FAQ（よくある質問）セクションの必須フォーマット
記事の末尾、まとめの後に、以下の形式で**必ず3〜5問のFAQを追加してください**。
このフォーマットは構造化データ（FAQPage）に使用されるため、厳密に従ってください。

\`\`\`
## よくある質問（FAQ）

### Q1: [読者がよく抱く疑問を質問形式で記載]
**A1:** [具体的で実用的な回答。100文字程度で簡潔に]

### Q2: [別の重要な疑問]
**A2:** [具体的な回答]

### Q3: [手続き・費用・期限など実務的な疑問]
**A3:** [具体的な回答]
\`\`\`

それでは、上記の条件を満たす高品質な記事を作成してください。`;
}

// 記事生成とファイル保存
async function generateArticle(topic, dateStr, retryCount = 0, existingArticles = []) {
  const maxRetries = 3;
  try {
    console.log(`📝 記事生成開始: ${topic.title}`);

    // 同一カテゴリまたはキーワード一致の関連記事を最大5件選択（内部リンク用）
    const relatedArticles = existingArticles
      .filter(a => a.category === topic.category ||
        topic.keywords.some(k => k.length > 2 && a.title.includes(k.split(/[・\s]/)[0])))
      .slice(0, 5);

    const prompt = generateEnhancedPrompt(topic, relatedArticles);
    
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

    const rawResponse = completion.choices[0].message.content;

    // 1行目から英語スラッグを抽出（プロンプトで要求）
    const slugMatch = rawResponse.match(/^SLUG:\s*([a-z0-9][a-z0-9-]{2,60}[a-z0-9])\s*\n/m);
    const extractedSlug = slugMatch ? slugMatch[1] : null;

    // SLUG行を記事本文から除去
    const articleBody = rawResponse.replace(/^SLUG:\s*[^\n]+\n?/m, '').trimStart();

    // 記事の冒頭から要約を抽出（最初の200文字から探すなど、簡易的な方法）
    const description = articleBody.substring(0, 200).replace(/\n/g, ' ').trim();

    // ファイル名生成: AI提供のスラッグ → カテゴリ略称+タイムスタンプのフォールバック
    const categorySlugMap = {
      '終活・エンディング': 'shukatsu', 'エンディングノート': 'ending-note',
      '相続手続き': 'souzoku', '遺言書': 'yuigon', '葬儀・お墓': 'sougi',
      '介護・福祉': 'kaigo', '相続税': 'souzokuzei', '生前準備': 'seizen',
      'デジタル終活': 'digital', '保険・税務': 'hoken', '不動産相続': 'fudousan',
      '生前贈与': 'zoyo', '法的制度': 'houteki', '信託制度': 'shintaku',
    };
    const catSlug = categorySlugMap[topic.category] || 'article';
    const slugSuffix = extractedSlug || `${catSlug}-${Date.now().toString(36)}`;

    // Frontmatterを生成
    const frontmatter = `---
title: "${topic.title}"
date: "${dateStr}"
slug: "${slugSuffix}"
category: "${topic.category}"
keywords: [${topic.keywords.map(k => `"${k}"`).join(', ')}]
description: "${description.substring(0, 120)}"
---

`;

    const content = frontmatter + articleBody;
    const filename = `${dateStr}-${slugSuffix}.md`;
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
  const startDate = process.argv[3] ? new Date(process.argv[3]) : new Date();
  
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
  console.log(`📚 利用可能トピック数: ${topics.length}件`);

  // 既存記事のタイトルを取得して重複を防ぐ + 内部リンク用にスラッグ・カテゴリも収集
  const existingTitles = new Set();
  const existingArticles = [];  // { slug, title, category } for internal linking
  if (fs.existsSync(articlesDir)) {
    fs.readdirSync(articlesDir).forEach(file => {
      if (file.endsWith('.md')) {
        const nameWithoutDate = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '').replace(/-/g, ' ');
        existingTitles.add(nameWithoutDate.toLowerCase());
        // フロントマターからタイトル・カテゴリを読み取る（内部リンク用）
        try {
          const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
          const titleMatch = content.match(/^title:\s*"([^"]+)"/m);
          const categoryMatch = content.match(/^category:\s*"([^"]+)"/m);
          if (titleMatch && categoryMatch) {
            existingArticles.push({
              slug: file.replace('.md', ''),
              title: titleMatch[1],
              category: categoryMatch[1],
            });
          }
        } catch (e) { /* skip unreadable files */ }
      }
    });
  }
  console.log(`📂 既存記事数: ${existingTitles.size}件 (内部リンク候補: ${existingArticles.length}件)`);

  // 未生成のトピックを優先してランダムに選択
  const shuffled = [...topics].sort(() => Math.random() - 0.5);
  const ungenerated = shuffled.filter(t => {
    const titleKey = t.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').toLowerCase();
    return ![...existingTitles].some(existing => existing.includes(titleKey.substring(0, 15)));
  });
  const pool = ungenerated.length >= batchSize ? ungenerated : shuffled;

  const results = [];
  const selectedTopics = pool.slice(0, batchSize);
  
  for (let i = 0; i < selectedTopics.length; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const result = await generateArticle(selectedTopics[i], dateStr, 0, existingArticles);
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
