import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #eaeaea' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', fontSize: '1.5rem' }}>
          LAST LETTER
        </Link>
        <nav>
          <Link href="/" style={{ marginRight: '1rem' }}>ホーム</Link>
          <Link href="/about" style={{ marginRight: '1rem' }}>運営者情報</Link>
          <Link href="/privacy-policy">プライバシーポリシー</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
