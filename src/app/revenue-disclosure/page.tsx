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
            Revenue Disclosure
          </h1>
          <p className="text-lg text-slate-500">
            How VPPcompare earns revenue — and what that means for you.
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              We Are Ad-Free
            </h2>
            <p>
              VPPcompare does not display ads. We believe ads create clutter and can
              introduce bias into comparison tools. You will never see banner ads,
              pop-ups, or sponsored content on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              How We Earn Revenue
            </h2>
            <p>
              VPPcompare may earn revenue through referral relationships with
              select VPP providers, battery manufacturers, and solar installers.
              When you click on a link to a provider&apos;s website and take a
              qualifying action (such as signing up for a program or requesting a
              quote), we may receive a referral fee or commission.
            </p>
            <p className="mt-3">
              This referral fee is paid by the provider, <strong>not by you</strong>.
              It does not increase the price you pay or reduce the incentives you
              receive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Does This Affect Our Rankings?
            </h2>
            <p>
              <strong>No.</strong> Referral relationships do not influence how we rank,
              sort, or recommend VPP programs. Our comparison tools are based on
              publicly available program data including incentives, feed-in rates,
              battery compatibility, and availability. Programs that do not have a
              referral relationship with us are still listed and compared equally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Our Commitment to Transparency
            </h2>
            <p>
              We believe in being upfront about how we make money. If you have any
              questions about our revenue model or want to know whether a specific
              listing involves a referral relationship, please contact us at{' '}
              <a
                href="mailto:info@vppcompare.com"
                className="text-blue-700 underline hover:text-blue-900"
              >
                info@vppcompare.com
              </a>
              .
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
