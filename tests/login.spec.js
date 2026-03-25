// @ts-check
import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage.js';
import { users, invalidUsers } from '../utils/testData.js';

test.describe('Login Scenarios', () => {
  test.use({ storageState: undefined });

  const loginTestCases = [
    { name: 'Valid login with standard user', user: users[0], expected: 'inventory' },
    { name: 'Login with locked out user', user: users[1], expected: 'error' },
    { name: 'Login with invalid username', user: invalidUsers[0], expected: 'error' },
    { name: 'Login with invalid password', user: invalidUsers[1], expected: 'error' },
    { name: 'Login with empty username', user: invalidUsers[2], expected: 'error' },
    { name: 'Login with empty password', user: invalidUsers[3], expected: 'error' },
  ];

  for (const testCase of loginTestCases) {
    test(testCase.name, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.navigate();
      await inventoryPage.login(testCase.user.username, testCase.user.password);

      if (testCase.expected === 'inventory') {
        await expect(page).toHaveURL('**/inventory.html');
      } else {
        const error = await inventoryPage.getErrorMessage();
        expect(error).toBeTruthy();
      }
    });
  }
});