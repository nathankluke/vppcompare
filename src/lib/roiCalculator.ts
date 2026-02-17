// =============================================================================
// ROI Calculator — Pure Functions
// =============================================================================
// Calculates payback period and return on investment for home batteries.
// Used by the ROICalculator component on the homepage.
//
// Three revenue/savings streams for battery owners:
//   1. VPP earnings (ongoing incentives)
//   2. Self-consumption savings (store solar, use at night instead of grid)
//   3. TOU arbitrage (discharge during peak pricing hours)
//
// Two modes:
//   1. BUYER: How fast does a new battery pay for itself?
//   2. OWNER: How much can you earn over 5 years from your existing battery?
// =============================================================================

import { Battery } from '@/types/battery'
import { VPPIncentive } from '@/types/incentive'
import { calculateBatterySavings } from '@/lib/stateEnergyRates'

/**
 * ROI calculation result for a buyer (purchasing a new battery).
 */
export interface BuyerROI {
  installedCost: number          // Raw battery price
  itcSavings: number             // 30% federal tax credit savings
  costAfterITC: number           // Price after ITC
  purchaseIncentive: number      // Total VPP purchase rebates
  netCost: number                // Final cost after all incentives
  annualVPPEarnings: number      // Yearly VPP program earnings
  annualSelfConsumption: number  // Yearly self-consumption savings (solar)
  annualTOUArbitrage: number     // Yearly TOU peak/off-peak arbitrage
  annualEarnings: number         // Total annual value (VPP + savings)
  paybackYears: number | null    // Years to break even (null if no earnings)
  fiveYearEarnings: number       // Total earnings over 5 years
  fiveYearNet: number            // Net position after 5 years
  yearByYear: YearData[]         // Year-by-year breakdown for the chart
}

/**
 * ROI calculation result for an owner (already has a battery).
 */
export interface OwnerROI {
  annualVPPEarnings: number
  annualSelfConsumption: number
  annualTOUArbitrage: number
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
 * Options for solar self-consumption savings calculation.
 */
interface SolarOptions {
  stateCode: string
  hasSolar: boolean
  solarSizeKw: number
  batteryKwh: number
}

/**
 * Calculate ROI for a buyer purchasing a new battery + joining a VPP.
 * Uses the low-end installed price for a more optimistic (but realistic) payback estimate.
 * Now includes self-consumption savings and TOU arbitrage for solar owners.
 */
export function calculateBuyerROI(
  battery: Battery,
  incentives: VPPIncentive[],
  solar?: SolarOptions
): BuyerROI {
  // Step 1: Start with installed cost — use the low-end price for best-case ROI
  const installedCost = battery.price_installed_low ?? battery.price_installed

  // Step 2: Apply 30% Investment Tax Credit (ITC) if eligible
  const itcSavings = battery.itc_eligible ? Math.round(installedCost * 0.30) : 0
  const costAfterITC = installedCost - itcSavings

  // Step 3: Sum up all purchase incentives (one-time rebates)
  const purchaseIncentive = incentives
    .filter((i) => i.incentive_type === 'purchase')
    .reduce((sum, i) => sum + (i.amount_dollars ?? 0), 0)
  const netCost = Math.max(0, costAfterITC - purchaseIncentive)

  // Step 4: Sum up estimated annual earnings from ongoing VPP incentives
  const annualVPPEarnings = incentives
    .filter((i) => i.incentive_type === 'ongoing')
    .reduce((sum, i) => sum + (i.estimated_annual_value ?? 0), 0)

  // Step 5: Calculate battery self-consumption savings (for solar owners)
  let annualSelfConsumption = 0
  let annualTOUArbitrage = 0

  if (solar?.hasSolar && solar.stateCode) {
    const savings = calculateBatterySavings(
      solar.stateCode,
      solar.solarSizeKw,
      solar.batteryKwh ?? battery.capacity_kwh,
      solar.hasSolar
    )
    if (savings) {
      annualSelfConsumption = savings.selfConsumptionSavings
      annualTOUArbitrage = savings.touArbitrageSavings
    }
  }

  // Step 6: Total annual value = VPP + self-consumption + TOU
  const annualEarnings = annualVPPEarnings + annualSelfConsumption + annualTOUArbitrage

  // Step 7: Calculate payback period
  const paybackYears = annualEarnings > 0
    ? Math.round((netCost / annualEarnings) * 10) / 10
    : null

  // Step 8: Build year-by-year data (up to 10 years or payback + 2)
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
    annualVPPEarnings,
    annualSelfConsumption,
    annualTOUArbitrage,
    annualEarnings,
    paybackYears,
    fiveYearEarnings: annualEarnings * 5,
    fiveYearNet: netCost - (annualEarnings * 5),
    yearByYear,
  }
}

/**
 * Calculate ROI for an owner who already has a battery.
 * Now includes self-consumption savings for solar owners.
 */
export function calculateOwnerROI(
  incentives: VPPIncentive[],
  solar?: SolarOptions
): OwnerROI {
  const annualVPPEarnings = incentives
    .filter((i) => i.incentive_type === 'ongoing')
    .reduce((sum, i) => sum + (i.estimated_annual_value ?? 0), 0)

  // Calculate battery self-consumption savings
  let annualSelfConsumption = 0
  let annualTOUArbitrage = 0

  if (solar?.hasSolar && solar.stateCode) {
    const savings = calculateBatterySavings(
      solar.stateCode,
      solar.solarSizeKw,
      solar.batteryKwh,
      solar.hasSolar
    )
    if (savings) {
      annualSelfConsumption = savings.selfConsumptionSavings
      annualTOUArbitrage = savings.touArbitrageSavings
    }
  }

  const annualEarnings = annualVPPEarnings + annualSelfConsumption + annualTOUArbitrage

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
    annualVPPEarnings,
    annualSelfConsumption,
    annualTOUArbitrage,
    annualEarnings,
    fiveYearEarnings: annualEarnings * 5,
    yearByYear,
  }
}
