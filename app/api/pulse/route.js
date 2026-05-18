import { NextResponse } from "next/server";

import { normalizeReportPeriod } from "@/lib/crm/report-period";
import { fetchPulseBundle } from "@/lib/server/pulse-data";
import { requireSession } from "@/lib/server/require-session";

/**
 * @param {import('next/server').NextRequest} req
 */
export async function GET(req) {
  const authResult = await requireSession();
  if ("response" in authResult) return authResult.response;

  const includeTest = req.nextUrl.searchParams.get("includeTest") === "1";
  const year = Number(req.nextUrl.searchParams.get("year"));
  const month = Number(req.nextUrl.searchParams.get("month"));
  const period = normalizeReportPeriod({
    year: Number.isFinite(year) ? year : undefined,
    month: Number.isFinite(month) ? month : undefined,
  });

  try {
    const bundle = await fetchPulseBundle({ includeTest, ...period });
    return NextResponse.json(bundle);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke hente Pulse-data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
