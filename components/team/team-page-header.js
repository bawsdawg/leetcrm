import { IconUsers } from "@/components/crm/icons";
import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { TEAM } from "@/lib/crm/static-data";
import { TASK_DEMO_REF_DATE, TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";

export function TeamPageHeader() {
  const meName = TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? "Medarbejder";

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            <IconUsers size={14} className="text-agency-brand" aria-hidden />
            Roster & discipliner
          </p>
          <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">Team</h1>
          <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
            Komplet bureauhold med afdeling, kontrakteret tid og profiler koblet til åbne opgaver — mock-data i{" "}
            <code className="font-mono text-[11px] text-fg-quiet">TEAM</code> (udskiftes med Mongo{" "}
            <code className="font-mono text-[11px] text-fg-quiet">TeamMember</code> + evt. Auth-link).
            {" "}
            Du vises som{" "}
            <span className="font-semibold text-fg">{meName}</span>. Ref.{" "}
            <span className="font-mono tabular-nums text-fg-quiet">{TASK_DEMO_REF_DATE}</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-[26px] items-center gap-1.5 rounded-md border border-border bg-surface-muted px-3 font-sans text-[11px] font-medium text-fg-muted transition-colors hover:border-agency-brand-border hover:bg-agency-brand-soft hover:text-agency-brand"
          >
            <PulseIconDownload size={12} /> Eksport
          </button>
          <button
            type="button"
            className="inline-flex h-[26px] items-center rounded-md border border-agency-brand-border bg-agency-brand-soft px-3 font-sans text-[11px] font-medium text-agency-brand transition-colors hover:bg-agency-brand/15"
          >
            Inviter
          </button>
        </div>
      </header>
    </div>
  );
}
