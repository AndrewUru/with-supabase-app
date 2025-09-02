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

type Resource = {
  id: string;
  title: string;
  desc: string;
  category:
    | "Meditaciones"
    | "Viajes Chamánicos"
    | "Formaciones"
    | "Música"
    | "Lecturas";
  type: "audio" | "video" | "pdf";
  premium: boolean;
  href: string; // URL de reproducción o descarga
};

// ————————————————————————————————————————————————————————————
// CATÁLOGO (puedes sustituir por datos desde BD cuando lo tengas)
const CATALOG: Resource[] = [
  // Gratis
  {
    id: "medit-001",
    title: "Respiración consciente (5 min)",
    desc: "Práctica breve para centrarte y regular el día.",
    category: "Meditaciones",
    type: "audio",
    premium: false,
    href: "/assets/recursos/respiracion-consciente.mp3",
  },
  {
    id: "read-001",
    title: "Fundamentos de presencia",
    desc: "PDF con pautas simples para integrar presencia en lo cotidiano.",
    category: "Lecturas",
    type: "pdf",
    premium: false,
    href: "/assets/recursos/fundamentos-presencia.pdf",
  },
  // Premium
  {
    id: "viaje-001",
    title: "Viaje chamánico al animal de poder",
    desc: "Audio guiado con maraca y tambor para conectar con tu arquetipo guía.",
    category: "Viajes Chamánicos",
    type: "audio",
    premium: true,
    href: "/assets/recursos/viaje-animal-poder.mp3",
  },
  {
    id: "form-001",
    title: "Mini-curso: Autocuidado energético",
    desc: "Video de 25 min + hoja de ruta descargable.",
    category: "Formaciones",
    type: "video",
    premium: true,
    href: "/assets/recursos/autocuidado-energetico.mp4",
  },
  {
    id: "mus-001",
    title: "Pulsos de Tierra – Pista 1",
    desc: "Pieza musical para meditar o acompañar tu práctica.",
    category: "Música",
    type: "audio",
    premium: true,
    href: "/assets/recursos/pulsos-de-tierra-1.mp3",
  },
  {
    id: "read-002",
    title: "Bitácora de integración",
    desc: "PDF imprimible para integrar sesiones, viajes y formaciones.",
    category: "Lecturas",
    type: "pdf",
    premium: true,
    href: "/assets/recursos/bitacora-integracion.pdf",
  },
];

const PRICE_EUR = "3,99 € / mes";
const SUBSCRIBE_PATH = "/suscripcion";
const LOGIN_PATH = "/auth/login";

// ————————————————————————————————————————————————————————————
// Utilidad para agrupar por categoría
function groupByCategory(items: Resource[]) {
  return items.reduce<Record<string, Resource[]>>((acc, item) => {
    acc[item.category] ??= [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

// Icono por tipo
function TypeIcon({
  type,
  className,
}: {
  type: Resource["type"];
  className?: string;
}) {
  if (type === "audio") return <Music2 className={className} aria-hidden />;
  if (type === "video") return <PlayCircle className={className} aria-hidden />;
  return <FileText className={className} aria-hidden />;
}

// Comprueba si el usuario está suscrito (única suscripción)
// Intenta primero en profiles.is_subscribed y si no, busca en subscriptions con status 'active'
async function getIsSubscribed() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      isLoggedIn: false,
      isSubscribed: false,
      email: null as string | null,
    };

  // 1) Intento con profiles.is_subscribed
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_subscribed, email")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.is_subscribed === true) {
    return {
      isLoggedIn: true,
      isSubscribed: true,
      email: profile.email ?? user.email ?? null,
    };
  }

  // 2) Fallback con subscriptions (depende de tu esquema)
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const active = sub?.status === "active";
  return { isLoggedIn: true, isSubscribed: active, email: user.email ?? null };
}

// Filtros por querystring (servidor, sin client state)
function filterCatalog(params: URLSearchParams) {
  const categoria = params.get("categoria"); // nombre exacto de categoría
  const acceso = params.get("acceso"); // "gratis" | "premium" | null
  const tipo = params.get("tipo"); // "audio" | "video" | "pdf" | null
  const q = (params.get("q") ?? "").toLowerCase().trim();

  let items = CATALOG.slice();

  if (categoria && categoria !== "todas") {
    items = items.filter((r) => r.category === categoria);
  }
  if (acceso === "gratis") items = items.filter((r) => !r.premium);
  if (acceso === "premium") items = items.filter((r) => r.premium);
  if (tipo === "audio" || tipo === "video" || tipo === "pdf") {
    items = items.filter((r) => r.type === tipo);
  }
  if (q) {
    items = items.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }
  return items;
}

export default async function RecursosPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = new URLSearchParams(
    Object.entries(searchParams ?? {}).flatMap(([k, v]) =>
      typeof v === "string" ? [[k, v]] : v ? v.map((vv) => [k, vv]) : []
    )
  );

  const { isLoggedIn, isSubscribed } = await getIsSubscribed();

  const filtered = filterCatalog(params);
  const grouped = groupByCategory(filtered);

  // Listas para chips de filtro
  const allCategories = Array.from(
    new Set(CATALOG.map((r) => r.category))
  ).sort();
  const selectedCategoria = params.get("categoria") ?? "todas";
  const selectedAcceso = params.get("acceso") ?? "todos";
  const selectedTipo = params.get("tipo") ?? "todos";
  const q = params.get("q") ?? "";

  // ayudante para construir URLs de filtro
  const withParam = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value === "todas" || value === "todos") p.delete(key);
    else p.set(key, value);
    // al cambiar filtro, volvemos a la página base /recursos
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
              categorías. Algunos son
              <strong> Gratis</strong> y otros son <strong>Premium</strong> con
              una única suscripción de {PRICE_EUR}.
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

          {/* Buscador simple (server: via searchParams) */}
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

              {/* Preservamos filtros activos */}
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

        {/* Filtros por chips (enlaces server) */}
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
                          {r.desc}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          {locked ? (
                            <Link
                              href={isLoggedIn ? SUBSCRIBE_PATH : LOGIN_PATH}
                              className="inline-flex items-center gap-2 rounded-lg border bg-primary/90 px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary"
                            >
                              {isLoggedIn ? "Suscribirme" : "Iniciar sesión"}
                              <Sparkles className="h-4 w-4" />
                            </Link>
                          ) : (
                            <Link
                              href={r.href}
                              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
                              prefetch={false}
                            >
                              {r.type === "pdf" || r.type === "audio"
                                ? "Descargar / Abrir"
                                : "Reproducir"}
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
