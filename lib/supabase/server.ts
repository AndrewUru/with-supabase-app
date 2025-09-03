// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
// import type { Database } from "@/lib/database.types";

export async function createClient(): Promise<SupabaseClient> /*<Database>*/ {
  const cookieStore = await cookies(); // Await the promise to get ReadonlyRequestCookies

  return createServerClient(
    /*<Database>*/ process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll(); // ✅ ahora existe
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Si se llama desde un Server Component que no puede setear cookies.
          }
        },
      },
    }
  );
}
