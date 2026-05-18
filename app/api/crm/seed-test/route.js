import { NextResponse } from "next/server";

import { seedTestData } from "@/lib/server/seed-test-data";
import { requireSession } from "@/lib/server/require-session";

export async function POST() {
  const authResult = await requireSession();
  if ("response" in authResult) return authResult.response;

  try {
    const result = await seedTestData({ replace: true });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunne ikke oprette testdata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
