import { redirect } from "next/navigation";

/** Sign-up flows are paused — SSO is invitation-only via Google workspace. */

export default function SignUpPage() {
  redirect("/login");
}
