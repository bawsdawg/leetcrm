import {
  formatReportPeriodLabel,
  formatReportPeriodSubtitle,
  normalizeReportPeriod,
} from "@/lib/crm/report-period";
import { DEPARTMENTS, TEAM } from "@/lib/crm/static-data";
import { TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";
import { teamDeptSnapshots, teamOverviewKpis } from "@/lib/crm/team-utils";
import { buildTeamWorkloadRows } from "@/lib/crm/workload-utils";

/**
 * @param {{ year?: number; month?: number }} [opts]
 */
export function getTeamDemoBundle(opts = {}) {
  const period = normalizeReportPeriod({ year: opts.year, month: opts.month });

  return {
    source: "demo",
    reportPeriod: { year: period.year, month: period.month },
    reportPeriodLabel: formatReportPeriodLabel(period.year, period.month),
    reportPeriodSubtitle: formatReportPeriodSubtitle(period.year, period.month),
    departments: DEPARTMENTS,
    kpis: teamOverviewKpis(),
    snapshots: teamDeptSnapshots(),
    teamRows: buildTeamWorkloadRows(),
    mineLabel: TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? null,
  };
}
