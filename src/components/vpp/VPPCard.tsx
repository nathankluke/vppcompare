// =============================================================================
// VPPCard Component (Updated)
// =============================================================================
// Displays a single Virtual Power Plant program as a card.
// Now supports:
//   - Incentive badges and mode-aware highlighting
//   - Monthly earnings display (below feed-in rate)
//   - 5-year earnings bar
//   - Qualification state (gray/opaque when not eligible)
//
// Props:
//   vpp                      — a VPP object containing all the program details
//   mode                     — (optional) 'have-battery' or 'buying-battery'
//   isQualified              — (optional) false = gray out the card
//   disqualificationReasons  — (optional) why they don't qualify
// =============================================================================

import { VPP, OwnershipMode } from '@/types/vpp'
import IncentiveBadges from './IncentiveBadges'
import FlexibilityRating from './FlexibilityRating'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface VPPCardProps {
  vpp: VPP
  mode?: OwnershipMode
  isQualified?: boolean
  disqualificationReasons?: string[]
  batteryCapacityKwh?: number   // User's battery capacity for scaling earnings
}

// Default battery capacity the estimated_annual_value was based on (13.5 kWh ≈ Tesla Powerwall)
const DEFAULT_BATTERY_KWH = 13.5

export default function VPPCard({ vpp, mode, isQualified, disqualificationReasons, batteryCapacityKwh }: VPPCardProps) {
  // Calculate annual earnings, scaling by battery capacity when rate info is available
  const annualEarnings = vpp.incentives
    ?.filter((i) => i.incentive_type === 'ongoing')
    .reduce((sum, i) => {
      // If we have rate info ($/kW) and user capacity, calculate from the rate
      if (i.amount_rate && i.rate_unit === '$/kW' && batteryCapacityKwh) {
        return sum + (i.amount_rate * batteryCapacityKwh)
      }
      // If we have an estimated annual value and user capacity, scale proportionally
      // (original estimates were based on ~13.5 kWh / Tesla Powerwall)
      if (i.estimated_annual_value && batteryCapacityKwh) {
        const scale = batteryCapacityKwh / DEFAULT_BATTERY_KWH
        return sum + Math.round(i.estimated_annual_value * scale)
      }
      // Fallback: use the static estimate
      return sum + (i.estimated_annual_value ?? 0)
    }, 0) ?? 0
  const monthlyEarnings = Math.round(annualEarnings / 12)
  const fiveYearTotal = annualEarnings * 5

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200
      ${isQualified === false ? 'opacity-60 grayscale' : ''}`}>

      {/* Disqualification banner */}
      {isQualified === false && disqualificationReasons && disqualificationReasons.length > 0 && (
        <div className="bg-slate-100 border-b border-slate-300 px-6 py-3">
          <p className="text-sm font-semibold text-slate-500">Not currently eligible</p>
          <ul className="text-xs text-slate-400 mt-1">
            {disqualificationReasons.map((reason, i) => (
              <li key={i}>- {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ---- Card Header: Provider + VPP Name ---- */}
      <div className="bg-blue-800 text-white px-6 py-4">
        <p className="text-sm font-medium text-blue-200">{vpp.provider}</p>
        <h3 className="text-xl font-bold">{vpp.name}</h3>
      </div>

      {/* ---- Card Body: Key Details ---- */}
      <div className="px-6 py-5 space-y-4">

        {/* Description */}
        <p className="text-slate-600 text-sm">{vpp.description}</p>

        {/* Incentive Badges (if incentive data is available) */}
        {vpp.incentives && vpp.incentives.length > 0 && (
          <IncentiveBadges incentives={vpp.incentives} showDetail />
        )}

        {/* Incentive Summary (fallback if no detailed incentives) */}
        {vpp.incentive_summary && !vpp.incentives?.length && (
          <p className="text-sm font-medium text-blue-700 bg-blue-50 rounded-md px-3 py-1.5">
            {vpp.incentive_summary}
          </p>
        )}

        {/* Feed-in Rate */}
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm">Feed-in Rate</span>
          <span className="text-lg font-bold text-emerald-600">
            {vpp.feed_in_rate !== null ? `${vpp.feed_in_rate}c/kWh` : 'N/A'}
          </span>
        </div>

        {/* Monthly Earnings Estimate */}
        {monthlyEarnings > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-sm">
              Est. Monthly Earnings
              {batteryCapacityKwh && (
                <span className="text-xs text-slate-400 block">
                  based on {batteryCapacityKwh} kWh
                </span>
              )}
            </span>
            <span className="text-lg font-bold text-emerald-600">
              ~${monthlyEarnings}/mo
            </span>
          </div>
        )}

        {/* Signup Bonus */}
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm">Signup Bonus</span>
          <span className="text-lg font-bold text-amber-600">
            {vpp.signup_bonus !== null ? `$${vpp.signup_bonus}` : 'None'}
          </span>
        </div>

        {/* 5-Year Earnings Bar */}
        {fiveYearTotal > 0 && (
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>5-Year Earnings Estimate</span>
              <span className="font-bold text-emerald-600">${fiveYearTotal.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${Math.min((fiveYearTotal / 7500) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Requirements + Flexibility */}
        <div className="flex gap-3 text-xs flex-wrap items-center">
          {vpp.solar_required && (
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              Solar Required
            </span>
          )}
          {vpp.battery_required && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Battery Required
            </span>
          )}
          {vpp.program_model === 'install' && (
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              Battery Provided
            </span>
          )}
          {vpp.flexibility_rating && (
            <FlexibilityRating
              rating={vpp.flexibility_rating}
              details={vpp.flexibility_details}
            />
          )}
        </div>

        {/* States Available — shown as small badges */}
        <div className="flex flex-wrap gap-2">
          {vpp.states_available.map((state) => (
            <span
              key={state}
              className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {state}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Card Footer: Action Button ---- */}
      <div className="px-6 pb-5">
        <Link href={vpp.website_url} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="md" className="w-full">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}
