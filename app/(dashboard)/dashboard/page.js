import { auth } from "@/auth";
import { shellMainStudio } from "@/config/shell";
import { ACCESS_TIERS } from "@/lib/constants/access-tiers";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard · 1337-crm by Searchmind" };

/** @param {string} tier */
function formatTierLabel(tier) {
  if (tier === ACCESS_TIERS.EXTERNAL_LIMITED) return "External (limited)";
  if (tier === ACCESS_TIERS.INTERNAL_FULL) return "Internal (full)";
  return tier ?? "—";
}

export default async function DashboardPage() {
  const session = await auth();

  const email =
    typeof session?.user?.email === "string" ? session.user.email : "Signed in";

  const accessTier =
    typeof session?.user?.accessTier === "string"
      ? session.user.accessTier
      : ACCESS_TIERS.INTERNAL_FULL;

  return (
    <main className={cn(shellMainStudio)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-fg">Dashboard</h1>
        <p className="max-w-prose font-sans text-sm text-fg-muted">
          Authenticated workspace — extend with KPIs, jobs, alerts, or product data.
        </p>
      </div>

      <section
        className="max-w-lg rounded-2xl border border-border bg-surface-card p-6 font-sans text-sm leading-relaxed shadow-inset-card"
        aria-label="Signed-in profile"
      >
        <dl className="grid gap-3">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-soft">
              Signed in as
            </dt>
            <dd className="mt-1 text-fg">{email}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-soft">
              Access tier
            </dt>
            <dd className="mt-1 text-fg-muted">{formatTierLabel(accessTier)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-soft">
              User ID
            </dt>
            <dd className="mt-1 break-all font-mono text-[11px] tabular-nums tracking-tight text-fg-quiet">
              {typeof session?.user?.id === "string" ? session.user.id : "—"}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
