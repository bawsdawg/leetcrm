"use client";

import { createContext, useContext, useMemo } from "react";

import {
  formatReportPeriodLabel,
  formatReportPeriodSubtitle,
  isCurrentReportPeriod,
} from "@/lib/crm/report-period";

/** @typedef {{ year: number; month: number; label: string; subtitle: string; isCurrent: boolean; onChange: (p: { year: number; month: number }) => void; refreshing?: boolean }} PulsePeriodContextValue */

/** @type {import('react').Context<PulsePeriodContextValue | null>} */
const PulsePeriodContext = createContext(null);

/**
 * @param {{
 *   year: number;
 *   month: number;
 *   onChange: (p: { year: number; month: number }) => void;
 *   refreshing?: boolean;
 *   children: import('react').ReactNode;
 * }} props
 */
export function PulsePeriodProvider({ year, month, onChange, refreshing = false, children }) {
  const value = useMemo(
    () => ({
      year,
      month,
      label: formatReportPeriodLabel(year, month),
      subtitle: formatReportPeriodSubtitle(year, month),
      isCurrent: isCurrentReportPeriod(year, month),
      onChange,
      refreshing,
    }),
    [year, month, onChange, refreshing],
  );

  return <PulsePeriodContext.Provider value={value}>{children}</PulsePeriodContext.Provider>;
}

/** @returns {PulsePeriodContextValue} */
export function usePulsePeriod() {
  const ctx = useContext(PulsePeriodContext);
  if (!ctx) {
    throw new Error("usePulsePeriod must be used within PulsePeriodProvider");
  }
  return ctx;
}
