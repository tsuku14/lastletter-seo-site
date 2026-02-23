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
