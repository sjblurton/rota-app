import type { User } from '@supabase/supabase-js'

type SupabaseUserMetadata = {
  invite_id: string
  organisation_id: string
}

export type SupabaseUser = User & {
  user_metadata: SupabaseUserMetadata
}
