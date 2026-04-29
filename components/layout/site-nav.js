"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: routes.privacy, label: "Privacy" },
  { href: routes.terms, label: "Terms" },
];

const appLinks = [
  { href: routes.dashboard, label: "Dashboard" },
  { href: routes.settings, label: "Settings" },
];

const authLinks = [
  { href: routes.login, label: "Log in" },
  { href: routes.signUp, label: "Sign up" },
];

function NavLink({ href, label }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition",
        active
          ? "border border-[rgba(214,235,253,0.19)] bg-white/[0.06] text-[#f0f0f0]"
          : "border border-transparent text-[#a1a4a5] hover:bg-white/[0.04] hover:text-[#f0f0f0]",
      )}
    >
      {label}
    </Link>
  );
}

export function SiteNav() {
  return (
    <nav
      className="flex max-w-[100vw] flex-1 items-center justify-end gap-1 overflow-x-auto pb-0.5 sm:gap-2"
      aria-label="Main navigation"
    >
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {primaryLinks.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </div>
      <span className="hidden h-4 w-px shrink-0 bg-[rgba(214,235,253,0.19)] sm:block" aria-hidden />
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {appLinks.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </div>
      <span className="hidden h-4 w-px shrink-0 bg-[rgba(214,235,253,0.19)] sm:block" aria-hidden />
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {authLinks.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </div>
    </nav>
  );
}
