import Link from "next/link";

import { AuthCard } from "@/components/layout/auth-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <AuthCard title="Create an account" subtitle="Wire sign-up in actions/auth.js.">
      <div className="flex flex-col gap-4">
        <Button type="button">Placeholder — OAuth or email</Button>
        <p className="text-center text-xs text-[#a1a4a5]">
          Already have an account?{" "}
          <Link className="text-[#3b9eff]" href={routes.login}>
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
