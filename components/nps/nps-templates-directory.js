"use client";

import { useState } from "react";

import { PulseIconChevronDown, PulseIconChevronRight } from "@/components/pulse/pulse-icons";
import { NPS_TEMPLATES } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

/**
 * @param {{ headingId?: string }} props
 */
export function NpsTemplatesDirectory({ headingId = "nps-templates-heading" }) {
  const [openId, setOpenId] = useState(/** @type {string | null} */ ("default"));

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-inset-card">
      <div className="flex flex-col gap-3 border-b border-border px-3 py-3 md:flex-row md:items-center md:justify-between md:px-4">
        <div>
          <h2 id={headingId} className="font-sans text-sm font-semibold text-fg">
            E-mailskabeloner
          </h2>
          <p className="mt-1 max-w-xl font-sans text-[11px] text-fg-muted">
            Variabler{" "}
            <code className="font-mono text-[10px] text-fg-quiet">
              {'{{firstName}}'}, {'{{accountManager}}'}
            </code>{" "}
            — sendes fra Resend-integration (demo).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-fg-muted">
            3 varianter
          </span>
          <button
            type="button"
            disabled
            className="inline-flex h-8 cursor-not-allowed items-center rounded-md border border-border bg-surface-muted px-3 font-sans text-[11px] font-medium text-fg-quiet opacity-60"
            title="Demo — opret variant i produktion"
          >
            Ny skabelon +
          </button>
        </div>
      </div>

      <ul className="divide-y divide-border-soft">
        {NPS_TEMPLATES.map((t) => {
          const isOpen = openId === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : t.id)}
                className={cn(
                  "flex w-full items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-surface-muted md:px-4 md:py-3.5",
                  isOpen && "bg-agency-brand-soft/15",
                )}
              >
                <span className="mt-1 shrink-0 text-fg-quiet">
                  {isOpen ? <PulseIconChevronDown size={14} /> : <PulseIconChevronRight size={14} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-sans text-[13px] font-semibold text-fg">{t.name}</span>
                    <span className="font-mono text-[10px] text-fg-muted">{t.id}</span>
                  </div>
                  <p className="mt-0.5 font-sans text-[12px] text-fg-muted">{t.subject}</p>
                  {isOpen ? (
                    <pre className="mt-3 max-h-[240px] overflow-auto rounded-xl border border-border-soft bg-[#070707] p-3 font-mono text-[11px] leading-relaxed text-fg-muted whitespace-pre-wrap">
                      {t.body}
                    </pre>
                  ) : null}
                  {isOpen ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled
                        className="rounded-md border border-agency-brand-border bg-agency-brand-soft px-3 py-1 font-sans text-[11px] font-medium text-agency-brand opacity-70"
                      >
                        Send test (demo-låst)
                      </button>
                      <button
                        type="button"
                        disabled
                        className="rounded-md border border-border bg-surface-muted px-3 py-1 font-sans text-[11px] text-fg-muted opacity-70"
                      >
                        Kopiér HTML
                      </button>
                    </div>
                  ) : null}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
