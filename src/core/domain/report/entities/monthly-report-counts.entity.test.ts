import { describe, it, expect } from "vitest";
import MonthlyReportCountsEntity from "@/core/domain/report/entities/monthly-report-counts.entity";

const countsStub = [4, 7, 3, 9, 12, 6, 8, 5, 10, 14, 11, 7];

describe("MonthlyReportCountsEntity", () => {
  it("should return the year and a copy of the monthly counts", () => {
    const monthlyCounts = new MonthlyReportCountsEntity(2026, countsStub);

    expect(monthlyCounts.year).toBe(2026);
    expect(monthlyCounts.counts).toEqual(countsStub);
    expect(monthlyCounts.counts).not.toBe(countsStub);
  });

  it("should reject counts that are not twelve months", () => {
    expect(() => new MonthlyReportCountsEntity(2026, [1, 2, 3])).toThrow(
      "Monthly report counts must include 12 months",
    );
  });
});
