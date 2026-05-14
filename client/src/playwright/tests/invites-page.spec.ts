import { expect, test } from '#/playwright/fixtures/test'

test.describe('invite route with mocked backend', () => {
  test('renders invited state from mocked API response', async ({
    enableBackendMocks,
    inviteIdForScenario,
    invitePage,
  }) => {
    await enableBackendMocks()

    await invitePage.navigateToInvite(inviteIdForScenario('invite-invited'))

    await expect(invitePage.heading).toBeVisible()
    await expect(invitePage.inviteIdText).toContainText('Invite ID: invite-invited')
    await expect(invitePage.statusText).toHaveText('You are signed in.')
  })

  test('renders revoked message from mocked API response', async ({
    enableBackendMocks,
    inviteIdForScenario,
    invitePage,
  }) => {
    await enableBackendMocks()

    await invitePage.navigateToInvite(inviteIdForScenario('invite-revoked'))

    await expect(invitePage.heading).toBeVisible()
    await expect(invitePage.inviteIdText).toContainText('Invite ID: invite-revoked')
    await expect(invitePage.statusText).toHaveText('This invite has been revoked.')
  })
})
