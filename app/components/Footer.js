const Footer = () => {
  return (
    <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #eaeaea', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        <p>&copy; {new Date().getFullYear()} LAST LETTER. All Rights Reserved.</p>
        <nav>
          <a href="/sitemap.xml" style={{ marginRight: '1rem' }}>サイトマップ</a>
          <a href="/privacy-policy">プライバシーポリシー</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
