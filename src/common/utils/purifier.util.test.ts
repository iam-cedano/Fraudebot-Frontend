import PurifierUtil from "@/common/utils/purifier.util";

describe("PurifierUtil.Sanitize", () => {
  it("removes prohibited characters from text input", () => {
    expect(PurifierUtil.Sanitize('hello<script>"alert"</script>')).toBe(
      "helloscriptalertscript",
    );
  });

  it("removes spaces from digit-only input", () => {
    expect(PurifierUtil.Sanitize("1234 5678")).toBe("12345678");
  });

  it("keeps spaces in mixed alphanumeric input", () => {
    expect(PurifierUtil.Sanitize("john doe")).toBe("john doe");
  });

  it("returns empty string for empty input", () => {
    expect(PurifierUtil.Sanitize("")).toBe("");
  });
});
