import { AuthError } from '@supabase/supabase-js'
import { DateTime } from 'luxon'
import { v4 as uuidV4 } from 'uuid'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type Invite } from '../../@types/invites'
import { ROLES } from '../../constants/roles'
import { supabase } from '../../libs/auth/supabase'
import { requireEnv } from '../../utils/env/requireEnv'
import { HttpErrorByCode } from '../../utils/http/HttpErrorByCode'
import { inviteUserByEmailService } from './invite-user-by-email.service'

const inviteId = uuidV4()
const orgId = uuidV4()

vi.mock('../../libs/auth/supabase', () => ({
  supabase: {
    auth: {
      admin: {
        inviteUserByEmail: vi.fn(),
      },
    },
  },
}))
vi.mock('../../utils/env/requireEnv', () => ({
  requireEnv: vi.fn(() => 'http://localhost:3000'),
}))
const mockToday = new Date('2026-04-29T10:00:00Z')

const validInvite: Invite = {
  id: inviteId,
  organisation_id: orgId,
  email: 'test@example.com',
  status: 'invited',
  role: ROLES.ADMIN,
  preferred_contact_method: 'email',
  created_at: new Date(mockToday),
  updated_at: new Date(mockToday),
  expires_at: DateTime.fromJSDate(mockToday).plus({ days: 7 }).toJSDate(),
}

describe('inviteUserByEmailService', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(mockToday)
    vi.clearAllMocks()
  })

  it('throws if invite is expired', async () => {
    vi.setSystemTime(DateTime.fromJSDate(mockToday).plus({ days: 8 }).toJSDate())
    await expect(inviteUserByEmailService({ data: validInvite })).rejects.toThrow(HttpErrorByCode)
  })

  it('calls supabase.auth.admin.inviteUserByEmail with correct args', async () => {
    ;(supabase.auth.admin.inviteUserByEmail as any).mockResolvedValue({ error: null })
    await inviteUserByEmailService({ data: validInvite })
    expect(supabase.auth.admin.inviteUserByEmail).toHaveBeenCalledWith(validInvite.email, {
      data: {
        invite_id: validInvite.id,
        organisation_id: validInvite.organisation_id,
      },
      redirectTo: `http://localhost:3000/invite/${validInvite.id}`,
    })
    expect(requireEnv).toHaveBeenCalledWith('APP_URL')
  })

  it('throws if supabase returns error', async () => {
    ;(supabase.auth.admin.inviteUserByEmail as any).mockResolvedValue({
      error: new AuthError('Test error', 400, 'bad_request'),
    })
    await expect(inviteUserByEmailService({ data: validInvite })).rejects.toThrow(AuthError)
  })

  it('returns undefined on success', async () => {
    ;(supabase.auth.admin.inviteUserByEmail as any).mockResolvedValue({ error: null })
    const result = await inviteUserByEmailService({ data: validInvite })
    expect(result).toBeUndefined()
  })

  it('returns early and does not call supabase in test env', async () => {
    ;(requireEnv as any).mockImplementation((key: string) =>
      key === 'NODE_ENV' ? 'test' : 'http://localhost:3000',
    )
    const result = await inviteUserByEmailService({ data: validInvite })
    expect(result).toBeUndefined()
    expect(supabase.auth.admin.inviteUserByEmail).not.toHaveBeenCalled()
  })
})
