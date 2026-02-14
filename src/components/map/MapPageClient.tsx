// =============================================================================
// Map Page Client Wrapper
// =============================================================================
// Client component that manages the selected state and connects
// the US Map to the State Provider List.
// =============================================================================

'use client'

import { useState } from 'react'
import { VPP } from '@/types/vpp'
import USMap from './USMap'
import StateProviderList from './StateProviderList'

interface MapPageClientProps {
  vpps: VPP[]
}

export default function MapPageClient({ vpps }: MapPageClientProps) {
  const [selectedState, setSelectedState] = useState<{
    code: string
    name: string
  } | null>(null)

  // Build a set of states that have at least one VPP
  const statesWithVPPs = new Set<string>()
  vpps.forEach((vpp) => {
    vpp.states_available.forEach((state) => statesWithVPPs.add(state))
  })

  // Filter VPPs for the selected state
  const stateVPPs = selectedState
    ? vpps.filter((vpp) => vpp.states_available.includes(selectedState.code))
    : []

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-800" />
            <span className="text-sm text-slate-600">Has VPP Programs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200" />
            <span className="text-sm text-slate-600">Coming Soon</span>
          </div>
        </div>

        {/* Map */}
        <div className="mb-12">
          <USMap
            statesWithVPPs={statesWithVPPs}
            selectedState={selectedState?.code || null}
            onStateClick={(code, name) => setSelectedState({ code, name })}
          />
        </div>

        {/* State Provider List */}
        {selectedState && (
          <StateProviderList
            stateName={selectedState.name}
            stateCode={selectedState.code}
            vpps={stateVPPs}
          />
        )}
      </div>
    </section>
  )
}
