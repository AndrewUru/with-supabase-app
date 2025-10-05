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
  basic: "Basico",
  pro: "Pro",
  vip: "VIP",
};

const PLAN_DESCRIPTIONS: Record<Subscription["plan"], string> = {
  free: "Contenido de arranque para familiarizarte con la comunidad.",
  basic: "Mas sesiones guiadas y materiales descargables para avanzar.",
  pro: "Acceso completo a la biblioteca, eventos online y soporte priorizado.",
  vip: "Mentoria personalizada, encuentros exclusivos y todo el contenido premium.",
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
    "Mentoria individual",
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
  { id: "suscripcion", label: "Suscripcion" },
  { id: "biblioteca", label: "Biblioteca" },
  { id: "eventos", label: "Eventos" },
];

const PLAN_ORDER: Subscription["plan"][] = ["free", "basic", "pro", "vip"];

const assetIconByKind: Record<
  MediaAsset["kind"],
  { icon: LucideIcon; tone: string }
> = {
  audio: { icon: Headphones, tone: "bg-brand/15 text-brand" },
  video: {
    icon: Film,
    tone: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-200",
  },
  pdf: {
    icon: FileText,
    tone: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-200",
  },
};

// -------------------- Pagina --------------------
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
        : "Sin suscripcion activa",
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
      label: "Proximo evento",
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
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 md:p-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-brand/10 via-background to-accent/10 p-8 shadow-lg">
        <div
          className="absolute top-0 right-0 h-48 w-48 translate-x-20 -translate-y-16 rounded-full bg-brand/20 blur-[120px]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-brand/40 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand shadow-sm">
              Panel personal EDHUCO
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Hola, {shortName}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Gestiona tu informacion, revisa tu suscripcion y accede a los
                recursos que tienes disponibles.
              </p>
            </div>
            <nav aria-label="Secciones del panel" className="pt-2">
              <ul className="flex flex-wrap gap-2 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 font-medium transition hover:border-brand/60 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="grid w-full max-w-md gap-3 sm:grid-cols-3 lg:max-w-lg">
            {highlightStats.map(
              ({ label, value, icon: IconComponent, hint }) => (
                <StatCard
                  key={label}
                  label={label}
                  value={value}
                  hint={hint}
                  icon={<IconComponent className="h-4 w-4" />}
                />
              )
            )}
          </div>
        </div>
      </section>

      <SectionCard
        id="perfil"
        title="Tu perfil"
        desc="Consulta los datos sincronizados desde Supabase."
        badge={<Pill tone="muted">Solo lectura</Pill>}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <ProfileField label="Nombre completo" value={profile?.full_name} />
          <ProfileField label="Correo" value={user.email} />
          <ProfileField label="Telefono" value={profile?.phone} />
          <ProfileField
            label="Avatar"
            value={profile?.avatar_url}
            hint={
              profile?.avatar_url ? "Se abrira en una nueva pestana" : undefined
            }
            isLink
          />
        </div>
      </SectionCard>

      <SectionCard
        id="suscripcion"
        title="Tu suscripcion"
        desc="Controla el plan que te da acceso al contenido."
        badge={<Pill tone={planTone}>Plan {PLAN_LABELS[activePlan]}</Pill>}
        action={
          <Link
            href="/precios"
            className="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Cambiar de plan
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="space-y-4">
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
                  <Pill tone="warning">Se cancelara al final del periodo</Pill>
                ) : null}
                {subscription.provider ? (
                  <Pill tone="muted">
                    Gestionado via {subscription.provider}
                  </Pill>
                ) : null}
              </>
            ) : (
              <Pill tone="muted">Sin suscripcion activa</Pill>
            )}
          </div>

          <p className="text-sm text-muted-foreground">{planDescription}</p>

          <ul className="grid gap-2 sm:grid-cols-2">
            {planPerks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                  ?
                </span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionCard>

      <SectionCard
        id="biblioteca"
        title="Tu biblioteca"
        desc="Accede a los contenidos disponibles segun tu plan."
        badge={
          <Pill tone="muted">
            {accessibleAssets.length} accesibles ? {lockedAssets} bloqueados
          </Pill>
        }
        action={
          lockedAssets > 0 ? (
            <Link
              href="/precios"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium transition hover:border-brand/60 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Desbloquear mas contenidos
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null
        }
      >
        {assets.length === 0 ? (
          <EmptyState
            icon={Library}
            title="Aun no hay contenidos publicados"
            description="Cuando se publique nuevo material aparecera aqui automaticamente."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {assets.map((asset) => {
              const config = assetIconByKind[asset.kind];
              const IconComponent = config.icon;
              const availabilityTone: PillTone = asset.allowed
                ? "brand"
                : "muted";
              const meta = `${asset.kind.toUpperCase()} | ${
                asset.duration_secs
                  ? `${Math.round(asset.duration_secs / 60)} min`
                  : EMPTY_PLACEHOLDER
              } | ${fmtBytes(asset.filesz_bytes)}`;

              return (
                <article
                  key={asset.id}
                  className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-background/90 p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.tone}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-foreground">
                          {asset.title}
                        </h3>
                        <Pill tone={availabilityTone}>
                          {asset.plan_required.toUpperCase()}
                        </Pill>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {meta}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {asset.allowed ? (
                      <>
                        <a
                          href={`/media/${asset.id}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium transition hover:border-brand/60 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                          Abrir
                        </a>
                        {asset.kind === "pdf" ? (
                          <a
                            href={`/media/${asset.id}?download=1`}
                            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium transition hover:border-brand/60 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                          >
                            Descargar
                          </a>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href="/precios"
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-brand/60 hover:bg-brand/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
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

        <aside className="mt-4 rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
          Idea tecnica: crea la ruta <code>/app/media/[id]/route.ts</code> para
          generar un signed URL y registrar reproducciones en{" "}
          <code>media_events</code>.
        </aside>
      </SectionCard>

      <SectionCard
        id="eventos"
        title="Proximos eventos"
        desc="Organiza tu agenda y revisa las plazas disponibles."
        action={
          <Link
            href="/#viajes"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium transition hover:border-brand/60 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Ver agenda completa
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        }
      >
        {upcoming.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Sin eventos programados"
            description="Cuando haya nuevos encuentros veras aqui la fecha, ubicacion y plazas disponibles."
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
                  className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {fmtDateTime(event.starts_at)}
                      </p>
                      {event.location_name ? (
                        <p className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="truncate">
                            {event.location_name}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-start justify-end gap-3 sm:flex-col sm:items-end">
                    <p className="text-sm font-medium text-foreground">
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

const Pill = ({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: PillTone;
}) => {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium";
  const variants: Record<PillTone, string> = {
    muted: "border-border/70 bg-muted/30 text-muted-foreground",
    brand: "border-brand/60 bg-brand/15 text-brand",
    positive:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-500/20 dark:text-emerald-200",
    warning:
      "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:border-amber-400/30 dark:bg-amber-500/20 dark:text-amber-200",
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
    className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-md backdrop-blur"
  >
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {desc ? (
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        ) : null}
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
    <div className="rounded-2xl border border-border/60 bg-muted/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {isLink && normalized !== EMPTY_PLACEHOLDER ? (
        <a
          href={normalized}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-1 inline-flex items-center gap-2 truncate text-sm font-medium text-brand hover:underline"
        >
          {normalized}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <p className="mt-1 truncate text-sm text-foreground">{normalized}</p>
      )}
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
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
  <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6 text-sm text-muted-foreground">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-muted-foreground">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
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
  <div className="group rounded-2xl border border-border/60 bg-background/90 p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg">
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
      {icon}
    </span>
    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 truncate text-base font-semibold text-foreground">
      {value}
    </p>
    <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
  </div>
);
