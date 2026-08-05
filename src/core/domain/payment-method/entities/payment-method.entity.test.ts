import { describe, it, expect } from "vitest";
import PaymentMethodEntity from "@/core/domain/payment-method/entities/payment-method.entity";

describe("PaymentMethodEntity.success", () => {
  it("should create a new payment method entity", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod).toBeDefined();
  });

  it("should return the payment method id", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.id).toBe("1");
  });

  it("should return the payment method organization id", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      "2",
      null,
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.organizationId).toBe("2");
  });

  it("should return the payment method scammer id", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.scammerId).toBe("1");
  });

  it("should return the payment method payment type", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.paymentType).toBe(1);
  });

  it("should return the payment method reference", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.reference).toBe("4111111111111111");
  });

  it("should return the payment method is active", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.isActive).toBe(true);
  });

  it("should return null if organization id is not set", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.organizationId).toBeNull();
  });

  it("should return null if scammer id is not set", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      "2",
      null,
      1,
      "4111111111111111",
      true,
    );
    expect(paymentMethod.scammerId).toBeNull();
  });

  it("should return false if payment method is not active", () => {
    const paymentMethod = new PaymentMethodEntity(
      "1",
      null,
      "1",
      1,
      "4111111111111111",
      false,
    );
    expect(paymentMethod.isActive).toBe(false);
  });
});
