/** @typedef {{ year: number; month: number }} ReportPeriod */

export const MONTH_NAMES_DA = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];

const MONTH_NAMES_DA_LOWER = MONTH_NAMES_DA.map((m) => m.toLowerCase());

/** @returns {ReportPeriod} */
export function getCurrentReportPeriod() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function startOfReportMonth(year, month) {
  return new Date(year, month - 1, 1, 0, 0, 0, 0);
}

/**
 * Exclusive end (first instant of next month).
 * @param {number} year
 * @param {number} month 1–12
 */
export function endOfReportMonth(year, month) {
  return new Date(year, month, 1, 0, 0, 0, 0);
}

/**
 * @param {number} year
 * @param {number} month 1–12
 * @param {number} deltaMonths
 * @returns {ReportPeriod}
 */
export function shiftReportPeriod(year, month, deltaMonths) {
  const d = new Date(year, month - 1 + deltaMonths, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

/**
 * @param {ReportPeriod} a
 * @param {ReportPeriod} b
 */
export function isSameReportPeriod(a, b) {
  return a.year === b.year && a.month === b.month;
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function isCurrentReportPeriod(year, month) {
  return isSameReportPeriod({ year, month }, getCurrentReportPeriod());
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function formatReportPeriodLabel(year, month) {
  const name = MONTH_NAMES_DA[month - 1] ?? "";
  return `${name} ${year}`;
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function formatReportPeriodSubtitle(year, month) {
  const name = MONTH_NAMES_DA_LOWER[month - 1] ?? "";
  return `${name} ${year}`;
}

/**
 * Latest selectable month (1–12) for a given year.
 * @param {number} year
 */
export function getMaxSelectableMonth(year) {
  const { year: cy, month: cm } = getCurrentReportPeriod();
  if (year < cy) return 12;
  if (year > cy) return 0;
  return cm;
}

/**
 * @param {number} [yearsBack=4]
 * @returns {number[]}
 */
export function getSelectableYears(yearsBack = 4) {
  const cy = getCurrentReportPeriod().year;
  const out = [];
  for (let y = cy; y >= cy - yearsBack; y -= 1) out.push(y);
  return out;
}

/**
 * Clamp to a valid past/current month.
 * @param {Partial<ReportPeriod>} period
 * @returns {ReportPeriod}
 */
export function normalizeReportPeriod(period) {
  const current = getCurrentReportPeriod();
  let year = Number(period.year) || current.year;
  let month = Number(period.month) || current.month;

  const minYear = current.year - 4;
  if (year < minYear) year = minYear;
  if (year > current.year) year = current.year;

  const maxMonth = getMaxSelectableMonth(year);
  if (month < 1) month = 1;
  if (month > maxMonth) month = maxMonth || 1;

  return { year, month };
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function canGoToNextPeriod(year, month) {
  const next = shiftReportPeriod(year, month, 1);
  const maxMonth = getMaxSelectableMonth(next.year);
  return next.year < getCurrentReportPeriod().year || (next.year === getCurrentReportPeriod().year && next.month <= maxMonth);
}

/**
 * @param {number} year
 * @param {number} month 1–12
 */
export function canGoToPrevPeriod(year, month) {
  const prev = shiftReportPeriod(year, month, -1);
  const minYear = getCurrentReportPeriod().year - 4;
  return prev.year >= minYear;
}

/**
 * @param {import('@/lib/crm/pulse-types').PulseReportPeriod | undefined} period
 */
export function resolveReportPeriod(period) {
  if (period?.year && period?.month) {
    return normalizeReportPeriod(period);
  }
  return getCurrentReportPeriod();
}
