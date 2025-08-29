// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs"; // evita Edge y sus errores con realtime-js

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

  // Si necesitas proteger /protected/*
  const { data: { user } = {} } = await supabase.auth.getUser();
  if (!user && req.nextUrl.pathname.startsWith("/protected")) {
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/protected/:path*"],
};
