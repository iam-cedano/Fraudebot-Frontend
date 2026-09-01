import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "@/common/app-routes";
import MonthlyReportCountsEntity from "@/core/domain/report/entities/monthly-report-counts.entity";
import ScammerSummaryEntity from "@/core/domain/scammer/entities/scammer-summary.entity";
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
        findMonthlyReportCountsUseCase: {
          execute: vi
            .fn()
            .mockResolvedValue(
              new MonthlyReportCountsEntity(2026, Array(12).fill(0)),
            ),
          cancel: vi.fn(),
        },
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
  it("shows the report date as day-spanish-month-year", async () => {
    const createdAt = new Date("2026-08-10");

    renderScammerReport(
      vi.fn().mockResolvedValue(
        new ScammerSummaryEntity(
          "20",
          "Joseph Nacchio",
          "DM",
          null,
          3,
          ["Stocks"],
          false,
          createdAt,
          createdAt,
        ),
      ),
    );

    expect(await screen.findByText("Fecha del Reporte")).toBeInTheDocument();
    expect(screen.getByText("10-ago-2026")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reportar" })).toHaveAttribute(
      "href",
      "/reportar/estafadores/20",
    );
  });

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
