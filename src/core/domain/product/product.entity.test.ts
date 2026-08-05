import { describe, it, expect } from "vitest";
import ProductEntity from "@/core/domain/product/product.entity";
import CategoryEntity from "@/core/domain/category/entities/category.entity";

describe("ProductEntity.success", () => {
  const categoryStub = new CategoryEntity("1", "Investment", "💰");

  it("should create a new product entity", () => {
    const product = new ProductEntity("1", categoryStub, "Crypto Wallet", "🪙");
    expect(product).toBeDefined();
  });

  it("should return the product id", () => {
    const product = new ProductEntity("1", categoryStub, "Crypto Wallet", "🪙");
    expect(product.id).toBe("1");
  });

  it("should return the product name", () => {
    const product = new ProductEntity("1", categoryStub, "Crypto Wallet", "🪙");
    expect(product.name).toBe("Crypto Wallet");
  });

  it("should return the product emoji", () => {
    const product = new ProductEntity("1", categoryStub, "Crypto Wallet", "🪙");
    expect(product.emoji).toBe("🪙");
  });

  it("should return the product category", () => {
    const product = new ProductEntity("1", categoryStub, "Crypto Wallet", "🪙");
    expect(product.category).toBe(categoryStub);
  });
});
