// @ts-check
import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage.js';

test.describe('Product Interactions', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login('standard_user', 'secret_sauce');
  });

  test('Sort products by name A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort());
  });

  test('Sort products by name Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('Sort products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a,b)=>a-b));
  });

  test('Sort products by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a,b)=>b-a));
  });

  test('Add single item to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(0);
    const badgeCount=await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('Add multiple items to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    const badgeCount=await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(2);
  });

  test('Remove item from cart on inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(0);
    await inventoryPage.removeItemFromCart(0);
    const badgeCount=await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(0);
  });

  test('View product details', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();
    await expect(page).toHaveURL('**/inventory-item.html*');
  });
});