import { test, expect } from "@playwright/test";

import { ProductView } from "../pages/product-page";
import { ShoppingCard } from "../pages/shopping-card";
import { MainPage } from "../pages/main-page";
import productsData from "../test-data/products.json";



test("e2e for one selected product", async ({ page }) => {
  const catalog = new MainPage(page);
  const product = new ProductView(page);
  const cart = new ShoppingCard(page);

  const selectedProductName = "Miecz Runiczny";
  const selectedProductCode = "p1";

  await test.step("Open home page", async () => {
    await catalog.open();
    await expect(catalog.productsGrid).toBeVisible();
  });

  await test.step("Select product by name from home page", async () => {
    await catalog.selectProductByName(selectedProductName);
  });

  await test.step("Verify product page is opened", async () => {
    await product.verifyItemId(selectedProductCode);
    await product.verifyItemHeading(selectedProductName);
  });

  await test.step("Add product to cart", async () => {
    await cart.addItemFromProductView();
  });

  await test.step("Open cart and check item", async () => {
    await cart.openCartPanel();
    await cart.verifyItemPresent(selectedProductName);
  });

  await test.step("Finalize purchase", async () => {
    await cart.completePurchase();
  });
});

