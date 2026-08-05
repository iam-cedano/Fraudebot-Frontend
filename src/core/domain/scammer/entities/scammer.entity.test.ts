import { describe, it, expect } from "vitest";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";
import ContactEntity from "@/core/domain/contact/entities/contact.entity";
import PaymentMethodEntity from "@/core/domain/payment-method/entities/payment-method.entity";
import ReportEntity from "@/core/domain/report/entities/report.entity";

describe("ScammerEntity.success", () => {
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
  const contactsStub = [
    new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    ),
  ];
  const paymentMethodsStub = [
    new PaymentMethodEntity("1", null, "1", 1, "4111111111111111", true),
  ];
  const reportsStub = [
    new ReportEntity(
      "1",
      null,
      null,
      null,
      null,
      "Fake investment scam",
      "Promised high returns and disappeared with funds",
      true,
      true,
      null,
      new Date("2024-01-15"),
      new Date("2024-01-16"),
    ),
  ];

  it("should create a new scammer entity", () => {
    const scammer = new ScammerEntity(
      "1",
      "John Doe",
      "USA",
      true,
      organizationsStub,
      contactsStub,
      paymentMethodsStub,
      reportsStub,
    );
    expect(scammer).toBeDefined();
  });

  it("should return the scammer id", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.id).toBe("1");
  });

  it("should return the scammer name", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.name).toBe("John Doe");
  });

  it("should return the scammer country", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.country).toBe("USA");
  });

  it("should return the scammer is active", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.isActive).toBe(true);
  });

  it("should return the scammer organizations", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.organizations).toBe(organizationsStub);
  });

  it("should return the scammer contacts", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.contacts).toBe(contactsStub);
  });
  
  it("should return the scammer payment methods", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.paymentMethods).toBe(paymentMethodsStub);
  });

  it("should return the scammer reports", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.reports).toBe(reportsStub);
  });

  it("should return null if organizations is not set", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, null, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.organizations).toBeNull();
  });

  it("should return null if contacts is not set", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, null, paymentMethodsStub, reportsStub);
    expect(scammer.contacts).toBeNull();
  });
  
  it("should return null if payment methods is not set", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, null, reportsStub);
    expect(scammer.paymentMethods).toBeNull();
  });

  it("should return null if reports is not set", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", true, organizationsStub, contactsStub, paymentMethodsStub, null);
    expect(scammer.reports).toBeNull();
  });

  it("should return false if scammer is not active", () => {
    const scammer = new ScammerEntity("1", "John Doe", "USA", false, organizationsStub, contactsStub, paymentMethodsStub, reportsStub);
    expect(scammer.isActive).toBe(false);
  });
});