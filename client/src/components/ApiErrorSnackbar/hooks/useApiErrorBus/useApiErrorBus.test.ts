import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useApiErrorBus } from './useApiErrorBus'
import { emitApiError, registerApiErrorListener } from '#/libs/api/api-error-bus'

vi.mock('#/libs/api/api-error-bus', () => ({
  registerApiErrorListener: vi.fn(),
  emitApiError: vi.fn(),
}))

describe('useApiErrorBus', () => {
  beforeEach(() => {
    vi.mocked(registerApiErrorListener).mockReset()
    vi.mocked(emitApiError).mockReset()
  })

  it('starts with no error message', () => {
    const { result } = renderHook(() => useApiErrorBus())

    expect(result.current.errorMessage).toBeNull()
  })

  it('registers a listener on mount', () => {
    renderHook(() => useApiErrorBus())

    expect(registerApiErrorListener).toHaveBeenCalledTimes(1)
    expect(registerApiErrorListener).toHaveBeenCalledWith(expect.any(Function))
  })

  it('unregisters the listener on unmount', () => {
    const { unmount } = renderHook(() => useApiErrorBus())

    unmount()

    expect(registerApiErrorListener).toHaveBeenLastCalledWith(null)
  })

  it('exposes the error message when the listener is called', () => {
    let capturedListener: ((message: string) => void) | null = null

    vi.mocked(registerApiErrorListener).mockImplementation((fn) => {
      capturedListener = fn
    })

    const { result } = renderHook(() => useApiErrorBus())

    act(() => {
      capturedListener?.('Something went wrong.')
    })

    expect(result.current.errorMessage).toBe('Something went wrong.')
  })

  it('clears the error message when clearError is called', () => {
    let capturedListener: ((message: string) => void) | null = null

    vi.mocked(registerApiErrorListener).mockImplementation((fn) => {
      capturedListener = fn
    })

    const { result } = renderHook(() => useApiErrorBus())

    act(() => {
      capturedListener?.('Something went wrong.')
    })

    act(() => {
      result.current.clearError()
    })

    expect(result.current.errorMessage).toBeNull()
  })
})
