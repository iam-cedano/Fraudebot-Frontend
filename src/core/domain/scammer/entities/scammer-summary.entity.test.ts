import { describe, it, expect } from "vitest";
import ScammerSummaryEntity from "@/core/domain/scammer/entities/scammer-summary.entity";

describe("ScammerSummaryEntity.success", () => {
  const createdAt = new Date("2024-01-15");
  const updatedAt = new Date("2024-01-16");
  const categoriesStub = ["Investment", "Crypto"];

  it("should create a new scammer summary entity", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer).toBeDefined();
  });

  it("should return the scammer summary id", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.id).toBe("1");
  });

  it("should return the scammer summary name", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.name).toBe("John Doe");
  });

  it("should return the scammer summary country", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.country).toBe("USA");
  });

  it("should return the scammer summary profile picture", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.profilePicture).toBe("https://example.com/john.png");
  });

  it("should return the scammer summary reports", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.reports).toBe(5);
  });

  it("should return the scammer summary categories", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.categories).toEqual(categoriesStub);
  });

  it("should return the scammer summary is active", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.isActive).toBe(true);
  });

  it("should return the scammer summary created at", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.createdAt).toEqual(createdAt);
  });

  it("should return the scammer summary updated at", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.updatedAt).toEqual(updatedAt);
  });

  it("should return null if profile picture is not set", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      null,
      5,
      categoriesStub,
      true,
      createdAt,
      updatedAt,
    );
    expect(scammer.profilePicture).toBeNull();
  });

  it("should return false if scammer summary is not active", () => {
    const scammer = new ScammerSummaryEntity(
      "1",
      "John Doe",
      "USA",
      "https://example.com/john.png",
      5,
      categoriesStub,
      false,
      createdAt,
      updatedAt,
    );
    expect(scammer.isActive).toBe(false);
  });
});
