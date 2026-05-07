import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type UpdateStaffInput } from '../../@types/staff'
import { updateStaffService } from './update-staff.service'

describe('updateStaffService', () => {
  const staffId = '123'
  const data: UpdateStaffInput = {
    name: 'Updated Name',
    email: 'test@example.com',
    phone_number: '+441234567890',
    role: 'manager',
    status: 'active',
  }
  const mockUpdateStaff = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls updateStaff repository with correct args and returns result', async () => {
    const expected = { id: staffId, ...data }
    mockUpdateStaff.mockResolvedValue(expected)
    const result = await updateStaffService({ staffId, data, updateStaff: mockUpdateStaff })
    expect(mockUpdateStaff).toHaveBeenCalledWith({ staffId, data })
    expect(result).toEqual(expected)
  })
})
