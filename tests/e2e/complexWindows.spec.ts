import { test, expect } from '../../fixtures/baseFixtures';

test.describe('Advanced Multi-Tab Handling Pipeline', () => {

  test('Should handle asynchronous window spawning seamlessly', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    
    await inventoryPage.nav.menuButton.click();
    const aboutLink = page.locator('[data-test="about-sidebar-link"]');
    await aboutLink.click();
/*
    // The About link may open a popup or navigate the current page depending on browser/app behavior.
    const popupPromise = page.waitForEvent('popup').catch(() => null);
    await aboutLink.click({ modifiers: ['Control'] }); //it requires Ctrl + Click.
    const newWindow = await popupPromise;

    if (newWindow) {
      await newWindow.waitForLoadState('domcontentloaded');
      await expect(newWindow).toHaveURL(/saucelabs\.com/);
      await newWindow.close();
      return;
    }
*/
    await expect.poll(() => page.url()).toContain('saucelabs.com');
    await expect(page).toHaveURL(/saucelabs\.com/);
  });
});
