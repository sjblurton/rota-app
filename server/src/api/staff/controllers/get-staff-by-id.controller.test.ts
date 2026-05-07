import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getStaffIdParamsSchema } from '../../../libs/schemas/params/getStaffParamsSchema'
import { getStaffByIdController } from './get-staff-by-id.controller'

vi.mock('../../../libs/schemas/params/getStaffParamsSchema', () => ({
  getStaffIdParamsSchema: { parse: vi.fn() },
}))

describe('getStaffByIdController', () => {
  const mockRequest = { params: { staff_id: '123' } } as any
  const mockResponse = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
  const mockGetStaffById = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses params, calls getStaffById, and returns 200', async () => {
    ;(getStaffIdParamsSchema.parse as any).mockReturnValue({ staff_id: '123' })
    const staff = { id: '123', name: 'Jane Doe' }
    mockGetStaffById.mockResolvedValue(staff)

    await getStaffByIdController({
      request: mockRequest,
      response: mockResponse,
      getStaffById: mockGetStaffById,
    })

    expect(getStaffIdParamsSchema.parse).toHaveBeenCalledWith(mockRequest.params)
    expect(mockGetStaffById).toHaveBeenCalledWith({ staffId: '123' })
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(staff)
  })

  it('uses default getStaffByIdService if not provided', async () => {
    ;(getStaffIdParamsSchema.parse as any).mockReturnValue({ staff_id: '123' })
    const defaultGetStaffById = vi.fn().mockResolvedValue('ok')
    await getStaffByIdController({
      request: mockRequest,
      response: mockResponse,
      getStaffById: defaultGetStaffById,
    })
    expect(defaultGetStaffById).toHaveBeenCalled()
  })
})
