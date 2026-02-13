// =============================================================================
// Supabase Client Configuration
// =============================================================================
// Supabase is a backend-as-a-service that provides a PostgreSQL database,
// authentication, and real-time subscriptions. We'll use it to store VPP data.
//
// TODO: After creating a Supabase project, follow these steps:
//   1. Go to https://supabase.com/dashboard
//   2. Create a new project
//   3. Go to Settings -> API to find your URL and anon key
//   4. Add them to .env.local (see .env.local file in project root)
//   5. Install the client: npm install @supabase/supabase-js
//   6. Uncomment the import and client creation below
// =============================================================================

// import { createClient } from '@supabase/supabase-js'

// Read Supabase credentials from environment variables
// NEXT_PUBLIC_ prefix makes these available in the browser (client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Uncomment after installing @supabase/supabase-js:
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Placeholder export until Supabase is configured
// This prevents import errors in other files that reference supabase
export const supabase = null

// Export the config values so other files can check if Supabase is configured
export const isSupabaseConfigured =
  supabaseUrl !== '' &&
  supabaseUrl !== 'your-supabase-url-here' &&
  supabaseAnonKey !== '' &&
  supabaseAnonKey !== 'your-supabase-anon-key-here'
