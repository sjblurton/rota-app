import { type Locator, type Page } from '@playwright/test'
import { BaseOM } from './Base.om'

export class InvitesPageOM extends BaseOM {
  readonly heading: Locator
  readonly inviteIdText: Locator
  readonly statusText: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.getByRole('heading', { name: 'Invite Page' })
    this.inviteIdText = page.locator('p').nth(0)
    this.statusText = page.locator('p').nth(1)
  }

  async navigateToInvite(invitesId: string) {
    await this.navigateTo(`/invites/${invitesId}`)
  }
}
