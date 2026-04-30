import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ROLES } from '../../constants/roles'
import { HttpErrorByCode } from '../../utils/http/HttpErrorByCode'
import { getInviteByIdService } from './get-invite-by-id.service'

const validInvite = {
  id: 'dcf6d793-9fe8-4964-aff4-b27b209052e5',
  organisation_id: 'org-1',
  email: 'test@example.com',
  status: 'invited',
  role: ROLES.ADMIN,
  preferred_contact_method: 'email',
  created_at: new Date('2026-04-26T16:39:02.185Z'),
  updated_at: new Date('2026-04-26T16:39:02.185Z'),
  expires_at: new Date('2026-05-01T16:39:02.185Z'),
}

describe('getInviteByIdService', () => {
  let getInviteById: any

  beforeEach(() => {
    getInviteById = vi.fn()
  })

  it('returns invite if found', async () => {
    getInviteById.mockResolvedValue(validInvite)
    const result = await getInviteByIdService({ getInviteById, id: validInvite.id })
    expect(getInviteById).toHaveBeenCalledWith({ id: validInvite.id })
    expect(result).toBe(validInvite)
  })

  it('throws if invite not found', async () => {
    getInviteById.mockResolvedValue(null)
    await expect(getInviteByIdService({ getInviteById, id: validInvite.id })).rejects.toThrow(
      HttpErrorByCode,
    )
  })
})
