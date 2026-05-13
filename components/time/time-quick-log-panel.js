import { cn } from "@/lib/utils";

export function TimeQuickLogPanel() {
  return (
    <section className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div>
          <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            Hurtig log
          </h2>
          <p className="mt-1 max-w-prose font-sans text-[11px] leading-snug text-fg-muted">
            Én primær handling pr. skærm (Agency OS). Timer-widget i topbaren + manuel post — felterne er låst i
            demo.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-2 rounded-md border border-agency-brand-border bg-agency-brand px-3.5 font-sans text-[12px] font-semibold text-white transition-colors hover:bg-agency-brand/90"
          >
            <span className="relative flex size-2 rounded-full bg-white/90">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            </span>
            Start timer
          </button>
          <button
            type="button"
            className="inline-flex h-8 items-center rounded-md border border-border bg-surface-muted px-3 font-sans text-[12px] font-medium text-fg-muted transition-colors hover:border-agency-brand-border hover:bg-agency-brand-soft hover:text-agency-brand"
          >
            Manuel post
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-border-soft pt-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Kunde</span>
          <select
            disabled
            className={cn(
              "h-8 cursor-not-allowed rounded-md border border-border bg-surface-muted px-2",
              "font-sans text-[13px] text-fg-muted opacity-70",
            )}
            title="Demo — kobles til kundeliste"
          >
            <option>Vælg kunde…</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Minutter</span>
          <input
            type="text"
            disabled
            placeholder="fx 45"
            title="Demo"
            className={cn(
              "h-8 cursor-not-allowed rounded-md border border-border bg-surface-muted px-2",
              "font-mono text-[13px] text-fg-muted opacity-70",
            )}
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-soft">Note</span>
          <input
            type="text"
            disabled
            placeholder="Hvad blev der leveret?"
            title="Demo"
            className={cn(
              "h-8 cursor-not-allowed rounded-md border border-border bg-surface-muted px-2",
              "font-sans text-[13px] text-fg-muted opacity-70",
            )}
          />
        </label>
      </div>
    </section>
  );
}
