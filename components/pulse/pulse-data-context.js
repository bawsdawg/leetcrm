"use client";

import { createContext, useContext } from "react";

/** @type {import('react').Context<import('@/lib/crm/pulse-types').PulseBundle | null>} */
const PulseDataContext = createContext(null);

/**
 * @param {{
 *   data: import('@/lib/crm/pulse-types').PulseBundle;
 *   children: import('react').ReactNode;
 * }} props
 */
export function PulseDataProvider({ data, children }) {
  return <PulseDataContext.Provider value={data}>{children}</PulseDataContext.Provider>;
}

/** @returns {import('@/lib/crm/pulse-types').PulseBundle} */
export function usePulseData() {
  const ctx = useContext(PulseDataContext);
  if (!ctx) {
    throw new Error("usePulseData must be used within PulseDataProvider");
  }
  return ctx;
}

/** @returns {import('@/lib/crm/pulse-types').PulseBundle | null} */
export function usePulseDataOptional() {
  return useContext(PulseDataContext);
}
