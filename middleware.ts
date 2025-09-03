// ===== File: middleware.ts (protege /admin con rol)
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const path = req.nextUrl.pathname;
  if (!path.startsWith("/admin")) return res;

  const { data: { user } = {} } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.redirect(
      new URL(`/auth/login?next=${encodeURIComponent(path)}`, req.url)
    );

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.redirect(new URL("/?e=forbidden", req.url));
  }

  return res;
}

export const config = { matcher: ["/admin/:path*"] };
