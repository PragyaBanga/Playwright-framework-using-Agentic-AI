const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('.cart_button');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async navigate() {
    await super.navigate('/cart.html');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeItem(index = 0) {
    await this.removeButtons.nth(index).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getCartBadgeText() {
    return await this.cartBadge.textContent();
  }
}

module.exports = CartPage;
