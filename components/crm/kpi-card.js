import { cn } from "@/lib/utils";

/**
 * @param {{ label: string; value: string; hint?: string; className?: string }} props
 */
export function KpiCard({ label, value, hint, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5",
        className,
      )}
    >
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-fg-soft">
        {label}
      </p>
      <p className="mt-2 font-sans text-2xl font-semibold tabular-nums tracking-tight text-fg md:text-3xl">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 font-sans text-xs leading-relaxed text-fg-muted">{hint}</p>
      ) : null}
    </div>
  );
}
