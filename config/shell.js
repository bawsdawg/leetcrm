import { cn } from "@/lib/utils";

/** Shared horizontal gutters — DESIGN.md §5 / Apex shell */
export const shellPaddingX = "px-6 md:px-10";

/** Sticky header row: ~52px topbar alignment (DESIGN.md §10.6 Agency OS shell) */
export const shellHeaderInner = cn(
  shellPaddingX,
  "flex min-h-[52px] w-full max-w-none flex-row items-center justify-between gap-4 md:gap-6",
);

/**
 * Dashboard / studio `<main>` — padding + stack gap driven by `data-density` (DESIGN §10.6).
 * Variables: `--ds-studio-pad-main`, `--ds-studio-pad-main-md`, `--ds-studio-stack` in `globals.css`.
 */
export const shellMainStudio = cn(
  "flex min-h-0 flex-1 flex-col gap-[length:var(--ds-studio-stack)] p-[length:var(--ds-studio-pad-main)] md:p-[length:var(--ds-studio-pad-main-md)]",
);
