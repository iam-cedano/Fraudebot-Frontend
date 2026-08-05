import Formatter from "@/presentation/shared/utils/formatter";

describe("Formatter.FormatInput", () => {
  it("formats 16 digits as a card number", () => {
    expect(Formatter.FormatInput("4111111111111111")).toBe("4111 1111 1111 1111");
  });

  it("formats 10 digits as a phone or account number", () => {
    expect(Formatter.FormatInput("5512345678")).toBe("5512 345 678");
  });

  it("formats 18 digits as a CLABE number", () => {
    expect(Formatter.FormatInput("012345678901234567")).toBe(
      "0123 4567 8901 2345 67",
    );
  });

  it("returns text input unchanged when it contains letters", () => {
    expect(Formatter.FormatInput("john doe")).toBe("john doe");
  });

  it("returns empty string for empty input", () => {
    expect(Formatter.FormatInput("")).toBe("");
  });

  it("returns partial numeric input unchanged when length does not match a format", () => {
    expect(Formatter.FormatInput("12345")).toBe("12345");
  });

  it("returns mixed input unchanged when it contains non-digit characters", () => {
    expect(Formatter.FormatInput("123-456")).toBe("123-456");
  });
});

describe("Formatter.toSearchQuery", () => {
  it("strips formatting from numeric queries", () => {
    expect(Formatter.toSearchQuery("4111 1111 1111 1111")).toBe("4111111111111111");
  });

  it("trims text queries and preserves internal spaces", () => {
    expect(Formatter.toSearchQuery("  john doe  ")).toBe("john doe");
  });
});

describe("Formatter.FormatInputAndUpdate", () => {
  it("calls the callback with the formatted value", () => {
    const callback = vi.fn();

    Formatter.FormatInputAndUpdate("4111111111111111", callback);

    expect(callback).toHaveBeenCalledWith("4111 1111 1111 1111");
  });
});
