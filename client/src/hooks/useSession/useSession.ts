import { useEffect, useState } from 'react'
import { type Session } from '@supabase/supabase-js'
import { type PlaywrightWindow } from './playwright-auth-seam'
import { supabase } from '#/libs/auth/supabase'

/**
 * Subscribes to Supabase auth state changes and returns the current session.
 *
 * Behaviour:
 * - if a Playwright auth override exists, returns that override state and skips Supabase subscription
 * - `isLoading` is `true` until the first auth event is received from Supabase.
 * - returns `null` session when signed out or when no session exists
 * - returns the latest Session when signed in
 * - unsubscribes from the auth listener on unmount
 *
 * @returns An object containing:
 * - `session` — the current Supabase session, or `null` if signed out.
 * - `isLoading` — `true` until the initial auth state has been resolved.
 */
export const useSession = () => {
  const [session, setSession] = useState<null | Session>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authOverride = (window as PlaywrightWindow).playwrightAuthOverride
    if (authOverride) {
      setSession(authOverride.session)
      setIsLoading(authOverride.isLoading)
      return
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        if (event === 'SIGNED_OUT' || !supabaseSession) {
          setSession(null)
        } else {
          setSession(supabaseSession)
        }
        setIsLoading(false)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { session, isLoading }
}
