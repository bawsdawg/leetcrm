"use client";

import Link from "next/link";

import { routes } from "@/config/routes";
import { CRM_NAV_GROUPS, CRM_NAV_ITEMS } from "@/lib/crm/nav-config";
import { CLIENTS } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

import { CrmNavIcon, IconMenu, IconMenuL, IconSettings } from "./icons";

function isNavActive(pathname, href) {
  if (pathname === href) return true;
  if (href !== routes.pulse && pathname.startsWith(`${href}/`)) return true;
  return false;
}

/**
 * @param {object} props
 * @param {string} props.pathname
 * @param {boolean} props.collapsed
 * @param {() => void} props.onToggleCollapsed
 * @param {string} [props.className]
 * @param {() => void} [props.onNavigate]
 */
export function CrmSidebar({
  pathname,
  collapsed,
  onToggleCollapsed,
  className,
  onNavigate,
}) {
  const clientCount = CLIENTS.length;
  const w = collapsed ? 56 : 220;

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-border bg-surface-muted/30",
        className,
      )}
      style={{ width: w, transition: "width 0.18s cubic-bezier(0.2, 0.7, 0.2, 1)" }}
    >
      <div
        className={cn(
          "flex h-[52px] shrink-0 items-center border-b border-border",
          collapsed ? "justify-center px-0" : "justify-between gap-2 px-3",
        )}
      >
        <Link
          href={routes.pulse}
          className={cn(
            "flex min-w-0 items-center gap-2",
            collapsed ? "justify-center" : "flex-1",
          )}
          onClick={onNavigate}
        >
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-accent text-[13px] font-bold text-solid-cta-fg">
            S
          </span>
          {!collapsed ? (
            <span className="min-w-0">
              <span className="block truncate font-sans text-[13px] font-semibold leading-tight tracking-tight text-fg">
                Searchmind
              </span>
              <span className="block truncate font-sans text-[10.5px] leading-tight text-fg-quiet">
                Agency OS
              </span>
            </span>
          ) : null}
        </Link>
        {!collapsed ? (
          <button
            type="button"
            className={cn(
              "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md",
              "border border-transparent text-fg-muted hover:bg-surface-active hover:text-fg",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
            onClick={onToggleCollapsed}
            aria-label="Skjul sidebar"
          >
            <IconMenuL size={14} />
          </button>
        ) : null}
      </div>

      {collapsed ? (
        <button
          type="button"
          className="mx-auto mt-2 flex h-[30px] w-[30px] items-center justify-center rounded-md text-fg-muted hover:bg-surface-active hover:text-fg"
          onClick={onToggleCollapsed}
          aria-label="Vis sidebar"
        >
          <IconMenu size={14} />
        </button>
      ) : null}

      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2" aria-label="Workspace">
        {CRM_NAV_GROUPS.map((group) => (
          <div key={group.id} className="py-1">
            {!collapsed ? (
              <div className="px-2.5 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
                {group.label}
              </div>
            ) : null}
            {CRM_NAV_ITEMS.filter((i) => i.group === group.id).map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "mb-0.5 flex h-[30px] items-center gap-2.5 rounded-md border font-sans text-[13px] transition-colors",
                    collapsed ? "justify-center px-0" : "px-2.5",
                    active
                      ? "border-border bg-surface-active font-medium text-fg shadow-inset-card"
                      : "border-transparent font-normal text-fg-muted hover:bg-surface-muted hover:text-fg",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex shrink-0",
                      active ? "text-accent" : "text-fg-quiet",
                    )}
                  >
                    <CrmNavIcon navId={item.id} size={15} />
                  </span>
                  {!collapsed ? <span className="truncate">{item.label}</span> : null}
                  {!collapsed && item.badge === "clients" ? (
                    <span className="ml-auto font-mono text-[11px] tabular-nums text-fg-quiet">
                      {clientCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-border pb-3 pt-2",
          collapsed ? "flex flex-col items-center px-1" : "px-2.5",
        )}
      >
        <Link
          href={routes.settings}
          onClick={onNavigate}
          className={cn(
            "flex w-full items-center gap-2 rounded-md py-1.5 text-[12px] text-fg-muted hover:bg-surface-muted hover:text-fg",
            collapsed ? "justify-center" : "px-1",
          )}
        >
          <IconSettings className="text-fg-quiet" size={16} />
          {!collapsed ? <span>Indstillinger</span> : null}
        </Link>
      </div>
    </aside>
  );
}
