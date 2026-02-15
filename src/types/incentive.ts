// =============================================================================
// Incentive Type Definitions
// =============================================================================
// Types for the `vpp_incentives` table in Supabase.
// Each VPP program can offer two types of benefits:
//   1. "purchase" — one-time rebates/discounts for buying a new battery
//   2. "ongoing"  — recurring payments for participating in the VPP
//
// A single VPP can have BOTH types (e.g., Xcel offers a $5,000 rebate AND $100/year).
// =============================================================================

/**
 * VPPIncentive — a specific financial benefit from a VPP program.
 */
export interface VPPIncentive {
  id: string
  vpp_id: string
  incentive_type: 'purchase' | 'ongoing'
  name: string                       // e.g. "Battery Purchase Rebate"
  description: string | null         // Longer explanation
  amount_dollars: number | null      // Fixed dollar amount, e.g. 5000
  amount_rate: number | null         // Rate-based amount, e.g. 275
  rate_unit: string | null           // Unit for rate, e.g. "$/kW", "cents/kWh", "$/month per 5kWh"
  frequency: 'one-time' | 'per-event' | 'monthly' | 'seasonal' | 'yearly' | null
  estimated_annual_value: number | null  // Estimated yearly earnings in USD (for ROI calculations)
  qualifying_notes: string | null    // e.g. "Must install new battery through partner"
  created_at: string
  updated_at: string
}
