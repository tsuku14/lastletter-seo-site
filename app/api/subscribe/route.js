// メール登録APIルート（Brevo API統合）
// 環境変数 BREVO_API_KEY を Vercel に設定後、実際のメール登録が有効になります
// セットアップ手順:
//   1. https://app.brevo.com に無料アカウント作成
//   2. API & Integrations → API Keys → 新しいAPIキーを作成
//   3. Contacts → Lists → 新しいリスト作成（例: 「終活チェックリスト読者」）
//   4. リストIDをメモ（数字）
//   5. Vercel環境変数に設定: BREVO_API_KEY, BREVO_LIST_ID

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    // バリデーション
    if (!email || !email.includes('@') || email.length > 200) {
      return Response.json(
        { message: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = parseInt(process.env.BREVO_LIST_ID || '1');

    // Brevo APIキーが未設定の場合はデモモードで成功を返す
    if (!brevoApiKey) {
      console.log(`[メール登録デモ] email=${email}, name=${name || '未設定'}`);
      return Response.json(
        { message: '登録を受け付けました（設定完了後にメールが届きます）', demo: true },
        { status: 200 }
      );
    }

    // Brevo API でコンタクトを追加
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name || '',
          SOURCE: '終活チェックリストLP',
        },
        listIds: [brevoListId],
        updateEnabled: true,  // 既存コンタクトも更新
      }),
    });

    if (brevoResponse.ok || brevoResponse.status === 204) {
      // 登録成功後、ウェルカムメールを自動送信（Brevo自動化が設定済みの場合）
      return Response.json(
        { message: 'ご登録ありがとうございます！チェックリストPDFをお送りしました。' },
        { status: 200 }
      );
    } else {
      const error = await brevoResponse.json().catch(() => ({}));
      // 既にコンタクトが存在する場合 (409) は成功扱い
      if (brevoResponse.status === 409 || error.code === 'duplicate_parameter') {
        return Response.json(
          { message: 'このメールアドレスは既に登録済みです。チェックリストPDFは先ほど送信済みです。' },
          { status: 200 }
        );
      }
      console.error('Brevo API error:', brevoResponse.status, error);
      return Response.json(
        { message: '登録処理中にエラーが発生しました。しばらく後にお試しください。' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return Response.json(
      { message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
