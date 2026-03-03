import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Love Calculator - Free Compatibility Test';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          💕
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            marginBottom: 16,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          Love Calculator
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Free Name Compatibility & Love Compatibility Test
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 24,
          }}
        >
          lovecalcs.com
        </div>
      </div>
    ),
    { ...size }
  );
}
