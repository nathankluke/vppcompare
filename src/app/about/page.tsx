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
            About VPPcompare
          </h1>
          <p className="text-lg text-slate-500">
            An independent, ad-free Virtual Power Plant comparison tool.
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Who We Are
            </h2>
            <p>
              VPPcompare is operated by VPPcompare LLC, a Colorado-based company
              dedicated to helping homeowners navigate the growing world of Virtual
              Power Plants. We built this tool because we believe every homeowner
              with a battery deserves clear, honest information about the programs
              available to them.
            </p>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              What We Do
            </h2>
            <p>
              VPPcompare is a free comparison website that helps homeowners across
              the United States find the best Virtual Power Plant program for their
              home. We research VPP programs nationwide and present the details in
              a clear, side-by-side format so you can compare incentives, earnings
              potential, and requirements at a glance.
            </p>
            <p className="mt-3">
              Whether you already own a home battery or are considering purchasing
              one, VPPcompare helps you understand which programs you qualify for,
              what you can earn, and how to get started.
            </p>
          </section>

          {/* Independent & Ad-Free */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Independent &amp; Ad-Free
            </h2>
            <p>
              VPPcompare is completely independent. We are not owned by, affiliated
              with, or funded by any utility company, energy retailer, or battery
              manufacturer. We do not display ads. Our revenue model is based on
              referral relationships with select partners — you can learn more on
              our{' '}
              <Link
                href="/revenue-disclosure"
                className="text-blue-700 underline hover:text-blue-900"
              >
                Revenue Disclosure
              </Link>{' '}
              page.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Important Disclaimer
            </h2>
            <p>
              VPPcompare is not a utility company, energy retailer, or financial
              advisor. The information on this site is provided for educational
              and comparison purposes only. We do our best to keep program details
              accurate and up to date, but program terms, incentives, and
              availability can change at any time. Always verify details directly
              with the VPP provider before making any decisions.
            </p>
          </section>

          {/* Get In Touch */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Get In Touch
            </h2>
            <p>
              Have a question, suggestion, or want to submit a VPP program for
              inclusion? We&apos;d love to hear from you. Reach out at{' '}
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
