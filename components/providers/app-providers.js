"use client";

import { SessionProvider } from "next-auth/react";

/** Root client boundary — OAuth session, analytics, toast, etc. */

export function AppProviders({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
