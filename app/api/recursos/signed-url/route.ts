// app/api/recursos/signed-url/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "recursos"; // <-- cambia si tu bucket tiene otro nombre

type SubscriptionRow = {
  status: "active" | "past_due" | "canceled" | "incomplete" | "trialing";
  current_period_end: string | null;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();

  // Autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  // Suscripción activa
  const { data: subRaw, error: subErr } = await supabase
    .from("subscriptions")
    .select("status,current_period_end")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subErr) {
    return NextResponse.json(
      { error: "Subscription check failed" },
      { status: 500 }
    );
  }

  const sub = (subRaw ?? null) as SubscriptionRow | null;
  const isActive =
    sub?.status === "active" &&
    (sub.current_period_end === null ||
      new Date(sub.current_period_end) > new Date());

  if (!isActive) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Buscar recurso
  const { data: resource, error: resErr } = await supabase
    .from("resources")
    .select("id, premium, status, file_path, public_url")
    .eq("id", id)
    .maybeSingle();

  if (resErr) {
    return NextResponse.json(
      { error: "Resource lookup failed" },
      { status: 500 }
    );
  }
  if (!resource || resource.status !== "published") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Si fuera gratis con URL pública, redirige (por si alguien invoca esta ruta igual)
  if (!resource.premium && resource.public_url) {
    return NextResponse.redirect(new URL(resource.public_url, req.url));
  }

  if (!resource.file_path) {
    return NextResponse.json(
      { error: "No file_path for resource" },
      { status: 400 }
    );
  }

  // Firmar URL temporal (60s)
  const { data: signed, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(resource.file_path, 60);

  if (signErr || !signed?.signedUrl) {
    return NextResponse.json({ error: "Could not sign URL" }, { status: 500 });
  }

  // Redirigir al archivo firmado
  return NextResponse.redirect(signed.signedUrl);
}
