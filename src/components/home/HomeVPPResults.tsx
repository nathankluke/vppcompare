// =============================================================================
// Home VPP Results Component
// =============================================================================
// Shows filtered VPP cards based on the user's setup (zip, battery, solar).
// Includes compatibility matching logic:
//   - Filters by state (from zip code)
//   - Checks battery brand compatibility
//   - Checks solar requirement
//   - Shows green/yellow/red compatibility badges
//   - Grays out unqualified programs
// =============================================================================

'use client'

import { VPP, UserSetup } from '@/types/vpp'
import { getStateName } from '@/lib/zipToState'
import VPPCard from '@/components/vpp/VPPCard'
import VPPMatchBadge from '@/components/vpp/VPPMatchBadge'

interface HomeVPPResultsProps {
  vpps: VPP[]
  userSetup: UserSetup
}

// Figure out how compatible a VPP is with the user's setup
function getCompatibility(vpp: VPP, setup: UserSetup): {
  status: 'compatible' | 'partial' | 'incompatible' | 'unknown'
  reasons: string[]
} {
  // If no zip entered, we can't judge compatibility
  if (!setup.state) {
    return { status: 'unknown', reasons: [] }
  }

  const reasons: string[] = []
  let hasIssue = false
  let hasMajorIssue = false

  // Check battery brand compatibility
  if (setup.batteryBrand === 'I don\'t have one yet') {
    if (vpp.battery_required) {
      reasons.push('Battery required — you don\'t have one yet')
      hasIssue = true
    }
  } else if (setup.batteryBrand !== 'Other') {
    // Check if the user's battery brand is in the VPP's supported list
    const userBrand = setup.batteryBrand.toLowerCase()
    const supported = vpp.battery_brands_supported.map((b) => b.toLowerCase())
    const isSupported = supported.some(
      (b) => b.includes(userBrand) || userBrand.includes(b)
    )
    if (!isSupported && vpp.battery_brands_supported.length > 0) {
      reasons.push(`${setup.batteryBrand} may not be supported`)
      hasMajorIssue = true
    }
  }

  // Check solar requirement
  if (vpp.solar_required && !setup.hasSolar) {
    reasons.push('Solar panels required')
    hasMajorIssue = true
  }

  // Determine overall status
  if (hasMajorIssue) {
    return { status: 'incompatible', reasons }
  } else if (hasIssue) {
    return { status: 'partial', reasons }
  } else {
    return { status: 'compatible', reasons: [] }
  }
}

export default function HomeVPPResults({ vpps, userSetup }: HomeVPPResultsProps) {
  // Filter out buyer-only programs (like Xcel RBC which requires new install)
  const ownerVPPs = vpps.filter((vpp) => !vpp.buyer_only)

  // If no zip entered, show all VPPs with a prompt
  if (!userSetup.state) {
    return (
      <div>
        <p className="text-slate-500 text-sm mb-6 text-center">
          Enter your zip code to see programs in your area and check compatibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownerVPPs.slice(0, 6).map((vpp) => (
            <VPPCard key={vpp.id} vpp={vpp} />
          ))}
        </div>
        {ownerVPPs.length > 6 && (
          <p className="text-center text-sm text-slate-400 mt-4">
            + {ownerVPPs.length - 6} more programs.{' '}
            <a href="/compare" className="text-blue-700 underline">
              View all →
            </a>
          </p>
        )}
      </div>
    )
  }

  // Filter VPPs by state (excluding buyer-only programs)
  const stateVPPs = ownerVPPs.filter((vpp) =>
    vpp.states_available.includes(userSetup.state)
  )

  // No VPPs in this state
  if (stateVPPs.length === 0) {
    const stateName = getStateName(userSetup.state)
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl font-bold">--</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">
          VPP programs haven&apos;t reached {stateName} yet
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Virtual Power Plants are expanding fast across the US.
          Check back soon for updates in your area!
        </p>
      </div>
    )
  }

  // Sort: qualified programs first, then by compatibility
  const stateName = getStateName(userSetup.state)
  const sortedVPPs = [...stateVPPs].sort((a, b) => {
    const aCompat = getCompatibility(a, userSetup)
    const bCompat = getCompatibility(b, userSetup)
    const order = { compatible: 0, unknown: 1, partial: 2, incompatible: 3 }
    return order[aCompat.status] - order[bCompat.status]
  })

  return (
    <div>
      <p className="text-sm text-slate-600 mb-6 text-center">
        Showing <strong>{sortedVPPs.length}</strong> VPP program{sortedVPPs.length !== 1 ? 's' : ''}{' '}
        available in <strong>{stateName}</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedVPPs.map((vpp) => {
          const compat = getCompatibility(vpp, userSetup)
          const isQualified = compat.status === 'compatible' || compat.status === 'unknown'
          return (
            <div key={vpp.id}>
              <VPPMatchBadge status={compat.status} reasons={compat.reasons} />
              <VPPCard
                vpp={vpp}
                mode="have-battery"
                isQualified={isQualified}
                disqualificationReasons={compat.status === 'incompatible' ? compat.reasons : undefined}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
