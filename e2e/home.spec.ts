import { expect, test } from "@playwright/test";

test.describe("Home.Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("searches for a report(number only) and directs to the search page", async ({ page }) => {
    await page.getByRole('textbox', { name: /buscar por/i }).click();
    await page.getByRole('textbox', { name: /buscar por/i }).fill('123 456 7890');
    await page.getByRole('button', { name: /buscar/i }).click();

    await expect(page).toHaveURL('/search?q=1234567890');
  });

  test("searches for a report(name) and directs to the search page", async ({ page }) => {
    await page.getByRole('textbox', { name: /buscar por/i }).click();
    await page.getByRole('textbox', { name: /buscar por/i }).fill('Jhon Doe [TEST]');
    await page.getByRole('button', { name: /buscar/i }).click();

    await expect(page).toHaveURL('/search?q=Jhon+Doe+%5BTEST%5D');
  });
});

test.describe("Home.Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigates to the search page", async ({ page }) => {
    await page.getByRole("link", { name: /b[uú]squeda/i }).click();
    await expect(page).toHaveURL("/search");
  });

  test("navigates to the contact page", async ({ page }) => {
    await page.getByRole("link", { name: /reportar/i }).click();
    await expect(page).toHaveURL("/contact");
  });

  test("navigates to the home page via logo", async ({ page }) => {
    await page.goto("/search");
    await page.getByRole("link", { name: /fraudebot logo/i }).click();
    await expect(page).toHaveURL("/");
  });
});
