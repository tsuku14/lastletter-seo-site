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
            <Link href="/" className="nav-link">ホーム</Link>
            <Link href="/articles" className="nav-link">記事一覧</Link>
            <Link href="/kaigo-shisetsu" className="nav-link" style={{ color: '#dc2626', fontWeight: '700' }}>
              🏥 介護施設相談
            </Link>
            <Link href="/sozoku-zei" className="nav-link" style={{ color: '#1d4ed8', fontWeight: '700' }}>
              💰 相続税相談
            </Link>
            <Link href="/yuigonsho" className="nav-link" style={{ color: '#065f46', fontWeight: '700' }}>
              ✍️ 遺言書相談
            </Link>
            <Link href="/sogi" className="nav-link" style={{ color: '#374151', fontWeight: '700' }}>
              ⛩️ 葬儀・お墓
            </Link>
            <Link href="/hoken" className="nav-link" style={{ color: '#0e7490', fontWeight: '700' }}>
              🛡️ 保険・税務
            </Link>
            <Link href="/fudosan-souzoku" className="nav-link" style={{ color: '#92400e', fontWeight: '700' }}>
              🏠 不動産相続
            </Link>
            <Link href="/kazoku-shintaku" className="nav-link" style={{ color: '#1e3a5f', fontWeight: '700' }}>
              🏦 家族信託
            </Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/about" className="nav-link">運営情報</Link>
          </nav>
          <SearchBox />
        </div>
      </div>
    </header>
  );
}