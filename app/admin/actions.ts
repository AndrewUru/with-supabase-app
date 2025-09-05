"use server";

import { createClient } from "@/lib/supabase/server";

type Role = "member" | "editor" | "admin";
type MinPlan = "free" | "premium";
type ResourceStatus = "draft" | "published" | "archived";

const isRole = (v: string): v is Role =>
  v === "member" || v === "editor" || v === "admin";
const isPlan = (v: string): v is MinPlan => v === "free" || v === "premium";
const isStatus = (v: string): v is ResourceStatus =>
  v === "draft" || v === "published" || v === "archived";

const BUCKET = "resources";

function sanitizeSlug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_/]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function inferTypeFromMimeOrName(
  mime: string | null,
  name: string
): "audio" | "video" | "pdf" {
  const n = name.toLowerCase();
  const m = (mime ?? "").toLowerCase();
  if (
    m.startsWith("audio/") ||
    n.endsWith(".mp3") ||
    n.endsWith(".wav") ||
    n.endsWith(".m4a")
  )
    return "audio";
  if (
    m.startsWith("video/") ||
    n.endsWith(".mp4") ||
    n.endsWith(".mov") ||
    n.endsWith(".webm")
  )
    return "video";
  return "pdf";
}

export async function setRole(formData: FormData) {
  const supabase = await createClient();
  const user_id = String(formData.get("user_id") ?? "");
  const roleRaw = String(formData.get("role") ?? "member");

  const role: Role = isRole(roleRaw) ? roleRaw : "member";
  if (!user_id) throw new Error("Falta user_id");

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("user_id", user_id);
  if (error) throw error;
}

export async function createResource(formData: FormData) {
  const supabase = await createClient();

  const rawSlug = String(formData.get("slug") ?? "");
  const slug = sanitizeSlug(rawSlug);
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const minPlanRaw = String(formData.get("min_plan") ?? "free");
  const statusRaw = String(formData.get("status") ?? "published");
  const visibility = String(formData.get("visibility") ?? "private"); // "private" | "public"
  const file = formData.get("asset") as File | null;

  if (!slug || !title) throw new Error("Faltan slug o título");
  if (!file) throw new Error("Falta el archivo (asset)");

  const min_plan: MinPlan = isPlan(minPlanRaw) ? minPlanRaw : "free";
  const status: ResourceStatus = isStatus(statusRaw) ? statusRaw : "published";

  // Subida a Storage
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fileExt = file.name.split(".").pop() ?? "";
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const objectPath = `${slug}/${Date.now()}-${safeName}`;

  // Convierte File a ArrayBuffer/Uint8Array
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, bytes, {
      upsert: true,
      contentType: file.type || undefined,
      cacheControl: "3600",
    });

  if (upErr) throw upErr;

  // Según visibilidad, guardamos public_url o file_path
  let public_url: string | null = null;
  let file_path: string | null = null;

  if (visibility === "public") {
    const { data: pub } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(objectPath);
    public_url = pub.publicUrl ?? null;
  } else {
    file_path = objectPath; // para firmar luego
  }

  const kind = inferTypeFromMimeOrName(file.type || null, file.name); // "audio" | "video" | "pdf"

  // Inserta el recurso
  const payload = {
    slug,
    title,
    excerpt,
    min_plan, // "free" | "premium"
    status, // "draft" | "published" | "archived"
    type: kind, // NUEVO si existe la columna
    public_url, // nullable
    file_path, // nullable
  };

  const { error: insErr } = await supabase.from("resources").insert(payload);
  if (insErr) throw insErr;
}
