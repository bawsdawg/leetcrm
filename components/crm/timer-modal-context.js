"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/** @typedef {{ open: boolean; openTimer: () => void; closeTimer: () => void }} TimerModalContextValue */

/** @type {React.Context<TimerModalContextValue | null>} */
const TimerModalContext = createContext(null);

/**
 * Holds timer modal open state for the authenticated CRM shell.
 * @param {{ children: import("react").ReactNode }} props
 */
export function TimerModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openTimer = useCallback(() => setOpen(true), []);
  const closeTimer = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      openTimer,
      closeTimer,
    }),
    [open, openTimer, closeTimer],
  );

  return <TimerModalContext.Provider value={value}>{children}</TimerModalContext.Provider>;
}

/** @returns {TimerModalContextValue} */
export function useTimerModal() {
  const ctx = useContext(TimerModalContext);
  if (!ctx) {
    throw new Error("useTimerModal must be used within TimerModalProvider");
  }
  return ctx;
}
