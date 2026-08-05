import { describe, it, expect } from "vitest";
import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";

describe("ReportSummaryEntity.success", () => {
  const tagsStub = ["investment", "crypto"];
  const productsStub = ["Crypto Wallet", "Trading App"];
  const organizationsStub = ["Acme", "Beta Corp"];

  it("should create a new report summary entity", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report).toBeDefined();
  });

  it("should return the report summary id", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.id).toBe("1");
  });

  it("should return the report summary name", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.name).toBe("John Doe");
  });

  it("should return the report summary tags", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.tags).toEqual(tagsStub);
  });

  it("should return the report summary reports", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.reports).toBe(5);
  });

  it("should return the report summary type", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.type).toBe("scammer");
  });

  it("should return the report summary organizations", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.organizations).toBe(organizationsStub);
  });

  it("should return the report summary products", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.products).toEqual(productsStub);
  });

  it("should return the report summary status", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.status).toBe("active");
  });

  it("should return null if organizations is not set", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      null,
      productsStub,
      "active",
    );
    expect(report.organizations).toBeNull();
  });

  it("should return organization type when type is organization", () => {
    const report = new ReportSummaryEntity(
      "1",
      "Acme",
      tagsStub,
      5,
      "organization",
      organizationsStub,
      productsStub,
      "active",
    );
    expect(report.type).toBe("organization");
  });

  it("should return inactive status when status is inactive", () => {
    const report = new ReportSummaryEntity(
      "1",
      "John Doe",
      tagsStub,
      5,
      "scammer",
      organizationsStub,
      productsStub,
      "inactive",
    );
    expect(report.status).toBe("inactive");
  });
});
