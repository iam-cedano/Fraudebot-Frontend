import { expect, test } from "@playwright/test";

test.describe("Pages", () => {

  test("loads the home page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Fraudebot - Inicio");
    await expect(page).toHaveURL("/");
  });

  test("loads the search page", async ({ page }) => {
    await page.goto("/busqueda");

    await expect(page).toHaveTitle("Fraudebot - Búsqueda");
    await expect(page).toHaveURL("/busqueda");
  });

  test("loads the 404 page", async ({ page }) => {
    await page.goto("/404");

    await expect(page).toHaveTitle("Fraudebot - Página no encontrada");
    await expect(page).toHaveURL("/404");
  });

});