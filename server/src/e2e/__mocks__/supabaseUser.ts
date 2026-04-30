import { v4 as uuidV4 } from 'uuid'

import { type SupabaseUser } from '../../@types/supabase_user'

export const mockUser = (overrides: Partial<SupabaseUser> = {}): SupabaseUser => ({
  id: 'test-user-id',
  email: 'user@test.com',
  aud: 'authenticated',
  user_metadata: {
    invite_id: uuidV4(),
    organisation_id: uuidV4(),
  },
  created_at: new Date().toISOString(),
  app_metadata: {},
  ...overrides,
})
