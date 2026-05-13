import Link from "next/link";

import { IconClock } from "@/components/crm/icons";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/**
 * @param {{ onClose?: (() => void) | null; closeLabel?: string }} props
 */
export function TimeTrackPageHeader({ onClose = null, closeLabel = "Luk" }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 md:flex-1">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            <IconClock size={14} className="text-agency-brand" aria-hidden />
            Stopur · kunde & opgave
          </p>
          <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">Timer</h1>
          <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
            Ét aktivt stopur pr. bruger. Ved gem oprettes en{" "}
            <code className="font-mono text-[11px] text-fg-quiet">TimeEntry</code> med{" "}
            <code className="font-mono text-[11px] text-fg-quiet">source: &quot;timer&quot;</code>. Se også{" "}
            <Link href={routes.time} className="font-medium text-agency-brand hover:underline">
              tidsliste
            </Link>
            .
          </p>
        </div>
        {onClose ? (
          <div className="flex shrink-0 md:justify-end md:pt-1">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "rounded-md border border-transparent px-2.5 py-1.5 font-sans text-[12px] font-medium text-fg-muted",
                "transition-colors hover:border-border hover:bg-surface-muted hover:text-fg",
              )}
            >
              {closeLabel}
            </button>
          </div>
        ) : null}
      </header>
    </div>
  );
}
