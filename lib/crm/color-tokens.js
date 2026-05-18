/**
 * Design-system farve-tokens til afdelinger m.m.
 * Værdier matcher Tailwind (`bg-agency-dep-seo`) og CSS-variabler i `globals.css`.
 */

/** @typedef {{ value: string; label: string; cssVar: string; sample: string }} ColorTokenPreset */

/** Eksempelfarve (dark theme) til visning når CSS ikke er tilgængelig */
export const PRESET_COLOR_TOKENS = /** @type {ColorTokenPreset[]} */ ([
  { value: "agency-brand", label: "Brand", cssVar: "--agency-brand", sample: "oklch(72% 0.19 272)" },
  { value: "agency-ok", label: "OK / grøn", cssVar: "--agency-ok", sample: "oklch(72% 0.14 155)" },
  { value: "agency-warn", label: "Advarsel", cssVar: "--agency-warn", sample: "oklch(78% 0.15 75)" },
  { value: "agency-bad", label: "Kritisk", cssVar: "--agency-bad", sample: "oklch(68% 0.19 25)" },
  { value: "agency-dep-seo", label: "Afdeling · SEO", cssVar: "--agency-dep-seo", sample: "oklch(62% 0.16 255)" },
  { value: "agency-dep-ppc", label: "Afdeling · PPC", cssVar: "--agency-dep-ppc", sample: "oklch(62% 0.16 320)" },
  { value: "agency-dep-social", label: "Afdeling · Social", cssVar: "--agency-dep-social", sample: "oklch(62% 0.16 30)" },
  { value: "agency-dep-email", label: "Afdeling · E-mail", cssVar: "--agency-dep-email", sample: "oklch(62% 0.16 180)" },
  { value: "agency-dep-geo", label: "Afdeling · GEO", cssVar: "--agency-dep-geo", sample: "oklch(62% 0.16 135)" },
  { value: "agency-dep-creative", label: "Afdeling · Kreativ", cssVar: "--agency-dep-creative", sample: "oklch(62% 0.16 355)" },
  { value: "agency-dep-content", label: "Afdeling · Content", cssVar: "--agency-dep-content", sample: "oklch(62% 0.16 85)" },
  { value: "accent-blue", label: "Accent · blå", cssVar: "--ds-accent-blue", sample: "#3b9eff" },
  { value: "accent-green", label: "Accent · grøn", cssVar: "--ds-accent-green", sample: "#11ff99" },
  { value: "accent-orange", label: "Accent · orange", cssVar: "--ds-accent-orange", sample: "#ffa057" },
  { value: "accent-gold", label: "Accent · guld", cssVar: "--ds-accent-gold", sample: "#ffc53d" },
  { value: "accent", label: "Accent (primær)", cssVar: "--ds-accent", sample: "#0081fd" },
]);

export const CUSTOM_COLOR_TOKEN_VALUE = "__custom__";

const PRESET_BY_VALUE = Object.fromEntries(PRESET_COLOR_TOKENS.map((p) => [p.value, p]));

export function isPresetColorToken(value) {
  return Boolean(value && PRESET_BY_VALUE[String(value)]);
}

export function getPresetColorToken(value) {
  return PRESET_BY_VALUE[String(value)] ?? null;
}

/**
 * Resolve display color for swatches (client: computed CSS var; fallback: sample).
 * @param {string | null | undefined} token
 */
export function resolveColorTokenCss(token) {
  if (!token) return null;
  const s = String(token).trim();
  if (!s) return null;
  if (s.startsWith("#") || s.startsWith("rgb") || s.startsWith("oklch")) return s;
  const preset = getPresetColorToken(s);
  if (typeof window !== "undefined" && preset?.cssVar) {
    const computed = getComputedStyle(document.documentElement).getPropertyValue(preset.cssVar).trim();
    if (computed) return computed;
  }
  return preset?.sample ?? null;
}

/** Label for tables: `agency-dep-seo · oklch(...)` */
export function formatColorTokenLabel(token) {
  if (!token) return "—";
  const s = String(token);
  const preset = getPresetColorToken(s);
  if (preset) return `${preset.value} · ${preset.sample}`;
  return s.startsWith("#") ? s : `${s} (egen)`;
}
