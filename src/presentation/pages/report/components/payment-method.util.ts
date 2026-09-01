import { getContactHref } from "@presentation/pages/report/components/contact-platform";

const PAYMENT_TYPE_LABELS: Record<string, string> = {
  "1": "Tarjeta",
  "2": "CLABE",
  "3": "Número de cuenta",
  "4": "Wallet",
  "5": "Otro",
  card_number: "Tarjeta",
  clabe: "CLABE",
  account_number: "Número de cuenta",
  wallet: "Wallet",
  other: "Otro",
};

function normalizePaymentTypeKey(value: string | number): string {
  return String(value).trim().toLowerCase();
}

function getPaymentLabel(label: string, paymentType?: number): string {
  if (paymentType !== undefined) {
    return PAYMENT_TYPE_LABELS[String(paymentType)] ?? label;
  }

  const normalizedLabel = normalizePaymentTypeKey(label);
  if (label && !/^\d+$/.test(label)) {
    return PAYMENT_TYPE_LABELS[normalizedLabel] ?? label;
  }

  return PAYMENT_TYPE_LABELS[normalizedLabel] ?? label;
}

function getPaymentHref(reference: string, paymentType?: number): string {
  const value = reference.trim();
  if (!value) {
    return "#";
  }

  if (/^0x[a-fA-F0-9]{40}$/.test(value)) {
    return `https://etherscan.io/address/${value}`;
  }

  const genericHref = getContactHref(value);
  if (genericHref !== "#") {
    return genericHref;
  }

  if (paymentType === 4 || normalizePaymentTypeKey(String(paymentType)) === "wallet") {
    return "#";
  }

  return "#";
}

export { getPaymentHref, getPaymentLabel };
