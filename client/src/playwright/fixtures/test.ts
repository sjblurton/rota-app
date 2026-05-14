import { test as base, expect } from '@playwright/test'
import { InvitesPageOM } from '../ObjectModels/InvitesPage.om'
import { PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY, type PlaywrightScenario } from '../mocks/constants'
import { inviteIdForScenario } from '../mocks/scenarios'

type PlaywrightFixtures = {
  enableBackendMocks: () => Promise<void>
  inviteIdForScenario: (scenario: PlaywrightScenario) => string
  invitePage: InvitesPageOM
}

export const test = base.extend<PlaywrightFixtures>({
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
