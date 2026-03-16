import { expect } from "@playwright/test";

export class ShoppingCard {
  constructor(page) {
    this.page = page;

    this.cartPanel = this.page.getByTestId("cart-panel");
    this.openCartButton = this.page.getByTestId("cart-button");

    this.listOfProductsInCart = this.page.getByTestId("cart-list");
    this.buyButton = this.page.getByTestId("cart-buy");
    this.addToCartButton = this.page.getByRole("button", {
      name: "Dodaj do koszyka",
    });
  }

  async addItemFromProductView() {
    await this.addToCartButton.click();
  }

  async openCartPanel() {
    await this.openCartButton.click();
    await expect(this.cartPanel).toBeVisible();
  }

  async verifyItemPresent(itemName) {
    await expect(this.listOfProductsInCart.getByText(itemName)).toBeVisible();
  }

  async completePurchase() {
    await this.buyButton.click();

    await expect(this.cartPanel).not.toBeVisible();
  }
}

module.exports = { ShoppingCard };
