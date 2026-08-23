const MONTHS_ES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
] as const;

function formatParts(day: number, month: number, year: number): string {
  const monthLabel = MONTHS_ES[month - 1];

  if (!monthLabel) {
    return "";
  }

  return `${String(day).padStart(2, "0")}-${monthLabel}-${year}`;
}

export function formatContactDate(value: string): string {
  const dayFirst = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);

  if (dayFirst) {
    return (
      formatParts(Number(dayFirst[1]), Number(dayFirst[2]), Number(dayFirst[3])) ||
      value
    );
  }

  const isoDate = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (isoDate) {
    return (
      formatParts(Number(isoDate[3]), Number(isoDate[2]), Number(isoDate[1])) ||
      value
    );
  }

  return value;
}
