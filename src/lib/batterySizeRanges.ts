// =============================================================================
// Battery Size Ranges
// =============================================================================
// Defines the 4 battery capacity ranges for the "I Need a Battery" path.
// Based on actual VPP program requirements and battery products:
//   - Most VPPs accept 5 kWh minimum (Enphase IQ 5P)
//   - 10 kWh is the practical minimum for meaningful VPP earnings
//   - 13.5 kWh (Tesla Powerwall 3) is the most common VPP-enrolled battery
//   - Larger systems (16+ kWh) maximize grid earnings
//
// Shared between BuyerFilterForm and BuyerVPPResults.
// =============================================================================

export const BATTERY_SIZE_RANGES = [
  {
    key: 'starter' as const,
    label: 'Starter',
    range: '5 kWh',
    minKwh: 4,
    maxKwh: 8,
    description: 'Basic backup. Limited VPP earnings.',
    recommended: false,
  },
  {
    key: 'midrange' as const,
    label: 'Mid-Range',
    range: '9–10 kWh',
    minKwh: 8.1,
    maxKwh: 12,
    description: 'Good VPP earnings. Practical minimum for most programs.',
    recommended: false,
  },
  {
    key: 'fullsize' as const,
    label: 'Full-Size',
    range: '13–14 kWh',
    minKwh: 12.1,
    maxKwh: 15,
    description: 'Most VPP-compatible. Best overall value.',
    recommended: true,
  },
  {
    key: 'maxcapacity' as const,
    label: 'Max Capacity',
    range: '16+ kWh',
    minKwh: 15.1,
    maxKwh: 999,
    description: 'Maximum grid earnings & whole-home backup.',
    recommended: false,
  },
] as const

export type BatterySizeRange = typeof BATTERY_SIZE_RANGES[number]['key']
