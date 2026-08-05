import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const fixturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures");
const searchResponse = JSON.parse(
  readFileSync(path.join(fixturesDir, "search-response.json"), "utf-8"),
);
const searchResponsePage2 = JSON.parse(
  readFileSync(path.join(fixturesDir, "search-response-page-2.json"), "utf-8"),
);

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
