import { type RequestHandler } from 'express'

import { type SupabaseUser } from '../../../@types/supabase_user'
import { supabase } from '../../../libs/auth/supabase'
import { requireEnv } from '../../../utils/env/requireEnv'
import { HttpErrorByCode } from '../../../utils/http/HttpErrorByCode'

const createMockUser = (overrides?: Partial<SupabaseUser>): SupabaseUser => ({
  id: 'test-user-id',
  email: 'user@test.com',
  user_metadata: {
    invite_id: 'test-invite-id',
    organisation_id: 'test-org-id',
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
})

export function createRequireJwtAuth(mockUser?: Partial<SupabaseUser>): RequestHandler {
  return async (request, _response, next) => {
    if (mockUser && requireEnv('NODE_ENV') !== 'test') {
      throw new HttpErrorByCode(
        'internal_server_error',
        'Mock user should only be used in test environment',
      )
    }
    if (mockUser) {
      request.superbaseUser = createMockUser(mockUser)
      return next()
    }

    const auth = request.headers.authorization
    if (!auth?.startsWith('Bearer ')) {
      throw new HttpErrorByCode('unauthorised', 'Missing token')
    }

    const token = auth.split(' ')[1]
    if (!token) {
      throw new HttpErrorByCode('unauthorised', 'Missing token')
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      throw new HttpErrorByCode('unauthorised', 'Invalid token')
    }

    request.superbaseUser = user as SupabaseUser
    next()
  }
}

export const requireJwtAuth = createRequireJwtAuth()
