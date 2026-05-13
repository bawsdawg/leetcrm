import { cn } from "@/lib/utils";

const MAP_AGENCY = {
  todo: "border-border bg-surface-muted text-fg-muted",
  doing: "border-agency-brand-border bg-agency-brand-soft text-agency-brand",
  review: "border-agency-warn-border bg-agency-warn-soft text-agency-warn",
  done: "border-agency-ok-border bg-agency-ok-soft text-agency-ok",
  blocked: "border-agency-bad-border bg-agency-bad-soft text-agency-bad",
};

const LABEL = {
  todo: "Afventer",
  doing: "Igangsat",
  review: "Review",
  done: "Færdig",
  blocked: "Blokeret",
};

/**
 * @param {{
 *   status: 'todo' | 'doing' | 'review' | 'done' | 'blocked';
 *   className?: string;
 * }} props
 */
export function TaskStatusChip({ status, className }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 font-sans text-[11px] font-medium",
        MAP_AGENCY[status] ?? MAP_AGENCY.todo,
        className,
      )}
    >
      {LABEL[status] ?? status}
    </span>
  );
}
