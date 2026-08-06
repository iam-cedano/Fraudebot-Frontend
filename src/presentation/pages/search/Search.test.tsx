import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import LookupForm from "@/presentation/pages/home/components/LookupForm";
import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import Search from "@/presentation/pages/search/Search";
import { renderWithProviders } from "@/test/test-utils";
import Formatter from "@/presentation/shared/utils/formatter";

function createMockSearchResult(page = 1, total = 25) {
  return {
    data: [
      new ReportSummaryEntity(
        "1",
        "Cached Result",
        ["fraud"],
        3,
        "scammer",
        null,
        ["card"],
        "active",
      ),
    ],
    total,
    page,
    count: 10,
  };
}

describe("Home LookupForm", () => {
  it("formats numeric input while typing", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LookupForm />, { route: "/" });

    const input = screen.getByPlaceholderText("número cuenta, tarjeta, telefono, url");

    await user.type(input, "4111111111111111");

    expect(input).toHaveValue("4111 1111 1111 1111");
  });

  it("navigates to search page on submit", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        { path: "/", element: <LookupForm /> },
        { path: "/search", element: <div>Search Page</div> },
      ],
      { initialEntries: ["/"] },
    );

    render(<RouterProvider router={router} />);

    const input = screen.getByPlaceholderText("número cuenta, tarjeta, telefono, url");

    await user.type(input, "john doe");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(router.state.location.pathname).toBe("/search");
    expect(router.state.location.search).toBe("?q=john+doe");
  });
});

describe("Search page", () => {
  it("renders results from the search use case", async () => {
    const execute = vi.fn().mockResolvedValue(createMockSearchResult());

    renderWithProviders(<Search />, {
      route: "/search?q=test",
      overrides: {
        searchReportUseCase: {
          execute,
          cancel: vi.fn(),
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Cached Result")).toBeInTheDocument();
    });

    expect(execute).toHaveBeenCalledWith("test", 1);
  });

  it("uses cached results without calling the use case", async () => {
    const execute = vi.fn();
    const cachedResult = createMockSearchResult();
    const formattedQuery = Formatter.FormatInput("cached");

    sessionStorage.setItem(
      `fraudebot:search:${formattedQuery}:1`,
      JSON.stringify({
        data: [
          {
            id: "1",
            name: "Cached Result",
            tags: ["fraud"],
            reports: 3,
            type: "scammer",
            organizations: null,
            products: ["card"],
            status: "active",
          },
        ],
        total: cachedResult.total,
        page: cachedResult.page,
        count: cachedResult.count,
      }),
    );

    renderWithProviders(<Search />, {
      route: "/search?q=cached",
      overrides: {
        searchReportUseCase: {
          execute,
          cancel: vi.fn(),
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Cached Result")).toBeInTheDocument();
    });

    expect(execute).not.toHaveBeenCalled();
  });

  it("shows pagination controls for multi-page results", async () => {
    const execute = vi
      .fn()
      .mockResolvedValueOnce(createMockSearchResult(1, 25))
      .mockResolvedValueOnce(createMockSearchResult(2, 25));

    const user = userEvent.setup();

    renderWithProviders(<Search />, {
      route: "/search?q=test",
      overrides: {
        searchReportUseCase: {
          execute,
          cancel: vi.fn(),
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Cached Result")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "2" }));

    await waitFor(() => {
      expect(execute).toHaveBeenCalledWith("test", 2);
    });
  });
});
