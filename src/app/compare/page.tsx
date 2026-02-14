// =============================================================================
// Compare Page — src/app/compare/page.tsx
// =============================================================================
// Shows all available VPPs fetched from Supabase.
// The actual filtering and sorting is handled by the VPPFilterBar component
// (a client component that runs in the browser).
//
// Architecture:
//   Server (this file) → fetches ALL VPPs from Supabase
//   Client (VPPFilterBar) → filters/sorts them based on user input
// =============================================================================

import VPPFilterBar from '@/components/vpp/VPPFilterBar'
import { getAllVPPs } from '@/lib/getVPPs'

// Tell Next.js to fetch fresh data on every request (not cache at build time)
export const dynamic = 'force-dynamic'

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

        {/* ---- Filter Bar + Cards Grid (client-side interactivity) ---- */}
        <VPPFilterBar vpps={vpps} />
      </div>
    </div>
  )
}
