import { CrmAvatar } from "@/components/crm/crm-avatar";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

/**
 * @param {{ member?: { id: string; name: string; role: string; avatar: string; hue: number; dept: string } | null }} props
 */
export function TaskDetailAssigneeCard({ member }) {
  const dep = member ? DEPARTMENTS.find((d) => d.id === member.dept) : null;

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Ansvarlig</h2>
      <p className="mt-2 font-sans text-[11px] leading-snug text-fg-muted">Tildeling fra mock-board — erstattes med capacity + rolle-matrix.</p>
      {member ? (
        <div className={cn("mt-4 flex items-start gap-3 border-t border-border-soft pt-4")}>
          <CrmAvatar label={member.avatar} hue={member.hue} className="size-12 text-[13px]" />
          <div className="min-w-0">
            <p className="font-sans text-[14px] font-semibold text-fg">{member.name}</p>
            <p className="mt-0.5 font-sans text-[12px] text-fg-muted">{member.role}</p>
            <p className="mt-2 font-mono text-[11px] text-fg-soft">
              Desk: <span style={{ color: dep?.color }}>{dep?.short ?? member.dept.toUpperCase()}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-surface-muted/30 px-3 py-5 text-[13px] text-fg-muted">
          Ingen `assigneeId` match i <span className="font-mono">TEAM</span> — tjek mock-data.
        </p>
      )}
    </div>
  );
}
