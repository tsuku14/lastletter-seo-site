import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-links">
            <Link href="/" className="footer-link">
              ホーム
            </Link>
            <Link href="/about" className="footer-link">
              運営者情報
            </Link>
            <Link href="/privacy-policy" className="footer-link">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="footer-link">
              利用規約
            </Link>
            <Link href="/disclaimer" className="footer-link">
              免責事項
            </Link>
            <a href="https://lastletter.jp" className="footer-link" target="_blank" rel="noopener noreferrer">
              LAST LETTER公式サイト
            </a>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            本サイトの記事はAI（GPT-4）を活用して生成された情報を含みます。法律・税務等の専門的アドバイスではありません。
            詳しくは<Link href="/disclaimer" style={{ color: '#9ca3af', textDecoration: 'underline' }}>免責事項</Link>をご確認ください。
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} LAST LETTER. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}