export class MainPage {
  constructor(page) {
    this.page = page;

    this.url = "/";
    this.productsGrid = this.page.getByTestId("products-grid");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async selectProductByName(name) {
    await this.page.getByRole("link", { name }).click();
  }
}

module.exports = { MainPage };
