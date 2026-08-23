import { expect, test } from "@playwright/test";

test("mobile navigation exposes the primary destinations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Abrir menú" }).click();

  const mobileNavigation = page.getByRole("navigation", {
    name: "Navegación móvil",
  });
  await expect(mobileNavigation).toBeVisible();
  await mobileNavigation.getByRole("link", { name: "Contacto" }).click();
  await expect(page).toHaveURL("/contacto");
  await expect(
    page.getByRole("heading", {
      name: "Estamos preparando nuestros canales de contacto",
    }),
  ).toBeVisible();
});
