// =============================================================================
// VPP Type Definitions
// These types define the shape of data used throughout VPPCompare.
// They ensure consistency between our frontend components and the database.
// =============================================================================

/**
 * VPP (Virtual Power Plant) — the main data type for the app.
 * Each VPP represents a program offered by an energy provider that allows
 * homeowners with solar/battery systems to participate in a virtual power plant.
 */
export interface VPP {
  id: string;
  name: string;                           // e.g. "Tesla Energy Plan"
  provider: string;                       // e.g. "Tesla / Energy Locals"
  description: string;                    // Short summary of the VPP program
  signup_bonus: number | null;            // One-time bonus in AUD, or null if none
  feed_in_rate: number | null;            // Cents per kWh exported to the grid
  controlled_load_discount: number | null; // Percentage discount, or null if none
  battery_brands_supported: string[];     // e.g. ["Tesla Powerwall", "BYD"]
  solar_required: boolean;                // Does the customer need solar panels?
  battery_required: boolean;              // Does the customer need a home battery?
  states_available: string[];             // Australian states, e.g. ["NSW", "VIC", "QLD"]
  website_url: string;                    // Link to the provider's VPP page
  logo_url: string | null;               // URL to the provider's logo image
  created_at: string;                     // ISO timestamp of when the record was created
  updated_at: string;                     // ISO timestamp of the last update
}

/**
 * VPPComparison — used to track which VPPs the user is comparing
 * and how they want the results sorted.
 */
export interface VPPComparison {
  vpps: VPP[];                            // Array of VPPs being compared
  sortBy: keyof VPP;                      // Which field to sort by
  sortDirection: 'asc' | 'desc';          // Sort order
}
