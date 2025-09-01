import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";

type AuthButtonProps = {
  className?: string;
  variant?: "default" | "avatar";
};

export async function AuthButton({
  className = "",
  variant = "avatar",
}: AuthButtonProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser(); // más robusto en server
  const user = data?.user;
  const email = user?.email ?? undefined;

  // ————— helpers —————
  const getInitials = (source: string) =>
    source.split("@")[0].slice(0, 2).toUpperCase();
  const getAvatarColor = (source: string) => {
    let hash = 0;
    for (let i = 0; i < source.length; i++)
      hash = source.charCodeAt(i) + ((hash << 5) - hash);
    const hue = ((hash % 360) + 360) % 360;
    return `hsl(${hue}, 65%, 50%)`;
  };

  // logout server action embebida
  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
  };

  // ————— sin sesión: login / registro —————
  if (!email) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Ingresar</Link>
        </Button>
        <Button asChild size="sm" variant="default">
          <Link href="/auth/sign-up">Registrarse</Link>
        </Button>
      </div>
    );
  }

  // ————— con sesión —————
  if (variant === "default") {
    // versión simple: saludo + logout visible
    return (
      <form
        action={signOut}
        className={`flex items-center gap-3 min-w-0 ${className}`}
      >
        <span className="hidden sm:inline text-sm text-muted-foreground">
          Hola,
        </span>
        <span className="truncate max-w-[160px] sm:max-w-none" title={email}>
          {email}
        </span>
        <button
          type="submit"
          className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-accent/60 transition"
        >
          Cerrar sesión
        </button>
      </form>
    );
  }

  // variante avatar: círculo + menú accesible (incluye logout)
  const initials = getInitials(email);
  const color = getAvatarColor(email);

  return (
    <details className={`relative group ${className}`}>
      <summary
        className="list-none inline-grid place-items-center size-10 rounded-full text-white font-semibold text-sm
                   transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        style={{ backgroundColor: color }}
        aria-label={`Abrir menú de usuario (${email})`}
      >
        {initials}
      </summary>

      <div
        className="absolute right-0 mt-3 w-60 z-50 rounded-xl border border-border/50 bg-popover/95 backdrop-blur-xl
                   shadow-soft p-2 animate-in slide-in-from-top-2 fade-in-0"
      >
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground truncate" title={email}>
            {email}
          </p>
        </div>

        <div className="my-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <nav className="flex flex-col">
          <Link
            href="/protected"
            className="rounded-lg px-3 py-2 text-sm hover:bg-accent/60 transition"
          >
            Área personal
          </Link>
          <Link
            href="/perfil"
            className="rounded-lg px-3 py-2 text-sm hover:bg-accent/60 transition"
          >
            Perfil
          </Link>
          <Link
            href="/ajustes"
            className="rounded-lg px-3 py-2 text-sm hover:bg-accent/60 transition"
          >
            Ajustes
          </Link>
        </nav>

        <div className="my-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <form action={signOut} className="px-2 py-1">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-sm font-medium border hover:bg-accent/60 transition"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </details>
  );
}
