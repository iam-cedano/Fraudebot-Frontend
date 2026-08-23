import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import type SearchReportResult from "@/core/domain/report/models/search-report.model";
import Formatter from "@/presentation/shared/utils/formatter";

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

type CachedReportSummary = {
  id: string;
  name: string;
  tags: string[];
  reports: number;
  type: "scammer" | "organization";
  organizations: string[] | null;
  products: string[];
  status: "active" | "inactive";
};

type CachedSearchReportResult = {
  data: CachedReportSummary[];
  total: number;
  page: number;
  count: number;
  cachedAt: number;
};

const SEARCH_CACHE_PREFIX = "fraudebot:search";
const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;

class SearchReportCache {
  constructor(
    private readonly storage: KeyValueStorage = sessionStorage,
    private readonly ttlMs = DEFAULT_CACHE_TTL_MS,
    private readonly now: () => number = Date.now,
  ) {}

  public get(query: string, page: number): SearchReportResult | null {
    const cacheKey = this.getCacheKey(query, page);
    const cachedResult = this.storage.getItem(cacheKey);

    if (!cachedResult) {
      return null;
    }

    try {
      const parsedResult = JSON.parse(cachedResult) as CachedSearchReportResult;

      if (
        typeof parsedResult.cachedAt !== "number" ||
        this.now() - parsedResult.cachedAt > this.ttlMs
      ) {
        this.storage.removeItem(cacheKey);
        return null;
      }

      return {
        data: parsedResult.data.map(
          (report) =>
            new ReportSummaryEntity(
              report.id,
              report.name,
              report.tags,
              report.reports,
              report.type,
              report.organizations,
              report.products,
              report.status,
            ),
        ),
        total: parsedResult.total,
        page: parsedResult.page,
        count: parsedResult.count,
      };
    } catch {
      this.storage.removeItem(cacheKey);

      return null;
    }
  }

  public set(query: string, result: SearchReportResult): void {
    const cachedResult: CachedSearchReportResult = {
      data: result.data.map((report) => ({
        id: report.id,
        name: report.name,
        tags: report.tags,
        reports: report.reports,
        type: report.type,
        organizations: report.organizations,
        products: report.products,
        status: report.status,
      })),
      total: result.total,
      page: result.page,
      count: result.count,
      cachedAt: this.now(),
    };

    this.storage.setItem(
      this.getCacheKey(query, result.page),
      JSON.stringify(cachedResult),
    );
  }

  private getCacheKey(query: string, page: number): string {
    return `${SEARCH_CACHE_PREFIX}:${Formatter.FormatInput(query)}:${page}`;
  }
}

const searchReportCache = new SearchReportCache();

export default searchReportCache;
export { SearchReportCache };
