import {
  formatReportPeriodLabel,
  isCurrentReportPeriod,
  normalizeReportPeriod,
} from "@/lib/crm/report-period";
import {
  AGENCY_METRICS,
  CLIENTS,
  DEPARTMENTS,
  DEPT_PERFORMANCE,
  SMART_ALERTS,
  TEAM,
  UTIL_TREND,
} from "@/lib/crm/static-data";

/** @typedef {import('@/lib/crm/pulse-types').PulseBundle} PulseBundle */

/**
 * @param {{ year?: number; month?: number }} [opts]
 * @returns {PulseBundle}
 */
export function getPulseDemoBundle(opts = {}) {
  const { year, month } = normalizeReportPeriod(opts);
  return {
    source: "demo",
    period: {
      year,
      month,
      label: formatReportPeriodLabel(year, month),
      isCurrent: isCurrentReportPeriod(year, month),
    },
    agencyMetrics: AGENCY_METRICS,
    clients: CLIENTS,
    departments: DEPARTMENTS,
    deptPerformance: DEPT_PERFORMANCE,
    utilTrend: UTIL_TREND,
    smartAlerts: SMART_ALERTS,
    team: TEAM,
  };
}
