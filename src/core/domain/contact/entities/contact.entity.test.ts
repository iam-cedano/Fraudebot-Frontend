import { describe, it, expect } from "vitest";
import ContactEntity from "@/core/domain/contact/entities/contact.entity";

describe("ContactEntity.success", () => {
  it("should create a new contact entity", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact).toBeDefined();
  });

  it("should return the contact id", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.id).toBe("1");
  });

  it("should return the contact organization id", () => {
    const contact = new ContactEntity(
      "1",
      "2",
      null,
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.organizationId).toBe("2");
  });

  it("should return the contact scammer id", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.scammerId).toBe("1");
  });

  it("should return the contact name", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.name).toBe("John Doe");
  });

  it("should return the contact platform", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.platform).toBe(1);
  });

  it("should return the contact value", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.contact).toBe("john.doe@example.com");
  });

  it("should return the contact is active", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.isActive).toBe(true);
  });

  it("should return null if organization id is not set", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.organizationId).toBeNull();
  });

  it("should return null if scammer id is not set", () => {
    const contact = new ContactEntity(
      "1",
      "2",
      null,
      "John Doe",
      1,
      "john.doe@example.com",
      true,
    );
    expect(contact.scammerId).toBeNull();
  });

  it("should return false if contact is not active", () => {
    const contact = new ContactEntity(
      "1",
      null,
      "1",
      "John Doe",
      1,
      "john.doe@example.com",
      false,
    );
    expect(contact.isActive).toBe(false);
  });
});
