// =============================================================================
// Root Layout
// =============================================================================
// This is the top-level layout for the entire application.
// It wraps every page with the Navbar, Footer, and global styles.
// In Next.js App Router, layout.tsx files persist across page navigations,
// so the Navbar and Footer won't re-render when switching pages.
// =============================================================================

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Load Google Fonts — Geist is a clean, modern sans-serif font
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Comprehensive SEO metadata — Open Graph, Twitter Cards, search engine hints
export const metadata: Metadata = {
  // Core
  title: {
    default: 'VPPCompare — Compare Virtual Power Plant Programs in the USA',
    template: '%s | VPPCompare',
  },
  description:
    'Find and compare the best Virtual Power Plant programs across the United States. Compare VPP earnings, feed-in rates, signup bonuses, battery compatibility, and calculate your ROI.',
  keywords: [
    'virtual power plant', 'VPP', 'VPP comparison', 'home battery earnings',
    'Tesla Powerwall VPP', 'Enphase VPP', 'Sonnen VPP', 'battery storage',
    'grid services', 'demand response', 'energy storage', 'solar battery',
    'VPP programs by state', 'battery incentives', 'ROI calculator',
    'ConnectedSolutions', 'Sunrun VPP', 'Green Mountain Power',
  ],
  authors: [{ name: 'VPPcompare LLC' }],
  creator: 'VPPcompare LLC',
  publisher: 'VPPcompare LLC',

  // Icons
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },

  // Canonical URL
  metadataBase: new URL('https://vppcompare.com'),
  alternates: {
    canonical: '/',
  },

  // Open Graph — Facebook, LinkedIn, iMessage, Slack, Discord, etc.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vppcompare.com',
    siteName: 'VPPCompare',
    title: 'VPPCompare — Compare Virtual Power Plant Programs in the USA',
    description:
      'Compare VPP earnings, incentives, and battery compatibility across the US. Find out how much your home battery can earn you.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VPPCompare — Compare Virtual Power Plant Programs',
      },
    ],
  },

  // Twitter Card — how it looks when shared on X/Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'VPPCompare — Compare Virtual Power Plant Programs in the USA',
    description:
      'Compare VPP earnings, incentives, and battery compatibility across the US. Find out how much your home battery can earn you.',
    images: ['/og-image.png'],
  },

  // Search engine directives
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

  // Verification tags — fill these in after registering with each console
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   other: {
  //     'msvalidate.01': 'your-bing-verification-code',
  //   },
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Umami Analytics — cookie-free, privacy-friendly, GDPR-compliant */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://analytics.vppcompare.com/script.js'}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ---- Site Header / Navigation ---- */}
        <Navbar />

        {/* ---- Main Content Area ----
            min-h-screen ensures the footer stays at the bottom
            even on short pages. The bg and text colors come from
            our CSS variables defined in globals.css.
        */}
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
          {children}
        </main>

        {/* ---- Site Footer ---- */}
        <Footer />
      </body>
    </html>
  )
}
