// =============================================================================
// Supabase Client Configuration
// =============================================================================
// Supabase is a backend-as-a-service that provides a PostgreSQL database,
// authentication, and real-time subscriptions. We use it to store VPP data.
//
// The client is created once and reused across the app.
// Credentials are stored in .env.local (not committed to Git).
// =============================================================================

import { createClient } from '@supabase/supabase-js'

// Read Supabase credentials from environment variables
// NEXT_PUBLIC_ prefix makes these available in the browser (client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create the Supabase client — this is what we use to query the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured =
  supabaseUrl !== '' &&
  supabaseUrl !== 'your-supabase-url-here' &&
  supabaseAnonKey !== '' &&
  supabaseAnonKey !== 'your-supabase-anon-key-here'
