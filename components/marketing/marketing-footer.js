import Link from "next/link";

import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto border-t border-[rgba(214,235,253,0.12)] py-12",
        shellPaddingX,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row sm:gap-4">
        <p className="text-center font-sans text-[0.75rem] tracking-tight text-[#464a4d] sm:text-left">
          © {year} {site.branding}
        </p>
        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center justify-center gap-8 font-sans text-xs text-[#a1a4a5]"
        >
          <Link className="transition hover:text-[#f0f0f0]" href={routes.privacy}>
            Privacy
          </Link>
          <Link className="transition hover:text-[#f0f0f0]" href={routes.terms}>
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
