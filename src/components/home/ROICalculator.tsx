// =============================================================================
// ROI Calculator Component
// =============================================================================
// Shows a visual payback timeline for buying a battery + joining a VPP.
// Displays:
//   1. Cost breakdown (installed → after ITC → after rebate → net cost)
//   2. Annual earnings breakdown (VPP + self-consumption + TOU arbitrage)
//   3. Year-by-year earnings bar chart
//   4. Payback period indicator with 5-6 year homeownership context
//
// For existing battery owners, shows simpler projected earnings.
// =============================================================================

'use client'

import { Battery } from '@/types/battery'
import { VPPIncentive } from '@/types/incentive'
import { OwnershipMode, UserSetup } from '@/types/vpp'
import { calculateBuyerROI, calculateOwnerROI, BuyerROI, OwnerROI } from '@/lib/roiCalculator'

interface ROICalculatorProps {
  mode: OwnershipMode
  battery?: Battery | null
  vppName?: string
  incentives?: VPPIncentive[]
  userSetup?: UserSetup
}

export default function ROICalculator({ mode, battery, vppName, incentives = [], userSetup }: ROICalculatorProps) {
  // Build solar options from user setup
  const solarOptions = userSetup ? {
    stateCode: userSetup.state,
    hasSolar: userSetup.hasSolar,
    solarSizeKw: userSetup.solarSize,
    batteryKwh: userSetup.batteryCapacity,
  } : undefined

  // ---------- BUYER MODE ----------
  if (mode === 'buying-battery' && battery) {
    const buyerSolar = solarOptions ? {
      ...solarOptions,
      batteryKwh: battery.capacity_kwh, // Use selected battery's capacity
    } : undefined
    const roi = calculateBuyerROI(battery, incentives, buyerSolar)
    return <BuyerROIDisplay roi={roi} batteryName={battery.name} vppName={vppName} />
  }

  // ---------- OWNER MODE ----------
  if (mode === 'have-battery' && incentives.length > 0) {
    const roi = calculateOwnerROI(incentives, solarOptions)
    return <OwnerROIDisplay roi={roi} vppName={vppName} />
  }

  return null
}

// ---- Buyer ROI Display ----
function BuyerROIDisplay({ roi, batteryName, vppName }: { roi: BuyerROI; batteryName: string; vppName?: string }) {
  // Scale: what's the max value we need to represent?
  const maxValue = roi.installedCost
  const hasSolarSavings = roi.annualSelfConsumption > 0 || roi.annualTOUArbitrage > 0

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-4">
      <h4 className="text-lg font-bold text-slate-800 mb-1">
        ROI Calculator
      </h4>
      <p className="text-sm text-slate-500 mb-4">
        {batteryName}{vppName ? ` + ${vppName}` : ''}
      </p>

      {/* Cost Breakdown — uses best-case installed pricing */}
      <div className="space-y-2 mb-6">
        <CostRow label="Installed Price (best case)" amount={roi.installedCost} color="bg-slate-300" maxValue={maxValue} />
        {roi.itcSavings > 0 && (
          <CostRow label="After 30% ITC" amount={roi.costAfterITC} color="bg-blue-400" maxValue={maxValue} highlight="-$" savings={roi.itcSavings} />
        )}
        {roi.purchaseIncentive > 0 && (
          <CostRow label="After VPP Rebate" amount={roi.netCost} color="bg-purple-400" maxValue={maxValue} highlight="-$" savings={roi.purchaseIncentive} />
        )}
      </div>

      {/* Net Cost Callout */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-center">
        <p className="text-sm text-blue-600">Your Net Cost</p>
        <p className="text-2xl font-bold text-blue-800">${roi.netCost.toLocaleString()}</p>
      </div>

      {/* Annual Earnings Breakdown — show when there are multiple streams */}
      {roi.annualEarnings > 0 && hasSolarSavings && (
        <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-xs font-semibold text-emerald-800 mb-2">Annual Battery Value Breakdown</p>
          <div className="space-y-1.5 text-sm">
            {roi.annualVPPEarnings > 0 && (
              <div className="flex justify-between">
                <span className="text-emerald-700">VPP Program Earnings</span>
                <span className="font-medium text-emerald-800">${roi.annualVPPEarnings.toLocaleString()}/yr</span>
              </div>
            )}
            {roi.annualSelfConsumption > 0 && (
              <div className="flex justify-between">
                <span className="text-emerald-700">Solar Self-Consumption Savings</span>
                <span className="font-medium text-emerald-800">${roi.annualSelfConsumption.toLocaleString()}/yr</span>
              </div>
            )}
            {roi.annualTOUArbitrage > 0 && (
              <div className="flex justify-between">
                <span className="text-emerald-700">TOU Peak Arbitrage</span>
                <span className="font-medium text-emerald-800">${roi.annualTOUArbitrage.toLocaleString()}/yr</span>
              </div>
            )}
            <div className="border-t border-emerald-300 pt-1.5 flex justify-between font-bold">
              <span className="text-emerald-800">Total Annual Value</span>
              <span className="text-emerald-800">${roi.annualEarnings.toLocaleString()}/yr</span>
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1.5">
            Self-consumption = storing excess solar to use at night instead of buying from the grid.
          </p>
        </div>
      )}

      {/* Payback Timeline */}
      {roi.annualEarnings > 0 && (
        <>
          <h5 className="text-sm font-semibold text-slate-700 mb-3">
            Payback Timeline
            <span className="text-xs font-normal text-slate-400 ml-2">
              (avg homeowner stays 5-6 years)
            </span>
          </h5>

          <div className="space-y-1.5">
            {roi.yearByYear.slice(0, Math.min(8, roi.yearByYear.length)).map((year) => {
              const earningsPercent = Math.min((year.cumulativeEarnings / roi.netCost) * 100, 100)
              return (
                <div key={year.year} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-12">
                    {year.year === 0 ? 'Start' : `Yr ${year.year}`}
                  </span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-500
                                  ${year.isPaidOff ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${earningsPercent}%` }}
                    />
                    {/* 5-year marker */}
                    {year.year === 5 && (
                      <div className="absolute top-0 right-0 h-full w-0.5 bg-amber-500" title="Avg homeownership" />
                    )}
                  </div>
                  <span className={`text-xs w-20 text-right font-medium
                                    ${year.isPaidOff ? 'text-emerald-600' : 'text-slate-600'}`}>
                    {year.isPaidOff ? (
                      <>+${Math.abs(Math.round(year.remainingCost)).toLocaleString()}</>
                    ) : (
                      <>-${Math.round(year.remainingCost).toLocaleString()}</>
                    )}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-sm">
            <div>
              <p className="text-slate-500">Est. Annual Value</p>
              <p className="font-bold text-emerald-600">~${roi.annualEarnings.toLocaleString()}/yr</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Payback Period</p>
              <p className={`font-bold ${roi.paybackYears && roi.paybackYears <= 6 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {roi.paybackYears
                  ? roi.paybackYears > 10
                    ? '10+ years'
                    : `~${roi.paybackYears} years`
                  : 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">5-Year Net</p>
              <p className={`font-bold ${roi.fiveYearNet <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {roi.fiveYearNet <= 0
                  ? `+$${Math.abs(Math.round(roi.fiveYearNet)).toLocaleString()}`
                  : `-$${Math.round(roi.fiveYearNet).toLocaleString()}`}
              </p>
            </div>
          </div>

          {/* Long payback — show additional battery benefits */}
          {roi.paybackYears && roi.paybackYears > 8 && (
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-xs font-semibold text-slate-600 mb-1.5">
                {hasSolarSavings
                  ? 'Additional battery benefits not included above:'
                  : 'VPP earnings are just one benefit of a home battery:'}
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">&#9679;</span>
                  <span><strong>Backup power</strong> — keep your lights, fridge, and internet on during outages</span>
                </li>
                {!hasSolarSavings && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-500 mt-0.5">&#9679;</span>
                    <span><strong>Solar self-consumption</strong> — store excess solar and use it at night instead of buying from the grid</span>
                  </li>
                )}
                {!hasSolarSavings && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-500 mt-0.5">&#9679;</span>
                    <span><strong>Time-of-use savings</strong> — charge when rates are low, discharge when rates are high</span>
                  </li>
                )}
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">&#9679;</span>
                  <span><strong>Home value</strong> — solar + storage systems increase property value</span>
                </li>
              </ul>
            </div>
          )}
        </>
      )}

      {roi.annualEarnings === 0 && (
        <p className="text-sm text-slate-500 italic">
          No estimated ongoing earnings data available for this VPP program.
          {!hasSolarSavings && ' Toggle solar on and enter your zip to see self-consumption savings.'}
        </p>
      )}
    </div>
  )
}

// ---- Owner ROI Display ----
function OwnerROIDisplay({ roi, vppName }: { roi: OwnerROI; vppName?: string }) {
  if (roi.annualEarnings === 0) return null

  const hasSolarSavings = roi.annualSelfConsumption > 0 || roi.annualTOUArbitrage > 0

  return (
    <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 mt-4">
      <h4 className="text-base font-bold text-emerald-800 mb-1">
        Projected Earnings{vppName ? ` — ${vppName}` : ''}
      </h4>
      <p className="text-sm text-emerald-600 mb-3">
        Your existing battery could earn/save you:
      </p>

      {/* Earnings breakdown when solar savings exist */}
      {hasSolarSavings && (
        <div className="mb-3 p-2.5 bg-white/60 rounded-lg text-sm space-y-1">
          {roi.annualVPPEarnings > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>VPP Earnings</span>
              <span className="font-medium">${roi.annualVPPEarnings.toLocaleString()}/yr</span>
            </div>
          )}
          {roi.annualSelfConsumption > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Solar Self-Consumption</span>
              <span className="font-medium">${roi.annualSelfConsumption.toLocaleString()}/yr</span>
            </div>
          )}
          {roi.annualTOUArbitrage > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>TOU Peak Arbitrage</span>
              <span className="font-medium">${roi.annualTOUArbitrage.toLocaleString()}/yr</span>
            </div>
          )}
          <div className="border-t border-emerald-300 pt-1 flex justify-between font-bold text-emerald-800">
            <span>Total Annual Value</span>
            <span>${roi.annualEarnings.toLocaleString()}/yr</span>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {roi.yearByYear.slice(1).map((year) => {
          const percent = (year.cumulativeEarnings / roi.fiveYearEarnings) * 100
          return (
            <div key={year.year} className="flex items-center gap-2">
              <span className="text-xs text-emerald-700 w-12">Yr {year.year}</span>
              <div className="flex-1 h-5 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-emerald-700 w-16 text-right">
                +${year.cumulativeEarnings.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-emerald-200 text-center">
        <p className="text-emerald-700 text-sm">
          Estimated 5-year total:{' '}
          <span className="font-bold text-lg">${roi.fiveYearEarnings.toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}

// ---- Cost Row (bar chart row for cost breakdown) ----
function CostRow({ label, amount, color, maxValue, highlight, savings }: {
  label: string
  amount: number
  color: string
  maxValue: number
  highlight?: string
  savings?: number
}) {
  const percent = (amount / maxValue) * 100

  return (
    <div>
      <div className="flex justify-between text-xs text-slate-600 mb-0.5">
        <span>{label}</span>
        <span className="font-medium">
          ${amount.toLocaleString()}
          {highlight && savings && (
            <span className="text-emerald-600 ml-1">({highlight}{savings.toLocaleString()})</span>
          )}
        </span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
