import { agencyDeptColor } from "@/lib/crm/dept-tokens";
import { cn } from "@/lib/utils";

/**
 * @param {{ allocation: Record<string, number>; height?: number; className?: string }} props
 */
export function PulseAllocationBar({ allocation, height = 10, className }) {
  const entries = Object.entries(allocation).filter(([, v]) => v > 0);
  if (entries.length === 0) return null;

  return (
    <div
      className={cn("flex w-full overflow-hidden rounded-full ring-1 ring-border/60", className)}
      style={{ height }}
    >
      {entries.map(([dept, pct]) => (
        <div
          key={dept}
          title={`${dept.toUpperCase()}: ${pct}%`}
          className="min-w-px shrink-0 transition-[flex-grow]"
          style={{
            width: `${pct}%`,
            backgroundColor: agencyDeptColor(dept),
          }}
        />
      ))}
    </div>
  );
}
