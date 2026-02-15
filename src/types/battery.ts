// =============================================================================
// Battery Type Definitions
// =============================================================================
// Types for home battery products stored in the Supabase `batteries` table.
// Used by the "Looking to Buy" path on the homepage to show battery
// recommendations alongside VPP programs.
// =============================================================================

/**
 * Battery — a home battery product that can be purchased and installed.
 * Each battery can be compatible with one or more VPP programs.
 */
export interface Battery {
  id: string
  name: string                    // e.g. "Tesla Powerwall 3"
  manufacturer: string            // e.g. "Tesla"
  brand_key: string               // Matches VPP battery_brands_supported values
  capacity_kwh: number            // e.g. 13.5
  price_installed: number         // USD price including installation
  price_per_kwh: number           // Calculated: price / capacity (generated column)
  is_modular: boolean             // Can you stack multiple units?
  itc_eligible: boolean           // Eligible for 30% federal Investment Tax Credit?
  notes: string | null            // Short product note, e.g. "Best $/kWh value"
  product_url: string | null      // Link to manufacturer product page
  created_at: string
  updated_at: string
}

/**
 * VPPBatteryCompatibility — links a specific battery to a VPP program.
 * Used to show "Battery Partner" cards on the buyer path.
 */
export interface VPPBatteryCompatibility {
  id: string
  vpp_id: string
  battery_id: string
  is_recommended: boolean         // Show a "Recommended" badge?
  compatibility_notes: string | null
  battery?: Battery               // Joined battery data (populated by Supabase nested select)
}
