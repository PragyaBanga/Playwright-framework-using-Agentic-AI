// @ts-check
import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { users } from '../utils/testData.js';

test.describe('Edge Cases and Validations', () => {
  test('Logout functionality', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[0].username, users[0].password);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL('**/');
  });

  test('Session persistence after refresh', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[0].username, users[0].password);
    await page.reload();
    await expect(page).toHaveURL('**/inventory.html');
  });

  test('Add item to cart and verify persistence', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[0].username, users[0].password);
    await inventoryPage.addItemToCart(0);
    await page.reload();
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('Access cart without login', async ({ page }) => {
    test.use({ storageState: undefined });
    await page.goto('/cart.html');
    await expect(page).toHaveURL('**/');
  });

  test('Access checkout without items', async ({ page }) => {
    const cartPage = new CartPage(page);
    await page.goto('/cart.html');
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('**/checkout-step-one.html');
  });

  test('Maximum cart items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[0].username, users[0].password);
    const itemCount = await inventoryPage.getItemCount();
    for (let i = 0; i < itemCount; i++) {
      await inventoryPage.addItemToCart(i);
    }
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(itemCount);
  });

  test('Problem user sorting issue', async ({ page }) => {
    test.use({ storageState: undefined });
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[2].username, users[2].password);
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    expect(names.length).toBeGreaterThan(0);
  });

  test('Visual user login', async ({ page }) => {
    test.use({ storageState: undefined });
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[5].username, users[5].password);
    await expect(page).toHaveURL('**/inventory.html');
  });

  test('Error user checkout error', async ({ page }) => {
    test.use({ storageState: undefined });
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[4].username, users[4].password);
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Error');
  });

  test('Performance glitch user delay', async ({ page }) => {
    test.use({ storageState: undefined });
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(users[3].username, users[3].password);
    await expect(page).toHaveURL('**/inventory.html');
  });
});