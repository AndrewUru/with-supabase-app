// app/recursos/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import {
  Lock,
  Unlock,
  FileText,
  Music2,
  PlayCircle,
  Download,
  Sparkles,
  CheckCircle2,
  Filter,
  ArrowRight,
  Search,
  Star,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// ——— metadata
export const metadata: Metadata = {
  title: "Recursos | EDHUCO",
  description:
    "Accede a audios, videos y materiales descargables de EDHUCO. Recursos por categorías, con opciones gratuitas y premium.",
  openGraph: {
    title: "Recursos | EDHUCO",
    description:
      "Explora la biblioteca de recursos de EDHUCO: audios, videos y PDFs por categorías.",
    url: "/recursos",
    siteName: "EDHUCO",
  },
};

// —— Tipos canónicos que usa la UI
type Category =
  | "Meditaciones"
  | "Viajes Chamánicos"
  | "Formaciones"
  | "Música"
  | "Lecturas";

type ResourceRow = {
  id: string;
  title: string;
  desc: string | null;
  category: Category;
  type: "audio" | "video" | "pdf";
  premium: boolean;
  status: "draft" | "published";
  public_url: string | null;
  file_path: string | null;
  created_at: string;
};

type Plan = "free" | "premium";

type ProfilePlanRow = {
  plan: Plan | null;
};

type SubscriptionRow = {
  user_id: string;
  plan: Plan | null;
  status: "active" | "past_due" | "canceled" | "incomplete" | "trialing";
  current_period_end: string | null;
  created_at: string;
};

const PRICE_EUR = "22 € / mes";
const SUBSCRIBE_PATH = "/suscripcion";
const LOGIN_PATH = "/auth/login";

// —— Iconos y etiquetas con Design System
function TypeIcon({
  type,
  className,
}: {
  type: ResourceRow["type"];
  className?: string;
}) {
  if (type === "audio") return <Music2 className={className} aria-hidden />;
  if (type === "video") return <PlayCircle className={className} aria-hidden />;
  return <FileText className={className} aria-hidden />;
}

const CATEGORY_EMOJI: Record<Category, string> = {
  Meditaciones: "🧘",
  "Viajes Chamánicos": "🌿",
  Formaciones: "📚",
  Música: "🎵",
  Lecturas: "📖",
};

// ——— Helpers de normalización (evitan `any`)
const asString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

const asBool = (v: unknown, fallback = false): boolean =>
  typeof v === "boolean" ? v : fallback;

const guessTypeFromUrl = (url: string | null): ResourceRow["type"] => {
  if (!url) return "pdf";
  const u = url.toLowerCase();
  if (u.endsWith(".mp3") || u.includes("/audio")) return "audio";
  if (u.endsWith(".mp4") || u.includes("/video")) return "video";
  return "pdf";
};

const normStatus = (s: string): "draft" | "published" =>
  /^publi/i.test(s)
    ? "published"
    : /^draft|borrador/i.test(s)
    ? "draft"
    : "published";

const normCategory = (c: string): ResourceRow["category"] => {
  const m = c.toLowerCase();
  if (m.startsWith("medit")) return "Meditaciones";
  if (m.startsWith("viaje")) return "Viajes Chamánicos";
  if (m.startsWith("forma")) return "Formaciones";
  if (m.startsWith("mús") || m.startsWith("mus")) return "Música";
  return "Lecturas";
};

const normType = (
  t: string | null,
  url: string | null
): ResourceRow["type"] => {
  const tt = (t ?? "").toLowerCase();
  if (tt === "audio" || tt === "video" || tt === "pdf") return tt;
  return guessTypeFromUrl(url);
};

const isSubStatusActive = (status: SubscriptionRow["status"]): boolean =>
  status === "active" || status === "trialing";

// ¿Usuario con suscripción premium activa?
async function getIsSubscribed(): Promise<{
  isLoggedIn: boolean;
  isSubscribed: boolean;
  email: string | null;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { isLoggedIn: false, isSubscribed: false, email: null };

  // 1) profiles.plan
  const { data: profile } = await (await createClient())
    .from("profiles")
    .select("plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const planFromProfile = (profile?.plan ?? null) as ProfilePlanRow["plan"];
  if (planFromProfile === "premium") {
    return { isLoggedIn: true, isSubscribed: true, email: user.email ?? null };
  }

  // 2) subscriptions (vigente)
  const { data: subRaw } = await (await createClient())
    .from("subscriptions")
    .select("plan,status,current_period_end,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const now = new Date();
  const sub = (subRaw ?? null) as Pick<
    SubscriptionRow,
    "plan" | "status" | "current_period_end"
  > | null;

  const withinPeriod =
    sub?.current_period_end == null || new Date(sub.current_period_end) > now;

  const activePremium =
    (sub?.plan ?? null) === "premium" &&
    !!sub?.status &&
    isSubStatusActive(sub.status) &&
    withinPeriod;

  return {
    isLoggedIn: true,
    isSubscribed: activePremium,
    email: user.email ?? null,
  };
}

// Lee TODO y normaliza nombres/valores. Luego filtra en memoria.
async function fetchResources(params: URLSearchParams): Promise<ResourceRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("resources").select("*");
  if (error) {
    console.error("Supabase resources error:", error);
    return [];
  }

  const normalized: ResourceRow[] = (data ?? []).map(
    (r: Record<string, unknown>) => {
      const id = asString(r.id);
      const title = asString(r.title) || asString(r.titulo) || "Sin título";
      const desc =
        asString(r.desc) ||
        asString(r.descripcion) ||
        asString(r.excerpt) ||
        null;

      const rawCategory =
        asString(r.category) || asString(r.categoria) || "Lecturas";
      const category = normCategory(rawCategory);

      const public_url =
        (r.public_url as string | null) ??
        (r.url_publica as string | null) ??
        null;

      const type = normType(
        asString(r.type) || asString(r.tipo) || null,
        public_url
      );

      const premium =
        asBool(r.premium) ||
        asBool((r as Record<string, unknown>).es_premium) ||
        false;

      const rawStatus = asString(r.status) || asString(r.estado) || "published";
      const status = normStatus(rawStatus);

      const file_path =
        (r.file_path as string | null) ??
        (r.ruta_archivo as string | null) ??
        null;

      const created_at =
        asString(r.created_at) ||
        asString(
          (r as Record<string, unknown>).inserted_at as string | undefined
        ) ||
        new Date().toISOString();

      return {
        id,
        title,
        desc,
        category,
        type,
        premium,
        status,
        public_url,
        file_path,
        created_at,
      };
    }
  );

  // Filtros UI en memoria
  const categoria = params.get("categoria");
  const acceso = params.get("acceso");
  const tipo = params.get("tipo");
  const q = (params.get("q") ?? "").trim().toLowerCase();

  let out = normalized.filter((r) => r.status === "published");

  if (categoria && categoria !== "todas")
    out = out.filter((r) => r.category === categoria);
  if (acceso === "gratis") out = out.filter((r) => !r.premium);
  if (acceso === "premium") out = out.filter((r) => r.premium);
  if (tipo === "audio" || tipo === "video" || tipo === "pdf")
    out = out.filter((r) => r.type === tipo);
  if (q) {
    out = out.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.desc ?? "").toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }

  // Orden por fecha desc
  out.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  return out;
}

// Agrupa por categoría
function groupByCategory(items: ResourceRow[]) {
  return items.reduce<Record<string, ResourceRow[]>>((acc, item) => {
    acc[item.category] ??= [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

// Contadores para chips
function buildCounts(rows: ResourceRow[]) {
  const total = rows.length;
  const premium = rows.filter((r) => r.premium).length;
  const gratis = total - premium;

  const byType = {
    audio: rows.filter((r) => r.type === "audio").length,
    video: rows.filter((r) => r.type === "video").length,
    pdf: rows.filter((r) => r.type === "pdf").length,
  };

  const byCategory = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});

  return { total, premium, gratis, byType, byCategory };
}

// ——— Next 15: searchParams es Promise
export default async function RecursosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  // Convierte objeto en URLSearchParams
  const params = new URLSearchParams(
    Object.entries(sp).flatMap(([k, v]) =>
      typeof v === "string"
        ? [[k, v]]
        : Array.isArray(v)
        ? v.map((vv) => [k, vv])
        : []
    )
  );

  const { isLoggedIn, isSubscribed } = await getIsSubscribed();

  // Carga desde DB
  const rows = await fetchResources(params);
  const grouped = groupByCategory(rows);
  const counts = buildCounts(rows);

  // Categorías para chips
  const allCategories = Object.keys(grouped).sort() as Category[];

  const selectedCategoria = params.get("categoria") ?? "todas";
  const selectedAcceso = params.get("acceso") ?? "todos";
  const selectedTipo = params.get("tipo") ?? "todos";
  const q = params.get("q") ?? "";

  // Helper URLs de chips
  const withParam = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value === "todas" || value === "todos") p.delete(key);
    else p.set(key, value);
    return `/recursos?${p.toString()}`;
  };

  // ——— UI
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb minimal */}
      <nav aria-label="breadcrumb" className="border-b">
        <div className="container-app mx-auto flex items-center gap-2 px-4 py-3 text-sm">
          <Link href="/" className="hover:underline opacity-80">
            Inicio
          </Link>
          <span aria-hidden>›</span>
          <span className="font-medium">Recursos</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="container-app mx-auto px-4 pt-8 sm:pt-10">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-muted/40 to-transparent p-6 sm:p-8">
          {!isSubscribed && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs">
              <Star className="h-3.5 w-3.5" />
              Acceso total con {PRICE_EUR}
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Biblioteca de recursos
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Audios, videos y materiales descargables, organizados por
            categorías. Descubre contenido <strong>Gratis</strong> y desbloquea
            todo con <strong>Premium</strong>.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {!isSubscribed ? (
              <>
                <Link
                  href={SUBSCRIBE_PATH}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  Suscribirme por {PRICE_EUR} <ArrowRight className="h-4 w-4" />
                </Link>
                {!isLoggedIn && (
                  <Link
                    href={LOGIN_PATH}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                  >
                    Iniciar sesión
                  </Link>
                )}
                <p className="text-xs text-muted-foreground">
                  Cancela cuando quieras. Sin permanencia.
                </p>
              </>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100">
                <CheckCircle2 className="h-4 w-4" />
                Tienes acceso premium a todos los recursos
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Barra de búsqueda + filtros (sticky) */}
      <section className="sticky top-0 z-10 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container-app mx-auto px-4 py-3">
          <form
            action="/recursos"
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-2"
            role="search"
            aria-label="Buscar recursos"
          >
            {/* Search */}
            <div className="relative flex-1">
              <label htmlFor="q" className="sr-only">
                Buscar
              </label>
              <input
                id="q"
                name="q"
                defaultValue={q}
                placeholder="Buscar por título, descripción o categoría…"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-brand"
              />
              <Search className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-60" />
            </div>

            {/* Preserva filtros activos */}
            {selectedCategoria !== "todas" && (
              <input type="hidden" name="categoria" value={selectedCategoria} />
            )}
            {selectedAcceso !== "todos" && (
              <input type="hidden" name="acceso" value={selectedAcceso} />
            )}
            {selectedTipo !== "todos" && (
              <input type="hidden" name="tipo" value={selectedTipo} />
            )}

            <button
              type="submit"
              className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Buscar
            </button>
          </form>

          {/* Chips con contadores */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider opacity-70">
              Categorías:
            </span>
            <Chip
              href={withParam("categoria", "todas")}
              active={selectedCategoria === "todas"}
              label={`Todas (${counts.total})`}
            />
            {allCategories.map((c) => (
              <Chip
                key={c}
                href={withParam("categoria", c)}
                active={selectedCategoria === c}
                label={`${c} (${counts.byCategory[c] ?? 0})`}
              />
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider opacity-70">
              Acceso:
            </span>
            <Chip
              href={withParam("acceso", "todos")}
              active={selectedAcceso === "todos"}
              label="Todos"
            />
            <Chip
              href={withParam("acceso", "gratis")}
              active={selectedAcceso === "gratis"}
              label={`Gratis (${counts.gratis})`}
            />
            <Chip
              href={withParam("acceso", "premium")}
              active={selectedAcceso === "premium"}
              label={`Premium (${counts.premium})`}
            />

            <span className="ml-4 text-[11px] uppercase tracking-wider opacity-70">
              Tipo:
            </span>
            <Chip
              href={withParam("tipo", "todos")}
              active={selectedTipo === "todos"}
              label="Todos"
              uppercase
            />
            <Chip
              href={withParam("tipo", "audio")}
              active={selectedTipo === "audio"}
              label={`Audio (${counts.byType.audio})`}
              uppercase
            />
            <Chip
              href={withParam("tipo", "video")}
              active={selectedTipo === "video"}
              label={`Video (${counts.byType.video})`}
              uppercase
            />
            <Chip
              href={withParam("tipo", "pdf")}
              active={selectedTipo === "pdf"}
              label={`PDF (${counts.byType.pdf})`}
              uppercase
            />
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="container-app mx-auto px-4 py-8">
        {rows.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => {
              const [featured, ...rest] = items;
              return (
                <div key={category}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-xl font-bold">
                      <span className="mr-1" aria-hidden>
                        {CATEGORY_EMOJI[category as Category] ?? "📁"}
                      </span>
                      {category}
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {items.length} recurso{items.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Grid con destacado */}
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featured && (
                      <ResourceCard
                        r={featured}
                        isLoggedIn={isLoggedIn}
                        isSubscribed={isSubscribed}
                        highlight
                      />
                    )}
                    {rest.map((r) => (
                      <ResourceCard
                        key={r.id}
                        r={r}
                        isLoggedIn={isLoggedIn}
                        isSubscribed={isSubscribed}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA de cierre (solo si no está suscrito) */}
      {!isSubscribed && (
        <section className="border-t bg-muted/30">
          <div className="container-app mx-auto flex flex-col items-center gap-4 px-4 py-10 text-center">
            <h3 className="text-lg sm:text-xl font-semibold">
              Desbloquea toda la biblioteca EDHUCO
            </h3>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Acceso a meditaciones, viajes chamánicos, formaciones y material
              premium por solo {PRICE_EUR}. Nuevos recursos cada mes.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={SUBSCRIBE_PATH}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Suscribirme ahora <Sparkles className="h-4 w-4" />
              </Link>
              {!isLoggedIn && (
                <Link
                  href={LOGIN_PATH}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Puedes cancelar cuando quieras.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

/* ———————————————————————— */
/* Componentes de UI internos */
/* ———————————————————————— */

function Chip({
  href,
  active,
  label,
  uppercase = false,
}: {
  href: string;
  active: boolean;
  label: string;
  uppercase?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active ? "bg-foreground text-background" : "hover:bg-muted",
        uppercase ? "uppercase" : "",
      ].join(" ")}
      aria-current={active ? "true" : undefined}
    >
      {label}
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-8 text-center shadow-xs">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Filter className="h-5 w-5 opacity-70" />
      </div>
      <p className="text-lg font-semibold">No encontramos recursos</p>
      <p className="mt-1 text-muted-foreground">
        Ajusta la búsqueda o limpia los filtros para ver más resultados.
      </p>
      <div className="mt-4">
        <Link
          href="/recursos"
          className="inline-flex rounded-lg border px-3 py-2 text-sm hover:bg-muted"
        >
          Limpiar filtros
        </Link>
      </div>
    </div>
  );
}

function ResourceCard({
  r,
  isLoggedIn,
  isSubscribed,
  highlight = false,
}: {
  r: ResourceRow;
  isLoggedIn: boolean;
  isSubscribed: boolean;
  highlight?: boolean;
}) {
  const locked = r.premium && !isSubscribed;
  const canAccess = !locked;
  const actionHref =
    canAccess && r.public_url
      ? r.public_url
      : canAccess
      ? `/api/recursos/signed-url?id=${r.id}`
      : isLoggedIn
      ? SUBSCRIBE_PATH
      : LOGIN_PATH;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-card p-4 transition-shadow hover:shadow-md",
        highlight ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      {/* Etiquetas */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={[
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            r.premium
              ? "bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200"
              : "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200",
          ].join(" ")}
        >
          {r.premium ? (
            <>
              <Lock className="h-3.5 w-3.5" /> Premium
            </>
          ) : (
            <>
              <Unlock className="h-3.5 w-3.5" /> Gratis
            </>
          )}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] uppercase tracking-wide">
          <TypeIcon type={r.type} className="h-3.5 w-3.5" />
          {r.type}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px]">
          {CATEGORY_EMOJI[r.category]} {r.category}
        </span>
      </div>

      <h3 className="text-base font-semibold leading-tight">{r.title}</h3>
      <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
        {r.desc ?? ""}
      </p>

      <div className="mt-4 flex items-center justify-between">
        {locked ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isLoggedIn ? "Suscribirme" : "Iniciar sesión"}
            <Sparkles className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
            prefetch={false}
          >
            {r.type === "video" ? "Reproducir" : "Descargar / Abrir"}
            {r.type === "video" ? (
              <PlayCircle className="h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Link>
        )}

        {!locked && r.premium && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Incluido en tu suscripción
          </span>
        )}
      </div>
    </article>
  );
}
