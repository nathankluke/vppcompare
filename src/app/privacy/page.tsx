// =============================================================================
// Privacy Policy Page — src/app/privacy/page.tsx
// =============================================================================
// CCPA/CPRA and CPA compliant privacy policy for VPPcompare LLC.
// =============================================================================

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'VPPcompare privacy policy. Cookie-free, CCPA/CPRA and CPA compliant. Learn how we handle your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: February 2026
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          <section>
            <p>
              VPPcompare LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;) respects your privacy. This Privacy Policy explains
              how we collect, use, disclose, and protect your information when you
              use vppcompare.com.
            </p>
            <p className="mt-3">
              This policy is designed to comply with applicable U.S. privacy laws,
              including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>The California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA)</li>
              <li>The Colorado Privacy Act (CPA)</li>
            </ul>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              1. Information We Collect
            </h2>
            <p className="font-semibold text-slate-700 mb-2">
              Information You Provide
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Zip code</li>
              <li>Utility provider</li>
              <li>Battery system details</li>
              <li>Information submitted through forms</li>
              <li>Communications you send us</li>
            </ul>

            <p className="font-semibold text-slate-700 mb-2 mt-4">
              Automatically Collected Information
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>IP address</li>
              <li>Device type</li>
              <li>Browser type</li>
              <li>Referring website</li>
              <li>Usage data (pages visited, time on site)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-2">We may use your information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Provide battery and VPP comparisons</li>
              <li>Generate earnings estimates</li>
              <li>Improve our tools and content</li>
              <li>Respond to inquiries</li>
              <li>Send optional updates (if you opt in)</li>
              <li>Connect you with providers if you request it</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3 font-semibold text-slate-700">
              We do not sell your personal information.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              3. Sharing of Information
            </h2>
            <p className="mb-2">We may share personal information:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>With service providers who support our website (hosting, analytics, email systems)</li>
              <li>With battery or VPP providers only if you request to be connected</li>
              <li>If required by law or legal process</li>
            </ul>
            <p className="mt-3">
              We do not share personal information for unrelated third-party marketing.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              4. Cookies &amp; Tracking
            </h2>
            <p className="mb-2">We use cookies to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Improve user experience</li>
              <li>Measure website performance</li>
              <li>Understand how visitors use our tools</li>
            </ul>
            <p className="mt-3">
              You can manage cookies through your browser settings.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              5. Your Privacy Rights (California &amp; Colorado Residents)
            </h2>
            <p className="mb-2">
              If you are a resident of California or Colorado, you may have the
              right to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal information we collect about you</li>
              <li>Request deletion of your personal information</li>
              <li>Request correction of inaccurate personal information</li>
              <li>Opt out of certain data processing activities</li>
              <li>Appeal a denial of your privacy request (Colorado residents)</li>
            </ul>
            <p className="mt-3">
              To exercise your rights, email:{' '}
              <a
                href="mailto:info@vppcompare.com"
                className="text-blue-700 underline hover:text-blue-900"
              >
                info@vppcompare.com
              </a>
            </p>
            <p className="mt-2">
              We will respond within the timeframes required by applicable law.
            </p>
            <p className="mt-2">
              We do not sell personal data or engage in cross-context behavioral
              advertising as defined under California or Colorado law.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain personal information only as long as reasonably necessary
              to fulfill the purposes described in this policy, unless a longer
              retention period is required by law.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              7. Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and organizational
              safeguards. However, no internet transmission is 100% secure.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our website is not intended for individuals under 18 years of age.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of the
              website constitutes acceptance of the updated policy.
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
