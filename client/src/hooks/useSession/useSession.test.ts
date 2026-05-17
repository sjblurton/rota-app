import { act, renderHook } from '@testing-library/react'
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { type AuthChangeEvent, type Session } from '@supabase/supabase-js'
import { useSession } from './useSession'
import { type PlaywrightWindow } from './playwright-auth-seam'

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
    delete (window as PlaywrightWindow).playwrightAuthOverride
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

  it('uses Playwright auth override when present and skips Supabase subscription', () => {
    const session = buildSession()

    ;(window as PlaywrightWindow).playwrightAuthOverride = {
      session,
      isLoading: false,
    }

    const { result } = renderHook(() => useSession())

    expect(result.current).toEqual({ session, isLoading: false })
    expect(onAuthStateChange).not.toHaveBeenCalled()
  })

  it('uses Playwright signed-out override when present', () => {
    ;(window as PlaywrightWindow).playwrightAuthOverride = {
      session: null,
      isLoading: false,
    }

    const { result } = renderHook(() => useSession())

    expect(result.current).toEqual({ session: null, isLoading: false })
    expect(onAuthStateChange).not.toHaveBeenCalled()
  })

  it('starts with no session and subscribes to auth changes', () => {
    const { result } = renderHook(() => useSession())

    expect(result.current).toEqual({ session: null, isLoading: true })
    expect(onAuthStateChange).toHaveBeenCalledTimes(1)
  })

  it('updates session when auth emits a signed-in session', () => {
    const session = buildSession()
    const { result } = renderHook(() => useSession())

    act(() => {
      authChangeCallback?.('SIGNED_IN', session)
    })

    expect(result.current).toEqual({ session, isLoading: false })
  })

  it('clears session when auth emits signed out', () => {
    const session = buildSession()
    const { result } = renderHook(() => useSession())

    act(() => {
      authChangeCallback?.('SIGNED_IN', session)
      authChangeCallback?.('SIGNED_OUT', session)
    })

    expect(result.current).toEqual({ session: null, isLoading: false })
  })

  it('cleans up auth subscription on unmount', () => {
    const { unmount } = renderHook(() => useSession())

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })
})
