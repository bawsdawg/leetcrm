"use client";

import { useSyncExternalStore } from "react";

import { DENSITY_STORAGE_KEY } from "@/lib/theme/constants";

function subscribeDensity(onStoreChange) {
  const root = document.documentElement;
  const obs = new MutationObserver(() => onStoreChange());
  obs.observe(root, { attributes: true, attributeFilter: ["data-density"] });
  window.addEventListener("storage", onStoreChange);
  return () => {
    obs.disconnect();
    window.removeEventListener("storage", onStoreChange);
  };
}

function readDensityAttr() {
  return document.documentElement.getAttribute("data-density") === "spacious"
    ? "spacious"
    : "compact";
}

function getDensitySnapshot() {
  if (typeof document === "undefined") return "compact";
  return readDensityAttr();
}

function getDensityServerSnapshot() {
  return "compact";
}

export function useDensity() {
  return useSyncExternalStore(subscribeDensity, getDensitySnapshot, getDensityServerSnapshot);
}

/** @param {"compact" | "spacious"} mode */
export function setStoredDensity(mode) {
  const resolved = mode === "spacious" ? "spacious" : "compact";
  try {
    localStorage.setItem(DENSITY_STORAGE_KEY, resolved);
  } catch {}
  document.documentElement.setAttribute("data-density", resolved);
}
