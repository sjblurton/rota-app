import { type Session } from '@supabase/supabase-js'

export const PLAYWRIGHT_AUTH_OVERRIDE_WINDOW_KEY = 'playwrightAuthOverride'

export type PlaywrightAuthOverride = {
  isLoading: boolean
  session: null | Session
}

export type PlaywrightWindow = Window & {
  playwrightAuthOverride?: PlaywrightAuthOverride
}
