// =============================================================================
// Privacy Policy Page — src/app/privacy/page.tsx
// =============================================================================
// CCPA/CPRA and CPA compliant privacy policy for VPPcompare LLC.
// =============================================================================

import Link from 'next/link'

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
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Introduction
            </h2>
            <p>
              VPPcompare LLC (&quot;VPPcompare,&quot; &quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;) operates the website vppcompare.com. This Privacy
              Policy explains how we collect, use, and protect your personal information
              when you visit our website.
            </p>
            <p className="mt-3">
              We are committed to protecting your privacy and complying with applicable
              privacy laws, including the California Consumer Privacy Act (CCPA), the
              California Privacy Rights Act (CPRA), and the Colorado Privacy Act (CPA).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Information We Collect
            </h2>
            <p className="font-semibold text-slate-700 mb-2">
              Information you provide directly:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Zip code (used to filter VPP programs by location)</li>
              <li>Battery and solar setup preferences (used to match programs)</li>
              <li>Email address (only if you voluntarily contact us)</li>
            </ul>

            <p className="font-semibold text-slate-700 mb-2 mt-4">
              Information collected automatically:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Browser type and version</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring website</li>
              <li>General geographic location (city/state level, not precise)</li>
            </ul>

            <p className="mt-4">
              We do <strong>not</strong> collect Social Security numbers, financial
              account information, precise geolocation data, or any sensitive personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To display VPP programs relevant to your location and setup</li>
              <li>To improve our website and user experience</li>
              <li>To analyze site traffic and usage patterns</li>
              <li>To respond to inquiries you send us</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Cookies and Tracking
            </h2>
            <p>
              VPPcompare may use cookies and similar technologies for analytics purposes
              (such as Google Analytics or similar tools). These help us understand how
              visitors use the site so we can improve it. You can control cookies through
              your browser settings.
            </p>
            <p className="mt-3">
              We do not use cookies for targeted advertising or retargeting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Third-Party Links
            </h2>
            <p>
              Our website contains links to VPP provider websites and other third-party
              sites. We are not responsible for the privacy practices of those websites.
              We encourage you to review their privacy policies before providing any
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Your Rights
            </h2>
            <p>
              Depending on your state of residence, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>
                <strong>Right to Know:</strong> Request what personal information we
                have collected about you.
              </li>
              <li>
                <strong>Right to Delete:</strong> Request deletion of your personal
                information.
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> Opt out of the sale or sharing of
                your personal information (we do not sell personal information).
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not discriminate
                against you for exercising your privacy rights.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{' '}
              <a
                href="mailto:info@vppcompare.com"
                className="text-blue-700 underline hover:text-blue-900"
              >
                info@vppcompare.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Data Security
            </h2>
            <p>
              We use reasonable technical and organizational measures to protect
              information collected through our website. However, no method of
              internet transmission or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Children&apos;s Privacy
            </h2>
            <p>
              VPPcompare is not directed at children under 13, and we do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated revision date. Your continued use
              of the site after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
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
