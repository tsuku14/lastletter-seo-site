export const metadata = {
  title: '終活・相続の総合情報サイト',
  description: '終活、エンディングノート、相続手続きなど、大切な人のための情報を分かりやすく解説',
  verification: {
    google: 'kH9EEGM__WhKMbXle-u-_ObVW2C9t8dLhOMFDjW4M3s',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        <header style={{ backgroundColor: '#333', color: 'white', padding: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>終活・相続 情報サイト</h1>
        </header>
        <main style={{ minHeight: '80vh', padding: '2rem' }}>
          {children}
        </main>
        <footer style={{ backgroundColor: '#333', color: 'white', padding: '1rem', textAlign: 'center' }}>
          <p style={{ margin: 0 }}>© 2024 LAST LETTER Info</p>
        </footer>
      </body>
    </html>
  )
}
