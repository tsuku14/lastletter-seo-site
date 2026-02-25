import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || '終活・相続情報センター';
  const category = searchParams.get('category') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 50%, #0f2a45 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Logo / Site Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#93c5fd',
              fontSize: '18px',
              fontWeight: '600',
              letterSpacing: '0.05em',
            }}
          >
            終活・相続情報センター
          </div>
          {category && (
            <div
              style={{
                background: '#f59e0b',
                borderRadius: '6px',
                padding: '6px 14px',
                color: '#1a1a1a',
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: title.length > 30 ? '36px' : '44px',
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '1000px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {['⚖️ 法的根拠に基づく', '👥 専門家監修', '🔄 毎日更新'].map((item) => (
            <div
              key={item}
              style={{
                color: '#bfdbfe',
                fontSize: '16px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '6px 14px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
