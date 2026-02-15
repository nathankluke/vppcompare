// =============================================================================
// Battery Data Fetching Functions
// =============================================================================
// Queries the Supabase `batteries` table.
// Used by the "Looking to Buy" path on the homepage.
// =============================================================================

import { supabase } from './supabase'
import { Battery } from '@/types/battery'

/**
 * Fetch all battery products, sorted by best value (lowest $/kWh first).
 */
export async function getAllBatteries(): Promise<Battery[]> {
  const { data, error } = await supabase
    .from('batteries')
    .select('*')
    .order('price_per_kwh', { ascending: true })

  if (error) {
    console.error('Error fetching batteries:', error.message)
    return []
  }

  return data as Battery[]
}

/**
 * Fetch batteries within a budget range.
 * Returns batteries sorted by best value (lowest $/kWh).
 */
export async function getBatteriesByBudget(
  minBudget: number,
  maxBudget: number
): Promise<Battery[]> {
  const { data, error } = await supabase
    .from('batteries')
    .select('*')
    .gte('price_installed', minBudget)
    .lte('price_installed', maxBudget)
    .order('price_per_kwh', { ascending: true })

  if (error) {
    console.error('Error fetching batteries by budget:', error.message)
    return []
  }

  return data as Battery[]
}
