import Link from "next/link";

import { AuthCard } from "@/components/layout/auth-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthCard title="Sign in" subtitle="Connect your authentication provider below.">
      <div className="flex flex-col gap-4">
        <Button type="button">Placeholder — OAuth or email</Button>
        <p className="text-center text-xs text-[#a1a4a5]">
          No account?{" "}
          <Link className="text-[#3b9eff]" href={routes.signUp}>
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
