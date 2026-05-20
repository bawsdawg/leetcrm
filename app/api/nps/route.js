import { NextResponse } from "next/server";

import { normalizeReportPeriod } from "@/lib/crm/report-period";
import { requireSession } from "@/lib/server/require-session";
import { fetchNpsPortfolio } from "@/lib/server/nps-data";

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
    const bundle = await fetchNpsPortfolio({
      includeTest,
      session: authResult.session,
      ...period,
    });
    return NextResponse.json(bundle);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke hente NPS-data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
