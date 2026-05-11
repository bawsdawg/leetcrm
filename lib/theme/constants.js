/** Persisted appearance — synced with `<html>` in `theme-init-script`. */

export const THEME_STORAGE_KEY = "apex-theme";

/** @typedef {"dark" | "light"} ThemeId */
export const THEMES = /** @type {const} */ (["dark", "light"]);

/** DESIGN.md §10 — density modes for dashboard / CRM surfaces */

export const DENSITY_STORAGE_KEY = "apex-density";

/** @typedef {"compact" | "spacious"} DensityId */
export const DENSITY_MODES = /** @type {const} */ (["compact", "spacious"]);
