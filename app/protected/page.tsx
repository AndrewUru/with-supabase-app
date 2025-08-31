import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

export const metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function maskEmail(email?: string | null) {
  if (!email) return "usuario";
  const [name, domain] = email.split("@");
  const short = name.length > 3 ? name.slice(0, 3) + "•••" : name + "•";
  return `${short}@${domain}`;
}

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/auth/login?next=/protected");
  }

  const user = data.user;

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      {/* HEADER */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            Panel EDHUCO
          </h1>
          <p className="text-sm text-muted-foreground">
            Hola, {user.user_metadata?.name ?? maskEmail(user.email)}
          </p>
        </div>
        <LogoutButton />
      </header>

      {/* CONTENIDO */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Tarjetas de estado (placeholders) */}
        <article className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Servicios activos
          </h3>
          <p className="mt-2 text-3xl font-semibold">3</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Gestiona y publica tus servicios
          </p>
        </article>

        <article className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Eventos publicados
          </h3>
          <p className="mt-2 text-3xl font-semibold">3</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Añade fechas y plazas
          </p>
        </article>

        <article className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Reservas
          </h3>
          <p className="mt-2 text-3xl font-semibold">0</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Aún no hay reservas
          </p>
        </article>
      </section>

      {/* Tabs/recursos (sin datos sensibles) */}
      <section className="mt-6 rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold">Recursos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Aquí podrás gestionar tus contenidos. (Próximamente conectaremos con
          tu base de datos).
        </p>
        {/* Pon aquí tus tabs/tabla real cuando toque */}
      </section>
    </main>
  );
}
