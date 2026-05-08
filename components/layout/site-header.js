import Link from "next/link";

import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { shellPaddingHeaderY, shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-surface-header backdrop-blur-md shadow-inset-header"
      role="banner"
    >
      <div
        className={cn(
          "flex w-full max-w-none flex-row items-center justify-between gap-4 md:gap-6",
          shellPaddingX,
          shellPaddingHeaderY,
        )}
      >
        <Link
          href={routes.home}
          className="flex w-fit shrink-0 flex-col gap-0 leading-[1.1] hover:opacity-90"
        >
          <span className="font-sans text-sm font-semibold tracking-tight text-fg sm:text-base">
            {site.name}
          </span>
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.06em] text-fg-soft sm:text-[11px]">
            {site.byline}
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
