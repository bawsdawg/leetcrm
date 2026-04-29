/**
 * Stripe server client — instantiate when you add dependency: npm install stripe
 * Example: import Stripe from 'stripe'; return new Stripe(env.STRIPE_SECRET_KEY!, { apiVersion: '…' })
 * @returns {null}
 */
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  console.warn('[stripe] Add `stripe` package and initialize in lib/stripe/client.js.');
  return null;
}
