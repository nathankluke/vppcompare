// =============================================================================
// Incentive Badges Component
// =============================================================================
// Visual badges that clearly distinguish between:
//   - Purchase incentives (purple) — one-time rebates for buying a battery
//   - Ongoing earnings (emerald) — recurring VPP participation payments
//
// Usage:
//   <IncentiveBadges incentives={vpp.incentives} />
//   <IncentiveBadges incentives={vpp.incentives} showDetail />
// =============================================================================

import { VPPIncentive } from '@/types/incentive'

interface IncentiveBadgesProps {
  incentives?: VPPIncentive[]
  showDetail?: boolean    // Show expanded view with amounts
}

export default function IncentiveBadges({ incentives, showDetail = false }: IncentiveBadgesProps) {
  if (!incentives || incentives.length === 0) return null

  const purchaseIncentives = incentives.filter((i) => i.incentive_type === 'purchase')
  const ongoingIncentives = incentives.filter((i) => i.incentive_type === 'ongoing')

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {/* Purchase incentive badge (purple) */}
      {purchaseIncentives.length > 0 && (
        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          💰 Purchase Incentive
          {showDetail && purchaseIncentives[0].amount_dollars != null && purchaseIncentives[0].amount_dollars > 0 && (
            <span className="font-bold">
              : ${purchaseIncentives[0].amount_dollars.toLocaleString()}
            </span>
          )}
          {showDetail && purchaseIncentives[0].amount_dollars === 0 && (
            <span className="font-bold">: Free Install</span>
          )}
        </span>
      )}

      {/* Ongoing earning badge (emerald) */}
      {ongoingIncentives.length > 0 && (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          📈 Ongoing Earnings
          {showDetail && ongoingIncentives[0].estimated_annual_value != null && (
            <span className="font-bold">
              : ~${ongoingIncentives[0].estimated_annual_value.toLocaleString()}/yr
            </span>
          )}
        </span>
      )}
    </div>
  )
}
