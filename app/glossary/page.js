import Link from 'next/link';
import styles from './glossary.module.css';

export const metadata = {
  title: '終活・相続用語集',
  description: '終活や相続に関する専門用語をわかりやすく解説。五十音順で簡単に検索できます。',
  keywords: ['終活用語', '相続用語', '専門用語', '用語集', '辞典'],
};

const glossaryData = {
  'あ': [
    {
      term: '遺言執行者',
      reading: 'いごんしっこうしゃ',
      description: '遺言の内容を実現するために必要な手続きを行う人。遺言書で指定するか、家庭裁判所が選任する。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    },
    {
      term: '遺産分割協議',
      reading: 'いさんぶんかつきょうぎ',
      description: '相続人全員で遺産の分け方を話し合うこと。全員の同意が必要で、協議書を作成する。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '遺留分',
      reading: 'いりゅうぶん',
      description: '一定の相続人に保障された最低限の相続分。配偶者と子は法定相続分の1/2、親は1/3。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: 'エンディングノート',
      reading: 'えんでぃんぐのーと',
      description: '自分の情報や希望、想いを記録し家族に伝えるためのノート。法的効力はないが終活の基本ツール。',
      relatedArticles: ['/articles/2025-01-19-shukatu-note-kakikata']
    }
  ],
  'か': [
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
      term: '基礎控除',
      reading: 'きそこうじょ',
      description: '相続税の計算で相続財産から差し引ける金額。3,000万円+600万円×法定相続人数。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    },
    {
      term: '公正証書遺言',
      reading: 'こうせいしょうしょいごん',
      description: '公証人が作成する遺言書。最も確実で安全な遺言方式だが費用がかかる。',
      relatedArticles: ['/articles/2025-01-20-igonsho-kakikata']
    }
  ],
  'さ': [
    {
      term: '死後事務委任契約',
      reading: 'しごじむいにんけいやく',
      description: '死後の諸手続きを第三者に委任する契約。葬儀・納骨・遺品整理などを依頼できる。',
      relatedArticles: []
    },
    {
      term: '終活',
      reading: 'しゅうかつ',
      description: '人生の終わりに向けた活動の略。自分らしい最期を迎えるための準備全般を指す。',
      relatedArticles: ['/articles/2025-01-14-shukatu-toha']
    },
    {
      term: '準確定申告',
      reading: 'じゅんかくていしんこく',
      description: '亡くなった人の所得税を相続人が代わりに申告すること。相続開始から4ヶ月以内。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
    },
    {
      term: '生前整理',
      reading: 'せいぜんせいり',
      description: '生きているうちに身の回りの物や情報を整理すること。家族の負担軽減になる。',
      relatedArticles: ['/articles/2025-01-18-seizen-seiri']
    },
    {
      term: '相続放棄',
      reading: 'そうぞくほうき',
      description: 'プラスもマイナスも含めて一切の相続を放棄すること。3ヶ月以内に家庭裁判所で手続き。',
      relatedArticles: ['/articles/2025-01-16-souzoku-tetsuzuki-kigen']
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
      term: 'デジタル遺品',
      reading: 'でじたるいひん',
      description: 'パソコンやスマホ内のデータ、SNSアカウント、ネット上の資産など。',
      relatedArticles: ['/articles/2025-01-23-shukatu-trend-2024']
    }
  ],
  'な': [
    {
      term: '任意後見契約',
      reading: 'にんいこうけんけいやく',
      description: '将来判断能力が低下した時に備えて、あらかじめ後見人を決めておく契約。',
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
      term: '法定相続人',
      reading: 'ほうていそうぞくにん',
      description: '民法で定められた相続人。配偶者は常に相続人、子・親・兄弟姉妹の順で相続権がある。',
      relatedArticles: ['/articles/2025-01-15-souzokuzei-kakaranai']
    }
  ],
  'ま': [
    {
      term: '見守りサービス',
      reading: 'みまもりさーびす',
      description: '高齢者の安否確認や緊急時対応を行うサービス。センサーや定期訪問など方法は様々。',
      relatedArticles: []
    }
  ],
  'や': [
    {
      term: '遺言信託',
      reading: 'ゆいごんしんたく',
      description: '信託銀行等が遺言書の作成から執行まで総合的にサポートするサービス。',
      relatedArticles: []
    }
  ],
  'ら': [
    {
      term: 'リビングウィル',
      reading: 'りびんぐうぃる',
      description: '終末期医療についての事前指示書。延命治療の希望などを明記する。',
      relatedArticles: []
    }
  ]
};

// 構造化データ
const structuredData = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "終活・相続用語集",
  "description": "終活や相続に関する専門用語の解説集",
  "url": "https://lastletter.jp/glossary"
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