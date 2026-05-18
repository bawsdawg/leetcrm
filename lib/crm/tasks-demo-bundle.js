import { formatReportPeriodLabel, isCurrentReportPeriod, lastCalendarDayIsoOfReportMonth, normalizeReportPeriod } from "@/lib/crm/report-period";
import { portfolioRowIncludedInMonth } from "@/lib/crm/tasks-portfolio-filter";
import { CLIENTS, DEPARTMENTS, TASKS, TEAM } from "@/lib/crm/static-data";
import { TASK_DEMO_USER_ID, taskIsDone, taskIsOverdue } from "@/lib/crm/task-utils";

/**
 * @param {{ year?: number; month?: number }} [opts]
 */
export function getTasksDemoBundle(opts = {}) {
  const { year, month } = normalizeReportPeriod(opts);
  const overdueRefIso = lastCalendarDayIsoOfReportMonth(year, month);
  /** @type {typeof TASKS} */
  const tasks = TASKS.filter((t) => portfolioRowIncludedInMonth(t, year, month));

  const openCount = tasks.filter((t) => !taskIsDone(t.status)).length;
  const overdueCount = tasks.filter((t) => taskIsOverdue(t, overdueRefIso)).length;
  const mineCount = tasks.filter((t) => t.assigneeId === TASK_DEMO_USER_ID).length;
  const highOpen = tasks.filter((t) => !taskIsDone(t.status) && t.priority === "high").length;

  const departments = DEPARTMENTS.map((d) => ({
    id: d.id,
    name: d.name,
    short: d.short,
    color: typeof d.color === "string" ? d.color : "var(--dep-seo)",
  }));

  /** @type {{ value: string; label: string }[]} */
  const clientsPicklist = CLIENTS.map((c) => ({
    value: c.id,
    label: c.name,
  })).sort((a, b) => a.label.localeCompare(b.label, "da"));

  return {
    source: /** @type {const} */ ("demo"),
    period: {
      year,
      month,
      label: formatReportPeriodLabel(year, month),
      isCurrent: isCurrentReportPeriod(year, month),
    },
    taskDueReferenceIso: overdueRefIso,
    overdueRefIso,
    mineAssigneeKey: TASK_DEMO_USER_ID,
    tasks,
    team: TEAM,
    departments,
    clientsPicklist,
    summary: {
      total: tasks.length,
      openCount,
      overdueCount,
      mineCount,
      highOpen,
    },
  };
}
