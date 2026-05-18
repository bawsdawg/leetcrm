import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { formatIsoDateDa } from "@/lib/crm/format-da";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { TASK_DEMO_REF_DATE, taskDaysUntilDue, taskIsDone, taskIsOverdue } from "@/lib/crm/task-utils";

/**
 * @param {{
 *   task: {
 *     dept: string;
 *     dueDate: string;
 *     status: string;
 *   };
 *   assigneeName: string | null;
 *   departments?: Array<{ id: string; name?: string }>;
 *   dueReferenceIso?: string;
 * }} props
 */
export function TaskDetailKpiStrip({
  task,
  assigneeName,
  departments,
  dueReferenceIso = TASK_DEMO_REF_DATE,
}) {
  const open = !taskIsDone(task.status);
  const overdue = taskIsOverdue(task, dueReferenceIso);
  const days = open ? taskDaysUntilDue(task.dueDate, dueReferenceIso) : null;

  const dueTone =
    !open ? "ok" : days === null || !Number.isFinite(days) ? "brand" : overdue ? "bad" : days <= 7 ? "warn" : "ok";

  const daysLabel = !open ? "—" : overdue ? `${Math.abs(days ?? 0)} d overskredet` : days === 0 ? "I dag" : `Om ${days} d`;

  const list = departments ?? DEPARTMENTS;
  const dep = list.find((d) => String(d.id) === String(task.dept));

  const disc =
    typeof dep?.name === "string" ? dep.name : task.dept && task.dept !== "—" ? task.dept.toUpperCase() : "—";

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Disciplin" value={disc} tone="brand" />
      <PulseKpiCard label="Ansvarlig" value={assigneeName ?? "Ikke tildelt"} tone={assigneeName ? "ok" : "warn"} />
      <PulseKpiCard label="Forfaldsdato" value={formatIsoDateDa(task.dueDate)} tone={dueTone} />
      <PulseKpiCard label="Afstand til due" value={daysLabel} tone={dueTone} />
    </section>
  );
}
