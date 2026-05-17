import { expect, test } from '#/playwright/fixtures/test'

test.describe('home route with seam auth states', () => {
  test('shows welcome message when signed in', async ({ page, setAuthSession }) => {
    await setAuthSession('auth-signed-in')

    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Rota App' })).toBeVisible()
    await expect(page.getByText('Welcome, playwright.user@example.com')).toBeVisible()
  })

  test('shows sign-in prompt when signed out', async ({ page, setAuthSession }) => {
    await setAuthSession('auth-signed-out')

    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Rota App' })).toBeVisible()
    await expect(page.getByText('Please sign in to continue.')).toBeVisible()
  })
})
