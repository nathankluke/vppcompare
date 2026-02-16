// =============================================================================
// Battery Partner Card Component
// =============================================================================
// Shows a battery product recommendation attached to a VPP card.
// Displays the battery's price breakdown including ITC and VPP rebates,
// plus a compact payback timeline bar.
//
// Props:
//   battery            — Battery product data
//   purchaseIncentives — One-time rebates from the parent VPP
//   ongoingIncentives  — Recurring earnings from the parent VPP
//   isRecommended      — Whether this battery is recommended for this VPP
//   onSelect           — Callback for ROI calculator selection
// =============================================================================

import { Battery } from '@/types/battery'
import { VPPIncentive } from '@/types/incentive'

interface BatteryPartnerCardProps {
  battery: Battery
  purchaseIncentives: VPPIncentive[]
  ongoingIncentives?: VPPIncentive[]
  isRecommended: boolean
  onSelect?: (battery: Battery) => void
}

export default function BatteryPartnerCard({
  battery,
  purchaseIncentives,
  ongoingIncentives = [],
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

  // Calculate payback from ongoing incentives
  const annualEarnings = ongoingIncentives.reduce(
    (sum, i) => sum + (i.estimated_annual_value ?? 0), 0
  )
  const monthlyEarnings = Math.round(annualEarnings / 12)
  const paybackYears = annualEarnings > 0 ? Math.round((finalPrice / annualEarnings) * 10) / 10 : null

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
          Recommended
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

      {/* Compact Payback Bar */}
      {paybackYears !== null && annualEarnings > 0 && (
        <div className="mt-3 pt-2 border-t border-slate-200">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Est. Payback</span>
            <span className={`font-bold ${paybackYears <= 5 ? 'text-emerald-600' : paybackYears <= 8 ? 'text-amber-600' : 'text-red-500'}`}>
              ~{paybackYears} years
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${paybackYears <= 5 ? 'bg-emerald-500' : paybackYears <= 8 ? 'bg-amber-500' : 'bg-red-400'}`}
              style={{ width: `${Math.min((1 / paybackYears) * 50, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-0.5">
            <span>~${monthlyEarnings}/mo earnings</span>
            <span>~${annualEarnings.toLocaleString()}/yr</span>
          </div>
        </div>
      )}

      {/* Modular indicator */}
      {battery.is_modular && (
        <p className="text-xs text-slate-400 mt-2">Modular — stackable for more capacity</p>
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
          Calculate ROI
        </button>
      )}
    </div>
  )
}
