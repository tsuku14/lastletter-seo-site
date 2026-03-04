'use client';
// GA4クリックトラッキング付きアフィリエイトリンクコンポーネント
// LPページのCTAボタンに使用する（サーバーコンポーネントから呼び出し可能なleafコンポーネント）

export default function CtaLink({ href, serviceName, lpName, position = 'unknown', style, className, children }) {
  const handleClick = () => {
    window.gtag?.('event', 'lp_cta_click', {
      event_category: 'lp_affiliate',
      event_label: serviceName,
      lp_name: lpName,
      service_name: serviceName,
      cta_position: position, // 'hero' | 'middle' | 'bottom'
      value: 1,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      style={style}
      className={className}
    >
      {children}
    </a>
  );
}
