import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";

type AuthButtonProps = {
  className?: string;
  variant?: "default" | "avatar";
};

const menuLinkStyles =
  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground";

export async function AuthButton({
  className = "",
  variant = "avatar",
}: AuthButtonProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser(); // mas robusto en server
  const user = data?.user;
  const email = user?.email ?? undefined;

  const getInitials = (source: string) =>
    source.split("@")[0].slice(0, 2).toUpperCase();

  const getAvatarColor = (source: string) => {
    let hash = 0;
    for (let i = 0; i < source.length; i++) {
      hash = source.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = ((hash % 360) + 360) % 360;
    return `hsl(${hue}, 65%, 50%)`;
  };

  const signOut = async () => {
    "use server";
    const supabaseClient = await createClient();
    await supabaseClient.auth.signOut();
  };

  if (!email) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="tracking-[0.16em]"
        >
          <Link href="/auth/login">Ingresar</Link>
        </Button>
        <Button asChild size="sm" variant="default" className="shadow-soft">
          <Link href="/auth/sign-up">Registrarse</Link>
        </Button>
      </div>
    );
  }

  if (variant === "default") {
    return (
      <form
        action={signOut}
        className={cn("flex min-w-0 items-center gap-4", className)}
      >
        <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 sm:inline">
          Hola,
        </span>
        <span
          className="max-w-[160px] truncate text-sm font-medium text-foreground sm:max-w-none"
          title={email}
        >
          {email}
        </span>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="tracking-[0.16em]"
        >
          Cerrar sesion
        </Button>
      </form>
    );
  }

  const initials = getInitials(email);
  const color = getAvatarColor(email);

  return (
    <details
      className={cn("group relative", className)}
      data-testid="auth-avatar-menu"
    >
      <summary
        className="list-none inline-grid size-11 place-items-center rounded-full text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ backgroundColor: color }}
        aria-label={`Abrir menu de usuario (${email})`}
      >
        {initials}
      </summary>

      <div className="animate-in fade-in-0 slide-in-from-top-2 absolute right-0 z-50 mt-4 w-64 rounded-[2rem] border border-border/55 bg-card/85 p-4 text-foreground shadow-soft backdrop-blur-2xl">
        <div className="spiritual-orb rounded-2xl border border-border/40 bg-card/60 px-4 py-3 shadow-soft">
          <p
            className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground/70"
            title={email}
          >
            {email}
          </p>
        </div>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

        <nav className="flex flex-col gap-2">
          <Link href="/protected" className={menuLinkStyles}>
            Area personal
          </Link>
          <Link href="/perfil" className={menuLinkStyles}>
            Perfil
          </Link>
          <Link href="/ajustes" className={menuLinkStyles}>
            Ajustes
          </Link>
        </nav>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="w-full justify-center tracking-[0.16em]"
          >
            Cerrar sesion
          </Button>
        </form>
      </div>
    </details>
  );
}
