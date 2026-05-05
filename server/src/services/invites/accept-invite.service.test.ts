import { DateTime } from 'luxon'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type Invite } from '../../@types/invites'
import { ROLES } from '../../constants/roles'
import { HttpErrorByCode } from '../../utils/http/HttpErrorByCode'
import { acceptInviteService } from './accept-invite.service'

const mockToday = new Date('2026-04-29T10:00:00Z')

const oneWeekFromToday = DateTime.fromJSDate(mockToday).plus({ days: 7 }).toJSDate()

const validInvite: Invite = {
  id: 'dcf6d793-9fe8-4964-aff4-b27b209052e5',
  organisation_id: 'org-1',
  email: 'test@example.com',
  status: 'invited',
  role: ROLES.ADMIN,
  preferred_contact_method: 'email',
  created_at: new Date(mockToday),
  updated_at: new Date(mockToday),
  expires_at: oneWeekFromToday,
}

const validBody = { status: 'accepted' } as const
const validUserId = 'user-123'

describe('acceptInviteService', () => {
  let updateInvite: any
  let createUser: any
  let getInviteById: any

  beforeEach(() => {
    updateInvite = vi.fn()
    createUser = vi.fn().mockResolvedValue({ user: 'created' })
    getInviteById = vi.fn().mockResolvedValue(validInvite)
    vi.useFakeTimers().setSystemTime(mockToday)
  })

  it('accepts invite and creates user', async () => {
    const result = await acceptInviteService({
      updateInvite,
      createUser,
      getInviteById,
      inviteId: validInvite.id,
      supabaseUserId: validUserId,
      body: validBody,
    })
    expect(getInviteById).toHaveBeenCalledWith({ id: validInvite.id })
    expect(createUser).toHaveBeenCalledWith({
      userData: {
        email: validInvite.email,
        supabase_user_id: validUserId,
        organisation_id: validInvite.organisation_id,
        role: validInvite.role,
        status: 'active',
        name: null,
      },
      inviteData: {
        id: validInvite.id,
        status: validBody.status,
      },
    })
    expect(result).toEqual({ user: 'created' })
  })

  it('throws if invite is already accepted', async () => {
    getInviteById.mockResolvedValue({ ...validInvite, status: 'accepted' })
    await expect(
      acceptInviteService({
        updateInvite,
        createUser,
        getInviteById,
        inviteId: validInvite.id,
        supabaseUserId: validUserId,
        body: validBody,
      }),
    ).rejects.toThrow(HttpErrorByCode)
  })

  it('throws if invite is revoked', async () => {
    getInviteById.mockResolvedValue({ ...validInvite, status: 'revoked' })
    await expect(
      acceptInviteService({
        updateInvite,
        createUser,
        getInviteById,
        inviteId: validInvite.id,
        supabaseUserId: validUserId,
        body: validBody,
      }),
    ).rejects.toThrow(HttpErrorByCode)
  })

  it('throws if invite is expired', async () => {
    getInviteById.mockResolvedValue({ ...validInvite, status: 'expired' })
    await expect(
      acceptInviteService({
        updateInvite,
        createUser,
        getInviteById,
        inviteId: validInvite.id,
        supabaseUserId: validUserId,
        body: validBody,
      }),
    ).rejects.toThrow(HttpErrorByCode)
  })

  it('expires invite if expires_at is in the past', async () => {
    getInviteById.mockResolvedValue({ ...validInvite, expires_at: new Date('2020-01-01') })
    await expect(
      acceptInviteService({
        updateInvite,
        createUser,
        getInviteById,
        inviteId: validInvite.id,
        supabaseUserId: validUserId,
        body: validBody,
      }),
    ).rejects.toThrow(HttpErrorByCode)
    expect(updateInvite).toHaveBeenCalledWith({
      data: {
        status: 'expired',
        id: validInvite.id,
      },
    })
  })
})
