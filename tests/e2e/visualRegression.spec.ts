import { test, expect } from '../../fixtures/baseFixtures';

test.describe('Visual QA Validation Hub', () => {

  test('Should validate visual alignment of the complete Inventory grid', async ({ page }) => {
    await page.goto('/inventory.html');
    
    // Assert visual layout accuracy while masking dynamic pricing elements to prevent false failures
    await expect(page).toHaveScreenshot('inventory-page-layout.png', {
      mask: [page.locator('[data-test="inventory-item-price"]')],
      fullPage: true
    });
  });
});

//EXECUTE COMMAND: npm run test:visual:update