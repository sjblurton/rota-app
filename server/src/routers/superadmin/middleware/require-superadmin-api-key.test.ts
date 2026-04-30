import { beforeEach, describe, expect, it, vi } from 'vitest'

import { requireSuperadminApiKey } from './require-superadmin-api-key'

describe('requireSuperadminApiKey', () => {
  const mockNext = vi.fn()

  beforeEach(() => {
    mockNext.mockClear()
    delete process.env['SUPERADMIN_API_KEY']
  })

  it('throws an error if the SUPERADMIN_API_KEY is not configured', () => {
    const req = { header: vi.fn() }
    expect(() => requireSuperadminApiKey(req as any, {} as any, mockNext)).toThrow()
  })

  it('throws an error if the API key is not provided', () => {
    process.env['SUPERADMIN_API_KEY'] = 'test-key'
    const req = { header: vi.fn().mockReturnValue(undefined) }
    expect(() => requireSuperadminApiKey(req as any, {} as any, mockNext)).toThrow()
  })

  it('throws an error if the API key is invalid', () => {
    process.env['SUPERADMIN_API_KEY'] = 'test-key'
    const req = { header: vi.fn().mockReturnValue('invalid-key') }
    expect(() => requireSuperadminApiKey(req as any, {} as any, mockNext)).toThrow()
  })

  it('calls next() if the API key is valid', () => {
    process.env['SUPERADMIN_API_KEY'] = 'test-key'
    const req = { header: vi.fn().mockReturnValue('test-key') }
    requireSuperadminApiKey(req as any, {} as any, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })
})
