import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { formatIsoDateDa } from "@/lib/crm/format-da";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { taskDaysUntilDue, taskIsDone, taskIsOverdue } from "@/lib/crm/task-utils";

/**
 * @param {{
 *   task: {
 *     dept: string;
 *     dueDate: string;
 *     status: string;
 *   };
 *   assigneeName: string | null;
 * }} props
 */
export function TaskDetailKpiStrip({ task, assigneeName }) {
  const open = !taskIsDone(task.status);
  const overdue = taskIsOverdue(task);
  const days = open ? taskDaysUntilDue(task.dueDate) : null;

  const dueTone =
    !open ? "ok" : days === null || !Number.isFinite(days) ? "brand" : overdue ? "bad" : days <= 7 ? "warn" : "ok";

  const daysLabel = !open ? "—" : overdue ? `${Math.abs(days)} d overskredet` : days === 0 ? "I dag" : `Om ${days} d`;

  const dep = DEPARTMENTS.find((d) => d.id === task.dept);

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Disciplin" value={dep?.name ?? task.dept.toUpperCase()} tone="brand" />
      <PulseKpiCard label="Ansvarlig" value={assigneeName ?? "Ikke tildelt"} tone={assigneeName ? "ok" : "warn"} />
      <PulseKpiCard label="Forfaldsdato" value={formatIsoDateDa(task.dueDate)} tone={dueTone} />
      <PulseKpiCard label="Afstand til due (ref.)" value={daysLabel} tone={dueTone} />
    </section>
  );
}
