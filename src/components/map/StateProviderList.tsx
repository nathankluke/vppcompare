// =============================================================================
// State Provider List Component
// =============================================================================
// Shows VPP cards for the selected state, or a "coming soon" message
// if there are no VPPs in that state.
// =============================================================================

import { VPP } from '@/types/vpp'
import VPPCard from '@/components/vpp/VPPCard'

interface StateProviderListProps {
  stateName: string
  stateCode: string
  vpps: VPP[]
}

export default function StateProviderList({ stateName, stateCode, vpps }: StateProviderListProps) {
  if (vpps.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl">
        <div className="text-5xl mb-4">🔜</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">
          No VPP programs available yet in {stateName} ({stateCode})
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Virtual Power Plants are expanding across the US.
          Check back soon for updates in your state!
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        VPP Programs in {stateName}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vpps.map((vpp) => (
          <VPPCard key={vpp.id} vpp={vpp} />
        ))}
      </div>
    </div>
  )
}
