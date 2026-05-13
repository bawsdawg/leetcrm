/** Reference “i dag” for overdue (matcher Kontrakter). */
export const TASK_DEMO_REF_DATE = "2026-05-08";

/** Mock bruger-id — matcher `TEAM.find((m) => m.isMe)`. */
export const TASK_DEMO_USER_ID = "lm";

/** @param {string} status */
export function taskIsDone(status) {
  return status === "done";
}

/** @param {{ status: string; dueDate: string }} task */
export function taskIsOverdue(task, refDateIso = TASK_DEMO_REF_DATE) {
  return !taskIsDone(task.status) && task.dueDate < refDateIso;
}

/**
 * Dage fra reference til forfaldsdato (kan være negativ).
 * @param {string} dueDate YYYY-MM-DD
 */
export function taskDaysUntilDue(dueDate, refDateIso = TASK_DEMO_REF_DATE) {
  const ref = new Date(`${refDateIso}T12:00:00`);
  const end = new Date(`${dueDate}T12:00:00`);
  return Math.round((end.getTime() - ref.getTime()) / 86400000);
}

/** @param {'low'|'medium'|'high'} p */
export function taskPriorityRank(p) {
  if (p === "high") return 0;
  if (p === "medium") return 1;
  return 2;
}
