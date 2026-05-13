import { TASK_DEMO_REF_DATE } from "@/lib/crm/task-utils";

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
