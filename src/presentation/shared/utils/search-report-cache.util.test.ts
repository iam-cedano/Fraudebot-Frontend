import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import {
  KeyValueStorage,
  SearchReportCache,
} from "@/presentation/shared/utils/search-report-cache.util";

function createMockStorage(): KeyValueStorage & { store: Map<string, string> } {
  const store = new Map<string, string>();

  return {
    store,
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
  };
}

function createSearchResult() {
  return {
    data: [
      new ReportSummaryEntity(
        "1",
        "Test Scammer",
        ["fraud"],
        5,
        "scammer",
        ["Acme Corp"],
        ["credit card"],
        "active",
      ),
    ],
    total: 1,
    page: 1,
    count: 10,
  };
}

describe("SearchReportCache", () => {
  it("returns null on cache miss", () => {
    const cache = new SearchReportCache(createMockStorage());

    expect(cache.get("missing", 1)).toBeNull();
  });

  it("stores and retrieves search results", () => {
    const storage = createMockStorage();
    const cache = new SearchReportCache(storage);
    const result = createSearchResult();

    cache.set("test query", result);
    const cached = cache.get("test query", 1);

    expect(cached).not.toBeNull();
    expect(cached?.data[0].name).toBe("Test Scammer");
    expect(cached?.total).toBe(1);
  });

  it("rehydrates ReportSummaryEntity instances from cache", () => {
    const cache = new SearchReportCache(createMockStorage());
    const result = createSearchResult();

    cache.set("test", result);
    const cached = cache.get("test", 1);

    expect(cached?.data[0]).toBeInstanceOf(ReportSummaryEntity);
    expect(cached?.data[0].type).toBe("scammer");
  });

  it("removes corrupt cache entries and returns null", () => {
    const storage = createMockStorage();
    const cache = new SearchReportCache(storage);

    storage.setItem("fraudebot:search:test:1", "{ invalid json");

    expect(cache.get("test", 1)).toBeNull();
    expect(storage.getItem("fraudebot:search:test:1")).toBeNull();
  });

  it("removes results after the configured retention period", () => {
    const storage = createMockStorage();
    let now = 1_000;
    const cache = new SearchReportCache(storage, 100, () => now);

    cache.set("sensitive query", createSearchResult());
    now = 1_101;

    expect(cache.get("sensitive query", 1)).toBeNull();
    expect(storage.getItem("fraudebot:search:sensitive query:1")).toBeNull();
  });
});
