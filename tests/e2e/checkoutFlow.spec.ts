import { test, expect } from '../../fixtures/baseFixtures';
import { InventoryTestDataset } from '../../data/testData';

test.describe('E2E Framework Operations Loop', () => {

  // Data-driven iteration execution looping through our type-safe data matrices
  for (const data of InventoryTestDataset) {
    test(`Data-Driven Execution Run: Adding item [${data.expectedName}] to basket`, async ({ page, inventoryPage }) => {
      await page.goto('/inventory.html');
      await inventoryPage.verifyPageHeader();
      
      // Page interactions routed seamlessly through Custom POM methods
      await inventoryPage.addProductToCart(data.productSlug);
      
      // Verify visual states via Navbar components nesting mappings
      await expect(inventoryPage.nav.shoppingCart).toHaveText('1');
    });
  }

  test('Array Extraction & Functional Assertions mapping pricing matrices', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    
    // Extracts inner dynamic state values straight from the DOM using arrays mapping mechanics
    const prices = await inventoryPage.getAllProductPrices();
    
    // Advanced JavaScript assertion techniques
    expect(prices.length).toBeGreaterThan(0);
    prices.forEach(price => expect(price).toBeLessThan(1.00));
  });
});
