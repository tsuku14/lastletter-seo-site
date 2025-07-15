import styles from './faq.module.css';

export const metadata = {
  title: 'よくある質問（FAQ）',
  description: '終活・相続に関するよくある質問と回答をまとめました。疑問や不安を解決します。',
  keywords: ['終活 質問', '相続 FAQ', 'よくある質問', '終活 疑問', '相続 相談'],
};

const faqCategories = [
  {
    category: '終活全般',
    questions: [
      {
        q: '終活はいつから始めるべきですか？',
        a: '終活に「早すぎる」ということはありません。30代・40代から始める方も増えています。健康で判断力があるうちに始めることで、じっくりと考えて準備できます。一般的には、50代から本格的に始める方が多いです。',
        relatedLinks: [
          { text: '終活とは？いつから始める？', href: '/articles/2025-01-14-shukatu-toha' },
          { text: '30代・40代の終活', href: '/articles/2025-01-22-30dai-40dai-shukatu' }
        ]
      },
      {
        q: '終活にはどのくらい費用がかかりますか？',
        a: 'エンディングノート作成なら1,000円程度から始められます。専門家への相談は初回無料の場合も多く、遺言書作成で5〜20万円、総合的なサポートで月額3,000円程度のサブスクリプションサービスもあります。',
        relatedLinks: []
      },
      {
        q: '終活は縁起が悪くないですか？',
        a: '終活は「死ぬ準備」ではなく「より良く生きるための準備」です。自分の人生を整理し、家族への思いやりを形にする前向きな活動です。実際に終活を始めた方の多くが「気持ちが楽になった」と話されています。',
        relatedLinks: []
      }
    ]
  },
  {
    category: '相続・遺言',
    questions: [
      {
        q: '遺言書は必ず作らないといけませんか？',
        a: '法律上の義務ではありませんが、以下の場合は作成を強くお勧めします：①子供がいない夫婦、②再婚で前婚の子がいる、③相続人が多い、④特定の人に多く残したい、⑤事業を営んでいる。遺言書があれば相続トラブルを防げます。',
        relatedLinks: [
          { text: '公正証書遺言の作成方法', href: '/articles/2025-01-20-igonsho-kakikata' }
        ]
      },
      {
        q: '相続税はいくらからかかりますか？',
        a: '基礎控除額（3,000万円＋600万円×法定相続人数）を超える場合に相続税がかかります。例えば、配偶者と子2人なら4,800万円までは非課税です。実際に相続税を払う人は全体の約8.8％です。',
        relatedLinks: [
          { text: '相続税がかからない財産', href: '/articles/2025-01-15-souzokuzei-kakaranai' }
        ]
      },
      {
        q: '相続放棄はどうやってするのですか？',
        a: '相続開始を知った日から3ヶ月以内に、家庭裁判所で相続放棄の申述をする必要があります。必要書類は申述書、戸籍謄本、住民票除票など。一度放棄すると撤回できないので慎重に判断しましょう。',
        relatedLinks: [
          { text: '相続手続きの期限一覧', href: '/articles/2025-01-16-souzoku-tetsuzuki-kigen' }
        ]
      }
    ]
  },
  {
    category: '葬儀・お墓',
    questions: [
      {
        q: '家族葬と一般葬の違いは何ですか？',
        a: '家族葬は家族や親しい人のみ（10〜30名程度）で行う葬儀で、費用は20〜100万円程度。一般葬は広く参列者を受け入れる葬儀で、50〜200名規模、費用は100〜200万円程度です。最近は家族葬を選ぶ方が増えています。',
        relatedLinks: [
          { text: '家族葬の費用相場', href: '/articles/2025-01-17-kazokuso-hiyou' }
        ]
      },
      {
        q: '散骨は法律的に問題ありませんか？',
        a: '散骨自体は違法ではありませんが、ルールがあります。海洋散骨は沖合で行う、山林散骨は土地所有者の許可を得る、遺骨は2mm以下に粉骨するなど。専門業者に依頼すれば安心です。',
        relatedLinks: []
      },
      {
        q: '生前にお墓を建てても良いですか？',
        a: 'もちろん大丈夫です。生前にお墓を建てることを「寿陵」といい、縁起が良いとされています。相続税対策にもなり、自分の希望通りのお墓を建てられるメリットがあります。',
        relatedLinks: []
      }
    ]
  },
  {
    category: 'エンディングノート・生前整理',
    questions: [
      {
        q: 'エンディングノートに法的効力はありますか？',
        a: 'エンディングノートに法的効力はありません。財産分与など法的効力が必要な内容は遺言書に記載する必要があります。ただし、医療・介護の希望や葬儀の希望など、家族への意思表示として重要な役割があります。',
        relatedLinks: [
          { text: '終活ノートの書き方', href: '/articles/2025-01-19-shukatu-note-kakikata' }
        ]
      },
      {
        q: '生前整理はどこから始めれば良いですか？',
        a: 'まず財布の中身から始めることをお勧めします。次に、1日1個ルールで不要なものを処分。写真や思い出の品は最後にしましょう。大切なのは完璧を目指さず、できることから少しずつ進めることです。',
        relatedLinks: [
          { text: '生前整理はいつから？', href: '/articles/2025-01-18-seizen-seiri' }
        ]
      },
      {
        q: 'デジタル遺品はどう管理すれば良いですか？',
        a: 'パスワード管理アプリを使い、マスターパスワードを信頼できる人に伝える方法が安全です。SNSは追悼アカウント設定、金融関係は存在を家族に伝えておきましょう。定期的な見直しも重要です。',
        relatedLinks: [
          { text: '終活の新トレンド', href: '/articles/2025-01-23-shukatu-trend-2024' }
        ]
      }
    ]
  },
  {
    category: '費用・手続き',
    questions: [
      {
        q: '終活にかかる費用の総額はどのくらいですか？',
        a: '基本的な終活（エンディングノート、生前整理）なら数千円から可能です。専門家サポートを含めても、遺言書作成10〜30万円、相続対策相談5〜10万円程度。葬儀の事前契約は別途必要に応じて検討しましょう。',
        relatedLinks: []
      },
      {
        q: '役所での手続きは平日しかできませんか？',
        a: '多くの自治体で土曜開庁や時間延長を実施しています。マイナンバーカードがあればコンビニで住民票や印鑑証明書を取得できます。郵送対応も可能な手続きが増えています。',
        relatedLinks: []
      },
      {
        q: '専門家に相談する際の選び方は？',
        a: '相談内容により適切な専門家が異なります。遺言書・相続は弁護士や司法書士、相続税は税理士、生前整理は専門業者へ。初回相談無料の事務所も多いので、まずは相談してみることをお勧めします。',
        relatedLinks: []
      }
    ]
  }
];

// 構造化データ
const generateStructuredData = () => {
  const faqItems = [];
  faqCategories.forEach(category => {
    category.questions.forEach(item => {
      faqItems.push({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      });
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "終活・相続に関するよくある質問",
    "description": "終活・相続に関するよくある質問と回答",
    "mainEntity": faqItems
  };
};

export default function FAQPage() {
  const structuredData = generateStructuredData();

  return (
    <div className={styles['faq-container']}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className={styles['faq-header']}>
        <h1>よくある質問（FAQ）</h1>
        <p className={styles['faq-description']}>
          終活・相続に関する疑問や不安にお答えします。
          カテゴリー別に整理していますので、気になる項目をご確認ください。
        </p>
      </div>

      {/* カテゴリーナビゲーション */}
      <nav className={styles['category-nav']}>
        {faqCategories.map((cat, index) => (
          <a key={index} href={`#category-${index}`} className={styles['category-link']}>
            {cat.category}
          </a>
        ))}
      </nav>

      {/* FAQ本体 */}
      <div className={styles['faq-content']}>
        {faqCategories.map((category, catIndex) => (
          <section key={catIndex} id={`category-${catIndex}`} className={styles['faq-category']}>
            <h2 className={styles['category-title']}>{category.category}</h2>
            <div className={styles['questions-list']}>
              {category.questions.map((item, qIndex) => (
                <details key={qIndex} className={styles['faq-item']}>
                  <summary className={styles['faq-question']}>
                    <span className={styles['q-mark']}>Q</span>
                    <span className={styles['question-text']}>{item.q}</span>
                    <svg className={styles['arrow-icon']} width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className={styles['faq-answer']}>
                    <span className={styles['a-mark']}>A</span>
                    <div className={styles['answer-content']}>
                      <p>{item.a}</p>
                      {item.relatedLinks && item.relatedLinks.length > 0 && (
                        <div className={styles['related-articles']}>
                          <span className={styles['related-label']}>関連記事：</span>
                          {item.relatedLinks.map((link, linkIndex) => (
                            <a key={linkIndex} href={link.href} className={styles['related-link']}>
                              {link.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* お問い合わせ誘導 */}
      <div className={styles['contact-section']}>
        <h3>その他のご質問</h3>
        <p>
          こちらに掲載されていないご質問や、より詳しい情報をお求めの方は、
          各記事のコメント欄やお問い合わせフォームからお気軽にご連絡ください。
        </p>
      </div>
    </div>
  );
}