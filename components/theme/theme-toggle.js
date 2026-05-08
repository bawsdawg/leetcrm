"use client";

import { cn } from "@/lib/utils";

import { useTheme, useThemeToggle } from "./use-theme";

const baseToggle =
  "inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted text-fg hover:bg-muted-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** @param {{ className?: string; size?: "default" | "comfortable" }} props */
export function ThemeToggle({ className, size = "default" }) {
  const theme = useTheme();
  const toggle = useThemeToggle();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={cn(
        baseToggle,
        size === "comfortable" ? "h-11 w-11" : "h-9 w-9",
        className,
      )}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark mode" : "Light mode"}
      onClick={() => toggle()}
    >
      {isLight ? <MoonGlyph className="h-4 w-4" /> : <SunGlyph className="h-4 w-4" />}
    </button>
  );
}

function SunGlyph({ className }) {
  return (
    <svg className={className} aria-hidden fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0 .5v1.75M12 5V3.25M17.657 17.657l1.239 1.239M5.104 5.104 6.34 6.344m11.319-1.239 1.24-1.24M5.096 17.096l1.239-1.24M21.25 12H19.5M4.75 12H3"
      />
    </svg>
  );
}

function MoonGlyph({ className }) {
  return (
    <svg className={className} aria-hidden fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.986 13.954a8.501 8.501 0 0 1-10.942-11.26 8.503 8.503 0 1 0 10.943 11.259Z"
      />
    </svg>
  );
}
