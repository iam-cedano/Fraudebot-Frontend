import { describe, it, expect } from "vitest";
import UserEntity from "@/core/domain/user/entities/user.entity";

describe("UserEntity.success", () => {
  it("should create a new user entity", () => {
    const user = new UserEntity("1", "John Doe");
    expect(user).toBeDefined();
  });

  it("should return the user id", () => {
    const user = new UserEntity("1", "John Doe");
    expect(user.id).toBe("1");
  });

  it("should return the user name", () => {
    const user = new UserEntity("1", "John Doe");
    expect(user.name).toBe("John Doe");
  });
});