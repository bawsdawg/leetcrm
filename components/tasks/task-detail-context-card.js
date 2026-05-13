import Link from "next/link";

import { routes } from "@/config/routes";
import { formatCurrencyCompact } from "@/lib/crm/format-da";
import { cn } from "@/lib/utils";

/**
 * @param {{
 *   client: { id: string; name: string; industry?: string };
 *   contract: {
 *     id: string;
 *     clientId: string;
 *     clientName: string;
 *     clientLogo: string;
 *     clientHue: number;
 *     kind: string;
 *     monthlyValue: number;
 *     currency: string;
 *   };
 * }} props
 */
export function TaskDetailContextCard({ client, contract }) {
  const contractHref = `${routes.contracts}/${contract.id}`;

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Kunde & aftale</h2>
      <p className="mt-2 font-sans text-[11px] leading-snug text-fg-muted">
        Opgaven er synliggjort ud fra aftale-scope (mock). Navigér videre til kundeprofilen eller rammeaftalen.
      </p>

      <div className="mt-5 flex flex-col gap-5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-quiet">Kunde</p>
          <Link
            href={`${routes.clients}/${client.id}`}
            className="mt-1 inline-flex font-sans text-[14px] font-semibold text-fg underline-offset-4 hover:text-agency-brand hover:underline"
          >
            {client.name}
          </Link>
          {client.industry ? <p className="mt-0.5 font-sans text-[12px] text-fg-muted">{client.industry}</p> : null}
        </div>

        <div className={cn("border-t border-border-soft pt-5")}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-quiet">Primær aftale</p>
            <Link href={contractHref} className="font-sans text-[11px] font-medium text-agency-brand hover:underline">
              Åbn kontrakt →
            </Link>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10",
                "font-mono text-xs font-semibold text-white",
              )}
              style={{
                background: `linear-gradient(135deg, oklch(62% 0.15 ${contract.clientHue}), oklch(52% 0.18 ${contract.clientHue + 28}))`,
              }}
            >
              {contract.clientLogo}
            </span>
            <div className="min-w-0">
              <Link
                href={contractHref}
                className="font-sans text-[14px] font-semibold leading-snug text-fg underline-offset-4 hover:text-agency-brand hover:underline"
              >
                {contract.clientName}
              </Link>
              <p className="mt-1 font-mono text-[11px] text-fg-muted">
                {contract.kind}
                {" · "}
                <span className="tabular-nums">{formatCurrencyCompact(contract.monthlyValue, contract.currency)}/md</span>
              </p>
              <p className="mt-1 font-mono text-[10px] text-fg-quiet">{contract.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
