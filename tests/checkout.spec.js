// @ts-check
import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('Complete checkout with valid info', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.completeCheckout();
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBe(true);
  });

  test('Cancel checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cancelCheckout();
    await expect(page).toHaveURL('**/cart.html');
  });

  test('Checkout with missing first name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('Checkout with missing last name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('John', '', '12345');
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('Checkout with missing postal code', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('Checkout with invalid postal code', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('John', 'Doe', 'invalid');
    await checkoutPage.completeCheckout();
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBe(true);
  });
});