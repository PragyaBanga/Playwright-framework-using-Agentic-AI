const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container');
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('.btn_inventory');
    this.removeFromCartButtons = page.locator('.btn_secondary');
    this.sortDropdown = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async navigate() {
    await super.navigate('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getItemCount() {
    return await this.inventoryItems.count();
  }

  async addItemToCart(index = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async removeItemFromCart(index = 0) {
    await this.removeFromCartButtons.nth(index).click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getCartBadgeCount() {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }
}

module.exports = InventoryPage;
