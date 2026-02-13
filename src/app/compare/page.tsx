// =============================================================================
// Compare Page — src/app/compare/page.tsx
// =============================================================================
// Shows all available VPPs in a filterable grid.
// Currently uses hardcoded placeholder data.
// The filter bar UI is present but not yet functional.
// =============================================================================

import VPPCard from '@/components/vpp/VPPCard'
import { VPP } from '@/types/vpp'

// -------------------------------------------------------
// Placeholder VPP data — 6 sample cards
// This will be fetched from Supabase in a future step
// -------------------------------------------------------
const sampleVPPs: VPP[] = [
  {
    id: '1',
    name: 'Tesla Energy Plan',
    provider: 'Tesla / Energy Locals',
    description:
      'Share your Powerwall energy during peak demand and earn credits on your electricity bill.',
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
      'Competitive feed-in rates and bonus credits for VPP participants with compatible home batteries.',
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
      'Connect your battery to AGL\'s VPP to help stabilise the grid and earn feed-in credits.',
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
  {
    id: '4',
    name: 'Origin Loop VPP',
    provider: 'Origin Energy',
    description:
      'Origin Loop lets you export stored battery energy during peak times for attractive feed-in rates.',
    signup_bonus: 150,
    feed_in_rate: 14,
    controlled_load_discount: 3,
    battery_brands_supported: ['Tesla Powerwall', 'LG RESU', 'Sonnen'],
    solar_required: true,
    battery_required: true,
    states_available: ['NSW', 'QLD', 'SA'],
    website_url: 'https://www.originenergy.com.au',
    logo_url: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Reposit Power VPP',
    provider: 'Reposit Power',
    description:
      'Reposit\'s smart software optimises when your battery charges and discharges, maximising your savings.',
    signup_bonus: null,
    feed_in_rate: 11,
    controlled_load_discount: null,
    battery_brands_supported: ['BYD', 'Alpha ESS', 'Goodwe'],
    solar_required: true,
    battery_required: true,
    states_available: ['ACT', 'NSW', 'QLD'],
    website_url: 'https://www.repositpower.com',
    logo_url: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Powershop VPP',
    provider: 'Powershop',
    description:
      'Powershop lets you sell excess solar energy back to the grid through their virtual power plant network.',
    signup_bonus: 75,
    feed_in_rate: 9,
    controlled_load_discount: null,
    battery_brands_supported: ['Tesla Powerwall', 'Sonnen'],
    solar_required: true,
    battery_required: false,
    states_available: ['VIC', 'NSW', 'QLD', 'SA'],
    website_url: 'https://www.powershop.com.au',
    logo_url: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
]

// Australian states for the filter dropdown
const australianStates = ['All States', 'NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT']

export default function ComparePage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Compare Virtual Power Plants
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Browse and compare VPP programs across Australia. Filter by state
            and sort by the metrics that matter most to you.
          </p>
        </div>

        {/* ================================================================
            Filter Bar (UI only — functionality coming later)
            ================================================================ */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">

            {/* State Filter Dropdown */}
            <div className="flex-1 w-full sm:w-auto">
              <label
                htmlFor="state-filter"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Filter by State
              </label>
              <select
                id="state-filter"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2
                           text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {australianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-1 w-full sm:w-auto">
              <label
                htmlFor="sort-by"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Sort by
              </label>
              <select
                id="sort-by"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2
                           text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="feed_in_rate">Feed-in Rate</option>
                <option value="signup_bonus">Signup Bonus</option>
                <option value="name">Name (A-Z)</option>
                <option value="provider">Provider (A-Z)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex-1 w-full sm:w-auto sm:text-right">
              <p className="text-sm text-slate-500 sm:mt-6">
                Showing <span className="font-semibold text-slate-700">{sampleVPPs.length}</span> VPPs
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            VPP Cards Grid
            ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleVPPs.map((vpp) => (
            <VPPCard key={vpp.id} vpp={vpp} />
          ))}
        </div>
      </div>
    </div>
  )
}
