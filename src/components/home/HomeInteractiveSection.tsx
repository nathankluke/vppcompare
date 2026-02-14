// =============================================================================
// Home Interactive Section Component
// =============================================================================
// This is the CLIENT WRAPPER that connects the filter form to the results.
// It holds the shared UserSetup state and passes it to both children.
//
// Why this exists:
//   - The homepage (page.tsx) is a Server Component (fetches data from Supabase)
//   - But the form + results need to share state (user's zip, battery, etc.)
//   - So we create this client component that wraps them both
//   - The server passes VPP data down as a prop
// =============================================================================

'use client'

import { useState } from 'react'
import { VPP, UserSetup } from '@/types/vpp'
import HomeFilterForm from './HomeFilterForm'
import HomeVPPResults from './HomeVPPResults'

interface HomeInteractiveSectionProps {
  vpps: VPP[]  // All VPPs from the database, passed from the server
}

export default function HomeInteractiveSection({ vpps }: HomeInteractiveSectionProps) {
  // The user's current form state — shared between form and results
  const [userSetup, setUserSetup] = useState<UserSetup>({
    zip: '',
    state: '',
    batteryBrand: 'Tesla Powerwall',
    batteryCapacity: 13.5,
    hasSolar: false,
    solarSize: 6,
  })

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column: Filter form (takes up 4 columns on large screens) */}
          <div className="lg:col-span-4">
            <HomeFilterForm
              setup={userSetup}
              onSetupChange={setUserSetup}
            />
          </div>

          {/* Right column: VPP results (takes up 8 columns on large screens) */}
          <div className="lg:col-span-8">
            <HomeVPPResults
              vpps={vpps}
              userSetup={userSetup}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
