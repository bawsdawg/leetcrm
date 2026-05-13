/** Fired when server timer state may have changed (start/stop/sync). Top bar chip listens. */
export const TIMER_SESSION_CHANGED_EVENT = "crm:timer-session-changed";

export function emitTimerSessionChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TIMER_SESSION_CHANGED_EVENT));
}
