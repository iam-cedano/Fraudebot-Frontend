import { describe, it, expect } from "vitest";
import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import ContactEntity from "@/core/domain/contact/entities/contact.entity";
import PaymentMethodEntity from "@/core/domain/payment-method/entities/payment-method.entity";

describe("OrganizationEntity.success", () => {
  const scammersStub = [
    new ScammerEntity("1", "John Doe", "USA", true, null, null, null, null),
  ];
  const contactsStub = [
    new ContactEntity(
      "1",
      "1",
      null,
      "Jane Doe",
      1,
      "jane.doe@example.com",
      true,
    ),
  ];
  const paymentMethodsStub = [
    new PaymentMethodEntity("1", "1", null, 1, "4111111111111111", true),
  ];

  it("should create a new organization entity", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization).toBeDefined();
  });

  it("should return the organization id", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.id).toBe("1");
  });

  it("should return the organization name", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.name).toBe("Acme");
  });

  it("should return the organization description", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.description).toBe(
      "Fraudulent investment firm promising high returns",
    );
  });

  it("should return the organization is active", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.isActive).toBe(true);
  });

  it("should return the organization scammers", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.scammers).toBe(scammersStub);
  });

  it("should return the organization contacts", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.contacts).toBe(contactsStub);
  });

  it("should return the organization payment methods", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.paymentMethods).toBe(paymentMethodsStub);
  });

  it("should return null if scammers is not set", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      null,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.scammers).toBeNull();
  });

  it("should return null if contacts is not set", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      null,
      paymentMethodsStub,
    );
    expect(organization.contacts).toBeNull();
  });

  it("should return null if payment methods is not set", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      true,
      scammersStub,
      contactsStub,
      null,
    );
    expect(organization.paymentMethods).toBeNull();
  });

  it("should return false if organization is not active", () => {
    const organization = new OrganizationEntity(
      "1",
      "Acme",
      "Fraudulent investment firm promising high returns",
      false,
      scammersStub,
      contactsStub,
      paymentMethodsStub,
    );
    expect(organization.isActive).toBe(false);
  });
});
