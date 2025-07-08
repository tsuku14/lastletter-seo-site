import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'LAST LETTER | 終活・相続の総合情報サイト',
  description: '終活、相続、エンディングノートに関する正確で最新の情報を提供する専門サイトです。あなたの「もしも」に備えるお手伝いをします。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
