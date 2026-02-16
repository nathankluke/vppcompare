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

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using vppcompare.com (the &quot;Site&quot;), you agree
              to be bound by these Terms of Service. If you do not agree to these
              terms, please do not use the Site. VPPcompare LLC (&quot;VPPcompare,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) reserves the right to
              update these terms at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Informational Purposes Only
            </h2>
            <p>
              The information provided on VPPcompare is for general informational
              and educational purposes only. VPPcompare is <strong>not</strong> a
              utility company, energy retailer, financial advisor, or licensed
              professional of any kind.
            </p>
            <p className="mt-3">
              We do our best to keep VPP program information accurate and up to date,
              but we make <strong>no guarantee</strong> regarding the accuracy,
              completeness, or timeliness of any information on the Site. VPP program
              terms, incentives, availability, and requirements are set by each
              provider and can change at any time without notice.
            </p>
            <p className="mt-3">
              Always verify program details, incentives, and eligibility directly
              with the VPP provider before making any decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Not Financial or Legal Advice
            </h2>
            <p>
              Nothing on this Site constitutes financial, investment, tax, or legal
              advice. ROI estimates, payback calculations, and earnings projections
              are approximations based on publicly available program data and should
              not be relied upon as guarantees. Consult with qualified professionals
              before making financial decisions related to home batteries or energy
              programs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Affiliate &amp; Referral Disclosure
            </h2>
            <p>
              VPPcompare may earn referral fees or commissions when you click on links
              to VPP providers or battery products and take qualifying actions (such
              as signing up for a program or making a purchase). This does not affect
              the price you pay.
            </p>
            <p className="mt-3">
              For more details, see our{' '}
              <Link
                href="/revenue-disclosure"
                className="text-blue-700 underline hover:text-blue-900"
              >
                Revenue Disclosure
              </Link>{' '}
              page. Referral relationships do not influence our rankings or
              recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Intellectual Property
            </h2>
            <p>
              All content on VPPcompare — including text, design, logos, graphics,
              data compilations, and software — is the property of VPPcompare LLC
              or its content suppliers and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, modify, or create
              derivative works from our content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Third-Party Links
            </h2>
            <p>
              The Site contains links to third-party websites, including VPP providers
              and battery manufacturers. We are not responsible for the content,
              accuracy, or practices of those sites. Clicking on a third-party link
              means you are leaving VPPcompare, and we encourage you to review the
              terms and privacy policies of any site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, VPPcompare LLC shall not be
              liable for any direct, indirect, incidental, consequential, or punitive
              damages arising from your use of, or inability to use, the Site or any
              information provided on it. This includes, without limitation, damages
              arising from decisions made based on information found on VPPcompare.
            </p>
            <p className="mt-3">
              VPPcompare is provided &quot;as is&quot; and &quot;as available&quot;
              without warranties of any kind, whether express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              User Conduct
            </h2>
            <p>
              You agree not to use the Site for any unlawful purpose or in any way
              that could damage, disable, or impair the Site. Automated scraping,
              data harvesting, or unauthorized access to our systems is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with
              the laws of the State of Colorado, without regard to its conflict of law
              principles. Any disputes arising from these terms or your use of the Site
              shall be resolved in the courts of the State of Colorado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact us at{' '}
              <a
                href="mailto:info@vppcompare.com"
                className="text-blue-700 underline hover:text-blue-900"
              >
                info@vppcompare.com
              </a>
              .
            </p>
            <p className="mt-2 text-sm text-slate-400">
              VPPcompare LLC — Colorado, USA
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
