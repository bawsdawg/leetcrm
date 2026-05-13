"use client";

import { useEffect, useRef } from "react";

import { TimeTrackPageHeader } from "@/components/time/time-track-page-header";
import { TimeTrackRunner } from "@/components/time/time-track-runner";
import { cn } from "@/lib/utils";

import { useTimerModal } from "./timer-modal-context";

export function CrmTimerModal() {
  const { open, closeTimer } = useTimerModal();
  const ref = useRef(/** @type {HTMLDialogElement | null} */ (null));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-[120] w-[min(100vw-1.5rem,640px)] max-w-full -translate-x-1/2 -translate-y-1/2",
        "max-h-[min(92vh,920px)] overflow-hidden rounded-2xl border border-border bg-surface-card p-0 shadow-xl",
        "backdrop:bg-canvas/80 backdrop:backdrop-blur-[2px]",
      )}
      aria-label="Timer"
      onClose={closeTimer}
    >
      <div className="flex max-h-[min(92vh,920px)] flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-5 md:px-6 md:pb-8 md:pt-6">
          <TimeTrackPageHeader onClose={closeTimer} />
          <TimeTrackRunner />
        </div>
      </div>
    </dialog>
  );
}
