// =============================================================================
// Homepage — src/app/page.tsx
// =============================================================================
// The landing page for VPPCompare. It has three sections:
//   1. Hero — headline, subtitle, and call-to-action button
//   2. How It Works — three simple steps
//   3. Featured VPPs — preview of three VPP cards with hardcoded data
// =============================================================================

import Link from 'next/link'
import Button from '@/components/ui/Button'
import VPPCard from '@/components/vpp/VPPCard'
import { VPP } from '@/types/vpp'

// -------------------------------------------------------
// Placeholder VPP data (hardcoded for now)
// This will be replaced with real data from Supabase later
// -------------------------------------------------------
const featuredVPPs: VPP[] = [
  {
    id: '1',
    name: 'Tesla Energy Plan',
    provider: 'Tesla / Energy Locals',
    description:
      'Join the Tesla Virtual Power Plant and earn credits for sharing your Powerwall energy during peak demand.',
    signup_bonus: 100,
    feed_in_rate: 12,
    controlled_load_discount: null,
    battery_brands_supported: ['Tesla Powerwall', 'Tesla Powerwall 2', 'Tesla Powerwall 3'],
    solar_required: true,
    battery_required: true,
    states_available: ['NSW', 'VIC', 'QLD', 'SA'],
    website_url: 'https://www.tesla.com/en_au/energy',
    logo_url: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Simply Energy VPP',
    provider: 'Simply Energy',
    description:
      'Simply Energy offers competitive feed-in rates and bonus credits for VPP participants with compatible batteries.',
    signup_bonus: 200,
    feed_in_rate: 10,
    controlled_load_discount: 5,
    battery_brands_supported: ['Tesla Powerwall', 'Sonnen', 'LG RESU'],
    solar_required: true,
    battery_required: true,
    states_available: ['VIC', 'SA', 'QLD'],
    website_url: 'https://www.simplyenergy.com.au',
    logo_url: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'AGL Virtual Power Plant',
    provider: 'AGL Energy',
    description:
      'AGL connects your battery to their virtual power plant, helping stabilise the grid while you earn feed-in credits.',
    signup_bonus: null,
    feed_in_rate: 15,
    controlled_load_discount: null,
    battery_brands_supported: ['Tesla Powerwall', 'BYD', 'Alpha ESS'],
    solar_required: true,
    battery_required: true,
    states_available: ['NSW', 'VIC', 'QLD', 'SA', 'TAS'],
    website_url: 'https://www.agl.com.au',
    logo_url: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
]

export default function HomePage() {
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
            across Australia&apos;s top VPP programs. Make an informed choice
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
          SECTION 3: Featured VPPs
          ================================================================ */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            Featured VPPs
          </h2>
          <p className="text-center text-slate-500 mb-10">
            Here are some popular Virtual Power Plant programs in Australia.
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
