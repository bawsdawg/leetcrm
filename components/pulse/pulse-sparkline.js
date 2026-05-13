import { cn } from "@/lib/utils";

/**
 * Tiny SVG sparkline — DESIGN-SEARCHMINDOS `<Sparkline>`.
 * @param {{ data: number[]; className?: string; height?: number }} props
 */
export function PulseSparkline({ data, className, height = 32 }) {
  if (!data?.length) return null;

  const w = 140;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = max === min ? Math.abs(min) * 0.05 || 1 : (max - min) * 0.08;
  const lo = min - pad;
  const hi = max + pad;

  const pts = data.map((v, i) => {
    const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
    const y = h - ((v - lo) / (hi - lo)) * (h - 4) - 2;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const line = `M ${pts.join(" L ")}`;
  const area = `${line} L ${w},${h} L 0,${h} Z`;

  return (
    <svg
      className={cn("w-full max-w-[160px]", className)}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={area} fill="currentColor" opacity={0.12} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
