// =============================================================================
// State Energy Rates — Retail, Export, and TOU Data
// =============================================================================
// Used by the ROI calculator to estimate battery self-consumption savings.
//
// The core insight: without a battery, solar owners export excess energy at
// low net metering / export rates (often 3-8 cents/kWh). With a battery,
// they store that energy and use it at night, avoiding buying from the grid
// at the full retail rate (15-40 cents/kWh). The savings = the spread.
//
// Data sources (2025):
//   - EIA Electric Power Monthly (retail rates)
//   - State PUC filings (export/net metering rates)
//   - Utility TOU rate schedules
//
// Self-consumption model:
//   Without battery: ~30% of solar generation consumed directly
//   With battery:    ~70% of solar generation consumed (stored + direct)
//   Improvement:     ~40% more solar self-consumed → savings on grid purchases
// =============================================================================

export interface StateEnergyRate {
  state: string                // 2-letter state code
  retailRate: number           // Average residential retail rate ($/kWh)
  exportRate: number           // Net metering / export compensation rate ($/kWh)
  hasTOU: boolean              // Does the state have significant TOU rate structures?
  touPeakRate?: number         // Peak TOU rate if applicable ($/kWh)
  touOffPeakRate?: number      // Off-peak TOU rate if applicable ($/kWh)
  notes?: string               // Brief policy note
}

/**
 * State energy rate data for all states where VPP programs exist,
 * plus neighboring/relevant states.
 *
 * exportRate = what solar owners get paid for excess energy sent to grid.
 * retailRate = what they pay to buy from the grid.
 * The spread (retailRate - exportRate) × shifted kWh = annual battery savings.
 */
export const STATE_ENERGY_RATES: Record<string, StateEnergyRate> = {
  // --- States with VPP programs ---
  CA: {
    state: 'CA',
    retailRate: 0.3375,
    exportRate: 0.05,        // NEM 3.0 avoided cost avg ~4-8¢, using 5¢ midpoint
    hasTOU: true,
    touPeakRate: 0.50,       // 4-9 PM summer peak can hit 50-74¢
    touOffPeakRate: 0.20,
    notes: 'NEM 3.0 (Net Billing Tariff). Export rates ~75% below retail.',
  },
  TX: {
    state: 'TX',
    retailRate: 0.145,
    exportRate: 0.05,        // Wholesale buyback avg 3-6¢, some REPs up to 10¢
    hasTOU: false,
    notes: 'No statewide net metering. Solar buyback at wholesale rates.',
  },
  MA: {
    state: 'MA',
    retailRate: 0.315,
    exportRate: 0.26,        // Near retail for ≤25kW systems (reduced for excess)
    hasTOU: false,
    notes: 'Strong net metering at near-retail rate for systems ≤25 kW.',
  },
  CT: {
    state: 'CT',
    retailRate: 0.303,
    exportRate: 0.288,       // Netting tariff at retail rate
    hasTOU: false,
    notes: 'RRES Netting Tariff credits at retail rate.',
  },
  RI: {
    state: 'RI',
    retailRate: 0.285,
    exportRate: 0.265,       // Near retail net metering
    hasTOU: false,
    notes: 'Net metering at near-retail rate.',
  },
  VT: {
    state: 'VT',
    retailRate: 0.215,
    exportRate: 0.17,        // Slightly below retail
    hasTOU: false,
    notes: 'Net metering with blended rate.',
  },
  NH: {
    state: 'NH',
    retailRate: 0.245,
    exportRate: 0.12,        // Export at avoided cost, well below retail
    hasTOU: false,
    notes: 'Net metering at default energy rate (supply portion only).',
  },
  ME: {
    state: 'ME',
    retailRate: 0.225,
    exportRate: 0.10,        // Net billing at avoided cost
    hasTOU: false,
    notes: 'Transitioning to net billing. Export below retail.',
  },
  NY: {
    state: 'NY',
    retailRate: 0.24,
    exportRate: 0.20,        // Retail net metering (with CBC charge)
    hasTOU: true,
    touPeakRate: 0.35,
    touOffPeakRate: 0.15,
    notes: 'Net metering at retail, transitioning to VDER Value Stack.',
  },
  MD: {
    state: 'MD',
    retailRate: 0.175,
    exportRate: 0.165,       // Full retail net metering (A-rated state)
    hasTOU: false,
    notes: 'Full retail net metering. One of the best NEM states.',
  },
  VA: {
    state: 'VA',
    retailRate: 0.155,
    exportRate: 0.13,        // Near retail, but under threat from APCo proposal
    hasTOU: false,
    notes: 'Net metering near retail. APCo proposing 70% reduction.',
  },
  CO: {
    state: 'CO',
    retailRate: 0.165,
    exportRate: 0.14,        // Retail net metering (A-rated), Xcel pushback
    hasTOU: false,
    notes: 'Retail net metering. Utilities pushing for reduction.',
  },
  AZ: {
    state: 'AZ',
    retailRate: 0.152,
    exportRate: 0.065,       // APS net billing ~6.85¢, declining
    hasTOU: true,
    touPeakRate: 0.25,
    touOffPeakRate: 0.08,
    notes: 'Net billing. APS export rate ~6.85¢, declining 10%/yr.',
  },
  HI: {
    state: 'HI',
    retailRate: 0.402,
    exportRate: 0.10,        // CGS Plus / Smart Export, well below retail
    hasTOU: false,
    notes: 'Highest retail rate. Export at avoided cost, far below retail.',
  },

  // --- Additional states (for broader coverage) ---
  FL: {
    state: 'FL',
    retailRate: 0.154,
    exportRate: 0.13,
    hasTOU: false,
    notes: 'Net metering at retail. FPL serves most of the state.',
  },
  NJ: {
    state: 'NJ',
    retailRate: 0.195,
    exportRate: 0.18,
    hasTOU: false,
    notes: 'Net metering at retail rate.',
  },
  PA: {
    state: 'PA',
    retailRate: 0.175,
    exportRate: 0.06,        // Price-to-compare rate (supply only)
    hasTOU: false,
    notes: 'Net metering at price-to-compare (supply portion only).',
  },
  IL: {
    state: 'IL',
    retailRate: 0.181,
    exportRate: 0.07,        // Supply rate only for net metering
    hasTOU: false,
    notes: 'Net metering at supply rate. ComEd territory.',
  },
  GA: {
    state: 'GA',
    retailRate: 0.145,
    exportRate: 0.04,        // Georgia Power avoided cost
    hasTOU: false,
    notes: 'No true net metering. Georgia Power pays avoided cost.',
  },
  NC: {
    state: 'NC',
    retailRate: 0.14,
    exportRate: 0.05,        // Net metering being phased out by Duke Energy
    hasTOU: false,
    notes: 'Net metering at avoided cost. Duke Energy territory.',
  },
}

/**
 * Get energy rate data for a state. Returns null if state not in our database.
 */
export function getStateEnergyRate(stateCode: string): StateEnergyRate | null {
  return STATE_ENERGY_RATES[stateCode] ?? null
}

/**
 * Calculate annual battery self-consumption savings for a solar household.
 *
 * Model:
 *   Without battery: ~30% self-consumption → 70% exported at export rate
 *   With battery:    ~70% self-consumption → 30% exported at export rate
 *   Improvement:     40% of solar production shifted from export → self-use
 *
 * For each shifted kWh, the homeowner:
 *   - No longer sells it at the export rate (lost revenue)
 *   - Instead avoids buying 1 kWh from the grid at retail rate (saved cost)
 *   - Net gain per shifted kWh = retailRate - exportRate
 *
 * In TOU states, we use the peak rate for evening self-consumption
 * since batteries discharge primarily during peak hours (4-9 PM).
 *
 * @param stateCode     - 2-letter state code
 * @param solarSizeKw   - Solar system size in kW
 * @param batteryKwh    - Battery capacity in kWh
 * @param hasSolar      - Whether the user has solar panels
 */
export function calculateBatterySavings(
  stateCode: string,
  solarSizeKw: number,
  batteryKwh: number,
  hasSolar: boolean,
): {
  annualSavings: number
  selfConsumptionSavings: number  // Value of stored solar used at home
  touArbitrageSavings: number     // Extra TOU peak/off-peak savings
  retailRate: number
  exportRate: number
  shiftedKwhPerYear: number
} | null {
  if (!hasSolar) return null

  const rates = getStateEnergyRate(stateCode)
  if (!rates) return null

  // Estimate annual solar production: ~1,400 kWh per kW installed (US average)
  // Ranges from ~1,100 (northeast) to ~1,800 (southwest)
  const solarProductionFactor = getSolarProductionFactor(stateCode)
  const annualSolarKwh = solarSizeKw * solarProductionFactor

  // How much solar energy the battery can realistically shift per year
  // Battery cycles ~300 days/year (not every day is sunny), ~80% usable capacity
  const dailyShiftableKwh = batteryKwh * 0.80 // 80% depth of discharge
  const annualShiftableKwh = dailyShiftableKwh * 300

  // Can't shift more than 40% of solar production
  // (going from 30% self-consumption to 70%)
  const maxShiftableFromSolar = annualSolarKwh * 0.40
  const shiftedKwh = Math.min(annualShiftableKwh, maxShiftableFromSolar)

  // Self-consumption savings: each shifted kWh saves (retail - export) rate
  const spreadPerKwh = rates.retailRate - rates.exportRate
  const selfConsumptionSavings = Math.round(shiftedKwh * spreadPerKwh)

  // TOU arbitrage: in TOU states, evening discharge is at peak rate
  // Additional value beyond flat retail rate
  let touArbitrageSavings = 0
  if (rates.hasTOU && rates.touPeakRate && rates.touOffPeakRate) {
    // Battery charges during off-peak/midday, discharges during peak
    // Extra savings per kWh = peakRate - retailRate (already counted retail above)
    const touBonus = rates.touPeakRate - rates.retailRate
    if (touBonus > 0) {
      // Only ~60% of shifted energy lands in peak hours
      touArbitrageSavings = Math.round(shiftedKwh * 0.6 * touBonus)
    }
  }

  return {
    annualSavings: selfConsumptionSavings + touArbitrageSavings,
    selfConsumptionSavings,
    touArbitrageSavings,
    retailRate: rates.retailRate,
    exportRate: rates.exportRate,
    shiftedKwhPerYear: Math.round(shiftedKwh),
  }
}

/**
 * Solar production factor: kWh per kW installed per year.
 * Varies by state based on latitude, irradiance, and climate.
 */
function getSolarProductionFactor(stateCode: string): number {
  const factors: Record<string, number> = {
    // Southwest — highest irradiance
    AZ: 1750, HI: 1650, CA: 1600, TX: 1550, NM: 1700,
    NV: 1700, CO: 1500, FL: 1500, GA: 1450, NC: 1400,
    // Mid-Atlantic / Southeast
    VA: 1350, MD: 1350, NJ: 1350, PA: 1300, IL: 1250,
    // Northeast — lower irradiance
    NY: 1250, CT: 1200, MA: 1200, RI: 1200, NH: 1150,
    VT: 1150, ME: 1100,
  }
  return factors[stateCode] ?? 1400 // US average fallback
}
