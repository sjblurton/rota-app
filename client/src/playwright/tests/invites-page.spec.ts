import { expect, test } from '#/playwright/fixtures/test'

test.describe('invite route with mocked backend', () => {
  test('accepts invited state and redirects to home', async ({
    page,
    enableBackendMocks,
    setAuthSession,
    inviteIdForScenario,
    invitePage,
  }) => {
    await setAuthSession('auth-signed-in')
    await enableBackendMocks()

    await invitePage.navigateToInvite(inviteIdForScenario('invite-invited'))

    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Rota App' })).toBeVisible()
    await expect(page.getByText('Welcome, playwright.user@example.com')).toBeVisible()
  })

  test('renders revoked message from mocked API response', async ({
    enableBackendMocks,
    setAuthSession,
    inviteIdForScenario,
    invitePage,
  }) => {
    await setAuthSession('auth-signed-in')
    await enableBackendMocks()

    await invitePage.navigateToInvite(inviteIdForScenario('invite-revoked'))

    await expect(invitePage.heading).toBeVisible()
    await expect(invitePage.inviteIdText).toContainText('Invite ID: invite-revoked')
    await expect(invitePage.statusText).toHaveText('This invite has been revoked.')
  })
})
