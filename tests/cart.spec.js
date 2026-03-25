// @ts-check
import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage.js';
import CartPage from '../pages/CartPage.js';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
  });

  test('View cart with items', async ({ page }) => {
    const cartPage = new CartPage(page);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('Remove item from cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeItem(0);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test('Continue shopping from cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
    await expect(page).toHaveURL('**/inventory.html');
  });

  test('Proceed to checkout', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('**/checkout-step-one.html');
  });

  test('Cart badge updates correctly', async ({ page }) => {
    const cartPage = new CartPage(page);
    const badgeText = await cartPage.getCartBadgeText();
    expect(badgeText).toBe('1');
  });
});