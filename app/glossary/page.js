import Link from 'next/link';
import styles from './glossary.module.css';

export const metadata = {
  title: '終活・相続用語集 | 100語以上の専門用語を解説',
  description: '終活や相続に関する専門用語100語以上をわかりやすく解説。五十音順で簡単に検索できます。',
  keywords: ['終活用語', '相続用語', '専門用語', '用語集', '辞典'],
  alternates: { canonical: '/glossary' },
};

const glossaryData = {
  'あ': [
    {
      term: 'アドバンス・ケア・プランニング',
      reading: 'あどばんす・けあ・ぷらんにんぐ',
      description: '将来の医療やケアについて、本人・家族・医療者が話し合い、事前に意思決定する取り組み。ACP（人生会議）とも呼ばれる。',
      relatedArticles: []
    },
    {
      term: '遺産',
      reading: 'いさん',
      description: '亡くなった人が残した財産の総称。不動産・預貯金・株式などのプラスの財産と、借金などのマイナスの財産が含まれる。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '遺産分割協議',
      reading: 'いさんぶんかつきょうぎ',
      description: '相続人全員で遺産の分け方を話し合うこと。全員の同意が必要で、協議書を作成する。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '遺産分割協議書',
      reading: 'いさんぶんかつきょうぎしょ',
      description: '相続人全員が遺産の分割内容に合意したことを証明する書類。不動産や銀行口座の名義変更手続きに必要となる。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '遺産分割調停',
      reading: 'いさんぶんかつちょうてい',
      description: '相続人間で遺産分割の話し合いがまとまらない場合に、家庭裁判所の調停委員が仲立ちして解決を図る手続き。',
      relatedArticles: []
    },
    {
      term: '遺贈',
      reading: 'いぞう',
      description: '遺言によって財産を特定の人や団体に贈ること。相続人以外にも遺贈することができる。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '遺族年金',
      reading: 'いぞくねんきん',
      description: '国民年金や厚生年金の被保険者が亡くなった場合に、遺族に支給される年金。遺族基礎年金と遺族厚生年金がある。',
      relatedArticles: []
    },
    {
      term: '遺骨',
      reading: 'いこつ',
      description: '火葬後に残る故人の骨。納骨、散骨、手元供養など、さまざまな方法で供養される。',
      relatedArticles: []
    },
    {
      term: '遺品整理',
      reading: 'いひんせいり',
      description: '故人が残した遺品を整理・処分すること。専門の遺品整理業者に依頼することもできる。',
      relatedArticles: ['/articles/2025-01-18-seizen-seiri']
    },
    {
      term: '遺留分',
      reading: 'いりゅうぶん',
      description: '一定の相続人に保障された最低限の相続分。配偶者と子は法定相続分の1/2、親は1/3。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '遺言執行者',
      reading: 'いごんしっこうしゃ',
      description: '遺言の内容を実現するために必要な手続きを行う人。遺言書で指定するか、家庭裁判所が選任する。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: 'エンディングノート',
      reading: 'えんでぃんぐのーと',
      description: '自分の情報や希望、想いを記録し家族に伝えるためのノート。法的効力はないが終活の基本ツール。',
      relatedArticles: ['/articles/2025-01-19-shukatu-note-kakikata']
    },
    {
      term: '延納',
      reading: 'えんのう',
      description: '相続税を一括で支払えない場合に、一定の要件のもとで分割して納付することが認められる制度。最長20年間の延納が可能。',
      relatedArticles: []
    }
  ],
  'か': [
    {
      term: '介護保険',
      reading: 'かいごほけん',
      description: '40歳以上が加入する公的保険制度。要介護・要支援認定を受けた場合に、介護サービスを原則1割の自己負担で利用できる。',
      relatedArticles: []
    },
    {
      term: '介護費用',
      reading: 'かいごひよう',
      description: '在宅介護や施設入居にかかる費用の総称。公的介護保険でカバーされる部分と自己負担部分がある。老後資金計画に重要な要素。',
      relatedArticles: []
    },
    {
      term: '改製原戸籍',
      reading: 'かいせいげんこせき',
      description: '戸籍の様式改製前の旧様式の戸籍謄本。相続手続きで被相続人の出生から死亡までの連続した戸籍を取得する際に必要となる。',
      relatedArticles: []
    },
    {
      term: '火葬',
      reading: 'かそう',
      description: '遺体を高温で焼却する埋葬方法。日本では法律上、埋葬前に必ず火葬が行われる。火葬後に遺骨を骨壷に収める収骨を行う。',
      relatedArticles: []
    },
    {
      term: '株式の相続',
      reading: 'かぶしきのそうぞく',
      description: '被相続人が保有していた株式を相続すること。証券会社での名義変更手続きが必要で、評価は相続開始日の終値などを基準にする。',
      relatedArticles: []
    },
    {
      term: '家族信託',
      reading: 'かぞくしんたく',
      description: '財産管理を信頼できる家族に託す制度。認知症対策や相続対策として注目されている。',
      relatedArticles: []
    },
    {
      term: '家族葬',
      reading: 'かぞくそう',
      description: '家族や親族、親しい友人のみで行う小規模な葬儀。参列者は10〜30名程度が一般的。',
      relatedArticles: ['/articles/2025-01-17-kazokuso-hiyou']
    },
    {
      term: '寄与分',
      reading: 'きよぶん',
      description: '相続人の中で被相続人の財産維持・増加に特別の貢献をした人が、相続財産から多く取得できる制度。',
      relatedArticles: []
    },
    {
      term: '基礎控除',
      reading: 'きそこうじょ',
      description: '相続税の計算で相続財産から差し引ける金額。3,000万円+600万円×法定相続人数。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '検認',
      reading: 'けんにん',
      description: '自筆証書遺言を家庭裁判所で開封・確認する手続き。遺言書の状態を確認し偽造を防ぐ目的がある。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '限定承認',
      reading: 'げんていしょうにん',
      description: '相続財産の範囲内でのみ被相続人の債務を引き受ける相続方法。プラスの財産を超える借金は支払わなくて済む。',
      relatedArticles: []
    },
    {
      term: '公証役場',
      reading: 'こうしょうやくば',
      description: '公証人が執務する役場。公正証書遺言の作成や任意後見契約の公正証書化など、法的に重要な書類の作成を行う。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '公正証書遺言',
      reading: 'こうせいしょうしょいごん',
      description: '公証人が作成する遺言書。最も確実で安全な遺言方式だが費用がかかる。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '後見人',
      reading: 'こうけんにん',
      description: '判断能力が不十分な人の財産管理や身上監護を行う人。家庭裁判所が選任する法定後見人と、本人が事前に選ぶ任意後見人がある。',
      relatedArticles: []
    },
    {
      term: '高齢者施設',
      reading: 'こうれいしゃしせつ',
      description: '介護や生活支援が必要な高齢者が入居する施設の総称。特別養護老人ホーム、有料老人ホーム、グループホームなど種類は多様。',
      relatedArticles: []
    },
    {
      term: '戸籍謄本',
      reading: 'こせきとうほん',
      description: '戸籍の記載事項をすべて写した書類。相続手続きでは被相続人の出生から死亡までの戸籍謄本と相続人の戸籍謄本が必要となる。',
      relatedArticles: []
    }
  ],
  'さ': [
    {
      term: '財産目録',
      reading: 'ざいさんもくろく',
      description: '所有するすべての財産（不動産・預貯金・有価証券など）と負債を一覧にまとめた書類。遺産分割や相続税申告の基礎となる。',
      relatedArticles: []
    },
    {
      term: '散骨',
      reading: 'さんこつ',
      description: '粉砕した遺骨を海や山などに散布する自然葬の一形態。墓を持たない選択肢として近年注目されている。',
      relatedArticles: []
    },
    {
      term: '死後事務委任契約',
      reading: 'しごじむいにんけいやく',
      description: '死後の諸手続きを第三者に委任する契約。葬儀・納骨・遺品整理などを依頼できる。',
      relatedArticles: []
    },
    {
      term: '死亡届',
      reading: 'しぼうとどけ',
      description: '人が亡くなった際に市区町村役場に提出する届出。死亡後7日以内に提出する義務があり、火葬許可証の交付に必要。',
      relatedArticles: []
    },
    {
      term: '四十九日',
      reading: 'しじゅうくにち',
      description: '故人が亡くなってから49日目に行う法要。この日に忌明けとなることが多く、納骨もこのタイミングで行われることが一般的。',
      relatedArticles: []
    },
    {
      term: '司法書士',
      reading: 'しほうしょし',
      description: '不動産登記や法人登記、裁判所への申立書類作成などを専門とする士業。相続登記や遺産分割協議書の作成で活躍する。',
      relatedArticles: []
    },
    {
      term: '終活',
      reading: 'しゅうかつ',
      description: '人生の終わりに向けた活動の略。自分らしい最期を迎えるための準備全般を指す。',
      relatedArticles: ['/articles/2025-01-14-shukatu-toha']
    },
    {
      term: '終末期医療',
      reading: 'しゅうまつきいりょう',
      description: '回復の見込みがない状態での医療。延命治療の選択や緩和ケアなど、どのような医療を受けるかを事前に考えておくことが重要。',
      relatedArticles: []
    },
    {
      term: '準確定申告',
      reading: 'じゅんかくていしんこく',
      description: '亡くなった人の所得税を相続人が代わりに申告すること。相続開始から4ヶ月以内。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '小規模宅地等の特例',
      reading: 'しょうきぼたくちとうのとくれい',
      description: '亡くなった人が住んでいた土地や事業用の土地を相続する場合、相続税の評価額を最大80%減額できる特例。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '信託銀行',
      reading: 'しんたくぎんこう',
      description: '信託業務を行うことができる銀行。遺言信託や遺産整理業務など、相続に関連した幅広いサービスを提供している。',
      relatedArticles: []
    },
    {
      term: '生前贈与',
      reading: 'せいぜんぞうよ',
      description: '生きているうちに財産を無償で他者に譲渡すること。相続税対策として有効だが、贈与税に注意が必要。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '生前整理',
      reading: 'せいぜんせいり',
      description: '生きているうちに身の回りの物や情報を整理すること。家族の負担軽減になる。',
      relatedArticles: ['/articles/2025-01-18-seizen-seiri']
    },
    {
      term: '生命保険の相続',
      reading: 'せいめいほけんのそうぞく',
      description: '被相続人が契約者・被保険者の生命保険の死亡保険金は、受取人固有の財産となる。ただし、みなし相続財産として相続税の課税対象になる。',
      relatedArticles: []
    },
    {
      term: '成年後見人',
      reading: 'せいねんこうけんにん',
      description: '認知症や精神障害などで判断能力が失われた成人を法的に支援・保護する人。家庭裁判所が選任し、財産管理と身上監護を行う。',
      relatedArticles: []
    },
    {
      term: '相続時精算課税制度',
      reading: 'そうぞくじせいさんかぜいせいど',
      description: '60歳以上の親・祖父母から18歳以上の子・孫への贈与に適用できる制度。2,500万円まで贈与税が非課税だが、相続時に精算される。',
      relatedArticles: []
    },
    {
      term: '相続税申告',
      reading: 'そうぞくぜいしんこく',
      description: '相続した財産が基礎控除額を超える場合に必要な税務申告。相続開始を知った日の翌日から10ヶ月以内に税務署へ提出する。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '相続財産',
      reading: 'そうぞくざいさん',
      description: '相続によって取得する財産。不動産・預貯金・有価証券などのプラス財産と、借入金などのマイナス財産の両方が含まれる。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '相続人調査',
      reading: 'そうぞくにんちょうさ',
      description: '被相続人の戸籍を出生から死亡まで収集し、法定相続人を確定する作業。相続手続きの最初のステップとして重要。',
      relatedArticles: []
    },
    {
      term: '相続登記',
      reading: 'そうぞくとうき',
      description: '相続によって不動産の所有者が変わった際に行う登記申請。2024年4月から相続登記の申請が義務化された。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '相続争い',
      reading: 'そうぞくあらそい',
      description: '遺産の分割方法をめぐって相続人間で起きるトラブル。遺言書の作成や生前の家族間コミュニケーションで予防することが重要。',
      relatedArticles: []
    },
    {
      term: '相続放棄',
      reading: 'そうぞくほうき',
      description: 'プラスもマイナスも含めて一切の相続を放棄すること。3ヶ月以内に家庭裁判所で手続き。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '葬儀費用',
      reading: 'そうぎひよう',
      description: '葬儀にかかる費用の総称。式場費・祭壇費・火葬費・飲食費などが含まれ、全国平均は100〜200万円程度。',
      relatedArticles: ['/articles/2025-01-17-kazokuso-hiyou']
    }
  ],
  'た': [
    {
      term: '代襲相続',
      reading: 'だいしゅうそうぞく',
      description: '相続人が被相続人より先に死亡している場合、その子が代わりに相続すること。',
      relatedArticles: []
    },
    {
      term: '単純承認',
      reading: 'たんじゅんしょうにん',
      description: 'プラスの財産もマイナスの財産もすべてを引き継ぐ相続方法。特に手続きをしなければ単純承認したとみなされる。',
      relatedArticles: []
    },
    {
      term: '断捨離',
      reading: 'だんしゃり',
      description: '不要な物を断ち、捨て、物への執着から離れるという考え方。終活における生前整理でも取り入れられる。',
      relatedArticles: ['/articles/2025-01-18-seizen-seiri']
    },
    {
      term: '団体信用生命保険',
      reading: 'だんたいしんようせいめいほけん',
      description: '住宅ローンを組む際に加入する保険。契約者が死亡または高度障害になった場合、保険金でローン残高が返済される。',
      relatedArticles: []
    },
    {
      term: '通夜',
      reading: 'つや',
      description: '葬儀の前夜に行う儀式。故人と最後の夜を過ごし、別れを告げる場。現代では1〜2時間程度の「半通夜」が主流。',
      relatedArticles: []
    },
    {
      term: 'デジタル終活',
      reading: 'でじたるしゅうかつ',
      description: 'SNSアカウントやネット上の資産、パスワードなどのデジタル情報を整理・管理する終活。',
      relatedArticles: ['/articles/2025-01-23-shukatu-trend-2024']
    },
    {
      term: 'デジタル遺品',
      reading: 'でじたるいひん',
      description: 'パソコンやスマホ内のデータ、SNSアカウント、ネット上の資産など。',
      relatedArticles: ['/articles/2025-01-23-shukatu-trend-2024']
    },
    {
      term: '登記簿謄本',
      reading: 'とうきぼとうほん',
      description: '不動産の所在・地番・所有者などが記録された公的な書類。法務局で取得でき、相続手続きや不動産売却時に必要となる。',
      relatedArticles: []
    },
    {
      term: '特別受益',
      reading: 'とくべつじゅえき',
      description: '相続人が被相続人から生前に受けた特別な利益（贈与・遺贈など）。遺産分割の際にこれを考慮して公平な分配を行う。',
      relatedArticles: []
    },
    {
      term: '特別養護老人ホーム',
      reading: 'とくべつようごろうじんほーむ',
      description: '常時介護が必要な高齢者が入居できる公的施設。「特養」とも呼ばれ、費用が比較的低い。入居待ちが多い施設でもある。',
      relatedArticles: []
    }
  ],
  'な': [
    {
      term: '二次相続',
      reading: 'にじそうぞく',
      description: '配偶者が亡くなった後に発生する相続。一次相続で配偶者が財産を多く取得すると、二次相続での相続税負担が大きくなる場合がある。',
      relatedArticles: []
    },
    {
      term: '認知症',
      reading: 'にんちしょう',
      description: '脳の病気や障害により記憶・判断などの認知機能が低下した状態。認知症になると遺言書の作成や財産管理が困難になるため、事前の対策が重要。',
      relatedArticles: []
    },
    {
      term: '認定調査',
      reading: 'にんていちょうさ',
      description: '介護保険の要介護・要支援認定を行うための調査。市区町村の調査員が自宅等を訪問し、心身の状況を確認する。',
      relatedArticles: []
    },
    {
      term: '任意後見契約',
      reading: 'にんいこうけんけいやく',
      description: '将来判断能力が低下した時に備えて、あらかじめ後見人を決めておく契約。',
      relatedArticles: []
    },
    {
      term: '納骨',
      reading: 'のうこつ',
      description: '火葬した遺骨をお墓や納骨堂などに納めること。四十九日法要後に行われることが多い。',
      relatedArticles: []
    },
    {
      term: '年金の手続き',
      reading: 'ねんきんのてつづき',
      description: '家族が亡くなった際に必要な年金関係の手続き。受給停止の届出や遺族年金の請求など、期限内に年金事務所で手続きを行う。',
      relatedArticles: []
    }
  ],
  'は': [
    {
      term: '配偶者居住権',
      reading: 'はいぐうしゃきょじゅうけん',
      description: '配偶者が相続開始時に住んでいた自宅に、終身または一定期間住み続ける権利。',
      relatedArticles: []
    },
    {
      term: '墓じまい',
      reading: 'はかじまい',
      description: '墓石を撤去し墓地を返還すること。遺骨は別の場所に移すか散骨などを行う。',
      relatedArticles: []
    },
    {
      term: '被相続人',
      reading: 'ひそうぞくにん',
      description: '亡くなって財産を残した人のこと。相続される側の人を指す言葉で、相続人とは対になる概念。',
      relatedArticles: []
    },
    {
      term: '秘密証書遺言',
      reading: 'ひみつしょうしょいごん',
      description: '遺言の内容を秘密にしたまま公証役場で存在を証明してもらう遺言方式。内容は自分で作成し、封印して公証人に提出する。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '付言事項',
      reading: 'ふげんじこう',
      description: '遺言書の中で法的効力のない付言（メッセージ）として記載する事項。家族への感謝の言葉や遺言を作成した理由などを伝える。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '不動産登記',
      reading: 'ふどうさんとうき',
      description: '不動産の所在・所有者・権利関係などを法務局が管理する登記簿に記録すること。相続による所有権移転登記は2024年4月から義務化。',
      relatedArticles: []
    },
    {
      term: '不動産の相続評価',
      reading: 'ふどうさんのそうぞくひょうか',
      description: '相続税の計算で使用する不動産の評価額。土地は路線価方式または倍率方式で、建物は固定資産税評価額をそのまま使用する。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '弁護士',
      reading: 'べんごし',
      description: '法律の専門家。相続争いの調停・訴訟、遺言書作成のアドバイスなど、複雑な相続問題の解決において重要な役割を担う。',
      relatedArticles: []
    },
    {
      term: '法定相続人',
      reading: 'ほうていそうぞくにん',
      description: '民法で定められた相続人。配偶者は常に相続人、子・親・兄弟姉妹の順で相続権がある。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '法定相続分',
      reading: 'ほうていそうぞくぶん',
      description: '民法が定める各相続人の相続割合。配偶者と子が相続する場合は各1/2、配偶者と親の場合は2/3と1/3など。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '法務局',
      reading: 'ほうむきょく',
      description: '不動産登記・商業登記・戸籍・供託などを扱う国の機関。2020年から遺言書保管制度も法務局で実施されている。',
      relatedArticles: []
    },
    {
      term: '保険金受取人',
      reading: 'ほけんきんうけとりにん',
      description: '生命保険の保険金を受け取る権利を持つ人。受取人の指定によって相続税の課税方法が変わるため、定期的な見直しが重要。',
      relatedArticles: []
    },
    {
      term: '保佐人',
      reading: 'ほさにん',
      description: '判断能力が著しく不十分な人を支援する成年後見制度の類型の一つ。後見人より支援の範囲が限定的で、特定の行為に同意権を持つ。',
      relatedArticles: []
    }
  ],
  'ま': [
    {
      term: '見守りサービス',
      reading: 'みまもりさーびす',
      description: '高齢者の安否確認や緊急時対応を行うサービス。センサーや定期訪問など方法は様々。',
      relatedArticles: []
    },
    {
      term: 'みなし相続財産',
      reading: 'みなしそうぞくざいさん',
      description: '民法上は相続財産ではないが、相続税の課税上は相続財産とみなされる財産。生命保険金や死亡退職金が代表例。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '民事信託',
      reading: 'みんじしんたく',
      description: '信託銀行など専門機関を使わず、家族などの間で財産管理を行う信託契約。家族信託とも呼ばれ、柔軟な財産管理・承継が可能。',
      relatedArticles: []
    },
    {
      term: '名義変更',
      reading: 'めいぎへんこう',
      description: '相続によって不動産・預貯金・有価証券などの所有者名義を故人から相続人へ変更する手続きの総称。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '墓地・埋葬法',
      reading: 'ぼちまいそうほう',
      description: '墓地の経営や埋葬などを規制する法律の通称。墓地以外での埋葬や散骨に関するルールの根拠となる法律。',
      relatedArticles: []
    },
    {
      term: '孫への相続',
      reading: 'まごへのそうぞく',
      description: '祖父母が孫に財産を遺すこと。遺言書による遺贈や、養子縁組により孫を法定相続人にする方法などがある。',
      relatedArticles: []
    },
    {
      term: '未成年後見人',
      reading: 'みせいねんこうけんにん',
      description: '親権者のいない未成年者の法定代理人として財産管理や身上監護を行う人。遺言で指定するか家庭裁判所が選任する。',
      relatedArticles: []
    },
    {
      term: '免責的債務引受',
      reading: 'めんせきてきさいむひきうけ',
      description: '被相続人の債務を特定の相続人が引き受け、他の相続人を免責する方法。債権者の承諾が必要となる。',
      relatedArticles: []
    }
  ],
  'や': [
    {
      term: '養子縁組',
      reading: 'ようしえんぐみ',
      description: '血縁関係のない人を法律上の親子関係にする制度。相続税対策として養子縁組を行うと法定相続人が増え、基礎控除額が増加する。',
      relatedArticles: []
    },
    {
      term: '要介護認定',
      reading: 'ようかいごにんてい',
      description: '介護保険サービスを利用するために必要な認定。要支援1〜2・要介護1〜5の7段階に区分され、受けられるサービスが異なる。',
      relatedArticles: []
    },
    {
      term: '遺言執行',
      reading: 'ゆいごんしっこう',
      description: '遺言書の内容を実現するために行われる一連の手続き。相続財産の目録作成、遺産の引渡し、不動産の名義変更などが含まれる。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '遺言書保管制度',
      reading: 'ゆいごんしょほかんせいど',
      description: '2020年7月に開始された自筆証書遺言を法務局で保管する制度。紛失・改ざんのリスクがなく、家庭裁判所の検認も不要となる。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '遺言信託',
      reading: 'ゆいごんしんたく',
      description: '信託銀行等が遺言書の作成から執行まで総合的にサポートするサービス。',
      relatedArticles: []
    }
  ],
  'ら': [
    {
      term: '霊園',
      reading: 'れいえん',
      description: '墓地の一形態で、公園のように整備された広い墓所。公営霊園・民営霊園・寺院墓地などの種類がある。',
      relatedArticles: []
    },
    {
      term: 'リビングウィル',
      reading: 'りびんぐうぃる',
      description: '終末期医療についての事前指示書。延命治療の希望などを明記する。',
      relatedArticles: []
    },
    {
      term: '老人ホーム',
      reading: 'ろうじんほーむ',
      description: '高齢者が生活する入居型施設の総称。特別養護老人ホーム・有料老人ホーム・サービス付き高齢者向け住宅など多様な形態がある。',
      relatedArticles: []
    },
    {
      term: '老後資金',
      reading: 'ろうごしきん',
      description: '退職後の生活に必要な資金。公的年金だけでは不足するケースも多く、早期からの計画的な準備が重要とされる。',
      relatedArticles: []
    },
    {
      term: '老老介護',
      reading: 'ろうろうかいご',
      description: '65歳以上の高齢者が65歳以上の高齢者を介護する状況。日本の高齢化が進む中で深刻な社会問題となっている。',
      relatedArticles: []
    },
    {
      term: '路線価',
      reading: 'ろせんか',
      description: '相続税・贈与税における土地評価の基準となる価格。国税庁が毎年公表し、道路に面した土地1平方メートルあたりの価額を示す。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    }
  ]
};

// 構造化データ
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "終活・相続用語集",
  "description": "終活や相続に関する専門用語の解説集",
  "url": `${siteUrl}/glossary`,
  "hasDefinedTerm": Object.values(glossaryData).flat().map(item => ({
    "@type": "DefinedTerm",
    "name": item.term,
    "description": item.description,
    "inDefinedTermSet": `${siteUrl}/glossary`,
  })),
};

export default function GlossaryPage() {
  const kanaGroups = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'];
  
  return (
    <div className={styles['glossary-container']}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className={styles['glossary-header']}>
        <h1>終活・相続用語集</h1>
        <p className={styles['glossary-description']}>
          終活や相続に関する専門用語をわかりやすく解説します。
          五十音順で探したい用語を見つけてください。
        </p>
      </div>

      {/* 五十音インデックス */}
      <nav className={styles['kana-index']}>
        {kanaGroups.map(kana => (
          <a
            key={kana}
            href={`#${kana}`}
            className={glossaryData[kana] ? styles['kana-link'] : `${styles['kana-link']} ${styles['disabled']}`}
          >
            {kana}
          </a>
        ))}
      </nav>

      {/* 用語一覧 */}
      <div className={styles['glossary-content']}>
        {Object.entries(glossaryData).map(([kana, terms]) => (
          <section key={kana} id={kana} className={styles['kana-section']}>
            <h2 className={styles['kana-heading']}>{kana}</h2>
            <dl className={styles['term-list']}>
              {terms.map((item, index) => (
                <div key={index} className={styles['term-item']}>
                  <dt className={styles['term-title']}>
                    <span className={styles['term']}>{item.term}</span>
                    <span className={styles['reading']}>（{item.reading}）</span>
                  </dt>
                  <dd className={styles['term-description']}>
                    {item.description}
                    {item.relatedArticles.length > 0 && (
                      <div className={styles['related-links']}>
                        <span className={styles['related-label']}>関連記事：</span>
                        {item.relatedArticles.map((link, i) => (
                          <Link key={i} href={link} className={styles['related-link']}>
                            詳しく見る
                          </Link>
                        ))}
                      </div>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
