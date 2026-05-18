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

/** @returns {PulseBundle} */
export function getPulseDemoBundle() {
  return {
    source: "demo",
    agencyMetrics: AGENCY_METRICS,
    clients: CLIENTS,
    departments: DEPARTMENTS,
    deptPerformance: DEPT_PERFORMANCE,
    utilTrend: UTIL_TREND,
    smartAlerts: SMART_ALERTS,
    team: TEAM,
  };
}
