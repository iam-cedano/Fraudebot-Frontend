import { expect, test } from "@playwright/test";

test("renders scammer detail tabs", async ({ page }) => {
  await page.goto("/scammer/1");

  await expect(page.getByText("Loading...")).toBeHidden({ timeout: 10_000 });
  await expect(page.getByRole("navigation", { name: "Secciones del perfil" })).toBeVisible();
  await expect(page.getByRole("button", { name: "General" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Reportes" })).toBeVisible();

  await page.getByRole("button", { name: "Reportes" }).click();

  await expect(page.getByRole("button", { name: "Reportes" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("renders organization detail page", async ({ page }) => {
  await page.goto("/organization/1");

  await expect(page.getByText("Loading...")).toBeHidden({ timeout: 10_000 });
  await expect(page.getByRole("navigation", { name: "Secciones del perfil" })).toBeVisible();
});
