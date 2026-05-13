/** Reference “i dag” for demo (Alignement med workspace / statisk mock). */
export const CONTRACT_DEMO_REF_DATE = "2026-05-08";

/**
 * @param {string} renewalAt YYYY-MM-DD
 * @param {string} [refDateIso]
 */
export function contractDaysUntilRenewal(renewalAt, refDateIso = CONTRACT_DEMO_REF_DATE) {
  const ref = new Date(`${refDateIso}T12:00:00`);
  const end = new Date(`${renewalAt}T12:00:00`);
  return Math.round((end.getTime() - ref.getTime()) / 86400000);
}

/**
 * Aktiv konto hvor fornyelsesdato er nært (≤ `maxDays`, inkl. overskredet).
 * @param {{ accountStatus: string; renewalAt: string }} c
 */
export function contractNeedsRenewalSoon(c, maxDays = 90) {
  return c.accountStatus === "active" && contractDaysUntilRenewal(c.renewalAt) <= maxDays;
}
