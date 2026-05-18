"use client";

import { useSyncExternalStore } from "react";

import {
  DATA_SOURCE_DEFAULT,
  DATA_SOURCE_STORAGE_KEY,
} from "@/lib/crm/data-source-constants";

const DATA_SOURCE_EVENT = "crm-data-source-change";

function readStored() {
  if (typeof window === "undefined") return DATA_SOURCE_DEFAULT;
  try {
    const v = localStorage.getItem(DATA_SOURCE_STORAGE_KEY);
    return v === "database" ? "database" : "demo";
  } catch {
    return DATA_SOURCE_DEFAULT;
  }
}

function subscribe(onChange) {
  if (typeof window === "undefined") return () => {};
  const handler = () => onChange();
  window.addEventListener(DATA_SOURCE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(DATA_SOURCE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useDataSource() {
  return useSyncExternalStore(subscribe, readStored, () => DATA_SOURCE_DEFAULT);
}

/** @param {import('@/lib/crm/data-source-constants').DataSourceId} mode */
export function setDataSource(mode) {
  const resolved = mode === "database" ? "database" : "demo";
  try {
    localStorage.setItem(DATA_SOURCE_STORAGE_KEY, resolved);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DATA_SOURCE_EVENT));
  }
}
