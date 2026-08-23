import { expect, test } from "@playwright/test";

test("invalid report IDs render a recoverable not-found state", async ({
  page,
}) => {
  await page.route("**/api/public/scammers/missing", async (route) => {
    await route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({ detail: "Not found" }),
    });
  });

  await page.goto("/estafadores/missing");

  await expect(
    page.getByRole("heading", { name: "Perfil no encontrado" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Volver a la búsqueda" }),
  ).toBeVisible();
});
