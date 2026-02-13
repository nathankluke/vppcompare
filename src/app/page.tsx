// =============================================================================
// Homepage — src/app/page.tsx
// =============================================================================
// The landing page for VPPCompare. It has three sections:
//   1. Hero — headline, subtitle, and call-to-action button
//   2. How It Works — three simple steps
//   3. Featured VPPs — top 3 VPPs fetched from Supabase
//
// This is a Server Component — data is fetched on the server before the
// page is sent to the browser, so it loads fast and is SEO-friendly.
// =============================================================================

import Link from 'next/link'
import Button from '@/components/ui/Button'
import VPPCard from '@/components/vpp/VPPCard'
import { getFeaturedVPPs } from '@/lib/getVPPs'

export default async function HomePage() {
  // Fetch the top 3 VPPs from Supabase (runs on the server)
  const featuredVPPs = await getFeaturedVPPs()

  return (
    <div>
      {/* ================================================================
          SECTION 1: Hero
          ================================================================ */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Find the Best Virtual Power Plant for Your Home
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare feed-in rates, signup bonuses, and battery compatibility
            across Colorado&apos;s and America&apos;s top VPP programs. Make an informed choice
            and start saving.
          </p>

          {/* Call-to-Action Button */}
          <Link href="/compare">
            <Button variant="accent" size="lg">
              Compare VPPs Now
            </Button>
          </Link>
        </div>
      </section>

      {/* ================================================================
          SECTION 2: How It Works
          ================================================================ */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            How It Works
          </h2>

          {/* Three Steps in a Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">&#128270;</div> {/* Magnifying glass */}
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                1. Browse VPPs
              </h3>
              <p className="text-slate-500">
                Explore Virtual Power Plant programs available in your state.
                Filter by provider, feed-in rate, or battery brand.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">&#9878;</div> {/* Balance scale */}
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                2. Compare Side by Side
              </h3>
              <p className="text-slate-500">
                See how different VPPs stack up. Compare feed-in rates, signup
                bonuses, and supported battery brands in one view.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">&#9989;</div> {/* Check mark */}
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                3. Choose &amp; Sign Up
              </h3>
              <p className="text-slate-500">
                Found the right VPP? Click through to the provider&apos;s website
                and sign up directly. It&apos;s that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3: Featured VPPs (live from Supabase!)
          ================================================================ */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            Featured VPPs
          </h2>
          <p className="text-center text-slate-500 mb-10">
            Here are some popular Virtual Power Plant programs in the United States.
          </p>

          {/* VPP Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVPPs.map((vpp) => (
              <VPPCard key={vpp.id} vpp={vpp} />
            ))}
          </div>

          {/* Link to full comparison page */}
          <div className="text-center mt-10">
            <Link href="/compare">
              <Button variant="secondary" size="lg">
                View All VPPs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
