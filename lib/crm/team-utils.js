import { DEPARTMENTS, TASKS, TEAM } from "./static-data";
import { taskIsDone } from "./task-utils";
import { buildTeamWorkloadRows } from "./workload-utils";

/**
 * @param {string} id
 */
export function getTeamMemberById(id) {
  return TEAM.find((m) => m.id === id) ?? null;
}

/** KPIs for Team hub landing. */
export function teamOverviewKpis() {
  const rows = buildTeamWorkloadRows();
  const highLoadCount = rows.filter((r) => r.loadIndex >= 82).length;
  const partTimeCount = TEAM.filter((m) => m.weeklyHours < 37).length;
  const weeklyHoursSum = TEAM.reduce((sum, m) => sum + m.weeklyHours, 0);
  const disciplineIds = [...new Set(TEAM.map((m) => m.dept))];
  const openTasksTotal = rows.reduce((s, r) => s + r.openCount, 0);

  return {
    headcount: TEAM.length,
    weeklyHoursSum,
    disciplineCount: disciplineIds.length,
    partTimeCount,
    highLoadCount,
    avgWeeklyHours:
      TEAM.length > 0 ? Math.round((weeklyHoursSum / TEAM.length) * 10) / 10 : 0,
    fteApprox: TEAM.length > 0 ? weeklyHoursSum / 37 : 0,
    openTasksTotal,
  };
}

/**
 * @param {string} memberId
 */
export function getOpenTasksForMember(memberId) {
  return TASKS.filter((t) => t.assigneeId === memberId && !taskIsDone(t.status)).sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  );
}

/**
 * Pr. disciplin: roster og Σ kontrakttimer pr. uge vs. månedskap./4,33 — mock-reference til capacity-dialog.
 */
export function teamDeptSnapshots() {
  return DEPARTMENTS.map((d) => {
    const members = TEAM.filter((m) => m.dept === d.id);
    const headcount = members.length;
    const weeklyHours = members.reduce((s, m) => s + m.weeklyHours, 0);
    const approxWeeklyDeptCapacity =
      d.capacity > 0 ? Math.max(1, Math.round(d.capacity / 4.33)) : 1;
    const staffingPct =
      headcount === 0
        ? 0
        : Math.min(
            100,
            Math.round((weeklyHours / approxWeeklyDeptCapacity) * 100),
          );

    return {
      dept: d,
      headcount,
      weeklyHours,
      approxWeeklyDeptCapacity,
      staffingPct,
    };
  });
}
