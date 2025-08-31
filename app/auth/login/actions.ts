"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "") || "/protected";

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // No devolvemos objetos: redirigimos con el mensaje de error en la URL
    redirect(
      `/auth/login?error=${encodeURIComponent(
        error.message
      )}&next=${encodeURIComponent(next)}`
    );
  }

  // Éxito: cookies escritas en server → redirect fiable
  redirect(next);
}
