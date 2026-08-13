import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  COOKIE_NAME,
  isGateEnabled,
  signGateCookie,
  verifyPassword,
} from "@/lib/keystatic-gate";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const target = String(formData.get("from") || "/keystatic");

  if (!isGateEnabled() || !(await verifyPassword(password))) {
    redirect(`/keystatic-login?error=1&from=${encodeURIComponent(target)}`);
  }

  const token = await signGateCookie();
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(target);
}

export default async function KeystaticLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;
  const target = from || "/keystatic";

  if (!isGateEnabled()) {
    redirect(target);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <form action={login} className="w-full max-w-sm space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
          Keystatic Admin
        </p>
        <input type="hidden" name="from" value={target} />
        <Input
          name="password"
          type="password"
          label="Password"
          required
          autoFocus
          error={error ? "Incorrect password." : undefined}
        />
        <Button type="submit" variant="primary" className="w-full">
          Log In
        </Button>
      </form>
    </div>
  );
}
