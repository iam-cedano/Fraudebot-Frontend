import { describe, it, expect } from "vitest";
import ReportEntity from "@/core/domain/report/entities/report.entity";
import ProductEntity from "@/core/domain/product/product.entity";
import CategoryEntity from "@/core/domain/category/entities/category.entity";
import UserEntity from "@/core/domain/user/entities/user.entity";
import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";

describe("ReportEntity.success", () => {
  const createdAt = new Date("2024-01-15");
  const updatedAt = new Date("2024-01-16");
  const productsStub = [
    new ProductEntity(
      "1",
      new CategoryEntity("1", "Investment", "💰"),
      "Crypto Wallet",
      "🪙",
    ),
  ];
  const usersStub = [new UserEntity("1", "John Doe")];
  const organizationsStub = [
    new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      null,
      null,
      null,
    ),
  ];
  const scammersStub = [
    new ScammerEntity("1", "John Doe", "USA", true, null, null, null, null),
  ];

  it("should create a new report entity", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report).toBeDefined();
  });

  it("should return the report id", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.id).toBe("1");
  });

  it("should return the report products", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.products).toBe(productsStub);
  });

  it("should return the report users", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.users).toBe(usersStub);
  });

  it("should return the report organizations", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.organizations).toBe(organizationsStub);
  });

  it("should return the report scammers", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.scammers).toBe(scammersStub);
  });

  it("should return the report title", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.title).toBe("Fake investment scam");
  });

  it("should return the report description", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.description).toBe(
      "Promised high returns and disappeared with funds",
    );
  });

  it("should return the report was successful", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.wasSuccessful).toBe(true);
  });

  it("should return the report is active", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.isActive).toBe(true);
  });

  it("should return the report deleted at", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      "2024-01-17",
      createdAt,
      updatedAt,
    );
    expect(report.deletedAt).toBe("2024-01-17");
  });

  it("should return the report created at", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.createdAt).toEqual(createdAt);
  });

  it("should return the report updated at", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.updatedAt).toEqual(updatedAt);
  });

  it("should return null if products is not set", () => {
    const report = new ReportEntity(
      "1",
      null,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.products).toBeNull();
  });

  it("should return null if users is not set", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      null,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.users).toBeNull();
  });

  it("should return null if organizations is not set", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      null,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.organizations).toBeNull();
  });

  it("should return null if scammers is not set", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      null,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.scammers).toBeNull();
  });

  it("should return null if deleted at is not set", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.deletedAt).toBeNull();
  });

  it("should return false if report was not successful", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      false,
      true,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.wasSuccessful).toBe(false);
  });

  it("should return false if report is not active", () => {
    const report = new ReportEntity(
      "1",
      productsStub,
      usersStub,
      organizationsStub,
      scammersStub,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      false,
      null,
      createdAt,
      updatedAt,
    );
    expect(report.isActive).toBe(false);
  });
});
