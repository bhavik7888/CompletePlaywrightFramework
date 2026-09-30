import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { APIRequestContext } from '@playwright/test';
import { createApiContext } from './apiFixture';

// Typing Map Blueprint defining all accessible injection layers
type EnterpriseFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  apiClient: APIRequestContext;
  isolatedPage: void; // Automatic worker fixture example
};

export const test = base.extend<EnterpriseFixtures>({
  // Page Object Lazy Appending
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // Independent Custom API Client Context management 
  apiClient: async ({}, use) => {
    const client = await createApiContext();
    await use(client);
    await client.dispose(); // Complete resource tear-down hook guarantee
  },

  // Auto-executing Custom Context Hook (Implicit Fixture running behind the scenes)
  isolatedPage: [async ({ page }, use) => {
    // Automatically injects global custom logs or configurations to any attached tests
    await page.addInitScript(() => console.log('Enterprise System Driver Loaded Succesfully.'));
    await use();
  }, { auto: true }]
});

export { expect } from '@playwright/test';
