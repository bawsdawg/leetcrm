import { TeamCapacityWatchCard } from "@/components/team/team-capacity-watch-card";
import { TeamDeptOverview } from "@/components/team/team-dept-overview";
import { TeamHubLinksCard } from "@/components/team/team-hub-links-card";
import { TeamPageHeader } from "@/components/team/team-page-header";
import { TeamRosterDirectory } from "@/components/team/team-roster-directory";
import { TeamSummaryStrip } from "@/components/team/team-summary-strip";
import { shellMainStudio } from "@/config/shell";
import { DEPARTMENTS } from "@/lib/crm/static-data";
import { teamDeptSnapshots, teamOverviewKpis } from "@/lib/crm/team-utils";
import { buildTeamWorkloadRows } from "@/lib/crm/workload-utils";
import { cn } from "@/lib/utils";

export const metadata = { title: "Team · 1337-crm by Searchmind" };

/** @param {{ searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined> }} props */
export default async function TeamPage({ searchParams }) {
  const sp = await Promise.resolve(searchParams ?? {});
  const deptRaw = typeof sp.dept === "string" ? sp.dept : Array.isArray(sp.dept) ? sp.dept[0] : undefined;
  const validDept = DEPARTMENTS.some((d) => d.id === deptRaw) ? deptRaw : undefined;

  const kpis = teamOverviewKpis();
  const snapshots = teamDeptSnapshots();
  const teamRows = buildTeamWorkloadRows();

  return (
    <main className={cn(shellMainStudio)}>
      <TeamPageHeader />

      <TeamSummaryStrip {...kpis} />

      <p className="font-sans text-[11px] text-fg-quiet">
        Rækker med lyse baggrunde: <span className="font-semibold text-agency-brand">dit kort</span> (fra{" "}
        <span className="font-mono">isMe</span>) ·{" "}
        <span className="font-semibold text-agency-bad">rød tone</span> ved overskredne opgaver på medarbejderen.
      </p>

      <TeamDeptOverview snapshots={snapshots} />

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-2 lg:items-start">
        <TeamHubLinksCard />
        <TeamCapacityWatchCard teamRows={teamRows} />
      </div>

      <TeamRosterDirectory
        key={validDept ?? "all"}
        teamRows={teamRows}
        initialDeptId={validDept}
      />

      <p className="font-sans text-[12px] text-fg-quiet">
        Roster i <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> (
        <code className="font-mono text-[11px] text-fg-muted">TEAM</code>) — belægning fra{" "}
        <code className="font-mono text-[11px] text-fg-muted">TASKS</code> som i Workload. Synk til{" "}
        <code className="font-mono text-[11px] text-fg-muted">TeamMember</code> + Auth ved go-live.
      </p>
    </main>
  );
}
