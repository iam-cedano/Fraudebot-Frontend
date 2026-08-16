import FindMonthlyReportCountsUsecase from "@/application/usecases/report/find-monthly-report-counts.usecase";
import Http from "@/infrastructure/http/http";
import { API_ROUTES } from "@/common/environment";

vi.mock("@/infrastructure/http/http", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedHttp = vi.mocked(Http);

describe("FindMonthlyReportCountsUsecase", () => {
  let useCase: FindMonthlyReportCountsUsecase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new FindMonthlyReportCountsUsecase();
  });

  it("maps a successful API response into twelve monthly counts", async () => {
    mockedHttp.get.mockResolvedValue({
      status: 200,
      data: {
        year: 2026,
        months: [
          { month: 1, count: 4 },
          { month: 5, count: 12 },
          { month: 12, count: 7 },
        ],
      },
    } as never);

    const result = await useCase.execute("20", "scammer", 2026);

    expect(mockedHttp.get).toHaveBeenCalledWith(
      API_ROUTES.public.reports.monthly
        .replace("{type}", "scammer")
        .replace("{id}", "20"),
      expect.objectContaining({
        params: { year: 2026 },
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.year).toBe(2026);
    expect(result.counts).toEqual([4, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7]);
  });

  it("rejects when the request fails", async () => {
    const error = new Error("Request failed with status code 404");

    mockedHttp.get.mockRejectedValue(error);

    await expect(useCase.execute("1", "organization")).rejects.toThrow(error);
  });

  it("aborts in-flight requests when cancel is called", async () => {
    let capturedSignal: AbortSignal | undefined;

    mockedHttp.get.mockImplementation((_url, config) => {
      capturedSignal = config?.signal as AbortSignal;

      return new Promise(() => {});
    });

    useCase.execute("1", "scammer");
    useCase.cancel();

    expect(capturedSignal?.aborted).toBe(true);
  });
});
