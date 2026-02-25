import Link from 'next/link';
import SearchBox from './SearchBox';

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
            <Link href="/articles" className="nav-link">
              記事一覧
            </Link>
            <Link href="/glossary" className="nav-link">
              用語集
            </Link>
            <Link href="/faq" className="nav-link">
              よくある質問
            </Link>
            <Link href="/about" className="nav-link">
              運営者情報
            </Link>
          </nav>
          <SearchBox />
        </div>
      </div>
    </header>
  );
}