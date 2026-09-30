import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

setup('Global Authentication Setup: Standard User Profile', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(process.env.SAUCE_STANDARD_USER || '', process.env.SAUCE_PASSWORD || '');
  await page.context().storageState({ path: '.auth/standard_user.json' });
});
