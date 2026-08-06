import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("searches for a report and directs to the search page", async ({ page }) => {
    
    await page.getByRole('textbox', { name: /buscar por/i }).click();
    await page.getByRole('textbox', { name: /buscar por/i }).fill('1234567890');
    await page.getByRole('button', { name: /buscar/i }).click();

    await expect(page).toHaveURL('/search?q=1234567890');
  });
});