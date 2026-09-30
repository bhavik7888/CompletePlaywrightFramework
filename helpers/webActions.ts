import { Page, Locator, test } from '@playwright/test';

/**
 * Custom wrapper extending Playwright capabilities with integrated tracing logs 
 */
export class WebActions {
  constructor(private readonly page: Page) {}

  async safelyClick(locator: Locator, description: string): Promise<void> {
    await test.step(`Framework Action: Clicking on -> ${description}`, async () => {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      await locator.click();
    });
  }

  async safelyFill(locator: Locator, text: string, description: string): Promise<void> {
    await test.step(`Framework Action: Filling ${description}`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.clear();
      await locator.fill(text);
    });
  }
}
