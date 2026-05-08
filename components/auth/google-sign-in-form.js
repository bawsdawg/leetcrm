"use client";

import { signIn } from "next-auth/react";

import { AuthCard } from "@/components/layout/auth-card";

/** @typedef {{ error?: string; callbackUrl: string }} GoogleSignInFormProps */

/** @type {Record<string,string>} */
const KNOWN_MESSAGES = {
  forbidden_workspace:
    "Sign-in is restricted to Searchmind (@searchmind.dk) Google accounts for now.",
  unsupported: "This sign-in method is not available.",
  OAuthSignin:
    "We could not start Google sign-in. Check credentials and authorized redirect URIs.",
  OAuthCallback: "Something went wrong after Google redirected back. Try again.",
  OAuthAccountAlreadyLinked:
    "This Google account is already linked to another sign-in route.",
};

/** @param {GoogleSignInFormProps} props */
export function GoogleSignInForm({ error, callbackUrl }) {
  async function handleGoogle() {
    await signIn("google", { callbackUrl });
  }

  /** @type {string | null} */
  let message = null;
  if (typeof error === "string" && error) {
    message = KNOWN_MESSAGES[error] ?? "Sign-in failed. Please try again.";
  }

  return (
    <AuthCard
      title="Sign in with Google"
      subtitle="Use your Searchmind workspace account (@searchmind.dk)."
    >
      <div className="flex flex-col gap-6">
        {message ? (
          <p className="rounded-xl border border-border bg-google-banner px-4 py-3 font-sans text-sm leading-relaxed text-accent-warning">
            {message}
          </p>
        ) : null}
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2.5 text-sm font-semibold text-fg hover:bg-surface-muted-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={handleGoogle}
        >
          Continue with Google
        </button>
      </div>
    </AuthCard>
  );
}
