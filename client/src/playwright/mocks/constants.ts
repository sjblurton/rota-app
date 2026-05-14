export const PLAYWRIGHT_SCENARIOS = [
  'invite-invited',
  'invite-revoked',
  'invite-expired',
  'invite-api-error',
] as const

export const PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY = 'playwright:enable-mocks'

export type PlaywrightScenario = (typeof PLAYWRIGHT_SCENARIOS)[number]
