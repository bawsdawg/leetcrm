import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { TASKS } from "@/lib/crm/static-data";
import { taskIsDone, taskIsOverdue } from "@/lib/crm/task-utils";

export function TasksSummaryStrip() {
  const open = TASKS.filter((t) => !taskIsDone(t.status));
  const overdue = TASKS.filter((t) => taskIsOverdue(t));
  const highOpen = open.filter((t) => t.priority === "high").length;

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Opgaver i alt" value={String(TASKS.length)} tone="brand" />
      <PulseKpiCard label="Åbne" value={String(open.length)} tone="ok" />
      <PulseKpiCard
        label="Overskredet"
        value={String(overdue.length)}
        tone={overdue.length > 0 ? "bad" : "ok"}
      />
      <PulseKpiCard
        label="Høj prio (åbne)"
        value={String(highOpen)}
        tone={highOpen > 0 ? "warn" : "ok"}
      />
    </section>
  );
}
