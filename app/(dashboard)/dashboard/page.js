import { auth } from "@/auth";
import { ACCESS_TIERS } from "@/lib/constants/access-tiers";

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
    <main className="flex flex-1 flex-col gap-6 p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#f0f0f0]">Dashboard</h1>
        <p className="max-w-prose font-sans text-sm text-[#a1a4a5]">
          Authenticated workspace — extend with KPIs, jobs, alerts, or product data.
        </p>
      </div>

      <section
        className="max-w-lg rounded-2xl border border-[rgba(214,235,253,0.19)] bg-black/40 p-6 font-sans text-sm leading-relaxed [box-shadow:rgba(176,199,217,0.085)_0px_0px_0px_1px]"
        aria-label="Signed-in profile"
      >
        <dl className="grid gap-3">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#464a4d]">
              Signed in as
            </dt>
            <dd className="mt-1 text-[#f0f0f0]">{email}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#464a4d]">
              Access tier
            </dt>
            <dd className="mt-1 text-[#a1a4a5]">{formatTierLabel(accessTier)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#464a4d]">
              User ID
            </dt>
            <dd className="mt-1 break-all text-[11px] text-[#494949]">
              {typeof session?.user?.id === "string" ? session.user.id : "—"}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
