import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

const FALLBACK_REDIRECT = "/protected";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  const nextParam = url.searchParams.get("next");
  const next =
    nextParam && nextParam.startsWith("/") ? nextParam : FALLBACK_REDIRECT;

  if (error || errorDescription) {
    const message = errorDescription ?? error ?? "Error desconocido";
    redirect(`/auth/error?error=${encodeURIComponent(message)}`);
  }

  if (!code) {
    redirect(
      `/auth/error?error=${encodeURIComponent(
        "Falta el código de autenticación",
      )}`,
    );
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    redirect(`/auth/error?error=${encodeURIComponent(exchangeError.message)}`);
  }

  redirect(next);
}
