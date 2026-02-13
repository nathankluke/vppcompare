// =============================================================================
// Footer Component
// =============================================================================
// A simple footer displayed at the bottom of every page.
// Contains copyright info, legal links, and the site tagline.
// =============================================================================

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ---- Top Row: Tagline + Links ---- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Tagline */}
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">VPPCompare</p>
            <p className="text-sm text-slate-400 mt-1">
              Compare Virtual Power Plants in Colorado &amp; the USA
            </p>
          </div>

          {/* Footer Navigation Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/about"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* ---- Divider ---- */}
        <hr className="my-6 border-slate-700" />

        {/* ---- Bottom Row: Copyright ---- */}
        <div className="text-center text-sm text-slate-400">
          <p>&copy; 2026 VPPCompare.com. All rights reserved.</p>
          <p className="mt-1">
            Helping Americans find the best Virtual Power Plant programs.
          </p>
        </div>
      </div>
    </footer>
  )
}
