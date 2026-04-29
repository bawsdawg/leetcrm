/**
 * Central env access. Optionally swap for @t3-oss/env-nextjs or Zod parsing later.
 * Never expose secrets to the client — use NEXT_PUBLIC_* only for safe values.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV,
  /** Site URL — e.g. https://app.example.com */
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  /** Database URL (server-only). */
  DATABASE_URL: process.env.DATABASE_URL,
  /** Stripe (server-only). */
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  /** Cron / webhook shared secrets — rotate in prod. */
  CRON_SECRET: process.env.CRON_SECRET,
};
