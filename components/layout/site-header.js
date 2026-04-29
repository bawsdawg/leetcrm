import Link from "next/link";

import { routes } from "@/config/routes";
import { site } from "@/config/site";

import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[rgba(214,235,253,0.19)] bg-black/85 backdrop-blur-md [box-shadow:rgba(176,199,217,0.08)_0px_0px_0px_1px_inset]"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href={routes.home}
          className="shrink-0 text-sm font-medium tracking-tight text-[#f0f0f0]"
        >
          {site.name}
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
