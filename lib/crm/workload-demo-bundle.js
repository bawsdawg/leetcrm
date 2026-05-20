import {
  formatReportPeriodLabel,
  formatReportPeriodSubtitle,
  normalizeReportPeriod,
} from "@/lib/crm/report-period";
import { TASKS, TEAM, UTIL_TREND } from "@/lib/crm/static-data";
import { TASK_DEMO_REF_DATE, TASK_DEMO_USER_ID, taskIsDone, taskIsOverdue } from "@/lib/crm/task-utils";

/**
 * @param {{ year?: number; month?: number }} [opts]
 */
export function getWorkloadDemoBundle(opts = {}) {
  const period = normalizeReportPeriod({ year: opts.year, month: opts.month });
  const utilizationTrend = UTIL_TREND.slice(-14).map(({ billable, overhead }) => ({ billable, overhead }));

  return {
    source: "demo",
    reportPeriod: { year: period.year, month: period.month },
    reportPeriodLabel: formatReportPeriodLabel(period.year, period.month),
    reportPeriodSubtitle: formatReportPeriodSubtitle(period.year, period.month),
    deptRows: buildDeptWorkloadRows(),
    demandByDept: workloadTaskDemandByDept(),
    openTaskStats: workloadOpenTaskStats(),
    teamRows: buildTeamWorkloadRows(),
    utilizationTrend,
    billableHoursMonth: workloadAgencyBillableHoursRef(),
    activeClientsCount: workloadActiveClientCount(),
    teamWeeklyHours: TEAM.reduce((s, m) => s + m.weeklyHours, 0),
  };
}

/**
 * @param {string} memberKey
 * @param {{ year?: number; month?: number }} [opts]
 */
export function getWorkloadMemberDemoBundle(memberKey, opts = {}) {
  const mk = String(memberKey ?? "").trim();
  if (!mk) return null;

  const m = TEAM.find((x) => x.id === mk);
  if (!m) return null;

  const period = normalizeReportPeriod({ year: opts.year, month: opts.month });
  const openForM = TASKS.filter((t) => !taskIsDone(t.status) && t.assigneeId === m.id);

  let high = 0;
  let overdue = 0;
  for (const t of openForM) {
    if (t.priority === "high") high += 1;
    if (taskIsOverdue(t, TASK_DEMO_REF_DATE)) overdue += 1;
  }

  const tasksOpen = openForM.slice(0, 50).map((t) => ({
    key: typeof t.id === "string" ? t.id : "",
    title: String(t.title ?? ""),
    clientSlug: typeof t.clientId === "string" ? t.clientId : "",
    status: String(t.status ?? ""),
    priority: String(t.priority ?? ""),
    estimateHours: undefined,
    dueIso: typeof t.dueDate === "string" ? t.dueDate.slice(0, 10) : null,
    departmentKey: typeof t.dept === "string" ? t.dept : "—",
  }));

  /** @type {typeof m & { isMe?: boolean }} */
  const member = { ...m };
  if (m.id === TASK_DEMO_USER_ID) member.isMe = true;

  return {
    source: "demo",
    memberKey: mk,
    member,
    reportPeriod: { year: period.year, month: period.month },
    reportPeriodLabel: formatReportPeriodLabel(period.year, period.month),
    reportPeriodSubtitle: formatReportPeriodSubtitle(period.year, period.month),
    openTaskStats: {
      total: openForM.length,
      high,
      overdue,
    },
    hoursMonth: 0,
    billableHoursMonth: 0,
    tasksOpen,
  };
}
