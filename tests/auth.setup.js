// @ts-check
import { test as setup } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage.js';
import { users } from '../utils/testData.js';

setup('authenticate', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigate();
  await inventoryPage.login(users[0].username, users[0].password);
  await page.context().storageState({ path: 'auth.json' });
});