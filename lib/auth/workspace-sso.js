/** Google workspace SSO is limited to this email domain until other flows exist. */

export const WORKSPACE_EMAIL_DOMAIN = "searchmind.dk";

/**
 * @param {string | null | undefined} email
 */
export function normalizeEmail(email) {
  return String(email ?? "")
    .trim()
    .toLowerCase();
}

/**
 * Google OAuth sign-in allowed only for `@searchmind.dk` today.
 * External users will use other provision channels (invite, magic links, etc.).
 *
 * @param {string} normalizedEmail
 */
export function isGoogleWorkspaceSsoAllowed(normalizedEmail) {
  if (!normalizedEmail || !normalizedEmail.includes("@")) return false;
  return normalizedEmail.endsWith(`@${WORKSPACE_EMAIL_DOMAIN}`);
}
