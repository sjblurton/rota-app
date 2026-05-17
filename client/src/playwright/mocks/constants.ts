export const PLAYWRIGHT_SCENARIOS = [
  'invite-invited',
  'invite-revoked',
  'invite-expired',
  'invite-api-error',
] as const

export const PLAYWRIGHT_AUTH_SCENARIOS = ['auth-signed-in', 'auth-signed-out'] as const

export const PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY = 'playwright:enable-mocks'

export const PLAYWRIGHT_AUTH_OVERRIDE_WINDOW_KEY = 'playwrightAuthOverride'

export type PlaywrightScenario = (typeof PLAYWRIGHT_SCENARIOS)[number]

export type PlaywrightAuthScenario = (typeof PLAYWRIGHT_AUTH_SCENARIOS)[number]
