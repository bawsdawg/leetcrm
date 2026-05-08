import Link from "next/link";

import { routes } from "@/config/routes";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-0 flex-1 bg-canvas">
      <aside
        className={cn(
          "hidden w-56 shrink-0 flex-col gap-6 border-r border-border md:flex",
          shellPaddingX,
          "py-6 md:py-8",
        )}
      >
        <nav className="flex flex-col gap-2 text-sm" aria-label="App sidebar">
          <Link className="text-fg-muted hover:text-fg" href={routes.dashboard}>
            Overview
          </Link>
          <Link className="text-fg-muted hover:text-fg" href={routes.settings}>
            Settings
          </Link>
        </nav>
      </aside>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
