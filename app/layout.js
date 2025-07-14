import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: '終活・相続情報センター',
    template: '%s | 終活・相続情報センター'
  },
  description: '終活・相続・エンディングノートに関する専門情報を提供。信頼できる知識で、あなたの「今」と「未来」をサポートします。',
  keywords: ['終活', '相続', 'エンディングノート', '遺言書', '相続税', '生前整理', 'LAST LETTER'],
  authors: [{ name: 'LAST LETTER' }],
  creator: 'LAST LETTER',
  publisher: 'LAST LETTER',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '終活・相続情報センター',
    description: '終活・相続・エンディングノートに関する専門情報を提供',
    url: 'https://lastletter.jp',
    siteName: '終活・相続情報センター',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '終活・相続情報センター',
    description: '終活・相続・エンディングノートに関する専門情報を提供',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  metadataBase: new URL('https://lastletter.jp'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href="https://lastletter.jp" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}