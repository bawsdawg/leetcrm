import { notFound } from "next/navigation";

import { ClientDetailAlertsCard } from "@/components/clients/client-detail-alerts-card";
import { TaskDetailActivityCard } from "@/components/tasks/task-detail-activity-card";
import { TaskDetailAssigneeCard } from "@/components/tasks/task-detail-assignee-card";
import { TaskDetailContextCard } from "@/components/tasks/task-detail-context-card";
import { TaskDetailDescriptionCard } from "@/components/tasks/task-detail-description-card";
import { TaskDetailHeader } from "@/components/tasks/task-detail-header";
import { TaskDetailKpiStrip } from "@/components/tasks/task-detail-kpi-strip";
import { TaskDetailTimeTodayCard } from "@/components/tasks/task-detail-time-today-card";
import { shellMainStudio } from "@/config/shell";
import {
  CLIENTS,
  CONTRACTS,
  DEPARTMENTS,
  SMART_ALERTS,
  TASK_ACTIVITY_LOG,
  TASKS,
  TEAM,
  TIME_ENTRIES_TODAY,
} from "@/lib/crm/static-data";
import { taskDaysUntilDue, taskIsDone, taskIsOverdue } from "@/lib/crm/task-utils";
import { cn } from "@/lib/utils";

/** @param {{ params: Promise<{ taskId: string }> }} props */
export async function generateMetadata({ params }) {
  const { taskId } = await params;
  const task = TASKS.find((t) => t.id === taskId);
  if (!task) return { title: "Opgave · 1337-crm by Searchmind" };
  return { title: `${task.title} · Opgave · 1337-crm by Searchmind` };
}

/** @param {{ params: Promise<{ taskId: string }> }} props */
export default async function TaskDetailPage({ params }) {
  const { taskId } = await params;
  const task = TASKS.find((t) => t.id === taskId);
  if (!task) notFound();

  const client = CLIENTS.find((c) => c.id === task.clientId);
  if (!client) notFound();

  const ctrId = `ctr-${task.clientId}`;
  const contract = CONTRACTS.find((c) => c.id === ctrId);
  if (!contract) notFound();

  const assignee = TEAM.find((m) => m.id === task.assigneeId) ?? null;
  const activityEntries = TASK_ACTIVITY_LOG[task.id] ?? [];
  const timeTodayEntries = TIME_ENTRIES_TODAY.filter((e) => e.task === task.id);
  const dep = DEPARTMENTS.find((d) => d.id === task.dept);

  const done = taskIsDone(task.status);
  const overdue = taskIsOverdue(task);
  const days = !done ? taskDaysUntilDue(task.dueDate) : null;

  const subtitle = done
    ? "Afsluttet på board."
    : task.status === "blocked"
      ? "Blokket — afvent dokumenteret clearance."
      : overdue && typeof days === "number"
        ? `${Math.abs(days)} kalenderdage over forfaldsdato (mock).`
        : days === 0
          ? "Forfaldsdato i dag."
          : typeof days === "number"
            ? `${days} d til forfaldsdato.`
            : "Åben leverance.";

  return (
    <main className={cn(shellMainStudio)}>
      <TaskDetailHeader
        task={{
          id: task.id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          dept: task.dept,
          clientName: task.clientName,
          clientLogo: task.clientLogo,
          clientHue: task.clientHue,
        }}
        deptLabel={dep?.name ?? task.dept}
        subtitle={subtitle}
      />

      <TaskDetailKpiStrip task={task} assigneeName={assignee?.name ?? null} />

      <section className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <TaskDetailDescriptionCard task={task} />
          <TaskDetailActivityCard entries={activityEntries} />
        </div>
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <TaskDetailContextCard client={client} contract={contract} />
          <TaskDetailAssigneeCard member={assignee} />
          <TaskDetailTimeTodayCard taskId={task.id} entries={timeTodayEntries} />
          <ClientDetailAlertsCard clientId={client.id} alerts={SMART_ALERTS} />
        </div>
      </section>

      <p className="font-sans text-[12px] text-fg-quiet">
        Enkeltopgave-view baseret på <code className="font-mono text-[11px] text-fg-muted">TASKS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">TASK_ACTIVITY_LOG</code> og mock tidsfeed — erstattes med
        task API + audit.
      </p>
    </main>
  );
}
