// =============================================================================
// Open Graph Image — auto-generated at /opengraph-image
// =============================================================================
// Next.js generates this image dynamically for social media previews.
// Shows up when the site is shared on Facebook, LinkedIn, Slack, iMessage, etc.
// =============================================================================

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'VPPCompare — Compare Virtual Power Plant Programs in the USA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            VPP
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            VPPCompare
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Compare Virtual Power Plant Programs Across the USA
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '48px',
          }}
        >
          {[
            { label: 'VPP Programs', value: '12+' },
            { label: 'States Covered', value: '10+' },
            { label: 'Battery Brands', value: '6+' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: '18px', color: '#64748b' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '18px',
            color: '#475569',
          }}
        >
          vppcompare.com — Free, independent, cookie-free
        </div>
      </div>
    ),
    { ...size }
  )
}
