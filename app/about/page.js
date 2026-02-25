export const metadata = {
  title: '運営者情報 | 終活・相続情報センター',
  description: '終活・相続情報センターの運営者情報です。サイトの目的・制作方針・お問い合わせ先をご確認いただけます。',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>運営者情報</h1>

      <h2>サイト概要</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', backgroundColor: '#f9fafb', width: '35%', fontWeight: '600' }}>サイト名</th>
            <td style={{ padding: '0.75rem' }}>終活・相続情報センター</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', backgroundColor: '#f9fafb', fontWeight: '600' }}>運営</th>
            <td style={{ padding: '0.75rem' }}>LAST LETTER（ラストレター）</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', backgroundColor: '#f9fafb', fontWeight: '600' }}>公式サイト</th>
            <td style={{ padding: '0.75rem' }}><a href="https://lastletter.jp" target="_blank" rel="noopener noreferrer">https://lastletter.jp</a></td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', backgroundColor: '#f9fafb', fontWeight: '600' }}>お問い合わせ</th>
            <td style={{ padding: '0.75rem' }}>LAST LETTER公式サイトのお問い合わせフォームよりご連絡ください</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', backgroundColor: '#f9fafb', fontWeight: '600' }}>開設</th>
            <td style={{ padding: '0.75rem' }}>2025年1月</td>
          </tr>
        </tbody>
      </table>

      <h2>私たちのミッション</h2>
      <p>
        「終活・相続情報センター」は、終活や相続という、誰もがいつかは直面するテーマについて、
        正確で、分かりやすく、そして心に寄り添う情報を提供するために立ち上げられました。
      </p>
      <p>
        すべての人が「もしもの時」に備え、自分自身の意思を尊重され、
        残される家族の負担を少しでも軽減できる社会の実現を目指しています。
      </p>

      <h2>コンテンツの制作方針</h2>
      <p>当サイトのコンテンツは以下の方針で制作しています。</p>
      <ul>
        <li><strong>AI活用：</strong>記事の一部はAI（人工知能・GPT-4）を活用して生成しています</li>
        <li><strong>情報の正確性：</strong>公的機関（国税庁・法務省等）の情報を参照し、正確な情報提供に努めています</li>
        <li><strong>定期的な更新：</strong>法改正・制度変更に対応し、情報を随時アップデートしています</li>
        <li><strong>免責事項：</strong>本サイトの情報は一般的な情報提供が目的であり、専門的な法律・税務アドバイスの代替ではありません</li>
      </ul>

      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '0.5rem',
        padding: '1rem 1.5rem',
        marginBottom: '2rem'
      }}>
        <p style={{ margin: 0, fontWeight: '600' }}>⚠️ 重要なご注意</p>
        <p style={{ margin: '0.5rem 0 0' }}>
          当サイトの記事はAI生成を含む一般的な情報提供であり、個別の法律・税務・医療アドバイスではありません。
          実際の手続きや判断には、必ず弁護士・税理士・司法書士等の専門家にご相談ください。
          詳しくは<a href="/disclaimer">免責事項</a>をご確認ください。
        </p>
      </div>

      <h2>編集・監修体制</h2>
      <p>
        当サイトの記事は、以下の体制で品質を管理しています。
      </p>

      {/* 編集部プロフィール */}
      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          {
            role: '編集長',
            name: '終活・相続情報センター 編集部',
            expertise: '終活・エンディングノート・生前整理',
            description: '終活・相続分野の情報を専門とする編集チーム。国税庁・法務省・厚生労働省の公式情報を参照し、最新の法改正を反映した情報提供に努めています。',
            icon: '📝',
          },
          {
            role: '法律・相続手続き監修',
            name: '司法書士・弁護士の知見を参照',
            expertise: '相続登記・遺言書・相続放棄・成年後見制度',
            description: '相続登記義務化（2024年）など最新の法改正情報は、法務省・日本司法書士会連合会の公式情報をもとに正確性を確認しています。',
            icon: '⚖️',
          },
          {
            role: '税務・相続税監修',
            name: '税理士の知見を参照',
            expertise: '相続税・贈与税・準確定申告・小規模宅地等の特例',
            description: '相続税の計算・節税対策に関する情報は、国税庁の公式タックスアンサーおよび税理士・税務の専門書籍を参照して制作しています。',
            icon: '💰',
          },
          {
            role: '介護・福祉情報監修',
            name: '介護・福祉の専門知識を参照',
            expertise: '介護保険制度・要介護認定・老人ホーム選び・認知症対応',
            description: '厚生労働省・各都道府県の介護保険情報、および介護福祉士・ケアマネジャーの専門情報を参照して制作しています。',
            icon: '💊',
          },
        ].map((expert, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '1rem',
            padding: '1.25rem',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            background: '#f9fafb',
          }}>
            <div style={{ fontSize: '2rem', flexShrink: 0 }}>{expert.icon}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ background: '#1e3a5f', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>{expert.role}</span>
              </div>
              <div style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem' }}>{expert.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>専門：{expert.expertise}</div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151', lineHeight: '1.7' }}>{expert.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
      }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#1d4ed8' }}>📋 品質管理について</p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#374151' }}>
          記事の一部はAI（GPT-4）を活用して初稿を生成し、編集部が内容を確認・修正しています。
          法律・税務の数値や制度については、公的機関の一次情報を参照して正確性を担保しています。
          情報は定期的にアップデートしていますが、最終的な判断は必ず専門家にご確認ください。
        </p>
      </div>

      <h2>LAST LETTERについて</h2>
      <p>
        当サイトは、「もしもの時」に大切な人へメッセージを届けるサービス「LAST LETTER」が運営しています。
        終活の一環として、事前にメッセージや連絡先を登録しておくことで、
        ご家族の負担を軽減するサービスです。
      </p>
      <p>
        <a href="https://lastletter.jp" target="_blank" rel="noopener noreferrer">
          LAST LETTER公式サイトはこちら →
        </a>
      </p>

      <h2>お問い合わせ</h2>
      <p>
        記事の内容に関するご意見・ご指摘、または掲載情報の誤りについては、
        <a href="https://lastletter.jp" target="_blank" rel="noopener noreferrer">LAST LETTER公式サイト</a>
        のお問い合わせフォームよりご連絡ください。
        いただいたご意見は、コンテンツ改善に活用させていただきます。
      </p>
    </div>
  );
}
