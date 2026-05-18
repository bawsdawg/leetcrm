import mongoose from "mongoose";

import { ADMIN_RESOURCE_META, ADMIN_RESOURCE_IDS } from "@/lib/crm/admin-resource-meta";
import Client from "@/lib/db/models/client";
import Contact from "@/lib/db/models/contact";
import Contract from "@/lib/db/models/contract";
import Department from "@/lib/db/models/department";
import KnowledgeArticle from "@/lib/db/models/knowledge-article";
import NpsCampaign from "@/lib/db/models/nps-campaign";
import NpsTemplate from "@/lib/db/models/nps-template";
import TaskTemplate from "@/lib/db/models/task-template";
import TeamMember from "@/lib/db/models/team-member";
import { connectDb } from "@/lib/db/mongoose";
import { buildIsTestQuery } from "@/lib/server/test-data-filter";

/** @type {Record<string, import('mongoose').Model>} */
const MODEL_BY_RESOURCE = {
  departments: Department,
  clients: Client,
  contacts: Contact,
  contracts: Contract,
  "team-members": TeamMember,
  "task-templates": TaskTemplate,
  "knowledge-articles": KnowledgeArticle,
  "nps-templates": NpsTemplate,
  "nps-campaigns": NpsCampaign,
};

const SORT_BY_RESOURCE = {
  departments: { name: 1 },
  clients: { name: 1 },
  contacts: { name: 1 },
  contracts: { createdAt: -1 },
  "team-members": { name: 1 },
  "task-templates": { title: 1 },
  "knowledge-articles": { title: 1 },
  "nps-templates": { name: 1 },
  "nps-campaigns": { createdAt: -1 },
};

export function isAdminResource(resource) {
  return ADMIN_RESOURCE_IDS.includes(resource);
}

export function getAdminModel(resource) {
  if (!isAdminResource(resource)) return null;
  return MODEL_BY_RESOURCE[resource] ?? null;
}

/** @param {unknown} doc */
export function serializeDoc(doc) {
  if (!doc) return null;
  const raw = typeof doc.toObject === "function" ? doc.toObject({ flattenMaps: true }) : doc;
  return JSON.parse(JSON.stringify(raw));
}

/**
 * @param {string} resource
 * @param {Record<string, unknown>} body
 */
function parseFieldValue(field, value) {
  if (value === "" || value === undefined) {
    if (field.type === "boolean") return false;
    if (field.required) return undefined;
    return field.type === "multiRelation" ? [] : undefined;
  }

  switch (field.type) {
    case "text":
    case "textarea":
      return String(value).trim();
    case "number": {
      const n = Number(value);
      return Number.isFinite(n) ? n : undefined;
    }
    case "boolean":
      return value === true || value === "true" || value === "on" || value === 1;
    case "date": {
      const s = String(value).trim();
      if (!s) return undefined;
      const d = new Date(s);
      return Number.isNaN(d.getTime()) ? undefined : d;
    }
    case "select": {
      const s = String(value).trim();
      return s || undefined;
    }
    case "relation": {
      const id = String(value).trim();
      if (!id) return field.required ? undefined : null;
      if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
      return new mongoose.Types.ObjectId(id);
    }
    case "multiRelation": {
      const arr = Array.isArray(value) ? value : [];
      const ids = arr
        .map((v) => String(v).trim())
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
      return ids;
    }
    case "tags": {
      if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
      return String(value)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    default:
      return value;
  }
}

/**
 * @param {string} resource
 * @param {Record<string, unknown>} body
 */
export function parseAdminPayload(resource, body) {
  const meta = ADMIN_RESOURCE_META[resource];
  if (!meta) return { error: "Ukendt ressource" };

  /** @type {Record<string, unknown>} */
  const payload = {};
  const missing = [];

  for (const field of meta.fields) {
    const raw = body[field.name];
    const parsed = parseFieldValue(field, raw);
    if (parsed === undefined && field.required) {
      missing.push(field.label);
      continue;
    }
    if (parsed !== undefined) {
      payload[field.name] = parsed;
    }
  }

  if (missing.length) {
    return { error: `Udfyld påkrævede felter: ${missing.join(", ")}` };
  }

  return { payload };
}

/**
 * @param {string} resource
 * @param {{ testFilter?: 'all' | 'production' | 'test' }} [opts]
 */
export async function listAdminResource(resource, opts = {}) {
  const Model = getAdminModel(resource);
  if (!Model) return { error: "Ukendt ressource", status: 404 };
  await connectDb();
  const sort = SORT_BY_RESOURCE[resource] ?? { createdAt: -1 };
  const filter = buildIsTestQuery(opts.testFilter ?? "all");
  const docs = await Model.find(filter).sort(sort).lean();
  return { items: docs.map((d) => serializeDoc(d)) };
}

export async function getAdminResource(resource, id) {
  const Model = getAdminModel(resource);
  if (!Model) return { error: "Ukendt ressource", status: 404 };
  if (!mongoose.Types.ObjectId.isValid(id)) return { error: "Ugyldigt id", status: 400 };
  await connectDb();
  const doc = await Model.findById(id).lean();
  if (!doc) return { error: "Ikke fundet", status: 404 };
  return { item: serializeDoc(doc) };
}

export async function createAdminResource(resource, body) {
  const Model = getAdminModel(resource);
  if (!Model) return { error: "Ukendt ressource", status: 404 };
  const parsed = parseAdminPayload(resource, body);
  if (parsed.error) return { error: parsed.error, status: 400 };

  await connectDb();

  if (resource === "contracts" && parsed.payload.clientId) {
    const client = await Client.findById(parsed.payload.clientId).select("slug").lean();
    if (client?.slug) parsed.payload.clientSlug = client.slug;
  }

  try {
    const doc = await Model.create(parsed.payload);
    return { item: serializeDoc(doc) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke oprette";
    return { error: message, status: 400 };
  }
}

export async function updateAdminResource(resource, id, body) {
  const Model = getAdminModel(resource);
  if (!Model) return { error: "Ukendt ressource", status: 404 };
  if (!mongoose.Types.ObjectId.isValid(id)) return { error: "Ugyldigt id", status: 400 };
  const parsed = parseAdminPayload(resource, body);
  if (parsed.error) return { error: parsed.error, status: 400 };

  await connectDb();

  if (resource === "contracts" && parsed.payload.clientId) {
    const client = await Client.findById(parsed.payload.clientId).select("slug").lean();
    if (client?.slug) parsed.payload.clientSlug = client.slug;
  }

  try {
    const doc = await Model.findByIdAndUpdate(id, parsed.payload, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doc) return { error: "Ikke fundet", status: 404 };
    return { item: serializeDoc(doc) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke opdatere";
    return { error: message, status: 400 };
  }
}

export async function deleteAdminResource(resource, id) {
  const Model = getAdminModel(resource);
  if (!Model) return { error: "Ukendt ressource", status: 404 };
  if (!mongoose.Types.ObjectId.isValid(id)) return { error: "Ugyldigt id", status: 400 };
  await connectDb();
  const doc = await Model.findByIdAndDelete(id);
  if (!doc) return { error: "Ikke fundet", status: 404 };
  return { ok: true };
}
