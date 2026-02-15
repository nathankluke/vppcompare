// =============================================================================
// Battery Partner Card Component
// =============================================================================
// Shows a battery product recommendation attached to a VPP card.
// Displays the battery's price breakdown including ITC and VPP rebates.
//
// Usage (inside BuyerVPPResults):
//   <BatteryPartnerCard
//     battery={battery}
//     purchaseIncentives={vppPurchaseIncentives}
//     isRecommended={true}
//   />
// =============================================================================

import { Battery } from '@/types/battery'
import { VPPIncentive } from '@/types/incentive'

interface BatteryPartnerCardProps {
  battery: Battery
  purchaseIncentives: VPPIncentive[]     // Purchase incentives from the parent VPP
  isRecommended: boolean
  onSelect?: (battery: Battery) => void  // Optional: for ROI calculator selection
}

export default function BatteryPartnerCard({
  battery,
  purchaseIncentives,
  isRecommended,
  onSelect,
}: BatteryPartnerCardProps) {
  // Calculate price after 30% ITC
  const itcSavings = battery.itc_eligible ? Math.round(battery.price_installed * 0.30) : 0
  const priceAfterITC = battery.price_installed - itcSavings

  // Calculate total purchase incentive from the VPP
  const totalRebate = purchaseIncentives.reduce(
    (sum, i) => sum + (i.amount_dollars ?? 0), 0
  )
  const finalPrice = Math.max(0, priceAfterITC - totalRebate)

  return (
    <div
      className={`relative bg-slate-50 rounded-lg border p-4 transition-all duration-200
                  ${isRecommended ? 'border-emerald-400 ring-1 ring-emerald-200' : 'border-slate-200'}
                  ${onSelect ? 'hover:border-blue-400 cursor-pointer' : ''}`}
      onClick={() => onSelect?.(battery)}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <span className="absolute -top-2.5 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          ⭐ Recommended
        </span>
      )}

      {/* Battery name and manufacturer */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <div>
          <h4 className="font-bold text-slate-800">{battery.name}</h4>
          <p className="text-xs text-slate-500">{battery.manufacturer}</p>
        </div>
        <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {battery.capacity_kwh} kWh
        </span>
      </div>

      {/* Price breakdown */}
      <div className="space-y-1.5 text-sm">
        {/* Original price */}
        <div className="flex justify-between">
          <span className="text-slate-500">Installed Price</span>
          <span className="text-slate-700 font-medium">
            ${battery.price_installed.toLocaleString()}
          </span>
        </div>

        {/* ITC savings */}
        {itcSavings > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>30% Federal Tax Credit</span>
            <span className="font-medium">-${itcSavings.toLocaleString()}</span>
          </div>
        )}

        {/* VPP purchase rebate */}
        {totalRebate > 0 && (
          <div className="flex justify-between text-purple-600">
            <span>VPP Purchase Rebate</span>
            <span className="font-medium">-${totalRebate.toLocaleString()}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-200 pt-1.5" />

        {/* Final price */}
        <div className="flex justify-between">
          <span className="font-bold text-slate-800">Your Net Cost</span>
          <span className="font-bold text-lg text-blue-800">
            ${finalPrice.toLocaleString()}
          </span>
        </div>

        {/* Price per kWh */}
        <div className="flex justify-between text-xs text-slate-400">
          <span>Cost per kWh (before incentives)</span>
          <span>${battery.price_per_kwh}/kWh</span>
        </div>
      </div>

      {/* Modular indicator */}
      {battery.is_modular && (
        <p className="text-xs text-slate-400 mt-2">🔗 Modular — stackable for more capacity</p>
      )}

      {/* Notes */}
      {battery.notes && (
        <p className="text-xs text-slate-500 mt-1 italic">{battery.notes}</p>
      )}

      {/* Select for ROI button */}
      {onSelect && (
        <button
          className="mt-3 w-full text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100
                     py-2 rounded-md transition-colors cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onSelect(battery) }}
        >
          📊 Calculate ROI
        </button>
      )}
    </div>
  )
}
