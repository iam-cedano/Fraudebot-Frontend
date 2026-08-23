import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "@/common/app-routes";
import Report from "@/presentation/pages/report/Report";
import { DependencyProvider } from "@/presentation/providers/DependencyProvider";
import type { Dependencies } from "@/infrastructure/di/container";

function renderScammerReport(
  execute: Dependencies["findScammerSummaryByIdUseCase"]["execute"],
  cancel = vi.fn(),
) {
  render(
    <DependencyProvider
      overrides={{
        findScammerSummaryByIdUseCase: { execute, cancel },
      }}
    >
      <MemoryRouter initialEntries={["/estafadores/404"]}>
        <Routes>
          <Route
            path={APP_ROUTES.scammer}
            element={<Report type="scammer" />}
          />
        </Routes>
      </MemoryRouter>
    </DependencyProvider>,
  );

  return { cancel };
}

describe("Report page", () => {
  it("shows a not-found state when the API returns 404", async () => {
    renderScammerReport(
      vi.fn().mockRejectedValue({ response: { status: 404 } }),
    );

    expect(
      await screen.findByRole("heading", { name: "Perfil no encontrado" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
  });

  it("shows a retry action for transient failures", async () => {
    const user = userEvent.setup();
    const execute = vi.fn().mockRejectedValue(new Error("offline"));

    renderScammerReport(execute);

    await user.click(await screen.findByRole("button", { name: "Reintentar" }));

    expect(execute).toHaveBeenCalledTimes(2);
  });
});
