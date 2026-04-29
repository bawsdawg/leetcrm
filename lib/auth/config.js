/** Auth-related constants — OAuth callback paths, cookie names once you integrate auth */

export const authRoutes = {
  login: "/login",
  signUp: "/sign-up",
  /** After OAuth / magic link callback */
  callback: "/api/auth/callback",
};
