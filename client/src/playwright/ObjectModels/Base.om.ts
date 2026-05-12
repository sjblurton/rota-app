import { type Page } from '@playwright/test'

export class BaseOM {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateTo(path: string) {
    await this.page.goto(path)
  }
}
