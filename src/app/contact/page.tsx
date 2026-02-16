// =============================================================================
// Contact Page — src/app/contact/page.tsx
// =============================================================================
// Contact info for VPPcompare LLC.
// =============================================================================

import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-500">
            We&apos;d love to hear from you.
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Get In Touch
            </h2>
            <p>
              Have a question about VPP programs? Want to suggest a program we should
              add? Found an error in our data? We want to hear from you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Email
            </h2>
            <p>
              The best way to reach us is by email:
            </p>
            <p className="mt-2">
              <a
                href="mailto:info@vppcompare.com"
                className="text-blue-700 underline hover:text-blue-900 text-lg font-semibold"
              >
                info@vppcompare.com
              </a>
            </p>
            <p className="mt-3 text-sm text-slate-500">
              We aim to respond to all inquiries within 1-2 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              What You Can Contact Us About
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>VPP program submissions:</strong> Know of a VPP program
                we&apos;re missing? Let us know and we&apos;ll look into adding it.
              </li>
              <li>
                <strong>Data corrections:</strong> If you spot an error in our
                program data, incentives, or availability, please tell us so we
                can fix it.
              </li>
              <li>
                <strong>General questions:</strong> Wondering how VPPs work or
                which program might be right for you? We&apos;re happy to point
                you in the right direction.
              </li>
              <li>
                <strong>Partnership inquiries:</strong> VPP providers, battery
                manufacturers, and solar companies can reach out to discuss
                partnerships.
              </li>
              <li>
                <strong>Privacy requests:</strong> To exercise your privacy rights
                under CCPA/CPRA or CPA, email us and we&apos;ll respond promptly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              About VPPcompare LLC
            </h2>
            <p>
              VPPcompare is operated by VPPcompare LLC, a company registered
              in Colorado, USA. We are an independent comparison platform — not
              a utility company, energy retailer, or financial advisor.
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
