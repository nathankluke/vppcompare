// =============================================================================
// Compare Page — src/app/compare/page.tsx
// =============================================================================
// Shows all available VPPs fetched from Supabase in a filterable grid.
// The filter bar UI is present but not yet functional (coming in a future step).
//
// This is a Server Component — data is fetched on the server.
// =============================================================================

import VPPCard from '@/components/vpp/VPPCard'
import { getAllVPPs } from '@/lib/getVPPs'

// US states for the filter dropdown (focus on states with active VPP programs)
const usStates = ['All States', 'CO', 'CA', 'TX', 'AZ', 'NY', 'FL', 'VT', 'MA', 'CT', 'MN', 'WI']

export default async function ComparePage() {
  // Fetch all VPPs from Supabase (runs on the server)
  const vpps = await getAllVPPs()

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Compare Virtual Power Plants
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Browse and compare VPP programs across Colorado and the United States.
            Filter by state and sort by the metrics that matter most to you.
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
                {usStates.map((state) => (
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
                Showing <span className="font-semibold text-slate-700">{vpps.length}</span> VPPs
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            VPP Cards Grid
            ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vpps.map((vpp) => (
            <VPPCard key={vpp.id} vpp={vpp} />
          ))}
        </div>
      </div>
    </div>
  )
}
