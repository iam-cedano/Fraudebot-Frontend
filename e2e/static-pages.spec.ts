import { expect, test } from "@playwright/test";

test("loads the contact page", async ({ page }) => {
  await page.goto("/contact");

  await expect(page).toHaveURL("/contact");
});

test("loads the not found page", async ({ page }) => {
  await page.goto("/404");

  await expect(page.getByRole("heading", { name: "404 - Not Found Page" })).toBeVisible();
});
