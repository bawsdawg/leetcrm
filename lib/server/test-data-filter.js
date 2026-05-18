/**
 * @param {'all' | 'production' | 'test' | string | null | undefined} testFilter
 */
export function buildIsTestQuery(testFilter) {
  if (testFilter === "test") return { isTest: true };
  if (testFilter === "production") {
    return { $or: [{ isTest: false }, { isTest: { $exists: false } }] };
  }
  return {};
}

/**
 * @param {string | null | undefined} raw
 * @returns {'all' | 'production' | 'test'}
 */
export function parseTestFilter(raw) {
  if (raw === "test" || raw === "production") return raw;
  return "all";
}
