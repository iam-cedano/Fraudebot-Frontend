import { expect, test } from "@playwright/test";
import searchResponse from "./fixtures/search-response.json";
import searchResponsePage2 from "./fixtures/search-response-page-2.json";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/public/reports/**", async (route) => {
    const url = new URL(route.request().url());
    const pageParam = url.searchParams.get("p") ?? "1";
    const body = pageParam === "2" ? searchResponsePage2 : searchResponse;

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });
});

test("searches from home and paginates results", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("número cuenta, tarjeta, telefono, url").fill("test scammer");
  await page.getByRole("button", { name: "Buscar" }).click();

  await expect(page).toHaveURL(/\/search\?q=test%20scammer/);
  await expect(page.getByText("E2E Test Scammer")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Paginación de reportes" })).toBeVisible();

  await page.getByRole("button", { name: "2" }).click();

  await expect(page).toHaveURL(/[?&]p=2/);
});
