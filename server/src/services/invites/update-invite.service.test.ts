import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { updateInviteSchema } from '../../libs/schemas/entities/invite'
import { updateInviteService } from './update-invite.service'

const validData = {
  id: 'dcf6d793-9fe8-4964-aff4-b27b209052e5',
  status: 'accepted',
} as any

describe('updateInviteService', () => {
  let updateInvite: any
  let tx: any

  beforeAll(() => {
    const fixedDate = new Date('2026-04-26T16:39:02.185Z')
    vi.useFakeTimers()
    vi.setSystemTime(fixedDate)
  })

  beforeEach(() => {
    updateInvite = vi.fn().mockResolvedValue({ ...validData, extra: 'field' })
    tx = {}
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('parses data, calls updateInvite, and returns invite', async () => {
    const result = await updateInviteService({ updateInvite, data: validData, tx })
    expect(updateInvite).toHaveBeenCalledWith({ data: updateInviteSchema.parse(validData), tx })
    expect(result).toEqual({ ...validData, extra: 'field' })
  })

  it('throws if data is invalid', async () => {
    await expect(
      updateInviteService({ updateInvite, data: { ...validData, status: 'invalid' }, tx }),
    ).rejects.toThrow()
  })
})
