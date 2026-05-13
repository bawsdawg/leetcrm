import Link from "next/link";

import { routes } from "@/config/routes";

export function UsersRbacCard() {
  return (
    <section className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Roller (mock)</h2>
      <p className="mt-2 font-sans text-[12px] leading-snug text-fg-muted">
        Platform-roller i demo er <span className="font-mono text-[11px] text-fg-quiet">admin · lead · finance · member · readonly</span>{" "}
        — mappes senere til <span className="font-mono text-[11px] text-fg-quiet">User.caps</span> og{" "}
        <span className="font-mono text-[11px] text-fg-quiet">accessTier</span>.
      </p>
      <ul className="mt-4 space-y-2 font-sans text-[12px] text-fg-muted">
        <li>
          <span className="font-semibold text-fg">Administrator</span> — fuld workspace + brugerprovisionering.
        </li>
        <li>
          <span className="font-semibold text-fg">Lead</span> — disciplinansvar, godkendelser (planlagt).
        </li>
        <li>
          <span className="font-semibold text-fg">Økonomi</span> — kontrakt & margin visninger.
        </li>
        <li>
          <span className="font-semibold text-fg">Kun læsning</span> — partner/intern uden skriveadgang.
        </li>
      </ul>
      <p className="mt-4 border-t border-border-soft pt-3 font-sans text-[11px] text-fg-muted">
        <Link href={routes.kb} className="font-medium text-agency-brand hover:underline">
          Knowledge base
        </Link>{" "}
        ·{" "}
        <Link href={routes.team} className="font-medium text-agency-brand hover:underline">
          Team-roster
        </Link>
      </p>
    </section>
  );
}
