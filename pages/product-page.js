import { expect } from "@playwright/test";

export class ProductView {
  constructor(page) {
    this.page = page;
    this.partialUrl = "products/";
  }

  async verifyItemId(id) {
    await expect(this.page).toHaveURL(`${this.partialUrl}${id}.html`);
  }

  async verifyItemHeading(name) {
    await expect(this.page.getByRole("heading", { name: name })).toBeVisible();
  }
}

module.exports = { ProductView };
