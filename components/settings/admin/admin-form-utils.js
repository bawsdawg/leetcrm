/**
 * @param {Record<string, unknown> | null | undefined} item
 * @param {import('@/lib/crm/admin-resource-meta').AdminFieldDef[]} fields
 */
export function itemToFormValues(item, fields) {
  /** @type {Record<string, unknown>} */
  const values = {};
  for (const field of fields) {
    const v = item?.[field.name];
    if (field.type === "date" && v) {
      values[field.name] = new Date(String(v)).toISOString().slice(0, 10);
    } else if (field.type === "tags" && Array.isArray(v)) {
      values[field.name] = v.join(", ");
    } else if (field.type === "multiRelation" && Array.isArray(v)) {
      values[field.name] = v.map((id) => String(id));
    } else if (field.type === "boolean") {
      values[field.name] = Boolean(v);
    } else if (field.type === "relation" && v) {
      values[field.name] = String(v);
    } else {
      values[field.name] = v ?? (field.type === "multiRelation" ? [] : "");
    }
  }
  return values;
}

/** @param {Record<string, unknown>} values @param {import('@/lib/crm/admin-resource-meta').AdminFieldDef[]} fields */
export function emptyFormValues(fields) {
  return itemToFormValues(null, fields);
}

import { formatColorTokenLabel, resolveColorTokenCss } from "@/lib/crm/color-tokens";

/**
 * @param {unknown} value
 * @param {import('@/lib/crm/admin-resource-meta').AdminFieldDef} field
 * @param {Record<string, Record<string, { _id: string; label: string }>>} relationLabels
 */
export function formatCellValue(value, field, relationLabels) {
  if (value == null || value === "") return "—";
  if (field.type === "colorToken") {
    return formatColorTokenLabel(String(value));
  }
  if (field.type === "boolean") return value ? "Ja" : "Nej";
  if (field.type === "date") {
    try {
      return new Date(String(value)).toLocaleDateString("da-DK");
    } catch {
      return String(value);
    }
  }
  if (field.type === "relation") {
    const map = relationLabels[field.relation ?? ""];
    const id = String(value);
    return map?.[id]?.label ?? id.slice(-6);
  }
  if (field.type === "multiRelation" && Array.isArray(value)) {
    if (!value.length) return "—";
    const map = relationLabels[field.relation ?? ""];
    return value
      .map((id) => map?.[String(id)]?.label ?? String(id).slice(-6))
      .join(", ");
  }
  if (field.type === "tags" && Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
