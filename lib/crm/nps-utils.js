import { CLIENTS, SMART_ALERTS } from "./static-data";

/** Konti med i NPS-rollup (aktiv + pauseret). */
export function npsDashboardClients() {
  return CLIENTS.filter((c) => c.status === "active" || c.status === "paused");
}

/** @param {import("./static-data").CLIENTS[number]} client */
export function npsLatestEntry(client) {
  const h = client.npsHistory;
  if (!h?.length) return null;
  return h[h.length - 1];
}

/** @param {import("./static-data").CLIENTS[number]} client */
export function npsPreviousEntry(client) {
  const h = client.npsHistory;
  if (!h || h.length < 2) return null;
  return h[h.length - 2];
}

export function npsActiveClientsMeasured() {
  return npsDashboardClients().filter((c) => (c.npsHistory?.length ?? 0) > 0);
}

export function npsAgencyAverageLatest() {
  const scores = npsActiveClientsMeasured().map((c) => npsLatestEntry(c)?.score).filter((x) => x != null);
  if (!scores.length) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function npsAgencyAveragePrevious() {
  const scores = npsActiveClientsMeasured()
    .map((c) => npsPreviousEntry(c)?.score)
    .filter((x) => x != null);
  if (!scores.length) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/**
 * Promoter ≥50 · passiv 40–49 · detraktor <40 — matcher KPI-toner på kundekort.
 * @returns {{ promoters: number; passive: number; detractors: number; withData: number }}
 */
export function npsLatestDistributionBuckets() {
  let promoters = 0;
  let passive = 0;
  let detractors = 0;
  let withData = 0;
  for (const c of npsActiveClientsMeasured()) {
    const s = npsLatestEntry(c)?.score;
    if (s == null) continue;
    withData++;
    if (s >= 50) promoters++;
    else if (s >= 40) passive++;
    else detractors++;
  }
  return { promoters, passive, detractors, withData };
}

export function npsAtRiskLatestCount() {
  return npsActiveClientsMeasured().filter((c) => (npsLatestEntry(c)?.score ?? 99) < 40).length;
}

export function npsImprovingClientsCount(threshold = 2) {
  return npsActiveClientsMeasured().filter((c) => {
    const a = npsLatestEntry(c)?.score;
    const b = npsPreviousEntry(c)?.score;
    return a != null && b != null && a >= b + threshold;
  }).length;
}

export function npsSmartAlertsFiltered() {
  return SMART_ALERTS.filter((a) => a.type === "npsDrop" || /\bNPS\b/i.test(a.title));
}

/**
 * @param {number[]} base
 * @param {number | null | undefined} liveLatest
 */
export function npsMergeTrendSeries(base, liveLatest) {
  const s = [...base];
  if (liveLatest != null && Number.isFinite(liveLatest)) {
    s[s.length - 1] = Math.round(liveLatest * 10) / 10;
  }
  return s;
}
