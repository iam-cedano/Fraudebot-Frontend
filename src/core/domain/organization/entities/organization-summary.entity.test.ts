import { describe, it, expect } from "vitest";
import OrganizationSummaryEntity from "@/core/domain/organization/entities/organization-summary.entity";

describe("OrganizationSummaryEntity.success", () => {
  const createdAt = new Date("2024-01-15");
  const updatedAt = new Date("2024-01-16");
  const categoriesStub = ["Investment", "Crypto"];

  it("should create a new organization summary entity", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization).toBeDefined();
  });

  it("should return the organization summary id", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.id).toBe("1");
  });

  it("should return the organization summary name", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.name).toBe("Acme");
  });

  it("should return the organization summary country", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.country).toBe("USA");
  });

  it("should return the organization summary profile picture", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.profilePicture).toBe("https://example.com/acme.png");
  });

  it("should return the organization summary reports", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.reports).toBe(5);
  });

  it("should return the organization summary categories", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.categories).toEqual(categoriesStub);
  });

  it("should return the organization summary is active", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.isActive).toBe(true);
  });

  it("should return the organization summary created at", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.createdAt).toEqual(createdAt);
  });

  it("should return the organization summary updated at", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.updatedAt).toEqual(updatedAt);
  });

  it("should return null if profile picture is not set", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      null,
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(organization.profilePicture).toBeNull();
  });

  it("should return false if organization summary is not active", () => {
    const organization = new OrganizationSummaryEntity(
      "1",
      "Acme",
      "USA",
      "https://example.com/acme.png",
      5,
      categoriesStub,
      false,
      createdAt,
      updatedAt,
    );
    expect(organization.isActive).toBe(false);
  });
});
