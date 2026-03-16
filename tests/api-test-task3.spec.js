import { test, expect } from "@playwright/test";

const PRODUCTS_API_URL = "/api/index.php?endpoint=products";

test(" GET endpoint, should return valid product list", async ({ request }) => {
  const apiResponse = await request.get(PRODUCTS_API_URL);

  expect(apiResponse.status()).toBe(200);

  const responsePayload = await apiResponse.json();

  const productsList = responsePayload.items;

  expect(Array.isArray(productsList)).toBeTruthy();

  for (const productItem of productsList) {
    expect(productItem).toHaveProperty("id");
    expect(productItem).toHaveProperty("name");
    expect(productItem).toHaveProperty("price");
    expect(productItem).toHaveProperty("currency");
    expect(productItem).toHaveProperty("display_price");
  }
});

test("POST, should create new product", async ({ request }) => {
  const newProductPayload = {
    name: "nowa rzecz",
    price: 100.1,
    currency: "USD",
  };

  const apiResponse = await request.post(PRODUCTS_API_URL, {
    data: newProductPayload,
  });

  expect(apiResponse.status()).toBe(201);

  const responseBody = await apiResponse.json();

  expect(responseBody.message).toContain("created");
  expect(responseBody.product.name).toBe(newProductPayload.name);
  expect(responseBody.product.price).toBe(newProductPayload.price);
  expect(responseBody.product.currency).toBe(newProductPayload.currency);
  expect(responseBody.product.id).toBeDefined();
});
