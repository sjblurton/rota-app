import { act, renderHook } from '@testing-library/react'
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { type AuthChangeEvent, type Session } from '@supabase/supabase-js'
import { useSession } from './useSession'

import { supabase } from '#/libs/auth/supabase'

const buildSession = () =>
  ({
    access_token: 'token',
    refresh_token: 'refresh',
    expires_in: 3600,
    expires_at: 1_725_550_000,
    token_type: 'bearer',
    user: {
      id: 'user-id',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00.000Z',
    },
  }) satisfies Session

describe('useSession', () => {
  let authChangeCallback: ((event: AuthChangeEvent, session: Session | null) => void) | null
  let unsubscribe: Mock
  let onAuthStateChange: Mock

  beforeEach(() => {
    authChangeCallback = null
    unsubscribe = vi.fn()
    onAuthStateChange = supabase.auth.onAuthStateChange as Mock
    onAuthStateChange.mockReset()
    onAuthStateChange.mockImplementation((callback) => {
      authChangeCallback = callback

      return {
        data: {
          subscription: {
            unsubscribe,
          },
        },
      }
    })
  })

  it('starts with no session and subscribes to auth changes', () => {
    const { result } = renderHook(() => useSession())

    expect(result.current).toBeNull()
    expect(onAuthStateChange).toHaveBeenCalledTimes(1)
  })

  it('updates session when auth emits a signed-in session', () => {
    const session = buildSession()
    const { result } = renderHook(() => useSession())

    act(() => {
      authChangeCallback?.('SIGNED_IN', session)
    })

    expect(result.current).toEqual(session)
  })

  it('clears session when auth emits signed out', () => {
    const session = buildSession()
    const { result } = renderHook(() => useSession())

    act(() => {
      authChangeCallback?.('SIGNED_IN', session)
      authChangeCallback?.('SIGNED_OUT', session)
    })

    expect(result.current).toBeNull()
  })

  it('cleans up auth subscription on unmount', () => {
    const { unmount } = renderHook(() => useSession())

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })
})
