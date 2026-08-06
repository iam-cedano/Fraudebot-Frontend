import Paragraph from "@/presentation/shared/utils/paragraph";

describe("Paragraph.RemoveWhitespaces", () => {
  it("removes spaces from the input", () => {
    expect(Paragraph.RemoveWhitespaces("john doe")).toBe("johndoe");
  });

  it("removes tabs and newlines from the input", () => {
    expect(Paragraph.RemoveWhitespaces("john\tdoe\nsmith")).toBe("johndoesmith");
  });

  it("removes non-breaking spaces from the input", () => {
    expect(Paragraph.RemoveWhitespaces("john\u00A0doe")).toBe("johndoe");
  });

  it("returns the input unchanged when it has no whitespace", () => {
    expect(Paragraph.RemoveWhitespaces("johndoe")).toBe("johndoe");
  });

  it("returns an empty string for empty input", () => {
    expect(Paragraph.RemoveWhitespaces("")).toBe("");
  });

  it("returns an empty string when the input is only whitespace", () => {
    expect(Paragraph.RemoveWhitespaces(" \t\n\u00A0")).toBe("");
  });
});
