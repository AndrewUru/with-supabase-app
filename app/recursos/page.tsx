// app/recursos/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  Lock,
  Music2,
  PlayCircle,
  Search,
  Sparkles,
  Star,
  Unlock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Recursos | EDHUCO",
  description:
    "Accede a audios, videos y materiales descargables de EDHUCO. Explora recursos por categoria, tipo y nivel de acceso.",
  openGraph: {
    title: "Recursos | EDHUCO",
    description:
      "Explora la biblioteca de recursos de EDHUCO: audios, videos y PDF clasificados por categoria.",
    url: "/recursos",
    siteName: "EDHUCO",
  },
};

const WIPHLA_GRADIENT =
  "linear-gradient(120deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

const PRICE_EUR = "22 EUR / mes";
const SUBSCRIBE_PATH = "/precios";
const LOGIN_PATH = "/auth/login";

const CATEGORY_MARK: Record<Category, string> = {
  Meditaciones: "Medit",
  "Viajes Chamanicos": "Viaje",
  Formaciones: "Form",
  Musica: "Mus",
  Lecturas: "Lect",
};

const ACCESS_FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "gratis", label: "Gratis" },
  { value: "premium", label: "Premium" },
] as const;

const TYPE_FILTERS = [
  { value: "todos", label: "Todo" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF" },
] as const;

type Plan = "free" | "premium";

type Category =
  | "Meditaciones"
  | "Viajes Chamanicos"
  | "Formaciones"
  | "Musica"
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

function TypeIcon({
  type,
  className,
}: {
  type: ResourceRow["type"];
  className?: string;
}) {
  if (type === "audio")
    return <Music2 className={className} aria-hidden data-oid="6d3.n-v" />;
  if (type === "video")
    return <PlayCircle className={className} aria-hidden data-oid="mta9:na" />;
  return <FileText className={className} aria-hidden data-oid="w-porc." />;
}

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

const normCategory = (c: string): Category => {
  const m = c.toLowerCase();
  if (m.startsWith("medit")) return "Meditaciones";
  if (m.startsWith("viaje")) return "Viajes Chamanicos";
  if (m.startsWith("forma")) return "Formaciones";
  if (m.startsWith("mus")) return "Musica";
  return "Lecturas";
};

const normType = (
  t: string | null,
  url: string | null,
): ResourceRow["type"] => {
  const tt = (t ?? "").toLowerCase();
  if (tt === "audio" || tt === "video" || tt === "pdf") return tt;
  return guessTypeFromUrl(url);
};

const isSubStatusActive = (status: SubscriptionRow["status"]): boolean =>
  status === "active" || status === "trialing";

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

  const { data: profile } = await (await createClient())
    .from("profiles")
    .select("plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const planFromProfile = (profile?.plan ?? null) as ProfilePlanRow["plan"];
  if (planFromProfile === "premium") {
    return { isLoggedIn: true, isSubscribed: true, email: user.email ?? null };
  }

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

async function fetchResources(params: URLSearchParams): Promise<ResourceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("resources").select("*");
  if (error) {
    console.error("Supabase resources error:", error);
    return [];
  }

  const normalized: ResourceRow[] = (data ?? []).map((raw) => {
    const record = raw as Record<string, unknown>;

    const id = asString(record.id);
    const title =
      asString(record.title) || asString(record.titulo) || "Sin titulo";
    const desc =
      asString(record.desc) ||
      asString(record.descripcion) ||
      asString(record.excerpt) ||
      null;

    const rawCategory =
      asString(record.category) || asString(record.categoria) || "Lecturas";
    const category = normCategory(rawCategory);

    const public_url =
      (record.public_url as string | null) ??
      (record.url_publica as string | null) ??
      null;

    const type = normType(
      asString(record.type) || asString(record.tipo) || null,
      public_url,
    );

    const premium =
      asBool(record.premium) || asBool(record.es_premium) || false;

    const rawStatus =
      asString(record.status) || asString(record.estado) || "published";
    const status = normStatus(rawStatus);

    const file_path =
      (record.file_path as string | null) ??
      (record.ruta_archivo as string | null) ??
      null;

    const created_at =
      asString(record.created_at) ||
      asString(record.inserted_at as string | undefined) ||
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
  });

  const categoria = params.get("categoria");
  const acceso = params.get("acceso");
  const tipo = params.get("tipo");
  const q = (params.get("q") ?? "").trim().toLowerCase();

  let out = normalized.filter((r) => r.status === "published");

  if (categoria && categoria !== "todas") {
    out = out.filter(
      (r) => r.category.toLowerCase() === categoria.toLowerCase(),
    );
  }

  if (acceso === "gratis") {
    out = out.filter((r) => !r.premium);
  } else if (acceso === "premium") {
    out = out.filter((r) => r.premium);
  }

  if (tipo && tipo !== "todos") {
    out = out.filter((r) => r.type === tipo);
  }

  if (q) {
    out = out.filter((r) => {
      const haystack = `${r.title} ${r.desc ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  return out.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

function groupByCategory(items: ResourceRow[]) {
  return items.reduce<Record<string, ResourceRow[]>>((acc, item) => {
    acc[item.category] ??= [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

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

export default async function RecursosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const params = new URLSearchParams(
    Object.entries(sp).flatMap(([k, v]) =>
      typeof v === "string"
        ? [[k, v]]
        : Array.isArray(v)
          ? v.map((vv) => [k, vv])
          : [],
    ),
  );

  const { isLoggedIn, isSubscribed } = await getIsSubscribed();
  const rows = await fetchResources(params);
  const grouped = groupByCategory(rows);
  const counts = buildCounts(rows);

  const allCategories = Object.keys(grouped).sort() as Category[];

  const selectedCategoria = params.get("categoria") ?? "todas";
  const selectedAcceso = params.get("acceso") ?? "todos";
  const selectedTipo = params.get("tipo") ?? "todos";
  const q = params.get("q") ?? "";

  const withParam = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value === "todas" || value === "todos") p.delete(key);
    else p.set(key, value);
    const qs = p.toString();
    return qs ? `/recursos?${qs}` : "/recursos";
  };

  return (
    <main className="flex flex-col" data-oid="m3fq4i.">
      <section
        className="relative isolate overflow-hidden py-20"
        aria-labelledby="recursos-hero-title"
        data-oid="y96qooj"
      >
        <HeroBackgroundDecor data-oid="kaswtq7" />
        <div
          className="container-app relative z-10 grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"
          data-oid="2gc9vs."
        >
          <div className="space-y-8" data-oid="qgqokn8">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80"
              data-oid="dznh8oe"
            >
              <span
                className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/40 dark:ring-white/25"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
                data-oid="_2dmpdr"
              />
              Biblioteca EDHUCO
            </span>

            <div className="space-y-5" data-oid="52f8dbz">
              <h1
                id="recursos-hero-title"
                className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[46px]"
                data-oid="mv0t6es"
              >
                Recursos vivos para tu proceso
              </h1>
              <p
                className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                data-oid="9gtwcrr"
              >
                Audios, videos y guias descargables que combinan saberes
                ancestrales con practicas contemporaneas. Explora contenidos
                gratuitos y desbloquea la biblioteca completa por {PRICE_EUR}.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3" data-oid="x:k76kz">
              <StatBadge
                label="Recursos activos"
                value={counts.total.toString()}
                helper={`Gratis ${counts.gratis} | Premium ${counts.premium}`}
                data-oid="ln1x9ip"
              />

              <StatBadge
                label="Formatos"
                value={`${counts.byType.audio}A / ${counts.byType.video}V / ${counts.byType.pdf}P`}
                helper="Audio | Video | PDF"
                data-oid="bmrjpwm"
              />

              <StatBadge
                label="Categoria favorita"
                value={topCategoryLabel(counts.byCategory)}
                helper="Basado en volumen actual"
                data-oid=":65unze"
              />
            </div>

            {!isSubscribed && (
              <div
                className="rounded-2xl border border-white/15 bg-card/80 p-5 shadow-[0_30px_90px_-68px_rgba(17,24,39,0.82)] backdrop-blur-sm dark:bg-card/60"
                data-oid="-.h7-5j"
              >
                <p className="text-sm text-muted-foreground" data-oid="877tuf9">
                  Tu suscripcion sostiene becas, nuevos materiales y encuentros
                  abiertos. Accede a toda la biblioteca premium por {PRICE_EUR}.
                </p>
                <div className="mt-4 flex flex-wrap gap-3" data-oid="jstwnz0">
                  <Link
                    href={SUBSCRIBE_PATH}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-lg"
                    data-oid="1d:wne."
                  >
                    Subscribirme ahora
                    <ArrowRight
                      className="h-4 w-4"
                      aria-hidden="true"
                      data-oid="fdp6t-1"
                    />
                  </Link>
                  {!isLoggedIn && (
                    <Link
                      href={LOGIN_PATH}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
                      data-oid="qr8nsv0"
                    >
                      Iniciar sesion
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className="space-y-6 rounded-[32px] border border-white/15 bg-card/85 p-6 shadow-[0_36px_110px_-72px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/65"
            data-oid="k-gviqg"
          >
            <form
              action="/recursos"
              method="get"
              className="space-y-4"
              data-oid="pdi4vbs"
            >
              <div className="relative" data-oid="-8sjqvi">
                <Search
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                  data-oid="pi29fsz"
                />

                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Buscar por titulo o descripcion"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                  data-oid="2qbkpi0"
                />

                {selectedCategoria !== "todas" && (
                  <input
                    type="hidden"
                    name="categoria"
                    value={selectedCategoria}
                    data-oid="9-w58_x"
                  />
                )}
                {selectedAcceso !== "todos" && (
                  <input
                    type="hidden"
                    name="acceso"
                    value={selectedAcceso}
                    data-oid="0.3_3mo"
                  />
                )}
                {selectedTipo !== "todos" && (
                  <input
                    type="hidden"
                    name="tipo"
                    value={selectedTipo}
                    data-oid="ib1jmwc"
                  />
                )}
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
                data-oid="opimmnc"
              >
                Filtrar resultados
              </button>
            </form>

            <div className="space-y-4" data-oid="io.kh3v">
              <FilterSection
                title="Acceso"
                chips={ACCESS_FILTERS.map(({ value, label }) => ({
                  href: withParam("acceso", value),
                  label,
                  active: selectedAcceso === value,
                }))}
                data-oid="5q-aghd"
              />

              <FilterSection
                title="Formato"
                chips={TYPE_FILTERS.map(({ value, label }) => ({
                  href: withParam("tipo", value),
                  label,
                  active: selectedTipo === value,
                }))}
                data-oid="2ip5-57"
              />

              <FilterSection
                title="Categoria"
                chips={[
                  {
                    href: withParam("categoria", "todas"),
                    label: "Todas",
                    active: selectedCategoria === "todas",
                  },
                  ...allCategories.map((cat) => ({
                    href: withParam("categoria", cat.toLowerCase()),
                    label: cat,
                    active:
                      selectedCategoria.toLowerCase() === cat.toLowerCase(),
                  })),
                ]}
                data-oid="nzql2db"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative isolate overflow-hidden border-t border-white/5 bg-card/5 py-20"
        data-oid="lm1p2zv"
      >
        <ResourcesBackgroundDecor data-oid="zshuh-p" />
        <div
          className="container-app relative z-10 space-y-14"
          data-oid="kpvdcj4"
        >
          {rows.length === 0 ? (
            <EmptyState data-oid="fwz.t0b" />
          ) : (
            <div className="space-y-14" data-oid="cq80ljj">
              {allCategories.map((category) => {
                const items = grouped[category] ?? [];
                if (items.length === 0) return null;

                return (
                  <div key={category} className="space-y-8" data-oid="kg1k137">
                    <header
                      className="flex flex-wrap items-center justify-between gap-3"
                      data-oid="8yvr_w_"
                    >
                      <div data-oid="d0bu047">
                        <p
                          className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80"
                          data-oid="07vt4tt"
                        >
                          {CATEGORY_MARK[category]} - {category}
                        </p>
                        <h2
                          className="mt-2 text-2xl font-semibold text-foreground"
                          data-oid="fqgrp0t"
                        >
                          {category}
                        </h2>
                      </div>
                      <span
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold text-muted-foreground/80 backdrop-blur-sm"
                        data-oid="g8vs5kv"
                      >
                        <Star
                          className="h-4 w-4"
                          aria-hidden="true"
                          data-oid="s5aaybp"
                        />{" "}
                        {items.length} recursos
                      </span>
                    </header>

                    <div
                      className="grid gap-6 lg:grid-cols-2"
                      data-oid="ty48di6"
                    >
                      {items.map((resource, index) => (
                        <ResourceCard
                          key={resource.id}
                          r={resource}
                          isLoggedIn={isLoggedIn}
                          isSubscribed={isSubscribed}
                          highlight={
                            index === 0 && resource.premium && isSubscribed
                          }
                          data-oid="eb_evze"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FilterSection({
  title,
  chips,
}: {
  title: string;
  chips: { href: string; label: string; active: boolean }[];
}) {
  return (
    <div className="space-y-2" data-oid="lo4:.6t">
      <p
        className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground"
        data-oid="iqmk9s0"
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2" data-oid="0163yyc">
        {chips.map((chip) => (
          <FilterChip
            key={`${title}-${chip.label}`}
            {...chip}
            data-oid="ijn3l1e"
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] backdrop-blur-sm transition",
        active
          ? "border-white/40 bg-white/15 text-foreground"
          : "border-white/15 bg-white/5 text-foreground/70 hover:border-white/25 hover:text-foreground",
      ].join(" ")}
      aria-current={active ? "true" : undefined}
      data-oid="90bfzb."
    >
      {active && (
        <span
          className="h-1.5 w-6 rounded-full"
          style={{ backgroundImage: WIPHLA_GRADIENT }}
          aria-hidden="true"
          data-oid="-tnu06c"
        />
      )}
      {label}
    </Link>
  );
}

function EmptyState() {
  return (
    <div
      className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-card/80 p-10 text-center shadow-[0_30px_90px_-68px_rgba(17,24,39,0.82)] backdrop-blur-sm dark:bg-card/60"
      data-oid="1.667u."
    >
      <div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10"
        data-oid="blzlkco"
      >
        <Filter
          className="h-5 w-5 text-muted-foreground"
          aria-hidden="true"
          data-oid="6b8vssp"
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground" data-oid="x-zfkzm">
        No encontramos recursos
      </h3>
      <p className="mt-2 text-sm text-muted-foreground" data-oid="jzk9kd-">
        Ajusta la busqueda o limpia los filtros para explorar la biblioteca
        completa.
      </p>
      <Link
        href="/recursos"
        prefetch={false}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
        data-oid="pliwlhi"
      >
        Limpiar filtros
      </Link>
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
        "group relative overflow-hidden rounded-3xl border border-white/15 bg-card/80 p-6 shadow-[0_32px_90px_-66px_rgba(17,24,39,0.85)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_40px_120px_-64px_rgba(17,24,39,0.9)] dark:bg-card/60",
        highlight ? "border-white/30" : "",
      ].join(" ")}
      data-oid="3p0ld:5"
    >
      <header
        className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80"
        data-oid="h0wydkj"
      >
        <span
          className={[
            "inline-flex items-center gap-1 rounded-full px-2 py-1",
            r.premium
              ? "border border-amber-300/60 bg-amber-300/20 text-amber-900 dark:text-amber-200"
              : "border border-emerald-300/60 bg-emerald-300/15 text-emerald-900 dark:text-emerald-200",
          ].join(" ")}
          data-oid="7tj6ox6"
        >
          {r.premium ? (
            <>
              <Lock
                className="h-3.5 w-3.5"
                aria-hidden="true"
                data-oid="qqy5tq8"
              />{" "}
              Premium
            </>
          ) : (
            <>
              <Unlock
                className="h-3.5 w-3.5"
                aria-hidden="true"
                data-oid="_her7ub"
              />{" "}
              Gratis
            </>
          )}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/8 px-2 py-1 text-[11px] text-foreground/80"
          data-oid="_c3o:1n"
        >
          <TypeIcon type={r.type} className="h-3.5 w-3.5" data-oid="._iylb4" />
          {r.type}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/8 px-2 py-1 text-[11px] text-foreground/80"
          data-oid="3egdpbl"
        >
          {CATEGORY_MARK[r.category]}
        </span>
      </header>

      <div className="mt-4 space-y-3" data-oid="47ho_r0">
        <h3
          className="text-lg font-semibold text-foreground"
          data-oid="rmk_kvw"
        >
          {r.title}
        </h3>
        <p
          className="text-sm leading-relaxed text-muted-foreground line-clamp-4"
          data-oid="ykk3mjn"
        >
          {r.desc ?? ""}
        </p>
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-3"
        data-oid="dh4.dhb"
      >
        <Link
          href={actionHref}
          prefetch={false}
          className={[
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
            locked
              ? "bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] text-foreground shadow-sm hover:shadow-lg"
              : "border border-white/20 bg-white/5 text-foreground/80 backdrop-blur-sm hover:border-white/35 hover:text-foreground",
          ].join(" ")}
          data-oid="9vfcwn2"
        >
          {locked
            ? isLoggedIn
              ? "Subscribirme"
              : "Iniciar sesion"
            : r.type === "video"
              ? "Reproducir"
              : "Descargar"}
          {locked ? (
            <Sparkles
              className="h-4 w-4"
              aria-hidden="true"
              data-oid="5y0i11a"
            />
          ) : r.type === "video" ? (
            <PlayCircle
              className="h-4 w-4"
              aria-hidden="true"
              data-oid="kav7ej3"
            />
          ) : (
            <Download
              className="h-4 w-4"
              aria-hidden="true"
              data-oid="-m5qy7s"
            />
          )}
        </Link>
        {!locked && r.premium && (
          <span
            className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"
            data-oid="ysu5381"
          >
            <CheckCircle2
              className="h-4 w-4"
              aria-hidden="true"
              data-oid="71-xyfu"
            />
            Incluido en tu plan
          </span>
        )}
      </div>
    </article>
  );
}

function StatBadge({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/15 bg-card/80 p-4 shadow-[0_24px_70px_-60px_rgba(17,24,39,0.8)] backdrop-blur-sm dark:bg-card/60"
      data-oid="n1d6n2d"
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80"
        data-oid="c8x14a4"
      >
        {label}
      </p>
      <p
        className="mt-2 text-2xl font-semibold text-foreground"
        data-oid="xurccqz"
      >
        {value}
      </p>
      <p className="text-xs text-muted-foreground/70" data-oid="9.er40s">
        {helper}
      </p>
    </div>
  );
}

function topCategoryLabel(byCategory: Record<string, number>) {
  const entry = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  if (!entry) return "Explora";
  return `${entry[0]} (${entry[1]})`;
}

function HeroBackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      data-oid="hz:hpro"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 10%, rgba(238,49,36,0.22), transparent 58%), radial-gradient(circle at 82% 18%, rgba(0,132,201,0.2), transparent 64%), radial-gradient(circle at 50% 120%, rgba(0,168,89,0.22), transparent 70%)",
        }}
        data-oid="i0gp.ac"
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
        data-oid="37irk4q"
      />
    </div>
  );
}

function ResourcesBackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      data-oid="jtdo3b5"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 12%, rgba(255,107,0,0.18), transparent 58%), radial-gradient(circle at 80% 18%, rgba(0,132,201,0.18), transparent 64%), radial-gradient(circle at 48% 120%, rgba(0,168,89,0.2), transparent 70%)",
        }}
        data-oid="nnmzw7w"
      />
    </div>
  );
}
