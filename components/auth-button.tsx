import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

type AuthButtonProps = {
  className?: string;
  variant?: "default" | "avatar";
};

export async function AuthButton({
  className,
  variant = "default",
}: AuthButtonProps) {
  const supabase = await createClient();

  // getClaims es más rápido que getUser, pero por si acaso, hacemos guardas
  const { data } = await supabase.auth.getClaims();
  const claims = (data?.claims ?? {}) as { email?: string } | null;
  const email = typeof claims?.email === "string" ? claims.email : undefined;

  // Server action para logout
  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    // Aquí puedes agregar redirect si necesitas
    // redirect('/');
  };

  // Función para obtener iniciales del email
  const getInitials = (email: string) => {
    const name = email.split("@")[0];
    return name.slice(0, 2).toUpperCase();
  };

  // Función para generar color basado en email
  const getAvatarColor = (email: string) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 50%)`;
  };

  if (email) {
    if (variant === "avatar") {
      return (
        <form action={signOut} className={className ?? ""}>
          <button
            type="submit"
            className="flex items-center justify-center size-10 rounded-full text-white font-semibold text-sm
                     transition-all duration-200 hover:scale-110 hover:shadow-lg
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            style={{ backgroundColor: getAvatarColor(email) }}
            title={`${email} - Cerrar sesión`}
          >
            {getInitials(email)}
          </button>
        </form>
      );
    }

    // Versión por defecto (original)
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
