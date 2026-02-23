'use client';
import { useEffect } from 'react';

export default function AdSenseAd({ slot, format = 'auto', style = {} }) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!adClient) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded yet
    }
  }, [adClient]);

  if (!adClient) return null;

  return (
    <div style={{ textAlign: 'center', margin: '1.5rem 0', overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
