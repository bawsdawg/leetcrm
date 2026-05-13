import Link from "next/link";

import { TaskPriorityChip } from "@/components/crm/task-priority-chip";
import { TaskStatusChip } from "@/components/crm/task-status-chip";
import { routes } from "@/config/routes";
import { formatIsoDateDa } from "@/lib/crm/format-da";
import { taskIsOverdue } from "@/lib/crm/task-utils";
import { cn } from "@/lib/utils";

/**
 * Åbne opgaver på medarbejder (subset af `TASKS`).
 * @param {{ tasks: import('@/lib/crm/static-data').TASKS }} props
 */
export function TeamMemberOpenTasksCard({ tasks }) {
  return (
    <section className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-sans text-sm font-semibold text-fg">Åbne opgaver på dig</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-fg-soft">{tasks.length} stk.</span>
      </div>
      {tasks.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border-soft bg-surface-muted/35 px-3 py-5 text-center font-sans text-[12px] text-fg-muted">
          Ingen åbne opgaver på board — god fordybelse (mock-board).
        </p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y divide-border-soft">
          {tasks.map((t) => {
            const overdue = taskIsOverdue(t);
            return (
              <li key={t.id}>
                <Link
                  href={`${routes.tasks}/${t.id}`}
                  className={cn(
                    "flex flex-col gap-2 py-3 first:pt-0 last:pb-0 transition-colors hover:bg-surface-muted/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-sans text-[13px] font-medium text-fg">{t.title}</span>
                    {t.hint ? <div className="mt-0.5 font-sans text-[11px] text-fg-quiet">{t.hint}</div> : null}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <TaskStatusChip status={t.status} />
                      <TaskPriorityChip priority={t.priority} />
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-0.5 sm:items-end">
                    <span className="truncate font-mono text-[11px] text-fg-muted">{t.clientName}</span>
                    <span
                      className={cn(
                        "font-mono text-[11px] tabular-nums",
                        overdue ? "font-semibold text-agency-bad" : "text-fg-quiet",
                      )}
                    >
                      Forf. {formatIsoDateDa(t.dueDate)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-4 border-t border-border-soft pt-3 text-center font-sans text-[11px] text-fg-muted">
        <Link href={routes.tasks} className="font-medium text-agency-brand hover:underline">
          Gå til hele boardet →
        </Link>
      </div>
    </section>
  );
}
