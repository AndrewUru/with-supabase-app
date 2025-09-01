// app/protected/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData: FormData) {
  // Marca adicional por si usas in-file actions en otros lados
  "use server";

  const supabase = await createClient();

  const full_name = String(formData.get("full_name") ?? "").trim();
  const avatar_url = String(formData.get("avatar_url") ?? "").trim();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    redirect("/auth/login");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name, avatar_url, updated_at: new Date().toISOString() })
    .eq("id", user!.id);

  if (error) {
    redirect("/protected?error=perfil");
  }

  // Revalida y vuelve a la página protegida con estado OK
  revalidatePath("/protected");
  redirect("/protected?ok=1");
}
