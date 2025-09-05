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
  premium: boolean; // free/premium lo resolvemos con este boolean
  status: "draft" | "published";
  public_url: string | null; // archivos públicos
  file_path: string | null; // ruta en Storage privado (si aplica)
  created_at: string;
};

type Plan = "free" | "premium";

// Si usas `profiles.plan` para guardar el plan actual del usuario
type ProfilePlanRow = {
  plan: Plan | null;
};

// Si además mantienes un histórico en `subscriptions`
type SubscriptionRow = {
  user_id: string;
  plan: Plan | null; // <- NUEVO: plan explícito
  status: "active" | "past_due" | "canceled" | "incomplete" | "trialing";
  current_period_end: string | null;
  created_at: string;
};

const PRICE_EUR = "3,99 € / mes";
const SUBSCRIBE_PATH = "/suscripcion";
const LOGIN_PATH = "/auth/login";

// Icono por tipo
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

  // 1) Fuente primaria: profiles.plan
  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .select("plan")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profErr) {
    console.error("Supabase profiles error:", profErr);
  }

  const planFromProfile = (profile?.plan ?? null) as ProfilePlanRow["plan"];
  if (planFromProfile === "premium") {
    return { isLoggedIn: true, isSubscribed: true, email: user.email ?? null };
  }

  // 2) Respaldo: subscriptions (plan='premium' y vigente)
  const { data: subRaw, error: subErr } = await supabase
    .from("subscriptions")
    .select("plan,status,current_period_end,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subErr) {
    console.error("Supabase subscriptions error:", subErr);
  }

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

  // Normaliza cada fila soportando múltiples convenciones de nombres
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

      // premium/free
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

  // Aplica filtros de la UI en memoria
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

  // Ordena por created_at descendente
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

// ——— Next 15: searchParams es Promise y debe awaited
export default async function RecursosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  // Convierte objeto en URLSearchParams (soporta arrays)
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

  // Carga desde DB (normalizado + filtrado en memoria)
  const rows = await fetchResources(params);

  // Categorías para chips
  const allCategories = Array.from(new Set(rows.map((r) => r.category))).sort();

  const selectedCategoria = params.get("categoria") ?? "todas";
  const selectedAcceso = params.get("acceso") ?? "todos";
  const selectedTipo = params.get("tipo") ?? "todos";
  const q = params.get("q") ?? "";

  const grouped = groupByCategory(rows);

  // Helper URLs de chips
  const withParam = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value === "todas" || value === "todos") p.delete(key);
    else p.set(key, value);
    return `/recursos?${p.toString()}`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="border-b">
        <div className="container-app mx-auto flex items-center gap-2 px-4 py-3 text-sm">
          <Link href="/" className="hover:underline opacity-80">
            Inicio
          </Link>
          <span aria-hidden>›</span>
          <span className="font-medium">Recursos</span>
        </div>
      </nav>

      {/* Header */}
      <section className="container-app mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Biblioteca de recursos
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Audios, videos y materiales descargables, organizados por
              categorías. Algunos son <strong>Gratis</strong> y otros son{" "}
              <strong>Premium</strong> con una única suscripción de {PRICE_EUR}.
            </p>
            {!isSubscribed && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>
                  Accede a todo con la suscripción:{" "}
                  <Link
                    href={SUBSCRIBE_PATH}
                    className="font-semibold underline underline-offset-4"
                  >
                    {PRICE_EUR}
                  </Link>
                </span>
              </div>
            )}
          </div>

          {/* Buscador */}
          <form
            action="/recursos"
            className="w-full sm:w-auto"
            role="search"
            aria-label="Buscar recursos"
          >
            <div className="flex items-stretch gap-2">
              <label htmlFor="q" className="sr-only">
                Buscar
              </label>
              <div className="relative flex-1 sm:w-80">
                <input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="Buscar por título, descripción..."
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-brand"
                />
                <Filter className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-60" />
              </div>

              {/* Preserva filtros activos */}
              {selectedCategoria !== "todas" && (
                <input
                  type="hidden"
                  name="categoria"
                  value={selectedCategoria}
                />
              )}
              {selectedAcceso !== "todos" && (
                <input type="hidden" name="acceso" value={selectedAcceso} />
              )}
              {selectedTipo !== "todos" && (
                <input type="hidden" name="tipo" value={selectedTipo} />
              )}

              <button
                type="submit"
                className="rounded-lg border bg-primary/90 px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Filtros por chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider opacity-70">
            Categorías:
          </span>
          <Link
            href={withParam("categoria", "todas")}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              selectedCategoria === "todas"
                ? "bg-foreground text-background"
                : "hover:bg-muted"
            }`}
          >
            Todas
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c}
              href={withParam("categoria", c)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                selectedCategoria === c
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider opacity-70">
            Acceso:
          </span>
          {["todos", "gratis", "premium"].map((a) => (
            <Link
              key={a}
              href={withParam("acceso", a)}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize ${
                selectedAcceso === a
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {a}
            </Link>
          ))}
          <span className="ml-4 text-xs uppercase tracking-wider opacity-70">
            Tipo:
          </span>
          {["todos", "audio", "video", "pdf"].map((t) => (
            <Link
              key={t}
              href={withParam("tipo", t)}
              className={`rounded-full border px-3 py-1.5 text-sm uppercase ${
                selectedTipo === t
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* Contenido */}
      <section className="container-app mx-auto px-4 pb-12">
        {Object.keys(grouped).length === 0 ? (
          <div className="rounded-xl border p-8 text-center">
            <p className="text-lg font-semibold">
              No encontramos recursos con esos filtros.
            </p>
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
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-xl font-bold">{category}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r) => {
                    const locked = r.premium && !isSubscribed;
                    const canAccess = !locked;
                    const actionHref =
                      canAccess && r.public_url
                        ? r.public_url
                        : canAccess
                        ? `/api/recursos/signed-url?id=${r.id}` // Implementa esta API para Storage privado
                        : isLoggedIn
                        ? SUBSCRIBE_PATH
                        : LOGIN_PATH;

                    return (
                      <article
                        key={r.id}
                        className="group relative overflow-hidden rounded-2xl border bg-card p-4 transition-shadow hover:shadow-md"
                      >
                        {/* Etiquetas */}
                        <div className="mb-3 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                              r.premium
                                ? "bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200"
                                : "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200"
                            }`}
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

                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                            <TypeIcon type={r.type} className="h-3.5 w-3.5" />
                            {r.type.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold leading-tight">
                          {r.title}
                        </h3>
                        <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                          {r.desc ?? ""}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          {locked ? (
                            <Link
                              href={actionHref}
                              className="inline-flex items-center gap-2 rounded-lg border bg-primary/90 px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary"
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
                              {r.type === "video"
                                ? "Reproducir"
                                : "Descargar / Abrir"}
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
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
