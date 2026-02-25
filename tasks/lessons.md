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

### ユーザー設定が必要なもの（自走できない）
- `NEXT_PUBLIC_ADSENSE_ID`: AdSense 承認後に Vercel に設定
- `BREVO_API_KEY` + `BREVO_LIST_ID`: Brevo アカウント作成後に設定
- カスタムドメイン: Vercel Dashboard から設定
- A8.net 審査中プログラムの承認確認と URL 更新
