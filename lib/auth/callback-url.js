const DEFAULT_CALLBACK = "/pulse";

/**
 * Allow only relative in-app redirects (prevent open redirects after OAuth).
 * @param {string | undefined} candidate
 */
export function sanitizeLoginCallbackUrl(candidate) {
  if (!candidate || typeof candidate !== "string") {
    return DEFAULT_CALLBACK;
  }
  const trimmed = candidate.trim();
  if (
    trimmed.startsWith("/") &&
    !trimmed.startsWith("//") &&
    !trimmed.includes("://")
  ) {
    return trimmed;
  }
  return DEFAULT_CALLBACK;
}
