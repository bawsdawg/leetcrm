import { NextResponse } from "next/server";

import { fetchContractDetailBundle } from "@/lib/server/contracts-data";
import { requireSession } from "@/lib/server/require-session";

/**
 * @param {import('next/server').NextRequest} req
 * @param {{ params: Promise<{ contractId: string }> }} ctx
 */
export async function GET(req, ctx) {
  const authResult = await requireSession();
  if ("response" in authResult) return authResult.response;

  const { contractId } = await ctx.params;
  const includeTest = req.nextUrl.searchParams.get("includeTest") === "1";
  const year = Number(req.nextUrl.searchParams.get("year"));
  const month = Number(req.nextUrl.searchParams.get("month"));

  try {
    const bundle = await fetchContractDetailBundle({
      contractKey: contractId,
      includeTest,
      year: Number.isFinite(year) ? year : undefined,
      month: Number.isFinite(month) ? month : undefined,
    });

    if (bundle?.error) {
      return NextResponse.json({ error: bundle.error }, { status: bundle.status ?? 400 });
    }
    return NextResponse.json(bundle);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke hente kontrakt";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
