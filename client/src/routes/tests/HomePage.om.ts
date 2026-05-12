import { type Locator, type Page } from '@playwright/test'
import { BaseOM } from '#/playwright/ObjectModels/Base.om'

export class HomePageOM extends BaseOM {
  readonly heading: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.locator('h1')
  }
}
