import Link from "next/link";

import { routes } from "@/config/routes";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-0 flex-1 bg-black">
      <aside
        className={cn(
          "hidden w-56 shrink-0 flex-col gap-6 border-r border-[rgba(214,235,253,0.19)] md:flex",
          shellPaddingX,
          "py-6 md:py-8",
        )}
      >
        <nav className="flex flex-col gap-2 text-sm" aria-label="App sidebar">
          <Link className="text-[#a1a4a5] hover:text-[#f0f0f0]" href={routes.dashboard}>
            Overview
          </Link>
          <Link className="text-[#a1a4a5] hover:text-[#f0f0f0]" href={routes.settings}>
            Settings
          </Link>
        </nav>
      </aside>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
