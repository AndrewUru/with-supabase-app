// app/auth/login/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/login-form";

// En Next 15, searchParams puede ser Promise<>
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const sp = (await searchParams) ?? {};

  const next = (Array.isArray(sp.next) ? sp.next[0] : sp.next) || "/protected";

  const error = (Array.isArray(sp.error) ? sp.error[0] : sp.error) || "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect(next);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm next={next} errorMessage={error} />
      </div>
    </div>
  );
}
