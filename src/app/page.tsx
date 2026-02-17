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
import JsonLd from '@/components/seo/JsonLd'
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
      {/* Structured data for Google rich results */}
      <JsonLd />

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
          SECTION 4: How It Works (compact)
          ================================================================ */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">1</div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">Tell Us Your Setup</h3>
              <p className="text-sm text-slate-500">Enter your zip code, battery brand, and solar info.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">2</div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">Compare Programs</h3>
              <p className="text-sm text-slate-500">See VPP earnings, rebates, and compatible batteries in your area.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">3</div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">Calculate Your ROI</h3>
              <p className="text-sm text-slate-500">See when your battery pays for itself within your homeownership timeline.</p>
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
