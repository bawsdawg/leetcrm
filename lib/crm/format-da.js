const DKK = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0,
});

const EURO = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const PCT = new Intl.NumberFormat("da-DK", {
  style: "percent",
  maximumFractionDigits: 1,
});

const COMPACT = new Intl.NumberFormat("da-DK", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const DKK_COMPACT = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  notation: "compact",
  maximumFractionDigits: 1,
});

const EUR_COMPACT = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * @param {number} value
 * @param {string} [currency="DKK"]
 */
export function formatCurrency(value, currency = "DKK") {
  if (currency === "EUR") return EURO.format(value);
  return DKK.format(value);
}

/** @param {number} ratio 0–1 */
export function formatPercent(ratio) {
  return PCT.format(ratio);
}

/** @param {number} value */
export function formatCompactNumber(value) {
  return COMPACT.format(value);
}

/**
 * Compact currency for dense tables / charts (DESIGN-SEARCHMINDOS).
 * @param {number} value
 * @param {string} [currency="DKK"]
 */
export function formatCurrencyCompact(value, currency = "DKK") {
  if (currency === "EUR") return EUR_COMPACT.format(value);
  return DKK_COMPACT.format(value);
}

/** @param {string} [iso] YYYY-MM-DD */
export function formatIsoDateDa(iso) {
  if (!iso || typeof iso !== "string") return "—";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  return `${d}.${m}.${y}`;
}
