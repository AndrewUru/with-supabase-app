// app/protected/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

export const metadata = {
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

// Tipado para bookings agregado en el select
type EventWithBookings = {
  id: string;
  title: string;
  starts_at: string;
  location_name: string | null;
  capacity: number | null;
  bookings: { count: number }[];
};

const fmt = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/auth/login?next=/protected");

  const nowIso = new Date().toISOString();

  const [
    servicesCountRes,
    eventsCountRes,
    pendingBookingsRes,
    upcomingEventsRes,
  ] = await Promise.all([
    supabase
      .from("services")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("status", "published")
      .gte("starts_at", nowIso),
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "pendiente"),
    supabase
      .from("events")
      .select("id,title,starts_at,location_name,capacity,bookings(count)")
      .eq("status", "published")
      .gte("starts_at", nowIso)
      .order("starts_at", { ascending: true })
      .limit(5),
  ]);

  const servicesCount = servicesCountRes.count ?? 0;
  const eventsCount = eventsCountRes.count ?? 0;
  const pendingBookings = pendingBookingsRes.count ?? 0;

  const upcoming: EventWithBookings[] =
    (upcomingEventsRes.data as EventWithBookings[]) ?? [];

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            Panel EDHUCO
          </h1>
          <p className="text-sm text-muted-foreground">
            Hola, {user.email?.replace(/(^.{3}).+@/, "$1•••@")}
          </p>
        </div>
        <LogoutButton />
      </header>

      {/* KPI CARDS */}
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Servicios publicados
          </h3>
          <p className="mt-2 text-3xl font-semibold">{servicesCount}</p>
        </article>
        <article className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Eventos próximos
          </h3>
          <p className="mt-2 text-3xl font-semibold">{eventsCount}</p>
        </article>
        <article className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Reservas pendientes
          </h3>
          <p className="mt-2 text-3xl font-semibold">{pendingBookings}</p>
        </article>
      </section>

      {/* LISTADO EVENTOS */}
      <section className="mt-6 rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold">Próximos eventos</h2>
        <div className="mt-4 divide-y">
          {upcoming.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay eventos próximos.
            </p>
          )}
          {upcoming.map((e) => {
            const cap = e.capacity ?? 0;
            const booked = e.bookings?.[0]?.count ?? 0;
            const left = cap ? Math.max(cap - booked, 0) : null;

            return (
              <div
                key={e.id}
                className="py-3 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {fmt(e.starts_at)}
                    {e.location_name ? ` · ${e.location_name}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    {cap ? `${booked}/${cap} reservas` : `${booked} reservas`}
                  </p>
                  {left !== null && (
                    <p className="text-xs text-muted-foreground">
                      {left} plazas libres
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
