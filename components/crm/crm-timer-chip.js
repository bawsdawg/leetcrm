"use client";

import { useCallback, useEffect, useState } from "react";

import { IconClock } from "@/components/crm/icons";
import { cn } from "@/lib/utils";

import { useTimerModal } from "./timer-modal-context";

/** @param {{ startedAt?: string | null }} props */
function elapsedSeconds(startedAt) {
  if (!startedAt) return 0;
  const t = new Date(startedAt).getTime();
  if (Number.isNaN(t)) return 0;
  return Math.max(0, Math.floor((Date.now() - t) / 1000));
}

function formatHms(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function CrmTimerChip() {
  const { openTimer, open: timerModalOpen } = useTimerModal();
  const [payload, setPayload] = useState(
    /** @type {{ active: Record<string, unknown> | null } | null} */ (null),
  );
  const [tick, setTick] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/timer", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "fail");
      setPayload({ active: data.active ?? null });
    } catch {
      setPayload({ active: null });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void refresh();
    });
  }, [refresh]);

  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const active = payload?.active ?? null;
  const startedAt = active && typeof active.startedAt === "string" ? active.startedAt : null;
  const secs = elapsedSeconds(startedAt);
  void tick;
  const running = Boolean(active && startedAt);

  if (loading && !payload) {
    return (
      <span className="hidden h-8 w-[108px] animate-pulse rounded-md bg-skeleton sm:inline-block" aria-hidden />
    );
  }

  return (
    <button
      type="button"
      onClick={openTimer}
      aria-haspopup="dialog"
      aria-expanded={timerModalOpen}
      className={cn(
        "hidden h-8 max-w-[240px] shrink-0 items-center gap-2 rounded-md border px-2 font-mono text-[11px] tabular-nums sm:inline-flex",
        running
          ? "border-agency-brand-border bg-agency-brand-soft text-agency-brand"
          : "border-border bg-surface-muted text-fg-muted hover:border-agency-brand-border hover:bg-agency-brand-soft/60 hover:text-agency-brand",
      )}
      title={running ? "Timer kører · åbn panelet" : "Åbn timer"}
    >
      <IconClock size={14} className="shrink-0 opacity-90" />
      {running ? (
        <>
          <span className="min-w-[52px] truncate text-left font-semibold">{formatHms(secs)}</span>
          <span className="max-w-[100px] truncate text-[10px] font-normal opacity-90">
            {typeof active.clientName === "string" ? active.clientName : "—"}
          </span>
        </>
      ) : (
        <span className="text-fg-soft">Timer</span>
      )}
    </button>
  );
}
