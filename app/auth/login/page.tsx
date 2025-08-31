//C:\with-supabase-app\app\auth\login\page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/login-form";

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const next =
    (Array.isArray(searchParams?.next)
      ? searchParams?.next[0]
      : searchParams?.next) || "/protected";

  const error =
    (Array.isArray(searchParams?.error)
      ? searchParams?.error[0]
      : searchParams?.error) || "";

  if (user) redirect(next);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm next={next} errorMessage={error} />
      </div>
    </div>
  );
}
