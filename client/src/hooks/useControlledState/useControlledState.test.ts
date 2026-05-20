import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useControlledState } from './useControlledState'

describe('useControlledState', () => {
  const onChange = vi.fn()

  beforeEach(() => {
    onChange.mockReset()
  })

  it('uses the default value when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControlledState({
        defaultValue: 'closed',
      }),
    )

    expect(result.current[0]).toBe('closed')
    expect(result.current[2]).toBe(false)
  })

  it('updates internal state when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControlledState({
        defaultValue: 'closed',
        onChange,
      }),
    )

    act(() => {
      result.current[1]('open')
    })

    expect(result.current[0]).toBe('open')
    expect(onChange).toHaveBeenCalledWith('open')
  })

  it('uses the controlled value when provided', () => {
    const { result } = renderHook(() =>
      useControlledState({
        value: 'open',
        defaultValue: 'closed',
      }),
    )

    expect(result.current[0]).toBe('open')
    expect(result.current[2]).toBe(true)
  })

  it('does not update controlled state internally', () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControlledState({
          value,
          defaultValue: 'closed',
          onChange,
        }),
      {
        initialProps: { value: 'open' },
      },
    )

    act(() => {
      result.current[1]('closed')
    })

    expect(result.current[0]).toBe('open')
    expect(onChange).toHaveBeenCalledWith('closed')

    rerender({ value: 'closed' })

    expect(result.current[0]).toBe('closed')
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() =>
      useControlledState({
        defaultValue: 1,
        onChange,
      }),
    )

    act(() => {
      result.current[1]((previousValue) => previousValue + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
