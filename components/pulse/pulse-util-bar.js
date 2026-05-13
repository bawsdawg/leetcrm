import { cn } from "@/lib/utils";

/**
 * @param {{
 *   hours: number;
 *   budget: number;
 *   className?: string;
 * }} props
 */
export function PulseUtilBar({ hours, budget, className }) {
  const ratio = budget > 0 ? hours / budget : 0;
  const widthPct = ratio >= 1 ? 100 : ratio * 100;
  const fill =
    ratio > 1
      ? "bg-[repeating-linear-gradient(135deg,var(--agency-bad)_0,var(--agency-bad)_3px,color-mix(in_oklch,var(--agency-bad)_45%,transparent)_3px,color-mix(in_oklch,var(--agency-bad)_45%,transparent)_6px)]"
      : ratio > 0.95
        ? "bg-agency-warn"
        : "bg-agency-ok";

  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-surface-muted-strong",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-300 ease-out", fill)}
        style={{ width: `${widthPct}%` }}
      />
    </div>
  );
}
