"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { routes } from "@/config/routes";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: routes.privacy, label: "Privacy" },
  { href: routes.terms, label: "Terms" },
];

function NavLink({ href, label }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border px-2.5 py-1.5 text-xs transition md:text-sm",
        active
          ? "border-[rgba(214,235,253,0.19)] bg-white/[0.06] text-[#f0f0f0]"
          : "border-transparent text-[#a1a4a5] hover:border-[rgba(214,235,253,0.08)] hover:bg-white/[0.04] hover:text-[#f0f0f0]",
      )}
    >
      {label}
    </Link>
  );
}

function DrawerNavLink({ href, label, onNavigate }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "-mx-1 flex rounded-xl border px-4 py-3.5 text-base font-medium transition",
        active
          ? "border-[rgba(214,235,253,0.19)] bg-white/[0.06] text-[#f0f0f0]"
          : "border-transparent text-[#a1a4a5] hover:border-[rgba(214,235,253,0.12)] hover:bg-white/[0.04] hover:text-[#f0f0f0]",
      )}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

function NavDivider() {
  return (
    <span
      className="hidden h-6 w-px shrink-0 self-center bg-[rgba(214,235,253,0.19)] md:block"
      aria-hidden
    />
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg
      className="h-5 w-5 text-[#f0f0f0]"
      aria-hidden
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.85"
      stroke="currentColor"
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function SiteNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerCloseRef = useRef(null);

  const { status } = useSession();

  const isAuthed = status === "authenticated";

  const close = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus?.();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, close]);

  return (
    <div className="relative flex min-w-0 flex-1 items-center justify-end">
      <nav
        className="hidden min-w-0 flex-1 flex-row flex-nowrap items-center justify-end gap-x-3 md:flex lg:gap-x-3"
        aria-label="Main navigation"
      >
        <div className="flex flex-nowrap items-center gap-2 lg:gap-3">
          {primaryLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </div>

        {status === "loading" ? (
          <span
            className="h-9 w-[8.75rem] shrink-0 animate-pulse rounded-full bg-[rgba(214,235,253,0.07)]"
            aria-hidden
          />
        ) : null}

        {!isAuthed && status !== "loading" ? (
          <>
            <NavDivider />
            <NavLink href={routes.login} label="Log in" />
          </>
        ) : null}

        {isAuthed ? (
          <>
            <NavDivider />
            <div className="flex flex-nowrap items-center gap-2 lg:gap-3">
              <NavLink href={routes.dashboard} label="Dashboard" />
              <NavLink href={routes.settings} label="Settings" />
            </div>
            <NavDivider />
            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-transparent px-3 py-1.5 text-sm text-[#a1a4a5] hover:bg-white/[0.04] hover:text-[#f0f0f0]"
              onClick={() => signOut({ callbackUrl: routes.home })}
            >
              Sign out
            </button>
          </>
        ) : null}
      </nav>

      <div className="flex flex-1 items-center justify-end md:hidden">
        {status === "loading" ? (
          <span
            className="h-10 w-[7.25rem] shrink-0 animate-pulse rounded-full bg-[rgba(214,235,253,0.07)]"
            aria-hidden
          />
        ) : (
          <button
            type="button"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,235,253,0.19)] bg-white/[0.04] hover:bg-white/[0.07]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0081fd]",
            )}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <HamburgerIcon open={drawerOpen} />
          </button>
        )}
      </div>

      {drawerOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex min-h-0 flex-col bg-black text-[#f0f0f0] md:hidden"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              style={{
                minHeight: "100dvh",
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
                paddingLeft: "env(safe-area-inset-left)",
                paddingRight: "env(safe-area-inset-right)",
              }}
            >
              <div
                className={cn(
                  "flex shrink-0 items-center justify-between border-b border-[rgba(214,235,253,0.19)] py-4",
                  shellPaddingX,
                )}
              >
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.08em] text-[#464a4d]">
                  Menu
                </span>
                <button
                  ref={drawerCloseRef}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[#a1a4a5] hover:bg-white/[0.06] hover:text-[#f0f0f0]"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.85"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav
                className={cn(
                  "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain font-sans",
                  shellPaddingX,
                  "py-6",
                )}
                aria-label="Mobile navigation"
              >
                {primaryLinks.map(({ href, label }) => (
                  <DrawerNavLink key={href} href={href} label={label} onNavigate={close} />
                ))}

                {!isAuthed && status !== "loading" ? (
                  <DrawerNavLink href={routes.login} label="Log in" onNavigate={close} />
                ) : null}

                {isAuthed ? (
                  <>
                    <DrawerNavLink href={routes.dashboard} label="Dashboard" onNavigate={close} />
                    <DrawerNavLink href={routes.settings} label="Settings" onNavigate={close} />
                    <button
                      type="button"
                      className="-mx-1 mt-2 flex w-full rounded-xl border border-[rgba(214,235,253,0.15)] px-4 py-3.5 text-left text-base font-medium text-[#a1a4a5] hover:bg-white/[0.04] hover:text-[#f0f0f0]"
                      onClick={() => {
                        close();
                        void signOut({ callbackUrl: routes.home });
                      }}
                    >
                      Sign out
                    </button>
                  </>
                ) : null}
              </nav>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
