import { describe, it, expect } from "vitest";
import ContactSummaryEntity from "@/core/domain/contact/entities/contact-summary.entity";

describe("ContactSummaryEntity.success", () => {
  function createContact() {
    return new ContactSummaryEntity(
      "5",
      "Roxane",
      "fritz.rice@example.com",
      "Other",
      "2026-08-23",
      true,
    );
  }

  it("should create a new contact summary entity", () => {
    expect(createContact()).toBeDefined();
  });

  it("should return the contact summary id", () => {
    expect(createContact().id).toBe("5");
  });

  it("should return the contact summary name", () => {
    expect(createContact().name).toBe("Roxane");
  });

  it("should return the contact summary reference", () => {
    expect(createContact().reference).toBe("fritz.rice@example.com");
  });

  it("should return the contact summary platform", () => {
    expect(createContact().platform).toBe("Other");
  });

  it("should return the contact summary created at", () => {
    expect(createContact().createdAt).toBe("2026-08-23");
  });

  it("should return the contact summary is active", () => {
    expect(createContact().isActive).toBe(true);
  });

  it("should return false if contact is not active", () => {
    const contact = new ContactSummaryEntity(
      "5",
      "Roxane",
      "fritz.rice@example.com",
      "Other",
      "2026-08-23",
      false,
    );

    expect(contact.isActive).toBe(false);
  });
});
