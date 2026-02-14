// =============================================================================
// US Map Page — src/app/map/page.tsx
// =============================================================================
// Interactive US map showing which states have VPP programs.
// Click a state to see the VPP providers available there.
//
// This is a Server Component — fetches VPP data on the server,
// then passes it to the MapPageClient for interactivity.
// =============================================================================

import { getAllVPPs } from '@/lib/getVPPs'
import MapPageClient from '@/components/map/MapPageClient'

// Fetch fresh data on every request
export const dynamic = 'force-dynamic'

export default async function MapPage() {
  const allVPPs = await getAllVPPs()

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            VPP Programs Across the US
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Click on a state to see which Virtual Power Plant programs are
            available in your area. Blue states have active VPP programs.
          </p>
        </div>
      </section>

      {/* Interactive Map + State Results */}
      <MapPageClient vpps={allVPPs} />
    </div>
  )
}
