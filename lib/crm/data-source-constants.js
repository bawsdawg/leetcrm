/** Persisted CRM data source — demo static fixtures vs MongoDB. */

export const DATA_SOURCE_STORAGE_KEY = "apex-crm-data-source";

/** @typedef {"demo" | "database"} DataSourceId */
export const DATA_SOURCE_MODES = /** @type {const} */ (["demo", "database"]);

export const DATA_SOURCE_DEFAULT = /** @type {DataSourceId} */ ("demo");
