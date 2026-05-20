import { DEPARTMENTS, TASKS, TEAM } from "./static-data";
import { taskIsDone } from "./task-utils";
import { buildTeamWorkloadRows } from "./workload-utils";

/**
 * KPIs for Team hub from a roster + workload rows (demo or database).
 * @param {Array<{ weeklyHours: number; dept?: string }>} teamMembers
 * @param {ReturnType<typeof buildTeamWorkloadRows>} teamRows
 */
export function teamOverviewKpisFromRoster(teamMembers, teamRows) {
  const highLoadCount = teamRows.filter((r) => r.loadIndex >= 82).length;
  const partTimeCount = teamMembers.filter((m) => m.weeklyHours < 37).length;
  const weeklyHoursSum = teamMembers.reduce((sum, m) => sum + m.weeklyHours, 0);
  const disciplineIds = [...new Set(teamMembers.map((m) => m.dept).filter(Boolean))];
  const openTasksTotal = teamRows.reduce((s, r) => s + r.openCount, 0);

  return {
    headcount: teamMembers.length,
    weeklyHoursSum,
    disciplineCount: disciplineIds.length,
    partTimeCount,
    highLoadCount,
    avgWeeklyHours:
      teamMembers.length > 0 ? Math.round((weeklyHoursSum / teamMembers.length) * 10) / 10 : 0,
    fteApprox: teamMembers.length > 0 ? weeklyHoursSum / 37 : 0,
    openTasksTotal,
  };
}

/**
 * Disciplin-snapshots aligned med `teamDeptSnapshots` men fra workload-department rows (Mongo / demo).
 * @param {Array<{ dept: { id: string; name: string; short: string; color: string; capacity: number }; capacity?: number }>} deptRows
 * @param {ReturnType<typeof buildTeamWorkloadRows>} teamRows
 */
export function teamDeptSnapshotsFromDeptWorkload(deptRows, teamRows) {
  return deptRows.map((row) => {
    const d = row.dept;
    const cap =
      typeof row.capacity === "number" && Number.isFinite(row.capacity) ?
        row.capacity
      : d.capacity;
    const members = teamRows.filter((r) => r.member.dept === d.id).map((r) => r.member);
    const headcount = members.length;
    const weeklyHours = members.reduce((s, m) => s + m.weeklyHours, 0);
    const approxWeeklyDeptCapacity = cap > 0 ? Math.max(1, Math.round(cap / 4.33)) : 1;
    const staffingPct =
      headcount === 0 ?
        0
      : Math.min(100, Math.round((weeklyHours / approxWeeklyDeptCapacity) * 100));

    return {
      dept: d,
      headcount,
      weeklyHours,
      approxWeeklyDeptCapacity,
      staffingPct,
    };
  });
}

/**
 * @param {string} id
 */
export function getTeamMemberById(id) {
  return TEAM.find((m) => m.id === id) ?? null;
}

/** KPIs for Team hub landing. */
export function teamOverviewKpis() {
  return teamOverviewKpisFromRoster(TEAM, buildTeamWorkloadRows());
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
