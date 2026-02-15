// =============================================================================
// Homepage — src/app/page.tsx
// =============================================================================
// The main landing page for VPPCompare. Structure:
//   1. Hero — catchy headline + trust stats
//   2. Why VPPs Matter — explains the importance (Octopus Energy-inspired)
//   3. Ownership Toggle → Interactive form + filtered results (two paths)
//   4. How It Works — three simple steps
//   5. FAQ — frequently asked questions accordion
//
// This is a Server Component — fetches all data from Supabase on the server,
// then passes it to the interactive client components.
// =============================================================================

import HeroSection from '@/components/home/HeroSection'
import WhyVPPSection from '@/components/home/WhyVPPSection'
import HomeInteractiveSection from '@/components/home/HomeInteractiveSection'
import FAQSection from '@/components/home/FAQSection'
import { getAllVPPsWithIncentives } from '@/lib/getVPPs'
import { getAllBatteries } from '@/lib/getBatteries'

// Fetch fresh data on every request (not cached at build time)
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch all VPPs (with incentives + battery compatibility) and all batteries
  const [allVPPs, allBatteries] = await Promise.all([
    getAllVPPsWithIncentives(),
    getAllBatteries(),
  ])

  // Count unique states for the hero trust stat
  const stateSet = new Set<string>()
  allVPPs.forEach((vpp) => vpp.states_available.forEach((s) => stateSet.add(s)))

  return (
    <div>
      {/* ================================================================
          SECTION 1: Hero
          ================================================================ */}
      <HeroSection vppCount={allVPPs.length} stateCount={stateSet.size} />

      {/* ================================================================
          SECTION 2: Why VPPs Matter
          ================================================================ */}
      <WhyVPPSection />

      {/* ================================================================
          SECTION 3: Interactive Form + Filtered VPP Results (Two Paths)
          ================================================================ */}
      <HomeInteractiveSection vpps={allVPPs} batteries={allBatteries} />

      {/* ================================================================
          SECTION 4: How It Works
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
                1. Tell Us About Your Setup
              </h3>
              <p className="text-slate-500">
                Already have a battery? Enter your brand and zip code.
                Looking to buy? Set your budget and we&apos;ll match you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                2. Compare Programs &amp; Batteries
              </h3>
              <p className="text-slate-500">
                See VPP programs in your area with earnings estimates,
                purchase rebates, and compatible battery recommendations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                3. Calculate Your ROI
              </h3>
              <p className="text-slate-500">
                See exactly when your battery pays for itself. Most homeowners
                stay 5–6 years — find a combo that works within your timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5: FAQ
          ================================================================ */}
      <FAQSection />
    </div>
  )
}
