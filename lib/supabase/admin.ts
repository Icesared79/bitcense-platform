import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Admin client with service role key (for server-side operations only)
// Uses createClient from @supabase/supabase-js to properly bypass RLS
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    // During static generation, env vars may not be available
    console.warn('Supabase admin client: missing env vars, using placeholder')
    return createSupabaseClient(
      url || 'https://placeholder.supabase.co',
      key || 'placeholder',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }

  return createSupabaseClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
