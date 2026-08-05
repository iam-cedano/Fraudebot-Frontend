import { describe, it, expect } from "vitest";
import CategoryEntity from "@/core/domain/category/entities/category.entity";

describe("CategoryEntity.success", () => {
  it("should create a new category entity", () => {
    const category = new CategoryEntity("1", "Investment", "💰");
    expect(category).toBeDefined();
  });

  it("should return the category id", () => {
    const category = new CategoryEntity("1", "Investment", "💰");
    expect(category.id).toBe("1");
  });

  it("should return the category name", () => {
    const category = new CategoryEntity("1", "Investment", "💰");
    expect(category.name).toBe("Investment");
  });

  it("should return the category emoji", () => {
    const category = new CategoryEntity("1", "Investment", "💰");
    expect(category.emoji).toBe("💰");
  });
});
