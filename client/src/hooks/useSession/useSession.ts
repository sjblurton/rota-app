import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '#/libs/auth/supabase'

/**
 * Subscribes to Supabase auth state changes and returns the current session.
 *
 * Behaviour:
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
