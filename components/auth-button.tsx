import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

type AuthButtonProps = {
  className?: string;
};

export async function AuthButton({ className }: AuthButtonProps) {
  const supabase = await createClient();

  // getClaims es más rápido que getUser, pero por si acaso, hacemos guardas
  const { data } = await supabase.auth.getClaims();
  const claims = (data?.claims ?? {}) as { email?: string } | null;
  const email = typeof claims?.email === "string" ? claims.email : undefined;

  if (email) {
    return (
      <div
        className={`flex items-center gap-3 min-w-0 ${className ?? ""}`}
        aria-label={`Usuario ${email}`}
      >
        <span className="hidden sm:inline text-sm text-muted-foreground">
          Hola,
        </span>
        {/* Truncar en móvil */}
        <span className="truncate max-w-[160px] sm:max-w-none" title={email}>
          {email}
        </span>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className ?? ""}`}>
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Ingresar</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/auth/sign-up">Registrarse</Link>
      </Button>
    </div>
  );
}
