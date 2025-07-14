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
              私たちについて
            </Link>
            <Link href="/privacy-policy" className="footer-link">
              プライバシーポリシー
            </Link>
            <a href="https://lastletter.jp" className="footer-link" target="_blank" rel="noopener noreferrer">
              LAST LETTER公式サイト
            </a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} LAST LETTER. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}