class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url = '/') {
    await this.page.goto(url);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return await this.page.title();
  }
}

module.exports = BasePage;
