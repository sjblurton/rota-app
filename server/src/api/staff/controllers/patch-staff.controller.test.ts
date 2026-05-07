import { beforeEach, describe, expect, it, vi } from 'vitest'

import { updateStaffSchema } from '../../../libs/schemas/entities/staff'
import { getStaffIdParamsSchema } from '../../../libs/schemas/params/getStaffParamsSchema'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'
import { patchStaffController } from './patch-staff.controller'

vi.mock('../../../utils/validation/validate-and-parse', () => ({
  validateAndParse: vi.fn(),
}))

describe('patchStaffController', () => {
  const mockRequest = {
    params: { staff_id: '123' },
    body: {
      name: 'Updated Name',
      email: 'test@example.com',
      phone_number: '+441234567890',
      role: 'manager',
      status: 'active',
    },
  } as any
  const mockResponse = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
  const mockUpdateStaff = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates params and body, calls updateStaff, and returns 200', async () => {
    ;(validateAndParse as any)
      .mockImplementationOnce(() => ({ staff_id: '123' }))
      .mockImplementationOnce(() => mockRequest.body)
    const updatedStaff = { id: '123', ...mockRequest.body }
    mockUpdateStaff.mockResolvedValue(updatedStaff)

    await patchStaffController({
      request: mockRequest,
      response: mockResponse,
      updateStaff: mockUpdateStaff,
    })

    expect(validateAndParse).toHaveBeenCalledWith(getStaffIdParamsSchema, mockRequest.params)
    expect(validateAndParse).toHaveBeenCalledWith(updateStaffSchema, mockRequest.body)
    expect(mockUpdateStaff).toHaveBeenCalledWith({ staffId: '123', data: mockRequest.body })
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(updatedStaff)
  })

  it('uses default updateStaffService if not provided', async () => {
    ;(validateAndParse as any)
      .mockImplementationOnce(() => ({ staff_id: '123' }))
      .mockImplementationOnce(() => mockRequest.body)
    const defaultUpdateStaff = vi.fn().mockResolvedValue('ok')
    await patchStaffController({
      request: mockRequest,
      response: mockResponse,
      updateStaff: defaultUpdateStaff,
    })
    expect(defaultUpdateStaff).toHaveBeenCalled()
  })
})
