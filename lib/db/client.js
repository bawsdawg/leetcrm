/**
 * Single DB client singleton — swap body for Drizzle, Prisma, or Kysely.
 * Lazy init avoids crashing dev when DATABASE_URL is unset.
 */

let warned;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    if (!warned && process.env.NODE_ENV === "development") {
      warned = true;
      console.warn("[db] DATABASE_URL not set — add Prisma/Drizzle here.");
    }
    return null;
  }
  return null;
}
