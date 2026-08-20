import { screen } from "@testing-library/react";
import ReportCard from "@/presentation/pages/search/components/ReportCard";
import { renderWithProviders } from "@/test/test-utils";
import { APP_ROUTES, organizationPath, scammerPath } from "@/common/app-routes";

const baseProps = {
  id: "42",
  name: "Test Scammer",
  status: "active" as const,
  reports: 5,
  organizations: ["Acme Corp"],
  products: ["credit card"],
  tags: ["phishing"],
};

describe("ReportCard", () => {
  it("renders scammer details with correct link", () => {
    renderWithProviders(
      <ReportCard {...baseProps} type="scammer" />,
      { route: `${APP_ROUTES.search}?q=test` },
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", scammerPath("42"));
    expect(screen.getByText("Test Scammer")).toBeInTheDocument();
    expect(screen.getByText("#SC42 -")).toBeInTheDocument();
    expect(screen.getByText("Activo")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders organization details with correct link", () => {
    renderWithProviders(
      <ReportCard
        {...baseProps}
        id="99"
        name="Test Org"
        type="organization"
        status="inactive"
        organizations={null}
      />,
      { route: `${APP_ROUTES.search}?q=test` },
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", organizationPath("99"));
    expect(screen.getByText("#OR99 -")).toBeInTheDocument();
    expect(screen.getByText("Inactivo")).toBeInTheDocument();
  });
});
