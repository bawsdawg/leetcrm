import { TaskPriorityChip } from "@/components/crm/task-priority-chip";
import { formatIsoDateDa } from "@/lib/crm/format-da";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

const SCOPE_DA = {
  retainer: "Retainer",
  project: "Projekt",
  any: "Alle typer",
};

/**
 * @param {{ row: import('@/lib/crm/static-data').TASK_TEMPLATES[number] }} props
 */
export function TemplateGridCard({ row }) {
  const dep = DEPARTMENTS.find((d) => d.id === row.dept);

  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-surface-card p-3.5 shadow-inset-card",
        row.active ? "" : "opacity-65",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="font-sans text-[13.5px] font-semibold leading-snug text-fg">{row.name}</div>
          <p className="mt-1 line-clamp-2 font-sans text-[11px] leading-relaxed text-fg-quiet">{row.hint}</p>
        </div>
        <span
          className={cn(
            "rounded-md border border-border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-muted",
          )}
          style={dep?.color ? { color: dep.color } : undefined}
        >
          {dep?.short ?? row.dept}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <TaskPriorityChip priority={row.defaultPriority} />
        <span
          className={cn(
            "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide",
            row.active
              ? "border-agency-brand-border bg-agency-brand-soft text-agency-brand"
              : "border-border bg-surface-muted text-fg-quiet",
          )}
        >
          {row.active ? "Aktiv" : "Arkiv"}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border-soft pt-3 font-mono text-[11px] text-fg-muted">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Deadline (+d)</div>
          <div className="mt-0.5 tabular-nums text-fg">{row.defaultDueOffsetDays} d</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Est. timer</div>
          <div className="mt-0.5 tabular-nums text-fg">{row.estHours} t</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Tjekliste</div>
          <div className="mt-0.5 tabular-nums text-fg">{row.checklistCount} punkter</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Anvendelser</div>
          <div className="mt-0.5 tabular-nums text-agency-brand">{row.usedCount}×</div>
        </div>
      </div>

      <div className="mt-2 border-t border-border-soft pt-2 font-sans text-[10px] text-fg-muted">
        <span className="font-semibold text-fg-soft">Scope:</span> {SCOPE_DA[row.scope] ?? row.scope}
        <span className="mx-1.5 text-fg-quiet">·</span>
        <span className="font-mono tabular-nums">Opd. {formatIsoDateDa(row.updatedAt)}</span>
      </div>
      <p className="mt-2 font-mono text-[10px] text-fg-quiet">{row.id}</p>
    </article>
  );
}
