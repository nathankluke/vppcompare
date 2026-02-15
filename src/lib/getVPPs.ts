// =============================================================================
// VPP Data Fetching Helpers
// =============================================================================
// These functions fetch VPP data from the Supabase database.
// They run on the SERVER (not in the browser) because Next.js App Router
// components are Server Components by default.
//
// This means:
//   - Data is fetched at build time or request time on the server
//   - The Supabase query never exposes credentials to the browser
//   - Pages load faster because data is already in the HTML
// =============================================================================

import { supabase } from './supabase'
import { VPP } from '@/types/vpp'

/**
 * Fetch all VPPs from the database, sorted by feed-in rate (highest first).
 * Used on the Compare page.
 */
export async function getAllVPPs(): Promise<VPP[]> {
  const { data, error } = await supabase
    .from('vpps')
    .select('*')
    .order('feed_in_rate', { ascending: false })

  if (error) {
    console.error('Error fetching VPPs:', error.message)
    return []
  }

  return data as VPP[]
}

/**
 * Fetch a limited number of featured VPPs for the homepage.
 * Returns the top 3 VPPs by feed-in rate.
 */
export async function getFeaturedVPPs(): Promise<VPP[]> {
  const { data, error } = await supabase
    .from('vpps')
    .select('*')
    .order('feed_in_rate', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching featured VPPs:', error.message)
    return []
  }

  return data as VPP[]
}

/**
 * Fetch VPPs available in a specific state.
 * Uses Supabase's `contains` filter for the states_available array.
 */
export async function getVPPsByState(stateCode: string): Promise<VPP[]> {
  const { data, error } = await supabase
    .from('vpps')
    .select('*')
    .contains('states_available', [stateCode])
    .order('feed_in_rate', { ascending: false })

  if (error) {
    console.error(`Error fetching VPPs for state ${stateCode}:`, error.message)
    return []
  }

  return data as VPP[]
}

/**
 * Fetch all VPPs with their incentives and battery compatibility joined.
 * Uses Supabase's nested select syntax to get related data in one query.
 * Used on the homepage where we need incentive details and battery matches.
 */
export async function getAllVPPsWithIncentives(): Promise<VPP[]> {
  const { data, error } = await supabase
    .from('vpps')
    .select(`
      *,
      incentives:vpp_incentives(*),
      compatible_batteries:vpp_battery_compatibility(
        *,
        battery:batteries(*)
      )
    `)
    .order('feed_in_rate', { ascending: false })

  if (error) {
    console.error('Error fetching VPPs with incentives:', error.message)
    // Fall back to basic VPP data if the join fails (tables might not exist yet)
    return getAllVPPs()
  }

  return data as VPP[]
}
