// =============================================================================
// About Page — src/app/about/page.tsx
// =============================================================================
// A simple content page that explains what VPPCompare is, our mission,
// and why we built this tool.
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
            About VPPCompare
          </h1>
          <p className="text-lg text-slate-500">
            Colorado&apos;s independent Virtual Power Plant comparison tool.
          </p>
        </div>

        {/* ---- Main Content ---- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6 text-slate-600 leading-relaxed">

          {/* What We Do */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              What We Do
            </h2>
            <p>
              VPPCompare is a free comparison website that helps homeowners in
              Colorado and across the United States find the best Virtual Power
              Plant (VPP) program for their home. We gather information about
              VPP programs from across the country and present it in a clear,
              easy-to-compare format.
            </p>
          </section>

          {/* Our Mission */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Our Mission
            </h2>
            <p>
              Our mission is to accelerate America&apos;s clean energy
              transition by making it simple for homeowners to participate in
              Virtual Power Plants. We believe that informed consumers make
              better choices, and better choices lead to a cleaner, more
              resilient energy grid for everyone.
            </p>
          </section>

          {/* Why VPPs Matter */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Why VPPs Matter
            </h2>
            <p>
              Virtual Power Plants are transforming America&apos;s energy
              landscape. By connecting thousands of home batteries into a
              coordinated network, VPPs can respond to grid demand just like a
              traditional power station — but without burning fossil fuels.
              Homeowners who participate get paid for contributing to a more
              stable and sustainable grid.
            </p>
          </section>

          {/* Why Colorado */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Why Colorado?
            </h2>
            <p>
              Colorado is one of the best states in the US for solar energy,
              with over 300 days of sunshine per year. Combined with the
              state&apos;s progressive clean energy goals and growing home
              battery adoption, Colorado is a natural hub for Virtual Power
              Plant programs. We started here and are expanding coverage
              across the country.
            </p>
          </section>

          {/* Independent & Transparent */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Independent &amp; Transparent
            </h2>
            <p>
              VPPCompare is an independent platform. We are not owned by any
              energy retailer or battery manufacturer. Our goal is to provide
              honest, unbiased comparisons so you can make the best decision
              for your household. We strive to keep our data accurate and
              up to date.
            </p>
          </section>

          {/* Get In Touch */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Get In Touch
            </h2>
            <p>
              Have a question, suggestion, or want to submit a VPP program for
              inclusion? We would love to hear from you. Reach out to us at{' '}
              <a
                href="mailto:hello@vppcompare.com"
                className="text-blue-700 underline hover:text-blue-900"
              >
                hello@vppcompare.com
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
