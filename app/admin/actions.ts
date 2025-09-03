"use server";

import { createClient } from "@/lib/supabase/server";

// ---- Tipos locales ----
type MinPlan = "free" | "paid" | "pro";
type ResourceStatus = "draft" | "published" | "archived";

interface ResourcePayload {
  slug: string;
  title: string;
  excerpt?: string;
  min_plan: MinPlan;
  status: ResourceStatus;
}

// Asigna rol a un usuario
export async function setRole(formData: FormData): Promise<void> {
  const supabase = await createClient(); // 👈 IMPORTANTE: await

  const user_id = String(formData.get("user_id") || "").trim();
  const role = String(formData.get("role") || "member").trim();

  if (!user_id) throw new Error("Falta user_id");

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("user_id", user_id);

  if (error) throw error;
}

// Crea un recurso
export async function createResource(formData: FormData): Promise<void> {
  const supabase = await createClient(); // 👈 IMPORTANTE: await

  const payload: ResourcePayload = {
    slug: String(formData.get("slug") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    excerpt: (() => {
      const v = String(formData.get("excerpt") || "").trim();
      return v.length ? v : undefined;
    })(),
    min_plan: String(formData.get("min_plan") || "free") as MinPlan,
    status: String(formData.get("status") || "published") as ResourceStatus,
  };

  if (!payload.slug || !payload.title) {
    throw new Error("Faltan slug o título");
  }

  const { error } = await supabase.from("resources").insert(payload);
  if (error) throw error;
}
