import { test, expect } from "@playwright/test";

test("login as a user", async ({ page }) => {
  await page.goto("https://mad-qa.pl/");
  await page.getByTestId("login-username").fill(process.env.USER_LOGIN);
  await page.getByTestId("login-password").fill(process.env.USER_PASSWORD);
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId('welcome-msg')).toHaveText('Witaj: ' + process.env.USER_LOGIN)
});

test("login as an admin", async ({ page }) => {
  await page.goto("https://mad-qa.pl/");
  await page.getByTestId("login-username").fill(process.env.ADMIN_LOGIN);
  await page.getByTestId("login-password").fill(process.env.ADMIN_PASSWORD);
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId('welcome-msg')).toHaveText('Witaj: ' + process.env.ADMIN_LOGIN);
});
