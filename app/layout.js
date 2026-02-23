import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastletter-seo-site.vercel.app';

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
    url: siteUrl,
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
    google: 'wahZFVbgadhACN5uV3CwJgekD3n_cIP7QzpxAFd3cMs',
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "終活・相続情報センター",
    "url": siteUrl,
    "description": "終活・相続・エンディングノートに関する専門情報を提供。信頼できる知識で、あなたの「今」と「未来」をサポートします。",
    "publisher": {
      "@type": "Organization",
      "name": "LAST LETTER",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": siteUrl
    }]
  };

  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        {/* Google AdSense - Publisher IDを環境変数 NEXT_PUBLIC_ADSENSE_ID に設定してください */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Google Analytics 4 - 測定IDを環境変数 NEXT_PUBLIC_GA_MEASUREMENT_ID に設定してください */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
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