// =============================================================================
// Revenue Disclosure Page — src/app/revenue-disclosure/page.tsx
// =============================================================================
// Transparent disclosure of how VPPcompare generates revenue.
// Ad-free, referral-based model.
// =============================================================================

import Link from 'next/link'

export default function RevenueDisclosurePage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            How VPPcompare Makes Money
          </h1>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          <section>
            <p className="text-lg font-semibold text-slate-800">
              VPPcompare is ad-free.
            </p>
            <p className="mt-3">
              We do not sell banner ads or sponsored placements.
            </p>
            <p className="mt-3">
              Instead, we are funded through referral relationships with certain
              battery providers, installers, and Virtual Power Plant operators. If
              you choose to move forward with a provider through our platform, we
              may receive compensation.
            </p>
          </section>

          <section>
            <p className="mb-2">That compensation allows us to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Keep the site free to use</li>
              <li>Continue improving our comparison tools</li>
              <li>Invest time into researching program terms and regulatory updates</li>
            </ul>
          </section>

          <section>
            <p>
              We work hard to present accurate, transparent comparisons based on
              publicly available information, provider documentation, and direct
              communications.
            </p>
            <p className="mt-3">
              However, energy markets change, program rules evolve, and incentives
              shift. While we strive to keep information current, we encourage users
              to confirm final terms directly with providers before making decisions.
            </p>
          </section>

          <section>
            <p className="font-semibold text-slate-700">
              Our mission is to help homeowners make informed, financially sound
              choices — while supporting a more resilient grid.
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
