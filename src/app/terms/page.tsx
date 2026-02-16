// =============================================================================
// Terms of Service Page — src/app/terms/page.tsx
// =============================================================================
// Terms of service for VPPcompare LLC. Informational purposes, no guarantee,
// affiliate disclosure, IP, liability limitation, governed by Colorado law.
// =============================================================================

import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: February 2026
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          <p>
            By using this website, you agree to the following Terms of Service.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              1. Informational Purposes Only
            </h2>
            <p>
              VPPcompare LLC provides research, comparisons, and earnings estimates
              related to home battery systems and Virtual Power Plant programs.
            </p>
            <p className="mt-3 mb-2">We do not provide:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Financial advice</li>
              <li>Investment advice</li>
              <li>Tax advice</li>
              <li>Legal advice</li>
              <li>Utility services</li>
              <li>Installation services</li>
            </ul>
            <p className="mt-3">
              Any projections shown on this site are estimates based on available
              data and assumptions. Actual results may vary significantly.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              2. No Guarantee of Earnings
            </h2>
            <p className="mb-2">
              Participation in a Virtual Power Plant program depends on many factors,
              including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Utility rules</li>
              <li>Regulatory changes</li>
              <li>Grid demand</li>
              <li>Weather conditions</li>
              <li>Equipment performance</li>
              <li>Provider policies</li>
            </ul>
            <p className="mt-3">
              We make no guarantees regarding financial returns or performance.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              3. Affiliate &amp; Referral Relationships (FTC Disclosure)
            </h2>
            <p>
              VPPcompare LLC participates in referral and affiliate partnerships
              with certain battery manufacturers, installers, and Virtual Power
              Plant providers.
            </p>
            <p className="mt-3">
              If you choose to engage with a provider through our site, we may
              receive compensation.
            </p>
            <p className="mt-3">
              This compensation does not affect our rankings, scoring models, or
              calculations.
            </p>
            <p className="mt-3">
              We are committed to transparency and strive to provide the most
              accurate and up-to-date information available.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              4. User Responsibilities
            </h2>
            <p className="mb-2">You agree to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Provide accurate information</li>
              <li>Use the website lawfully</li>
              <li>Not attempt to interfere with the site&apos;s operation</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              5. Intellectual Property
            </h2>
            <p>
              All content, models, calculations, and designs are owned by
              VPPcompare LLC and may not be copied or reproduced without permission.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              6. Limitation of Liability
            </h2>
            <p className="mb-2">
              To the fullest extent permitted by law, VPPcompare LLC shall not be
              liable for:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Indirect or consequential damages</li>
              <li>Financial losses</li>
              <li>Decisions made based on site information</li>
            </ul>
            <p className="mt-3">
              Use of the site is at your own risk.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              7. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of Colorado.
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-700 hover:text-blue-900 text-sm underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
