import { UsersDirectory } from "@/components/users/users-directory";
import { UsersInvitesQueueCard } from "@/components/users/users-invites-queue-card";
import { UsersPageHeader } from "@/components/users/users-page-header";
import { UsersRbacCard } from "@/components/users/users-rbac-card";
import { UsersSummaryStrip } from "@/components/users/users-summary-strip";
import { shellMainStudio } from "@/config/shell";
import { usersAgencyStats } from "@/lib/crm/users-utils";
import { cn } from "@/lib/utils";

export const metadata = { title: "Brugerstyring · 1337-crm by Searchmind" };

/** @param {{ searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined> }} props */
export default async function UsersAdminPage({ searchParams }) {
  const sp = await Promise.resolve(searchParams ?? {});
  const rawStatus =
    typeof sp.status === "string" ? sp.status : Array.isArray(sp.status) ? sp.status[0] : undefined;
  const rawRole = typeof sp.role === "string" ? sp.role : Array.isArray(sp.role) ? sp.role[0] : undefined;

  const initialStatus =
    rawStatus === "invited" || rawStatus === "active" || rawStatus === "suspended" ? rawStatus : "all";
  const initialRole =
    rawRole === "admin" ||
    rawRole === "lead" ||
    rawRole === "finance" ||
    rawRole === "member" ||
    rawRole === "readonly"
      ? rawRole
      : "all";

  const stats = usersAgencyStats();

  return (
    <main className={cn(shellMainStudio)}>
      <UsersPageHeader />

      <UsersSummaryStrip {...stats} />

      <p className="font-sans text-[11px] text-fg-quiet">
        Bruger med <span className="font-semibold text-agency-brand">lys baggrund</span> i indekset er den samme som
        demo-session (<span className="font-mono">Louise / lm</span>).
      </p>

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-2 lg:items-start">
        <UsersInvitesQueueCard />
        <UsersRbacCard />
      </div>

      <UsersDirectory key={`${initialStatus}-${initialRole}`} initialStatus={initialStatus} initialRole={initialRole} />

      <p className="font-sans text-[12px] text-fg-quiet">
        Mock i <code className="font-mono text-[11px] text-fg-muted">lib/crm/users-data.js</code> — synk til{" "}
        <code className="font-mono text-[11px] text-fg-muted">User</code> (<code className="font-mono text-[11px] text-fg-quiet">email</code>,{" "}
        <code className="font-mono text-[11px] text-fg-quiet">accessTier</code>, <code className="font-mono text-[11px] text-fg-quiet">caps</code>
        ) og SSO-provisionering.
      </p>
    </main>
  );
}
