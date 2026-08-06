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

  it("formats numeric input that uses plus signs as separators", () => {
    expect(Formatter.FormatInput("4111+1111+1111+1111")).toBe(
      "4111 1111 1111 1111",
    );
  });
});

describe("Formatter.toSearchQuery", () => {
  it("strips formatting from numeric queries", () => {
    expect(Formatter.toSearchQuery("4111 1111 1111 1111")).toBe("4111111111111111");
    expect(Formatter.toSearchQuery("4152 3137 3929 1342")).toBe("4152313739291342");
  });

  it("strips plus signs from numeric queries", () => {
    expect(Formatter.toSearchQuery("4111+1111+1111+1111")).toBe("4111111111111111");
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

describe("Formatter.toQueryParamValue", () => {
  it("encodes spaces as plus signs", () => {
    expect(Formatter.toQueryParamValue("john doe")).toBe("john+doe");
    expect(Formatter.toQueryParamValue("1234 5678")).toBe("1234+5678");
  });

  it("encodes special characters without turning plus into %2B", () => {
    expect(Formatter.toQueryParamValue("foo&bar")).toBe("foo%26bar");
  });
});

describe("Formatter.buildSearchQueryString", () => {
  it("builds a digit-only query string for numeric input", () => {
    expect(Formatter.buildSearchQueryString("4111 1111 1111 1111")).toBe(
      "q=4111111111111111",
    );
    expect(Formatter.buildSearchQueryString("4152 3137 3929 1342")).toBe(
      "q=4152313739291342",
    );
  });

  it("builds a search query string with plus-encoded spaces for text input", () => {
    expect(Formatter.buildSearchQueryString("john doe")).toBe("q=john+doe");
  });

  it("includes the page param when page is greater than 1", () => {
    expect(Formatter.buildSearchQueryString("test", 2)).toBe("q=test&p=2");
  });
});
