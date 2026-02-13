// =============================================================================
// Navbar Component
// =============================================================================
// The main navigation bar displayed at the top of every page.
// Features:
//   - Logo/site name on the left
//   - Navigation links on the right (desktop)
//   - Hamburger menu for mobile (toggles with useState)
//
// This is a client component because it uses React state (useState)
// for the mobile menu toggle.
// =============================================================================

'use client' // Required for useState in Next.js App Router

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  // Track whether the mobile menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Define all navigation links in one place for easy updates
  const navLinks = [
    { href: '/',              label: 'Home' },
    { href: '/compare',      label: 'Compare VPPs' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about',        label: 'About' },
  ]

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ---- Logo / Site Name ---- */}
          <Link href="/" className="flex items-center space-x-2">
            {/* Lightning bolt icon for the logo */}
            <span className="text-2xl">&#9889;</span>
            <span className="text-xl font-bold tracking-tight">VPPCompare</span>
          </Link>

          {/* ---- Desktop Navigation Links (hidden on mobile) ---- */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-md text-sm font-medium
                           hover:bg-blue-700 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ---- Mobile Hamburger Button (hidden on desktop) ---- */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2
                       rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {/* Simple hamburger icon using spans */}
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ---- Mobile Menu (slides down when open) ---- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-blue-700">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-md text-base font-medium
                           hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
