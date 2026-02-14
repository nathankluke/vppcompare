// =============================================================================
// Homepage — src/app/page.tsx
// =============================================================================
// The main landing page for VPPCompare. Structure:
//   1. Hero — explains what a VPP is and how you earn money
//   2. Interactive Section — zip code form + filtered VPP results
//   3. How It Works — three simple steps
//   4. FAQ — frequently asked questions accordion
//
// This is a Server Component — fetches all VPPs from Supabase on the server,
// then passes them to the interactive client component.
// =============================================================================

import HeroSection from '@/components/home/HeroSection'
import HomeInteractiveSection from '@/components/home/HomeInteractiveSection'
import FAQSection from '@/components/home/FAQSection'
import { getAllVPPs } from '@/lib/getVPPs'

// Fetch fresh data on every request (not cached at build time)
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch all VPPs from Supabase (runs on the server)
  const allVPPs = await getAllVPPs()

  return (
    <div>
      {/* ================================================================
          SECTION 1: Hero
          ================================================================ */}
      <HeroSection />

      {/* ================================================================
          SECTION 2: Interactive Form + Filtered VPP Results
          ================================================================ */}
      <HomeInteractiveSection vpps={allVPPs} />

      {/* ================================================================
          SECTION 3: How It Works
          ================================================================ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                1. Enter Your Details
              </h3>
              <p className="text-slate-500">
                Tell us your zip code, battery type, and solar setup.
                We&apos;ll find VPP programs available in your area.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                2. Compare Programs
              </h3>
              <p className="text-slate-500">
                See which VPPs are compatible with your setup. Compare signup
                bonuses, earnings, and requirements side by side.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                3. Choose &amp; Earn
              </h3>
              <p className="text-slate-500">
                Click through to the provider&apos;s website and sign up.
                Start earning money from your home battery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4: FAQ
          ================================================================ */}
      <FAQSection />
    </div>
  )
}
