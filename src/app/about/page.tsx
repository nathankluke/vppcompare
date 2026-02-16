// =============================================================================
// About Page — src/app/about/page.tsx
// =============================================================================
// Company info for VPPcompare LLC. Independent, ad-free comparison tool.
// =============================================================================

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            About VPPcompare LLC
          </h1>
          <p className="text-lg text-slate-500">
            An independent, ad-free comparison platform for Virtual Power Plants.
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              VPPcompare LLC is an independent, ad-free comparison platform built
              to help homeowners across the United States get the most out of their
              home battery systems.
            </p>
            <p className="mt-3">
              I started VPPcompare because Virtual Power Plant (VPP) programs are
              growing fast — but comparing them is confusing. Contract terms vary.
              Earnings models differ. Equipment compatibility matters. And if
              you&apos;re investing thousands of dollars into a battery system, you
              deserve clear, unbiased information.
            </p>
            <p className="mt-3">
              This site is designed to help you make a smarter decision — whether
              you already own a battery or are considering installing one.
            </p>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              What We Do
            </h2>
            <p className="mb-3">We help homeowners:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Compare Virtual Power Plant programs</li>
              <li>Estimate potential monthly and annual earnings</li>
              <li>Understand participation requirements</li>
              <li>Compare battery systems paired with VPP programs</li>
              <li>Evaluate overall return on investment</li>
            </ul>
            <p className="mt-3">
              If you don&apos;t yet own a battery, we help you compare both the
              hardware and the VPP opportunity together — because the right pairing
              can significantly affect long-term returns.
            </p>
            <p className="mt-3">
              We do our best to carefully research available programs, provider terms,
              regulatory rules, and historical performance data in order to present
              the most accurate and up-to-date comparisons possible.
            </p>
          </section>

          {/* Independent & Ad-Free */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Independent &amp; Ad-Free
            </h2>
            <p>
              VPPcompare is completely ad-free.
            </p>
            <p className="mt-3">
              We do not sell display ads. We do not allow paid placements that
              influence rankings.
            </p>
            <p className="mt-3">
              Our work is funded through referral partnerships with certain battery
              manufacturers and VPP providers. If you choose to move forward with a
              provider through our site, we may receive compensation.
            </p>
            <p className="mt-3">
              That compensation never changes our methodology, calculations, or
              rankings.
            </p>
            <p className="mt-3">
              Our goal is simple: help homeowners make the most of their investment
              while supporting a more stable and resilient grid.
            </p>
            <p className="mt-3 text-sm">
              Learn more on our{' '}
              <Link
                href="/revenue-disclosure"
                className="text-blue-700 underline hover:text-blue-900"
              >
                Revenue Disclosure
              </Link>{' '}
              page.
            </p>
          </section>

          {/* Not a Utility or Financial Advisor */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Not a Utility or Financial Advisor
            </h2>
            <p>
              We are not a utility company, energy retailer, installer, or financial
              advisor. We do not operate a Virtual Power Plant.
            </p>
            <p className="mt-3">
              We provide research, comparisons, and earnings estimates based on
              available information and reasonable assumptions — but final decisions
              and outcomes are always up to you.
            </p>
          </section>
        </div>

        {/* ---- Call to Action ---- */}
        <div className="text-center mt-10">
          <p className="text-slate-500 mb-4">
            Ready to compare Virtual Power Plants?
          </p>
          <Link href="/compare">
            <Button variant="primary" size="lg">
              Start Comparing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
