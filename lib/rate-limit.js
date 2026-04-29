/**
 * Placeholder for Redis / Upstash rate limiting per IP or user key.
 * @param {string} _key
 */
export async function rateLimit(_key) {
  return { success: true, remaining: 100 };
}
