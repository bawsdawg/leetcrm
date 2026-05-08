"use client";

import { useCallback, useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY } from "@/lib/theme/constants";

/** @typedef {import('@/lib/theme/constants').ThemeId} ThemeId */

function subscribe(onStoreChange) {
  const root = document.documentElement;
  const obs = new MutationObserver(() => onStoreChange());
  obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  window.addEventListener("storage", onStoreChange);
  return () => {
    obs.disconnect();
    window.removeEventListener("storage", onStoreChange);
  };
}

function readThemeAttr() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getThemeSnapshot() {
  if (typeof document === "undefined") return "dark";
  return readThemeAttr();
}

function getServerSnapshot() {
  return "dark";
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);
}

export function setStoredTheme(theme) {
  /** @type {ThemeId} */
  const resolved = theme === "light" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, resolved);
  } catch {}
  document.documentElement.setAttribute("data-theme", resolved);
}

/** @returns {() => void} */
export function useThemeToggle() {
  const theme = useTheme();

  return useCallback(() => {
    setStoredTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);
}
