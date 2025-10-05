// app/protected/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  FileText,
  Film,
  Headphones,
  Library,
  Lock,
  MapPin,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
const EMPTY_PLACEHOLDER = "--";

const fmtDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : EMPTY_PLACEHOLDER;
const fmtDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", { dateStyle: "medium" })
    : EMPTY_PLACEHOLDER;
const fmtBytes = (bytes?: number | null) => {
  if (!bytes || bytes <= 0) return EMPTY_PLACEHOLDER;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
};

const PLAN_LABELS: Record<Subscription["plan"], string> = {
  free: "Gratuito",
  basic: "Básico",
  pro: "Pro",
  vip: "VIP",
};

const PLAN_DESCRIPTIONS: Record<Subscription["plan"], string> = {
  free: "Contenido de arranque para familiarizarte con la comunidad.",
  basic: "Más sesiones guiadas y materiales descargables para avanzar.",
  pro: "Acceso completo a la biblioteca, eventos online y soporte priorizado.",
  vip: "Mentoría personalizada, encuentros exclusivos y todo el contenido premium.",
};

const PLAN_PERKS: Record<Subscription["plan"], string[]> = {
  free: [
    "Audios introductorios",
    "PDFs esenciales",
    "Acceso a la comunidad abierta",
  ],
  basic: [
    "Todo lo incluido en Free",
    "Sesiones guiadas extra",
    "Material descargable ampliado",
  ],
  pro: [
    "Todo lo incluido en Basic",
    "Biblioteca completa de audio y video",
    "Encuentros online mensuales",
  ],
  vip: [
    "Todo lo incluido en Pro",
    "Mentoría individual",
    "Acceso anticipado a retiros y viajes",
  ],
};

const STATUS_LABELS: Record<Subscription["status"], string> = {
  active: "Activo",
  trialing: "Periodo de prueba",
  past_due: "Pago pendiente",
  canceled: "Cancelado",
  incomplete: "Incompleto",
};

type PillTone = "muted" | "brand" | "positive" | "warning";

const STATUS_TONE: Record<Subscription["status"], PillTone> = {
  active: "positive",
  trialing: "brand",
  past_due: "warning",
  canceled: "muted",
  incomplete: "muted",
};

const NAV_ITEMS = [
  { id: "perfil", label: "Perfil" },
  { id: "suscripcion", label: "Suscripción" },
  { id: "biblioteca", label: "Biblioteca" },
  { id: "eventos", label: "Eventos" },
];

const PLAN_ORDER: Subscription["plan"][] = ["free", "basic", "pro", "vip"];

const assetIconByKind: Record<
  MediaAsset["kind"],
  { icon: LucideIcon; tone: string }
> = {
  audio: {
    icon: Headphones,
    tone: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
  },
  video: {
    icon: Film,
    tone: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
  },
  pdf: {
    icon: FileText,
    tone: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  },
};

// -------------------- Página --------------------
export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>;
}) {
  await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/auth/login?next=/protected");

  const nowIso = new Date().toISOString();

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

  const mediaRes = await supabase
    .from("media_assets")
    .select(
      "id,title,kind,storage_path,duration_secs,filesz_bytes,plan_required"
    );
  const rawAssets =
    (mediaRes.data as Omit<MediaAsset, "allowed">[] | null) ?? [];
  const userLevel = PLAN_ORDER.indexOf(activePlan);
  const assets: MediaAsset[] = rawAssets.map((asset) => ({
    ...asset,
    allowed: PLAN_ORDER.indexOf(asset.plan_required) <= userLevel,
  }));

  const upcoming: EventWithBookings[] =
    (upcomingEventsRes.data as EventWithBookings[]) ?? [];
  const accessibleAssets = assets.filter((asset) => asset.allowed);
  const lockedAssets = Math.max(assets.length - accessibleAssets.length, 0);
  const nextEvent = upcoming[0] ?? null;

  const displayNameRaw = profile?.full_name?.trim();
  const displayName =
    displayNameRaw && displayNameRaw.length > 0
      ? displayNameRaw
      : user.email ?? "tu cuenta";
  const shortName = displayName.split(" ")[0] ?? displayName;

  const highlightStats: Array<{
    label: string;
    value: string;
    hint: string;
    icon: LucideIcon;
  }> = [
    {
      label: "Plan activo",
      value: PLAN_LABELS[activePlan],
      icon: Sparkles,
      hint: subscription
        ? STATUS_LABELS[subscription.status]
        : "Sin suscripción activa",
    },
    {
      label: "Contenidos desbloqueados",
      value: accessibleAssets.length.toString(),
      icon: Library,
      hint:
        lockedAssets > 0
          ? `${lockedAssets} por desbloquear`
          : "Todo tu contenido listo",
    },
    {
      label: "Próximo evento",
      value: nextEvent
        ? fmtDateTime(nextEvent.starts_at)
        : "Sin eventos programados",
      icon: Calendar,
      hint: nextEvent?.location_name ?? "Te avisaremos cuando haya novedades",
    },
  ];

  const planTone: PillTone = "brand";
  const planDescription = PLAN_DESCRIPTIONS[activePlan];
  const planPerks = PLAN_PERKS[activePlan];
  const renewalLabel = subscription?.current_period_end
    ? fmtDate(subscription.current_period_end)
    : "Sin fecha programada";

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-brand/5 via-background to-purple-500/5 shadow-xl">
        <div
          className="absolute top-0 right-0 h-64 w-64 translate-x-24 -translate-y-20 rounded-full bg-brand/15 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-purple-500/10 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Panel EDHUCO
              </span>
            </div>
            <div>
              <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                Hola, {shortName}
              </h1>
              <p className="mt-3 text-base text-muted-foreground/90 sm:text-lg">
                Gestiona tu información, revisa tu suscripción y accede a los
                recursos que tienes disponibles.
              </p>
            </div>
            <nav aria-label="Secciones del panel" className="pt-2">
              <ul className="flex flex-wrap gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:border-brand/50 hover:bg-brand/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-xl">
            {highlightStats.map(
              ({ label, value, icon: IconComponent, hint }) => (
                <StatCard
                  key={label}
                  label={label}
                  value={value}
                  hint={hint}
                  icon={<IconComponent className="h-5 w-5" />}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <SectionCard
        id="perfil"
        title="Tu perfil"
        desc="Consulta los datos sincronizados desde Supabase."
        badge={<Pill tone="muted">Solo lectura</Pill>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField label="Nombre completo" value={profile?.full_name} />
          <ProfileField label="Correo" value={user.email} />
          <ProfileField label="Teléfono" value={profile?.phone} />
          <ProfileField
            label="Avatar"
            value={profile?.avatar_url}
            hint={
              profile?.avatar_url ? "Se abrirá en una nueva pestaña" : undefined
            }
            isLink
          />
        </div>
      </SectionCard>

      {/* Subscription Section */}
      <SectionCard
        id="suscripcion"
        title="Tu suscripción"
        desc="Controla el plan que te da acceso al contenido."
        badge={<Pill tone={planTone}>Plan {PLAN_LABELS[activePlan]}</Pill>}
        action={
          <Link
            href="/precios"
            className="group inline-flex items-center gap-2 rounded-xl border border-brand/50 bg-gradient-to-r from-brand/10 to-brand/5 px-5 py-2.5 text-sm font-semibold text-brand shadow-sm transition-all duration-200 hover:border-brand hover:from-brand/20 hover:to-brand/10 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Cambiar de plan
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        }
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="brand">Plan: {PLAN_LABELS[activePlan]}</Pill>
            {subscription ? (
              <>
                <Pill tone={STATUS_TONE[subscription.status] ?? "muted"}>
                  Estado: {STATUS_LABELS[subscription.status]}
                </Pill>
                {subscription.current_period_end ? (
                  <Pill tone="muted">Renueva: {renewalLabel}</Pill>
                ) : null}
                {subscription.cancel_at_period_end ? (
                  <Pill tone="warning">Se cancelará al final del periodo</Pill>
                ) : null}
                {subscription.provider ? (
                  <Pill tone="muted">
                    Gestionado vía {subscription.provider}
                  </Pill>
                ) : null}
              </>
            ) : (
              <Pill tone="muted">Sin suscripción activa</Pill>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {planDescription}
          </p>

          <div className="rounded-xl border border-border/40 bg-muted/30 p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-brand" />
              Características incluidas
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {planPerks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Library Section */}
      <SectionCard
        id="biblioteca"
        title="Tu biblioteca"
        desc="Accede a los contenidos disponibles según tu plan."
        badge={
          <Pill tone="muted">
            {accessibleAssets.length} accesibles · {lockedAssets} bloqueados
          </Pill>
        }
        action={
          lockedAssets > 0 ? (
            <Link
              href="/precios"
              className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:border-brand/50 hover:bg-brand/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Desbloquear más contenidos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ) : null
        }
      >
        {assets.length === 0 ? (
          <EmptyState
            icon={Library}
            title="Aún no hay contenidos publicados"
            description="Cuando se publique nuevo material aparecerá aquí automáticamente."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => {
              const config = assetIconByKind[asset.kind];
              const IconComponent = config.icon;
              const availabilityTone: PillTone = asset.allowed
                ? "brand"
                : "muted";
              const meta = `${asset.kind.toUpperCase()} · ${
                asset.duration_secs
                  ? `${Math.round(asset.duration_secs / 60)} min`
                  : EMPTY_PLACEHOLDER
              } · ${fmtBytes(asset.filesz_bytes)}`;

              return (
                <article
                  key={asset.id}
                  className="group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${config.tone} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                          {asset.title}
                        </h3>
                        <Pill tone={availabilityTone}>
                          {asset.plan_required.toUpperCase()}
                        </Pill>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {meta}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {asset.allowed ? (
                      <>
                        <a
                          href={`/media/${asset.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium transition-all hover:border-brand/50 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                          Abrir
                        </a>
                        {asset.kind === "pdf" ? (
                          <a
                            href={`/media/${asset.id}?download=1`}
                            className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium transition-all hover:border-brand/50 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                          >
                            Descargar
                          </a>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href="/precios"
                        className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-brand/50 hover:bg-brand/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        <Lock className="h-4 w-4" />
                        Desbloquear con {asset.plan_required.toUpperCase()}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <aside className="mt-5 rounded-xl border border-dashed border-border/50 bg-muted/20 p-4 text-xs leading-relaxed text-muted-foreground">
          💡 <strong>Idea técnica:</strong> Crea la ruta{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
            /app/media/[id]/route.ts
          </code>{" "}
          para generar un signed URL y registrar reproducciones en{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
            media_events
          </code>
          .
        </aside>
      </SectionCard>

      {/* Events Section */}
      <SectionCard
        id="eventos"
        title="Próximos eventos"
        desc="Organiza tu agenda y revisa las plazas disponibles."
        action={
          <Link
            href="/#viajes"
            className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:border-brand/50 hover:bg-brand/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Ver agenda completa
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        }
      >
        {upcoming.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Sin eventos programados"
            description="Cuando haya nuevos encuentros verás aquí la fecha, ubicación y plazas disponibles."
          />
        ) : (
          <div className="space-y-4">
            {upcoming.map((event) => {
              const capacity = event.capacity ?? 0;
              const booked = event.bookings?.[0]?.count ?? 0;
              const slotsLeft = capacity
                ? Math.max(capacity - booked, 0)
                : null;
              const capacityLabel = capacity
                ? `${booked}/${capacity} reservas`
                : `${booked} reservas`;

              return (
                <article
                  key={event.id}
                  className="group flex flex-col gap-5 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                      <Calendar className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 space-y-2">
                      <h3 className="text-base font-semibold leading-snug text-foreground">
                        {event.title}
                      </h3>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {fmtDateTime(event.starts_at)}
                      </p>
                      {event.location_name ? (
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">
                            {event.location_name}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <p className="text-sm font-semibold text-foreground">
                      {capacityLabel}
                    </p>
                    {slotsLeft !== null ? (
                      <Pill tone={slotsLeft > 0 ? "positive" : "warning"}>
                        {slotsLeft > 0
                          ? `${slotsLeft} plazas libres`
                          : "Completo"}
                      </Pill>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </SectionCard>
    </main>
  );
}

// -------------------- Components --------------------

const Pill = ({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: PillTone;
}) => {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm";
  const variants: Record<PillTone, string> = {
    muted: "border-border/60 bg-muted/40 text-muted-foreground",
    brand: "border-brand/40 bg-brand/10 text-brand",
    positive:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-500/15 dark:text-emerald-300",
    warning:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:border-amber-400/20 dark:bg-amber-500/15 dark:text-amber-300",
  };

  return <span className={`${base} ${variants[tone]}`}>{children}</span>;
};

const SectionCard = ({
  id,
  title,
  desc,
  badge,
  action,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  badge?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="rounded-3xl border border-border/50 bg-card/50 p-6 shadow-lg backdrop-blur-sm md:p-8"
  >
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {desc ? <p className="text-sm text-muted-foreground">{desc}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {badge}
        {action}
      </div>
    </div>
    {children}
  </section>
);

const ProfileField = ({
  label,
  value,
  hint,
  isLink = false,
}: {
  label: string;
  value?: string | null;
  hint?: string;
  isLink?: boolean;
}) => {
  const normalized =
    value && value.trim().length > 0 ? value.trim() : EMPTY_PLACEHOLDER;

  return (
    <div className="group rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-5 transition-all duration-200 hover:border-border hover:shadow-md">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {isLink && normalized !== EMPTY_PLACEHOLDER ? (
        <a
          href={normalized}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 truncate text-sm font-medium text-brand transition-colors hover:text-brand/80 hover:underline"
        >
          {normalized}
          <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
        </a>
      ) : (
        <p className="truncate text-sm font-medium text-foreground">
          {normalized}
        </p>
      )}
      {hint ? (
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/50 bg-muted/20 p-8 text-center">
    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground shadow-sm">
      <Icon className="h-8 w-8" />
    </span>
    <div className="max-w-md space-y-2">
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  </div>
);

const StatCard = ({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative space-y-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand/5 text-brand shadow-sm transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1.5 truncate text-lg font-bold text-foreground">
          {value}
        </p>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  </div>
);
