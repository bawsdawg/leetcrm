import Link from "next/link";

import { routes } from "@/config/routes";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

/**
 * @param {{
 *   taskId: string;
 *   entries: { id: string; at: string; dur: number; desc: string; dept?: string | null }[];
 * }} props
 */
export function TaskDetailTimeTodayCard({ taskId, entries }) {
  const minutes = entries.reduce((s, e) => s + (Number(e.dur) || 0), 0);

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Tidsstempler i dag</h2>
        <Link href={routes.time} className="font-sans text-[11px] font-medium text-agency-brand hover:underline">
          Åbn tid →
        </Link>
      </div>
      <p className="mt-2 font-sans text-[11px] leading-snug text-fg-muted">
        Filtreret fra <span className="font-mono">TIME_ENTRIES_TODAY</span>
        {" · "}
        <span className="font-mono tabular-nums text-fg-soft">{minutes} m total</span> for{" "}
        <span className="font-mono">{taskId}</span>.
      </p>
      {entries.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-surface-muted/30 px-3 py-5 text-[13px] text-fg-muted">
          Ingen poster med task-link i demo-feed&apos;et i dag — boardet vil senere hive fuld audit trail.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {entries.map((e) => {
            const dep = e.dept ? DEPARTMENTS.find((d) => d.id === e.dept) : null;
            return (
              <li
                key={e.id}
                className={cn(
                  "flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-border-soft",
                  "bg-surface-muted/40 px-3 py-2.5 font-sans text-[12px]",
                )}
              >
                <span className="font-mono text-[11px] tabular-nums text-fg-soft">{e.at}</span>
                <span className="font-mono text-[11px] tabular-nums text-agency-brand">{e.dur} m</span>
                {dep ? (
                  <span className="font-mono text-[10px] font-semibold text-fg-quiet" style={{ color: dep.color }}>
                    {dep.short}
                  </span>
                ) : null}
                <span className="min-w-[55%] flex-1 text-fg-muted">{e.desc}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
