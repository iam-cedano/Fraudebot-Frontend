import { expect, test } from "@playwright/test";

test("loads the 404 lottie animation in 404 page", async ({ page }) => {
  await page.goto("/404");

  await expect(page.locator(".lottie-player.lottie-404")).toBeVisible();
});

test("loads the lottie animation when searching for reports", async ({ page }) => {
  await page.goto("/search?q=000000000000000000000000000000000000000 [TEST]");

  await expect(page.locator(".lottie-player.lottie-robot")).toBeVisible();
});

test("loads the lottie animation when no reports are found", async ({ page }) => {
  await page.goto("/search?q=000000000000000000000000000000000000000");

  await expect(page.locator(".lottie-player.lottie-not-found")).toBeVisible();
});