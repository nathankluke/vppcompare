// =============================================================================
// Buyer VPP Results Component
// =============================================================================
// Shows VPP programs for the "Looking to Buy" path.
// Each VPP card is followed by compatible Battery Partner cards.
// Users can click a battery to see the ROI calculator.
//
// Filters:
//   - By state (from zip code)
//   - By budget (only shows batteries in the user's price range)
//   - Prioritizes VPPs with purchase incentives
// =============================================================================

'use client'

import { useState } from 'react'
import { VPP, UserSetup } from '@/types/vpp'
import { Battery } from '@/types/battery'
import { getStateName } from '@/lib/zipToState'
import VPPCard from '@/components/vpp/VPPCard'
import BatteryPartnerCard from '@/components/vpp/BatteryPartnerCard'
import IncentiveBadges from '@/components/vpp/IncentiveBadges'
import ROICalculator from './ROICalculator'

interface BuyerVPPResultsProps {
  vpps: VPP[]
  batteries: Battery[]
  userSetup: UserSetup
}

export default function BuyerVPPResults({ vpps, batteries, userSetup }: BuyerVPPResultsProps) {
  // Track which battery + VPP combo is selected for ROI calculation
  const [selectedROI, setSelectedROI] = useState<{
    battery: Battery
    vpp: VPP
  } | null>(null)

  // Filter batteries by budget
  const budgetBatteries = batteries.filter(
    (b) => b.price_installed >= userSetup.budgetMin && b.price_installed <= userSetup.budgetMax
  )

  // If no zip entered, show info prompt
  if (!userSetup.state) {
    return (
      <div>
        <p className="text-slate-500 text-sm mb-6 text-center">
          Enter your zip code to see VPP programs and battery recommendations in your area.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {vpps.filter((v) => v.has_purchase_incentive).slice(0, 3).map((vpp) => (
            <VPPWithBatteries
              key={vpp.id}
              vpp={vpp}
              batteries={budgetBatteries}
              onSelectROI={(battery) => setSelectedROI({ battery, vpp })}
            />
          ))}
        </div>
      </div>
    )
  }

  // Filter VPPs by state
  const stateVPPs = vpps.filter((vpp) => vpp.states_available.includes(userSetup.state))

  // No VPPs in this state
  if (stateVPPs.length === 0) {
    const stateName = getStateName(userSetup.state)
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔜</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">
          VPP programs haven&apos;t reached {stateName} yet
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
          But you can still benefit from a home battery! Solar self-consumption,
          backup power, and time-of-use savings add up. Check back soon for VPP
          programs in your area.
        </p>
      </div>
    )
  }

  // Sort: VPPs with purchase incentives first, then by estimated value
  const sortedVPPs = [...stateVPPs].sort((a, b) => {
    if (a.has_purchase_incentive && !b.has_purchase_incentive) return -1
    if (!a.has_purchase_incentive && b.has_purchase_incentive) return 1
    return (b.feed_in_rate ?? 0) - (a.feed_in_rate ?? 0)
  })

  const stateName = getStateName(userSetup.state)

  return (
    <div>
      <p className="text-sm text-slate-600 mb-6 text-center">
        Showing <strong>{sortedVPPs.length}</strong> VPP program{sortedVPPs.length !== 1 ? 's' : ''}{' '}
        in <strong>{stateName}</strong> with{' '}
        <strong>{budgetBatteries.length}</strong> batteries in your budget
      </p>

      {budgetBatteries.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-amber-700 text-sm">
            No batteries found in the ${userSetup.budgetMin.toLocaleString()}–${userSetup.budgetMax.toLocaleString()} range.
            Try expanding your budget range.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {sortedVPPs.map((vpp) => (
          <VPPWithBatteries
            key={vpp.id}
            vpp={vpp}
            batteries={budgetBatteries}
            onSelectROI={(battery) => setSelectedROI({ battery, vpp })}
          />
        ))}
      </div>

      {/* ROI Calculator — shown when a battery is selected */}
      {selectedROI && (
        <div className="mt-6">
          <ROICalculator
            mode="buying-battery"
            battery={selectedROI.battery}
            vppName={selectedROI.vpp.name}
            incentives={selectedROI.vpp.incentives}
          />
          <button
            onClick={() => setSelectedROI(null)}
            className="mt-2 text-sm text-slate-500 hover:text-slate-700 underline cursor-pointer"
          >
            Close calculator
          </button>
        </div>
      )}
    </div>
  )
}

// ---- Sub-component: VPP card + its compatible battery cards ----
function VPPWithBatteries({
  vpp,
  batteries,
  onSelectROI,
}: {
  vpp: VPP
  batteries: Battery[]
  onSelectROI: (battery: Battery) => void
}) {
  // Get compatible batteries for this VPP
  const compatBatteries = vpp.compatible_batteries
    ?.map((cb) => {
      const battery = batteries.find((b) => b.id === cb.battery_id)
      return battery ? { battery, isRecommended: cb.is_recommended, notes: cb.compatibility_notes } : null
    })
    .filter(Boolean) as { battery: Battery; isRecommended: boolean; notes: string | null }[] | undefined

  // If no specific compatibility data, show all batteries in budget
  const displayBatteries = compatBatteries && compatBatteries.length > 0
    ? compatBatteries
    : batteries.slice(0, 4).map((b) => ({ battery: b, isRecommended: false, notes: null }))

  // Get purchase incentives for this VPP
  const purchaseIncentives = vpp.incentives?.filter((i) => i.incentive_type === 'purchase') ?? []

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* VPP Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">{vpp.provider}</p>
            <h3 className="text-lg font-bold text-slate-800">{vpp.name}</h3>
          </div>
          <IncentiveBadges incentives={vpp.incentives} showDetail />
        </div>
        <p className="text-sm text-slate-600 mt-2">{vpp.description}</p>
        {vpp.incentive_summary && (
          <p className="text-sm font-medium text-blue-700 mt-1">{vpp.incentive_summary}</p>
        )}
      </div>

      {/* Compatible Batteries Section */}
      {displayBatteries.length > 0 && (
        <div className="p-4 bg-slate-50">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            🔋 Compatible Batteries
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayBatteries.map(({ battery, isRecommended }) => (
              <BatteryPartnerCard
                key={battery.id}
                battery={battery}
                purchaseIncentives={purchaseIncentives}
                isRecommended={isRecommended}
                onSelect={onSelectROI}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
