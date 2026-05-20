import { NextResponse } from "next/server";

import { normalizeReportPeriod } from "@/lib/crm/report-period";
import { requireSession } from "@/lib/server/require-session";
import { fetchWorkloadMemberDetail } from "@/lib/server/workload-data";

/**
 * @param {import('next/server').NextRequest} req
 * @param {{ params: Promise<{ memberKey: string }> }} ctx
 */
export async function GET(req, ctx) {
  const authResult = await requireSession();
  if ("response" in authResult) return authResult.response;

  const { memberKey: memberKeyEncoded } = await ctx.params;
  const memberKey = decodeURIComponent(memberKeyEncoded ?? "");

  const includeTest = req.nextUrl.searchParams.get("includeTest") === "1";
  const year = Number(req.nextUrl.searchParams.get("year"));
  const month = Number(req.nextUrl.searchParams.get("month"));
  const period = normalizeReportPeriod({
    year: Number.isFinite(year) ? year : undefined,
    month: Number.isFinite(month) ? month : undefined,
  });

  try {
    const bundle = await fetchWorkloadMemberDetail({
      memberKey,
      includeTest,
      session: authResult.session,
      ...period,
    });

    if (!bundle) {
      return NextResponse.json({ error: "Medarbejder ikke fundet" }, { status: 404 });
    }

    return NextResponse.json(bundle);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke hente workload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
