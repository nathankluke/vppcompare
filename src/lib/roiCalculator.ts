// =============================================================================
// ROI Calculator — Pure Functions
// =============================================================================
// Calculates payback period and return on investment for home batteries.
// Used by the ROICalculator component on the homepage.
//
// Two modes:
//   1. BUYER: How fast does a new battery pay for itself?
//   2. OWNER: How much can you earn over 5 years from your existing battery?
// =============================================================================

import { Battery } from '@/types/battery'
import { VPPIncentive } from '@/types/incentive'

/**
 * ROI calculation result for a buyer (purchasing a new battery).
 */
export interface BuyerROI {
  installedCost: number          // Raw battery price
  itcSavings: number             // 30% federal tax credit savings
  costAfterITC: number           // Price after ITC
  purchaseIncentive: number      // Total VPP purchase rebates
  netCost: number                // Final cost after all incentives
  annualEarnings: number         // Estimated yearly VPP earnings
  paybackYears: number | null    // Years to break even (null if no earnings)
  fiveYearEarnings: number       // Total earnings over 5 years
  fiveYearNet: number            // Net position after 5 years (negative = still paying off)
  yearByYear: YearData[]         // Year-by-year breakdown for the chart
}

/**
 * ROI calculation result for an owner (already has a battery).
 */
export interface OwnerROI {
  annualEarnings: number
  fiveYearEarnings: number
  yearByYear: YearData[]
}

/**
 * Data for one year in the payback timeline chart.
 */
export interface YearData {
  year: number
  cumulativeEarnings: number
  remainingCost: number          // Only for buyers (negative means profit!)
  isPaidOff: boolean             // Has the battery paid for itself?
}

/**
 * Calculate ROI for a buyer purchasing a new battery + joining a VPP.
 */
export function calculateBuyerROI(
  battery: Battery,
  incentives: VPPIncentive[]
): BuyerROI {
  // Step 1: Start with installed cost
  const installedCost = battery.price_installed

  // Step 2: Apply 30% Investment Tax Credit (ITC) if eligible
  const itcSavings = battery.itc_eligible ? Math.round(installedCost * 0.30) : 0
  const costAfterITC = installedCost - itcSavings

  // Step 3: Sum up all purchase incentives (one-time rebates)
  const purchaseIncentive = incentives
    .filter((i) => i.incentive_type === 'purchase')
    .reduce((sum, i) => sum + (i.amount_dollars ?? 0), 0)
  const netCost = Math.max(0, costAfterITC - purchaseIncentive)

  // Step 4: Sum up estimated annual earnings from ongoing incentives
  const annualEarnings = incentives
    .filter((i) => i.incentive_type === 'ongoing')
    .reduce((sum, i) => sum + (i.estimated_annual_value ?? 0), 0)

  // Step 5: Calculate payback period
  const paybackYears = annualEarnings > 0
    ? Math.round((netCost / annualEarnings) * 10) / 10
    : null

  // Step 6: Build year-by-year data (up to 10 years or payback + 2)
  const maxYears = paybackYears !== null ? Math.min(Math.ceil(paybackYears) + 2, 10) : 10
  const yearByYear: YearData[] = []

  for (let year = 0; year <= maxYears; year++) {
    const cumulativeEarnings = annualEarnings * year
    const remainingCost = netCost - cumulativeEarnings
    yearByYear.push({
      year,
      cumulativeEarnings,
      remainingCost,
      isPaidOff: remainingCost <= 0,
    })
  }

  return {
    installedCost,
    itcSavings,
    costAfterITC,
    purchaseIncentive,
    netCost,
    annualEarnings,
    paybackYears,
    fiveYearEarnings: annualEarnings * 5,
    fiveYearNet: netCost - (annualEarnings * 5),
    yearByYear,
  }
}

/**
 * Calculate ROI for an owner who already has a battery.
 * Much simpler — just project earnings over time.
 */
export function calculateOwnerROI(
  incentives: VPPIncentive[]
): OwnerROI {
  const annualEarnings = incentives
    .filter((i) => i.incentive_type === 'ongoing')
    .reduce((sum, i) => sum + (i.estimated_annual_value ?? 0), 0)

  const yearByYear: YearData[] = []
  for (let year = 0; year <= 5; year++) {
    yearByYear.push({
      year,
      cumulativeEarnings: annualEarnings * year,
      remainingCost: 0,
      isPaidOff: true,
    })
  }

  return {
    annualEarnings,
    fiveYearEarnings: annualEarnings * 5,
    yearByYear,
  }
}
