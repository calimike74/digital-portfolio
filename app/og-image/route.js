import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: '#f0eeeb',
        }}
      >
        {/* Accent bar */}
        <div style={{ display: 'flex', width: 60, height: 4, background: '#d95000', borderRadius: 2, marginBottom: 32 }} />

        {/* Title */}
        <div style={{
          fontSize: 56,
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.15,
          marginBottom: 24,
          maxWidth: 900,
          textTransform: 'uppercase',
        }}>
          AI-Powered Music Technology Education
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 24,
          color: '#555',
          lineHeight: 1.5,
          maxWidth: 800,
          marginBottom: 48,
        }}>
          How one teacher built interactive tools, AI marking, and a real-time student dashboard — from scratch.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[
            { value: '4', label: 'Live Websites' },
            { value: '14', label: 'Interactive Tools' },
            { value: '3', label: 'AI Systems' },
            { value: '~6 wks', label: 'Build Time' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#d95000' }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: '#777', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Author */}
        <div style={{
          position: 'absolute',
          bottom: 48,
          right: 80,
          fontSize: 18,
          color: '#777',
        }}>
          Michael Lehnert
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
