"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const topic = String(formData.get("topic") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const consent = formData.get("consent") === "on";

  if (!name || !email || !message || !consent) {
    redirect("/contacto?error=campos");
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone,
      topic,
      message,
    });
    if (error) redirect("/contacto?error=server");
    redirect("/contacto?ok=1");
  } catch {
    redirect("/contacto?error=server");
  }
}
