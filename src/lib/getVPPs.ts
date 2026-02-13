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
