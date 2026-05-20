import { TASK_DEMO_REF_DATE } from "@/lib/crm/task-utils";
import { getDaysInMonth } from "@/lib/crm/report-period";

/**
 * Resolve week row minutes (`null` = current ref day filled from today's entries).
 * @param {{
 *   iso: string;
 *   label: string;
 *   minutes: number | null;
 * }[]} overview
 * @param {{ dur: number }[]} todayEntries
 */
export function resolveTimeWeekOverview(overview, todayEntries) {
  const todaySum = todayEntries.reduce((s, e) => s + (Number(e.dur) || 0), 0);

  return overview.map((d) => ({
    ...d,
    minutes: d.minutes == null ? todaySum : d.minutes,
    isToday: d.iso === TASK_DEMO_REF_DATE,
  }));
}

/** @param {string} iso YYYY-MM-DD */
export function isWeekendIso(iso) {
  const dow = new Date(`${iso}T12:00:00`).getDay();
  return dow === 0 || dow === 6;
}

/**
 * Fuldt ugen mål (5 arbejdsdage × daglig mål).
 * @param {number} dailyTargetMinutes
 */
export function timeWeekGoalMinutes(dailyTargetMinutes) {
  return dailyTargetMinutes * 5;
}

/** Monday-first weekday labels matching `utcMondayToSundayInclusive` ordering. */
export const TIME_WEEKDAY_LABELS_MON_SUN = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

/** @param {string} iso YYYY-MM-DD (UTC calendar day anchor) */
export function utcMondayToSundayInclusive(isoAnchor) {
  const trimmed = typeof isoAnchor === "string" ? isoAnchor.trim().slice(0, 10) : "";
  if (!trimmed || trimmed.length < 10) return [];
  const d = new Date(`${trimmed}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return [];
  const dow = d.getUTCDay(); // 0 Sun .. 6 Sat
  const monOffset = dow === 0 ? -6 : 1 - dow;
  d.setUTCDate(d.getUTCDate() + monOffset);
  /** @type {string[]} */
  const out = [];
  for (let i = 0; i < 7; i++) {
    const x = new Date(d.getTime());
    x.setUTCDate(d.getUTCDate() + i);
    out.push(x.toISOString().slice(0, 10));
  }
  return out;
}

/** @type {readonly string[]} Dagekolonner Mandag først — bruges i månedskalender. */
export const CALENDAR_WEEKDAY_HEADERS_DA_MON = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

/**
 * Antal mandag–fredag i måneden (browser/server — JS lokalt døgn ved Date).
 * @param {number} year
 * @param {number} month 1–12
 */
export function countWeekdaysMonFriInMonth(year, month) {
  const daysIn = getDaysInMonth(year, month);
  let n = 0;
  for (let d = 1; d <= daysIn; d += 1) {
    const dow = new Date(year, month - 1, d).getDay();
    if (dow >= 1 && dow <= 5) n += 1;
  }
  return n;
}

/** Arbejdsdage i måneden × daglig mål minutter */
export function timeMonthGoalMinutes(year, month, dailyTargetMinutes) {
  const tgt = typeof dailyTargetMinutes === "number" && Number.isFinite(dailyTargetMinutes) ? dailyTargetMinutes : 0;
  return Math.round(tgt * countWeekdaysMonFriInMonth(year, month));
}

/**
 * @param {number} year
 * @param {number} month 1–12
 * @param {Record<string, number>} totalsIso keyed YYYY-MM-DD
 * @param {string} [todayIsoHighlight] YYYY-MM-DD — marker "i dag"
 */
export function buildReportMonthCalendarCells(year, month, totalsIso, todayIsoHighlight = "") {
  const y = year;
  const m = month;
  const dim = getDaysInMonth(y, m);
  const jd = new Date(y, m - 1, 1).getDay();
  /** Mandag først: hvor mange huller før d. 1 */
  const lead = jd === 0 ? 6 : jd - 1;

  const todayTrim = typeof todayIsoHighlight === "string" ? todayIsoHighlight.trim().slice(0, 10) : "";

  /** @typedef {{ key: string; kind: "blank" | "day"; iso?: string; minutes?: number; label?: string; isToday?: boolean; weekend?: boolean }} Cell */
  /** @type {Cell[]} */
  const cells = [];
  for (let i = 0; i < lead; i += 1) cells.push({ key: `lead-${year}-${month}-${i}`, kind: "blank" });

  for (let d = 1; d <= dim; d += 1) {
    const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dow = new Date(y, m - 1, d).getDay();
    const weekend = dow === 0 || dow === 6;
    const raw = totalsIso[iso];
    let minutes =
      typeof raw === "number" && Number.isFinite(raw) ?
        raw
      : typeof raw !== "undefined" ?
        Number(raw)
      : 0;

    minutes = Number.isFinite(minutes) ? Math.round(minutes) : 0;

    cells.push({
      key: iso,
      kind: "day",
      iso,
      minutes,
      label: String(d),
      isToday: !!todayTrim && todayTrim === iso,
      weekend,
    });
  }

  while (cells.length % 7 !== 0) cells.push({ key: `trail-${cells.length}`, kind: "blank" });

  return cells;
}

/** @param {{ durationMinutes?: number | null; workedAtIso?: string | null }}[] entries */
export function minutesPerUtcIsoDayFromWireEntries(entries) {
  /** @type {Record<string, number>} */
  const totals = {};
  for (const e of entries || []) {
    const iso =
      typeof e?.workedAtIso === "string" && e.workedAtIso.length >= 10 ? e.workedAtIso.slice(0, 10) : "";
    if (!iso) continue;
    let m = typeof e.durationMinutes === "number" ? e.durationMinutes : Number(e.durationMinutes);
    if (!Number.isFinite(m)) m = 0;
    totals[iso] = (totals[iso] || 0) + Math.round(m);
  }
  return totals;
}
