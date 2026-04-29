import { NextResponse } from "next/server";

import { env } from "@/lib/env";

/**
 * Stripe webhook — verify signature with raw body (see Stripe docs for App Router).
 * @param {import("next/server").NextRequest} request
 */
export async function POST(request) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  void rawBody;
  void signature;
  // TODO: instantiate Stripe SDK and stripe.webhooks.constructEvent(rawBody, signature, secret)

  return NextResponse.json({ received: true });
}
