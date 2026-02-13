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

// Metadata for SEO — this sets the <title> and <meta description> tags
export const metadata: Metadata = {
  title: 'VPPCompare - Compare Virtual Power Plants in Colorado & the USA',
  description:
    'Find and compare the best Virtual Power Plant programs in Colorado and across the United States. Compare feed-in rates, signup bonuses, and battery compatibility.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
