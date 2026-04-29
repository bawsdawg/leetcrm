/**
 * Canonical paths — use instead of magic strings across app, middleware, redirects.
 */

export const routes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  settings: "/settings",
  privacy: "/privacy",
  terms: "/terms",
  api: {
    health: "/api/health",
    stripeWebhook: "/api/webhooks/stripe",
    cron: "/api/cron",
  },
};
