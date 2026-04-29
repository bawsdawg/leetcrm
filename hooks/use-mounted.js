"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True after hydrate — avoids SSR mismatch for portals and client-only UI. */

export function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
