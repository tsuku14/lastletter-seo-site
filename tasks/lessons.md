# Lessons Learned

## 2026-02-25 セッションまとめ

### バグ修正パターン

#### generate-batch.js: `new Date(undefined)` の truthy trap
- **問題**: `new Date(process.argv[3]) || new Date()` - `new Date(undefined)` はオブジェクトで truthy → フォールバックが効かない
- **修正**: `process.argv[3] ? new Date(process.argv[3]) : new Date()` (ternary使用)
- **教訓**: `||` フォールバックはプリミティブ値に対してのみ安全。オブジェクト型では必ず ternary を使う

#### generate-batch.js: テンプレートリテラル内のバッククォート
- **問題**: template literal 文字列 (backtick) の中にバッククォートを含む文字列を入れると SyntaxError
- **修正**: バッククォートを使わない書き方に変更（例: `` `SLUG: example` `` → `SLUG: example`）
- **教訓**: プロンプト文字列内でコードサンプルを示す場合はバッククォートを避けるか `\`` でエスケープ

#### generate-batch.js: 日本語タイトルからのスラッグ生成
- **問題**: `title.replace(/[^\w\s]/gi, '')` は日本語文字を全削除 → 空スラッグ → 29/30記事が `2026-MM-DD-.md` に
- **修正**:
  1. AIにSLUG行を出力させてパース: `const slugMatch = rawResponse.match(/^SLUG:\s*([a-z0-9][a-z0-9-]{2,60}[a-z0-9])\s*\n/m)`
  2. フォールバック: カテゴリ略称 + `Date.now().toString(36)`
  3. 既存29記事はカテゴリ別連番でリネーム (sougi-1, souzoku-2 等)
- **教訓**: 日本語コンテンツでは `/[^\w]/` は使えない。スラッグはASCIIのみで生成する必要がある

#### ai-review.yml: `grep -c . || echo 0` の多重出力
- **問題**: `$(echo "$FILES" | grep -c . || echo 0)` → 空入力時に grep が `0\n` 出力後 exit 1 → echo 0 も実行 → `FILE_COUNT="0\n0"` (2行)
- **修正**: if 文で空チェック後にカウント: `if [ -z "$FILES" ]; then FILE_COUNT=0; else FILE_COUNT=$(echo "$FILES" | grep -c .); fi`
- **教訓**: `$(A || B)` は A の stdout + B の stdout が両方キャプチャされる

#### generate-sitemap.js: `.md` だけで `.mdx` を除外
- **問題**: `file.endsWith('.md')` は `.mdx` にマッチしない → 50件の .mdx 記事がサイトマップに入らず
- **修正**: `file.endsWith('.md') || file.endsWith('.mdx')`
- **教訓**: Next.js の articles ディレクトリは .md と .mdx の両方が混在することを常に考慮

### SEO/機能改善パターン

#### 静的ページのサイトマップ追加忘れ
- **問題**: `/about`, `/faq`, `/glossary`, `/download`, `/privacy-policy`, `/terms`, `/disclaimer` がサイトマップに未掲載
- **修正**: `generate-sitemap.js` に `staticPages` 配列を追加
- **教訓**: 新しいページを作ったら必ずサイトマップ追加を確認

#### カテゴリページにパンくずリスト + 構造化データ追加
- JSON-LD の BreadcrumbList を追加するとリッチリザルトに表示される可能性がある

#### WebSite + SearchAction 構造化データ
- ホームページには WebSite スキーマ + SearchAction を追加するとサイト内検索ボックスが Google に認識される

### アーキテクチャメモ

#### ファイル構成
- 記事: `/articles/*.md` と `/articles/*.mdx` 混在（50 .mdx + 70+ .md）
- `lib/articles.js`: 両拡張子を読み込む (`file.endsWith('.md') || file.endsWith('.mdx')`)
- サイトマップ生成: `scripts/generate-sitemap.js`（`npm run build` 内で自動実行）
- バッチ生成: `scripts/generate-batch.js`（GitHub Actions 経由で手動・自動実行）

#### デプロイフロー
1. ローカル修正 → `git push` → GitHub Actions (AI Article Review)
2. バッチ生成: `batch-generate.yml` を手動トリガー → 30記事を生成 → コミット → AI Article Review が自動実行
3. 毎日0時 (JST): `generate-content.yml` → `npm run generate` → 10記事生成 → コミット

#### A8.net アフィリエイト
- Amazon アフィリエイトタグ: `a8-affi-321840-22`
- URL形式: `https://px.a8.net/svt/ejp?a8mat=1ZT775+10WXTU+249K+BWGDT&a8ejpredirect=[二重URLエンコード]`
- まだ審査中のプログラム: みんなの介護, 終活と相続のまどぐち, 保険見直しラボ, よりそうお葬式, 税理士ドットコム

#### バッチ生成: OpenAI 429 quota exceeded
- **問題**: 3rd バッチ実行時に全記事が `429 You exceeded your current quota` で失敗→0記事生成
- **対策**: generate-batch.js にリトライロジック（最大3回、指数バックオフ）は実装済みだが、quota超過はリトライでは解決しない
- **教訓**: OpenAI API quotaを定期確認。毎日自動生成の量を quota に合わせて調整

#### descriptionにMarkdown見出しが混入
- **問題**: articleBodyの最初の120文字が `# タイトル ## 見出し` のMarkdown見出しを含むことがある
- **修正**: `/#{1,6}\s+[^\n]*/g` と `/\*{1,3}([^*]+)\*{1,3}/g` で除去してから120字切り取り
- **教訓**: フロントマター自動生成時は必ずMarkdown記法を除去してからプレーンテキスト化する

### SEO/機能改善パターン（セッション2）

#### /articles 全記事一覧ページ
- searchParams を使うと Next.js の Dynamic Rendering になる（静的生成より遅くなる可能性）
- カテゴリフィルターはURLクエリ `?category=xxx` で実装

#### 読了時間表示
- `contentHtml.replace(/<[^>]*>/g, '').length / 400` で日本語読了時間を推定（400字/分）
- `Math.max(1, Math.ceil(...))` で最低1分を保証

#### EmailCapture + /download ページ
- 終活チェックリストPDF の無料配布でメールリスト収集
- Brevo API（`/api/subscribe`）でコンタクト追加
- BREVO_API_KEY 未設定時はデモモードで成功レスポンス返す

### バグ修正パターン（セッション3）

#### lib/articles.js: .mdxファイル先頭改行でfrontmatter解析失敗
- **問題**: 50件の `.mdx` ファイルが先頭に `\n` があり `gray-matter` が frontmatter を解析できない → title/date/category/description が全て `{}`
- **修正**: `fs.readFileSync(filePath, 'utf8').trimStart()` を追加（getArticleData + getAllArticles の2箇所）
- **教訓**: `gray-matter` は frontmatter が **ファイルの先頭** から始まる `---` でないと認識しない。ファイル読み込み時に必ず `trimStart()` を通す
- **影響**: 修正前は50記事がタイトル・カテゴリなしで表示（SEO上最悪）、修正後に149ページ生成

#### generate-sitemap.js: カテゴリURLの日本語エンコード
- **問題**: `encodeURIComponent(category)` → `/category/%E7%9B%B8%E7%B6%9A%E7%A8%8E` （実際のページURLと不一致）
- **修正**: `getCategorySlug()` 関数を組み込み → `/category/inheritance-tax`
- **教訓**: サイトマップのURL は実際に存在するページのURLと完全一致する必要がある

#### layout.js: 全ページのcanonical URLをrootに固定
- **問題**: `<link rel="canonical" href={siteUrl} />` が全ページの `<head>` に出力 → 全記事ページのcanonical がトップページを指す（重大SEOバグ）
- **修正**: layout.js から手動の `<link>` タグを削除し、各ページで `alternates: { canonical: '/path' }` を追加
- **教訓**: Next.js App Router では canonical は metadata の `alternates.canonical` で設定する。layout の `<head>` にハードコードしない

#### /search ページ: useSearchParams() の prerender エラー
- **問題**: `useSearchParams()` を使うページを Next.js がプリレンダリングしようとして失敗
- **修正**: page.js は Server Component にして `<Suspense>` でラップ、クライアントコンポーネントを `SearchContent.js` に分離
- **教訓**: `useSearchParams()` は必ず `<Suspense>` 内の Client Component で使う

### SEO/機能改善パターン（セッション3）

#### 動的OGP画像生成
- Next.js 14 の `next/og` (`@vercel/og`) で `/api/og` エンドポイントを作成
- `?title=...&category=...` クエリパラメータで動的な画像を生成
- 全記事ページのOGP/Twitter card/JSON-LD imageを動的URLに切り替え

#### 全ページにalternates.canonical追加
- 全ての静的ページ（about/faq/glossary/download/search/articles/terms/privacy-policy/disclaimer）
- 記事ページ: `/articles/[slug]`、カテゴリページ: `/category/[categoryName]`
- Next.js の `metadataBase` と組み合わせることで絶対URLが自動生成される

#### 用語集JSON-LD強化
- `DefinedTermSet.hasDefinedTerm` に全100語を追加
- GoogleはDefinedTermのrich snippet対応を強化中

#### scripts/fix-descriptions.js
- descriptionが空の記事の本文から説明文を自動生成するユーティリティ
- `matter.stringify(content, data)` で既存ファイルにfrontmatterを追加する方法

### バグ修正パターン（セッション4）

#### lib/articles.js: tagToCategoryMap が不完全で多くの mdx 記事が「その他」に分類
- **問題**: mdx ファイルは tags を持ち category はない。tagToCategoryMap が14タグしかなく、「高齢者施設」「老人ホーム」「認知症」「終活」「供養」などが未マッピング → 多数の記事が「その他」カテゴリに
- **修正**: tagToCategoryMap を14→60+タグに大幅拡張（介護・福祉カテゴリの関連タグを重点追加）
- **教訓**: tagToCategoryMap は生成される記事のタグパターンに合わせて継続的に更新が必要

#### app/articles/[slug]/page.js: 日本語見出しの TOC ID が空文字になる
- **問題**: `text.replace(/[^\w\s]/gi, '')` → 日本語文字を全削除 → id が空文字 → `<h2 id="">` → TOCリンクが機能しない
- **修正**: `const rawId = ...; const id = rawId.length >= 2 ? rawId : \`section-\${++headingIndex}\`` でフォールバック連番IDを使用
- **教訓**: 日本語コンテンツではIDは `section-1`, `section-2`... の連番にフォールバックするのが確実

#### app/page.js: 「すべての記事を見る」ボタンが誤ったURLを指定
- **問題**: `href="/category/souzoku-tetsuzuki"` → 相続手続きカテゴリに飛ぶ（全記事一覧ではない）
- **修正**: `href="/articles"` → 全記事一覧ページへ + 記事数を表示

#### scripts/generate-sitemap.js: mdx 記事のカテゴリが推測されずサイトマップに欠落
- **問題**: generate-sitemap.js は `frontmatter.category` のみ参照 → tags しか持たない mdx 記事のカテゴリが null → `care-welfare`, `obituary-notice` などがサイトマップに未記載
- **修正**: lib/articles.js と同じ `inferCategoryFromTags()` 関数を generate-sitemap.js に追加 + `trimStart()` も追加
- **教訓**: lib/articles.js と generate-sitemap.js は同じロジックを持つ必要がある（DRY原則違反だが、generate-sitemap.js はCommonJSのため共有困難）

### SEO/機能改善パターン（セッション4）

#### 介護・福祉カテゴリの AffiliateCard CTA 強化
- 「シニアのあんしん相談室」を最上位アイテムとして追加（成約15,000〜30,000円）
- description に「早めの情報収集が後悔しない施設選びの鍵」という urgency copy を追加
- アイテム数を2→3に増加（シニアのあんしん相談室 + みんなの介護 + Amazon）

### ユーザー設定が必要なもの（自走できない）
- `NEXT_PUBLIC_ADSENSE_ID`: AdSense 承認後に Vercel に設定
- `BREVO_API_KEY` + `BREVO_LIST_ID`: Brevo アカウント作成後に設定
- カスタムドメイン: Vercel Dashboard から設定
- A8.net 審査中プログラムの承認確認と URL 更新
- OpenAI API quota 確認: https://platform.openai.com/account/usage（quota超過時はバッチ生成不可）
- シニアのあんしん相談室 アフィリエイト申請: AffiliateCard.js の `senshincare.jp` URLを承認後に更新
