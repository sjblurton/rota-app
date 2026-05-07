import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getStaffByIdService } from './get-staff-by-id.service'

describe('getStaffByIdService', () => {
  const staffId = '123'
  const mockGetStaffById = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls getStaffById repository with correct args and returns result', async () => {
    const expected = { id: staffId, name: 'Jane Doe' }
    mockGetStaffById.mockResolvedValue(expected)
    const result = await getStaffByIdService({ staffId, getStaffById: mockGetStaffById })
    expect(mockGetStaffById).toHaveBeenCalledWith({ staffId })
    expect(result).toEqual(expected)
  })
})
