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
            Contact VPPcompare
          </h1>
          <p className="text-lg text-slate-500">
            Questions? Feedback? Partnership inquiries?
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          <section>
            <div className="space-y-2">
              <p className="font-semibold text-slate-700">VPPcompare LLC</p>
              <p>Registered in the State of Colorado</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info@vppcompare.com"
                  className="text-blue-700 underline hover:text-blue-900 font-semibold"
                >
                  info@vppcompare.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <p>
              If you are a battery manufacturer, installer, or Virtual Power Plant
              provider interested in being listed, please reach out.
            </p>
            <p className="mt-3">
              We welcome collaboration that increases transparency and helps
              homeowners make better decisions.
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
