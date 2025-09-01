// app/protected/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateProfileAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// -------------------- Tipados --------------------
type EventWithBookings = {
  id: string;
  title: string;
  starts_at: string;
  location_name: string | null;
  capacity: number | null;
  bookings: { count: number }[];
};
type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
};
type Subscription = {
  id: string;
  user_id: string;
  plan: "free" | "basic" | "pro" | "vip";
  status: "active" | "trialing" | "past_due" | "canceled" | "incomplete";
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  provider: "stripe" | "manual" | null;
};
type MediaAsset = {
  id: string;
  title: string;
  kind: "audio" | "video" | "pdf";
  storage_path: string;
  duration_secs: number | null;
  filesz_bytes: number | null;
  allowed: boolean;
  plan_required: "free" | "basic" | "pro" | "vip";
};

// -------------------- Helpers --------------------
const fmtDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";
const fmtDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", { dateStyle: "medium" })
    : "—";
const fmtBytes = (n?: number | null) => {
  if (!n || n <= 0) return "—";
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
};

// ⚠️ searchParams como Promise + await (Next 15)
export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>;
}) {
  const params = await searchParams;
  const justUpdated = params?.updated === "1";

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/auth/login?next=/protected");

  const nowIso = new Date().toISOString();

  // Carga paralela mínima necesaria
  const [profileRes, subsRes, upcomingEventsRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("id,full_name,avatar_url,phone")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("subscriptions")
      .select(
        "id,user_id,plan,status,current_period_end,cancel_at_period_end,provider"
      )
      .eq("user_id", user.id)
      .in("status", ["active", "trialing", "past_due"])
      .order("current_period_end", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("events")
      .select("id,title,starts_at,location_name,capacity,bookings(count)")
      .eq("status", "published")
      .gte("starts_at", nowIso)
      .order("starts_at", { ascending: true })
      .limit(5),
  ]);

  const profile = (profileRes.data as Profile | null) ?? null;
  const subscription = (subsRes.data as Subscription | null) ?? null;
  const activePlan: Subscription["plan"] = subscription?.plan ?? "free";

  // Biblioteca (filtrado por plan en servidor)
  const mediaRes = await supabase
    .from("media_assets")
    .select(
      "id,title,kind,storage_path,duration_secs,filesz_bytes,plan_required"
    );

  const rawAssets =
    (mediaRes.data as Omit<MediaAsset, "allowed">[] | null) ?? [];
  const planOrder: Subscription["plan"][] = ["free", "basic", "pro", "vip"];
  const userLevel = planOrder.indexOf(activePlan);

  const assets: MediaAsset[] = rawAssets.map((m) => ({
    ...m,
    allowed: planOrder.indexOf(m.plan_required) <= userLevel,
  }));

  const upcoming: EventWithBookings[] =
    (upcomingEventsRes.data as EventWithBookings[]) ?? [];

  // helpers UI locales
  const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );

  const SectionCard = ({
    title,
    desc,
    children,
  }: {
    title: string;
    desc?: string;
    children: React.ReactNode;
  }) => (
    <section className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-3">
        <h2 className="text-base font-semibold">{title}</h2>
        {desc ? <p className="text-sm text-muted-foreground">{desc}</p> : null}
      </div>
      {children}
    </section>
  );

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      {justUpdated && (
        <div className="mb-4 rounded-lg border bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          Perfil actualizado correctamente.
        </div>
      )}

      {/* Header */}
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hola, {user.email}</p>
          <h1 className="text-2xl font-semibold">Tu área personal</h1>
        </div>
        <nav className="text-sm">
          <ul className="flex flex-wrap gap-2">
            <li>
              <a
                href="#perfil"
                className="rounded-lg border px-3 py-1 hover:bg-accent/10"
              >
                Perfil
              </a>
            </li>
            <li>
              <a
                href="#suscripcion"
                className="rounded-lg border px-3 py-1 hover:bg-accent/10"
              >
                Suscripción
              </a>
            </li>
            <li>
              <a
                href="#biblioteca"
                className="rounded-lg border px-3 py-1 hover:bg-accent/10"
              >
                Biblioteca
              </a>
            </li>
            <li>
              <a
                href="#eventos"
                className="rounded-lg border px-3 py-1 hover:bg-accent/10"
              >
                Eventos
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* ===== PERFIL ===== */}
      <section
        id="perfil"
        className="mt-6 rounded-xl border bg-card p-5 shadow-sm"
      >
        <div className="mb-3">
          <h2 className="text-base font-semibold">Tu perfil</h2>
          <p className="text-sm text-muted-foreground">
            Gestiona tu información personal.
          </p>
        </div>

        <form
          action={updateProfileAction}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-1">
            <label
              htmlFor="full_name"
              className="text-sm text-muted-foreground"
            >
              Nombre
            </label>
            <input
              id="full_name"
              name="full_name"
              defaultValue={profile?.full_name ?? ""}
              placeholder="Tu nombre completo"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              autoComplete="name"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm text-muted-foreground">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              defaultValue={profile?.phone ?? ""}
              placeholder="+34 600 000 000"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              autoComplete="tel"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label
              htmlFor="avatar_url"
              className="text-sm text-muted-foreground"
            >
              Avatar URL
            </label>
            <input
              id="avatar_url"
              name="avatar_url"
              defaultValue={profile?.avatar_url ?? ""}
              placeholder="https://… (o usa Storage)"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Recomendado: subir a Supabase Storage y guardar aquí el path/URL.
            </p>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted/40"
            >
              Guardar cambios
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          Tu email de acceso: <strong>{user.email}</strong> (se gestiona desde
          autenticación).
        </div>
      </section>

      {/* SUSCRIPCIÓN */}
      <div id="suscripcion" className="mt-6" />
      <SectionCard
        title="Tu suscripción"
        desc="Estado, plan y gestión de facturación."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Tag>Plan: {activePlan.toUpperCase()}</Tag>
          <Tag>Estado: {subscription?.status ?? "sin suscripción"}</Tag>
          {subscription?.current_period_end ? (
            <Tag>Renueva: {fmtDate(subscription.current_period_end)}</Tag>
          ) : null}
          {subscription?.cancel_at_period_end ? (
            <Tag>Cancelará al final del periodo</Tag>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {/* Sugerencia: endpoint /api/stripe/portal para portal de facturación */}
          <a
            href="/api/stripe/portal"
            className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted/40"
          >
            Gestionar facturación
          </a>
          <a
            href="/precios"
            className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted/40"
          >
            Cambiar de plan
          </a>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          ¿Qué incluye tu plan?
          <br />
          <strong>FREE:</strong> audios introductorios y PDFs básicos.{" "}
          <strong>BASIC:</strong> biblioteca esencial. <strong>PRO:</strong>{" "}
          todo el contenido en audio y PDF + parte de los vídeos.{" "}
          <strong>VIP:</strong> acceso completo (audios, vídeos, PDFs y bonus).
        </p>
      </SectionCard>

      {/* BIBLIOTECA */}
      <div id="biblioteca" className="mt-6" />
      <SectionCard
        title="Tu biblioteca"
        desc="Accede a tus contenidos según tu plan."
      >
        {assets.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay contenidos publicados.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {assets.map((a) => (
              <div key={a.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {a.kind.toUpperCase()} ·{" "}
                      {a.duration_secs
                        ? `${Math.round(a.duration_secs / 60)} min`
                        : "—"}{" "}
                      · {fmtBytes(a.filesz_bytes)}
                    </p>
                  </div>
                  <Tag>{a.plan_required.toUpperCase()}</Tag>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {a.allowed ? (
                    <>
                      {/* Recomendado: servir con URL firmada vía una Server Action dedicada */}
                      <a
                        href={`/media/${a.id}`}
                        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted/40"
                      >
                        Abrir
                      </a>
                      {a.kind === "pdf" ? (
                        <a
                          href={`/media/${a.id}?download=1`}
                          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted/40"
                        >
                          Descargar
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <a
                      href="/precios"
                      className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted/40"
                    >
                      Desbloquear con {a.plan_required.toUpperCase()}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-lg border p-3 text-xs text-muted-foreground">
          Sugerencia técnica: crea la ruta <code>/app/media/[id]/route.ts</code>{" "}
          que, con RLS, genere un <em>signed URL</em> temporal desde Storage y{" "}
          <strong>registre</strong> la descarga/reproducción en{" "}
          <code>media_events</code>.
        </div>
      </SectionCard>

      {/* EVENTOS / RESERVAS */}
      <div id="eventos" className="mt-6" />
      <SectionCard
        title="Próximos eventos"
        desc="Tus próximos encuentros y plazas disponibles."
      >
        <div className="divide-y">
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
                    {fmtDateTime(e.starts_at)}
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
      </SectionCard>
    </main>
  );
}
