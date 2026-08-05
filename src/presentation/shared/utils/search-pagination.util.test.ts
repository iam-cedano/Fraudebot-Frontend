import { getValidPage, getVisiblePages } from "@/presentation/shared/utils/search-pagination.util";

describe("getValidPage", () => {
  it("returns 1 for null input", () => {
    expect(getValidPage(null)).toBe(1);
  });

  it("returns 1 for zero or negative values", () => {
    expect(getValidPage("0")).toBe(1);
    expect(getValidPage("-3")).toBe(1);
  });

  it("returns 1 for non-integer values", () => {
    expect(getValidPage("2.5")).toBe(1);
    expect(getValidPage("abc")).toBe(1);
  });

  it("returns the parsed page for valid positive integers", () => {
    expect(getValidPage("3")).toBe(3);
  });
});

describe("getVisiblePages", () => {
  it("returns an empty array when there are no pages", () => {
    expect(getVisiblePages(1, 0)).toEqual([]);
  });

  it("returns a single page when total pages is 1", () => {
    expect(getVisiblePages(1, 1)).toEqual([1]);
  });

  it("shows neighbors around the current page", () => {
    expect(getVisiblePages(5, 10)).toEqual([1, 4, 5, 6, 10]);
  });

  it("handles the first page", () => {
    expect(getVisiblePages(1, 5)).toEqual([1, 2, 5]);
  });

  it("handles the last page", () => {
    expect(getVisiblePages(5, 5)).toEqual([1, 4, 5]);
  });
});
