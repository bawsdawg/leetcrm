import { notFound } from "next/navigation";

import { TeamMemberHeader } from "@/components/team/team-member-header";
import { TeamMemberKpiStrip } from "@/components/team/team-member-kpi-strip";
import { TeamMemberOpenTasksCard } from "@/components/team/team-member-open-tasks-card";
import { TeamMemberQuickLinksCard } from "@/components/team/team-member-quick-links-card";
import { shellMainStudio } from "@/config/shell";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { getOpenTasksForMember, getTeamMemberById } from "@/lib/crm/team-utils";
import { buildTeamWorkloadRows } from "@/lib/crm/workload-utils";
import { cn } from "@/lib/utils";

/** @param {{ params: Promise<{ memberId: string }> }} props */
export async function generateMetadata({ params }) {
  const { memberId } = await params;
  const member = getTeamMemberById(memberId);
  if (!member) return { title: "Team · 1337-crm by Searchmind" };
  return { title: `${member.name} · Team · 1337-crm by Searchmind` };
}

/** @param {{ params: Promise<{ memberId: string }> }} props */
export default async function TeamMemberPage({ params }) {
  const { memberId } = await params;
  const member = getTeamMemberById(memberId);
  if (!member) notFound();

  const row = buildTeamWorkloadRows().find((r) => r.member.id === memberId);
  if (!row) notFound();

  const openTasks = getOpenTasksForMember(memberId);
  const dep = DEPARTMENTS.find((d) => d.id === member.dept);

  return (
    <main className={cn(shellMainStudio)}>
      <TeamMemberHeader member={member} />

      <TeamMemberKpiStrip
        loadIndex={row.loadIndex}
        openCount={row.openCount}
        highCount={row.highCount}
        overdueCount={row.overdueCount}
      />

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-[minmax(0,1.12fr)_minmax(260px,0.88fr)] lg:items-start">
        <TeamMemberOpenTasksCard tasks={openTasks} />
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          {dep ? <TeamMemberQuickLinksCard deptId={dep.id} deptName={dep.name} /> : null}
        </div>
      </div>

      <p className="font-sans text-[12px] text-fg-quiet">
        Profilkort er read-only mock — HR-felter, ferie og budget-linjer kobles senere til People API.
      </p>
    </main>
  );
}
