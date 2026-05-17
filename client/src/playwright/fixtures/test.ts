import { test as base, expect } from '@playwright/test'
import { InvitesPageOM } from '../ObjectModels/InvitesPage.om'
import {
  PLAYWRIGHT_AUTH_OVERRIDE_WINDOW_KEY,
  PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY,
  type PlaywrightAuthScenario,
  type PlaywrightScenario,
} from '../mocks/constants'
import { buildAuthOverrideForScenario, inviteIdForScenario } from '../mocks/scenarios'

type PlaywrightFixtures = {
  setAuthSession: (scenario: PlaywrightAuthScenario) => Promise<void>
  enableBackendMocks: () => Promise<void>
  inviteIdForScenario: (scenario: PlaywrightScenario) => string
  invitePage: InvitesPageOM
}

export const test = base.extend<PlaywrightFixtures>({
  setAuthSession: async ({ page }, use) => {
    await use(async (scenario) => {
      const authOverride = buildAuthOverrideForScenario(scenario)

      await page.addInitScript(
        ({ key, override }) => {
          const target = window as unknown as Record<string, unknown>
          target[key] = override
        },
        {
          key: PLAYWRIGHT_AUTH_OVERRIDE_WINDOW_KEY,
          override: authOverride,
        },
      )
    })
  },

  enableBackendMocks: async ({ page }, use) => {
    await page.addInitScript(
      ({ key }) => {
        window.localStorage.setItem(key, 'true')
      },
      { key: PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY },
    )

    await use(async () => {
      // addInitScript runs before page load, so localStorage is already set
    })
  },

  inviteIdForScenario: async ({ page: _page }, use) => {
    await use((scenario) => inviteIdForScenario(scenario))
  },

  invitePage: async ({ page }, use) => {
    await use(new InvitesPageOM(page))
  },
})

export { expect }
