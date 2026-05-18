import { NextResponse } from "next/server";

import { auth } from "@/auth";

/** @returns {Promise<{ session: import('next-auth').Session } | { response: NextResponse }>} */
export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    return { response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}
