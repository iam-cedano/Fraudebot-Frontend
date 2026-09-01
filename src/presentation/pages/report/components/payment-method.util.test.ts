import {
  getPaymentHref,
  getPaymentLabel,
} from "@presentation/pages/report/components/payment-method.util";

describe("getPaymentLabel", () => {
  it("maps numeric payment types to display labels", () => {
    expect(getPaymentLabel("3", 2)).toBe("CLABE");
    expect(getPaymentLabel("4", 4)).toBe("Wallet");
  });

  it("maps string payment labels", () => {
    expect(getPaymentLabel("clabe")).toBe("CLABE");
    expect(getPaymentLabel("Wallet")).toBe("Wallet");
  });
});

describe("getPaymentHref", () => {
  it("builds an etherscan link for wallet addresses", () => {
    expect(
      getPaymentHref("0x87e33e9e3cdd7dae27f1263993c9c99fce59c909"),
    ).toBe("https://etherscan.io/address/0x87e33e9e3cdd7dae27f1263993c9c99fce59c909");
  });

  it("reuses contact href rules for url-like payment references", () => {
    expect(getPaymentHref("https://pay.example.com/account")).toBe(
      "https://pay.example.com/account",
    );
  });

  it("returns a search link for non-linkable payment references", () => {
    expect(getPaymentHref("3145914092")).toBe("/busqueda?q=3145914092");
    expect(getPaymentHref("012345678901234567")).toBe(
      "/busqueda?q=012345678901234567",
    );
    expect(getPaymentHref("   ")).toBe("#");
  });
});
