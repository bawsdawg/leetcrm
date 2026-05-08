import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { isGoogleWorkspaceSsoAllowed, normalizeEmail } from "@/lib/auth/workspace-sso";
import { ACCESS_TIERS } from "@/lib/constants/access-tiers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.SSO_GOOGLE_CLIENT_ID,
      clientSecret: process.env.SSO_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "online",
        },
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google") {
        return `/login?error=unsupported`;
      }
      const email = normalizeEmail(profile?.email ?? user?.email);
      if (!email || !isGoogleWorkspaceSsoAllowed(email)) {
        return `/login?error=forbidden_workspace`;
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && user?.email) {
        const email = normalizeEmail(user.email);

        const { connectDb } = await import("@/lib/db/mongoose");
        const { default: User } = await import("@/lib/db/models/user");

        await connectDb();

        /** @type {Record<string, unknown>} */
        const $set = {
          googleSubject: account.providerAccountId,
        };

        const image = user.image ?? profile?.picture;
        const name = user.name;
        if (name != null && name !== "") {
          $set.name = name;
        }
        if (image != null && image !== "") {
          $set.image = image;
        }
        if (profile?.email_verified === true) {
          $set.emailVerifiedAt = new Date();
        }

        const doc = await User.findOneAndUpdate(
          { email },
          {
            $set,
            $setOnInsert: {
              email,
              accessTier: ACCESS_TIERS.INTERNAL_FULL,
              provisionedVia: "workspace_google_sso",
            },
          },
          { upsert: true, new: true },
        );

        token.dbUserId = doc._id.toString();
        token.accessTier = doc.accessTier;
        token.email = doc.email;
        token.name = doc.name ?? undefined;
        token.picture = doc.image ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.dbUserId;
        session.user.accessTier = token.accessTier;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
