import { expect, test } from "@playwright/test";

test.describe("Home.Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("searches for a report(number only) and directs to the search page", async ({ page }) => {
    await page.getByRole('textbox', { name: /buscar por/i }).click();
    await page.getByRole('textbox', { name: /buscar por/i }).fill('123 456 7890');
    await page.getByRole('button', { name: /buscar/i }).click();

    await expect(page).toHaveURL('/busqueda?q=1234567890');
  });

  test("searches for a report(name) and directs to the search page", async ({ page }) => {
    await page.getByRole('textbox', { name: /buscar por/i }).click();
    await page.getByRole('textbox', { name: /buscar por/i }).fill('Jhon Doe [TEST]');
    await page.getByRole('button', { name: /buscar/i }).click();

    await expect(page).toHaveURL('/busqueda?q=Jhon+Doe+%5BTEST%5D');
  });
});

test.describe("Home.Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigates to the search page", async ({ page }) => {
    await page.getByRole("link", { name: /b[uú]squeda/i }).click();
    await expect(page).toHaveURL("/busqueda");
  });

  test("navigates to the contact page", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: /contacto/i })
      .click();
    await expect(page).toHaveURL("/contacto");
  });

  test("navigates to the home page via logo", async ({ page }) => {
    await page.goto("/busqueda");
    await page.getByRole("link", { name: /fraudebot, ir al inicio/i }).click();
    await expect(page).toHaveURL("/");
  });
});
