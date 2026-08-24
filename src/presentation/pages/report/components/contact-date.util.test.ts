import {
  formatContactDate,
  formatReportDate,
} from "@presentation/pages/report/components/contact-date.util";

describe("formatReportDate", () => {
  it("formats a UTC calendar date as day-month-year", () => {
    expect(formatReportDate(new Date("2026-08-10"))).toBe("10-ago-2026");
    expect(formatReportDate(new Date("2026-01-01"))).toBe("01-ene-2026");
  });
});

describe("formatContactDate", () => {
  it("formats a day-first API date", () => {
    expect(formatContactDate("20-11-2026")).toBe("20-nov-2026");
    expect(formatContactDate("30-12-2026")).toBe("30-dic-2026");
    expect(formatContactDate("10-01-2021")).toBe("10-ene-2021");
  });

  it("formats an ISO date without shifting the calendar day", () => {
    expect(formatContactDate("2026-08-23")).toBe("23-ago-2026");
  });

  it("returns the original value when the date cannot be parsed", () => {
    expect(formatContactDate("ayer")).toBe("ayer");
  });
});
