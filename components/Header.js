import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            終活・相続情報センター
          </Link>
          <nav className="nav">
            <Link href="/" className="nav-link">
              ホーム
            </Link>
            <Link href="/about" className="nav-link">
              私たちについて
            </Link>
            <Link href="/privacy-policy" className="nav-link">
              プライバシーポリシー
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}