// components/site/AboutEdhuco.tsx
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  Headphones,
  Video,
  Download,
  BookmarkCheck,
  BellRing,
  CheckCircle2,
  ArrowRight,
  Euro,
} from "lucide-react";

const WIPHLA_COLORS = [
  "#EE3124",
  "#FF6B00",
  "#FFD500",
  "#FFFFFF",
  "#00A859",
  "#0084C9",
  "#6D3B96",
];

const WIPHLA_GRADIENT =
  "linear-gradient(120deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

type ResourceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const RESOURCES: ResourceItem[] = [
  {
    icon: FileText,
    title: "PDFs guiados",
    description: "Guias, ejercicios y bitacoras para integrar cada practica.",
  },
  {
    icon: Headphones,
    title: "Audios",
    description: "Meditaciones, respiracion y sesiones de voz para tus rutinas.",
  },
  {
    icon: Video,
    title: "Videos",
    description: "Clases cortas y demostraciones paso a paso.",
  },
  {
    icon: BookmarkCheck,
    title: "Favoritos",
    description: "Guarda tus recursos clave para volver a ellos rapido.",
  },
  {
    icon: Download,
    title: "Descargas",
    description: "Acceso offline a PDFs seleccionados y materiales marcados.",
  },
  {
    icon: BellRing,
    title: "Recordatorios",
    description: "Notificaciones opcionales para sostener el habito.",
  },
];

const FREE_PLAN_FEATURES: string[] = [
  "Acceso al area personal con perfil basico",
  "2 recursos abiertos al mes (audios o PDFs seleccionados)",
  "Agenda publica de actividades y eventos",
  "Newsletter con tips y mini-retos mensuales",
  "Favoritos limitados (hasta 5)",
  "Modo oscuro y experiencia sin anuncios intrusivos",
];

const PRO_PLAN_FEATURES: string[] = [
  "Biblioteca completa (audios, videos y PDFs)",
  "Descargas ampliadas para uso offline",
  "Favoritos ilimitados y progreso guardado",
  "Listas o colecciones personalizadas",
  "Recordatorios avanzados y rutinas guiadas",
  "Acceso prioritario a nuevas formaciones y SOMRIU",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Que necesito para empezar?",
    answer:
      "Crea una cuenta gratuita. Desde tu perfil podras explorar recursos abiertos y probar la experiencia.",
  },
  {
    question: "Puedo cancelar cuando quiera?",
    answer:
      "Si. La suscripcion es mensual y la puedes cancelar en cualquier momento desde tu area personal.",
  },
  {
    question: "Como se actualiza el contenido?",
    answer:
      "Publicamos nuevos audios, videos y PDFs periodicamente. Te avisaremos con recordatorios opcionales.",
  },
];

export default function AboutEdhuco() {
  return (
    <section
      id="about-edhuco"
      aria-labelledby="about-title"
      className="section relative isolate overflow-hidden"
    >
      <AboutBackgroundDecor />

      <div className="container-app relative z-10 space-y-16">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/75 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <span
              className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/60 dark:ring-white/25"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
              aria-hidden="true"
            />
            <LayoutDashboard className="h-3.5 w-3.5 text-foreground/80 dark:text-white/80" aria-hidden="true" />
            Como funciona la plataforma
          </span>

          <h2
            id="about-title"
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            Tu area personal{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
            >
              EDHUCO
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            En <strong className="text-foreground">EDHUCO</strong> tienes un area personal donde accedes a
            <em className="text-foreground/85"> material didactico</em>:{' '}
            <strong className="text-foreground">audios</strong>,{' '}
            <strong className="text-foreground">videos</strong> y{' '}
            <strong className="text-foreground">PDFs</strong> descargables para tu practica diaria. Puedes empezar gratis y,
            si quieres todo el contenido y funciones extra, suscribete por solo{' '}
            <strong
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
            >
              22 EUR/mes
            </strong>
            .
          </p>
        </header>

        <section className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Recursos disponibles">
          {RESOURCES.map((item, index) => {
            const Icon = item.icon;
            const accent = WIPHLA_COLORS[index % WIPHLA_COLORS.length];
            const companion = WIPHLA_COLORS[(index + 3) % WIPHLA_COLORS.length];

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border bg-card/80 p-6 shadow-[0_28px_70px_-60px_rgba(17,24,39,0.65)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_36px_90px_-58px_rgba(17,24,39,0.72)] dark:bg-card/60"
                style={{
                  borderColor: hexToRgba(accent, 0.32),
                  background: `linear-gradient(135deg, ${hexToRgba(accent, 0.08)} 0%, ${hexToRgba(
                    companion,
                    0.14,
                  )} 100%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `radial-gradient(circle at top, ${hexToRgba(accent, 0.16)}, transparent 68%)`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative space-y-3">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-white/25 shadow-sm backdrop-blur"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${hexToRgba(accent, 0.24)} 0%, ${hexToRgba(
                        companion,
                        0.18,
                      )} 100%)`,
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-white dark:text-foreground" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-2" aria-label="Planes disponibles">
          <article
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-card/80 p-8 shadow-[0_32px_90px_-68px_rgba(17,24,39,0.75)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_110px_-70px_rgba(17,24,39,0.82)] dark:border-white/10 dark:bg-card/60"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(WIPHLA_COLORS[2], 0.08)} 0%, ${hexToRgba(WIPHLA_COLORS[6], 0.12)} 100%)`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Plan</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Gratis</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">0 EUR</p>
                <p className="text-xs text-muted-foreground">siempre</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Empieza sin coste y conoce la experiencia EDHUCO.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/90">
              {FREE_PLAN_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground/70" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/auth/signup"
                className="btn-outline w-full justify-center border border-white/40 py-3 font-semibold text-foreground transition-colors hover:border-white/60 hover:text-foreground dark:border-white/20 dark:hover:border-white/40"
              >
                Crear cuenta gratis
              </Link>
            </div>
          </article>

          <article
            className="relative overflow-hidden rounded-3xl border border-transparent bg-card/80 p-8 shadow-[0_36px_110px_-64px_rgba(17,24,39,0.85)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_44px_130px_-68px_rgba(17,24,39,0.9)] dark:bg-card/65"
            style={{
              borderImageSource: WIPHLA_GRADIENT,
              borderImageSlice: 1,
              background: `linear-gradient(135deg, ${hexToRgba(WIPHLA_COLORS[0], 0.14)} 0%, ${hexToRgba(WIPHLA_COLORS[5], 0.18)} 100%)`,
            }}
          >
            <div className="absolute -top-3 right-6 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm ring-1 ring-white/20 backdrop-blur-sm dark:bg-card/70">
              <span
                className="h-2 w-2 rounded-[4px]"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Recomendado
            </div>

            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Plan</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Suscripcion EDHUCO</h3>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Euro className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <p
                    className="bg-clip-text text-2xl font-bold text-transparent"
                    style={{ backgroundImage: WIPHLA_GRADIENT }}
                  >
                    22
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">por mes - cancela cuando quieras</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Acceso completo a biblioteca y funciones avanzadas.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/90">
              {PRO_PLAN_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground/70" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup?plan=pro"
                className="btn flex-1 justify-center bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] py-3 font-semibold text-foreground shadow-sm transition-all hover:shadow-md"
              >
                Empezar ahora <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/auth/login"
                className="btn-outline justify-center border border-white/40 py-3 font-semibold text-foreground transition-colors hover:border-white/60 hover:text-foreground dark:border-white/20 dark:hover:border-white/40"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </article>
        </section>

        <section className="space-y-8" aria-label="Preguntas frecuentes">
          <div className="text-center">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-[4px]"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Preguntas frecuentes
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">Resuelve tus dudas rapidas</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FAQ_ITEMS.map((item, index) => {
              const accent = WIPHLA_COLORS[(index + 1) % WIPHLA_COLORS.length];
              const companion = WIPHLA_COLORS[(index + 3) % WIPHLA_COLORS.length];

              return (
                <article
                  key={item.question}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 p-5 shadow-[0_24px_60px_-56px_rgba(17,24,39,0.72)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_-54px_rgba(17,24,39,0.78)] dark:bg-card/60"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(accent, 0.08)} 0%, ${hexToRgba(
                      companion,
                      0.12,
                    )} 100%)`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundImage: `radial-gradient(circle at 0% 0%, ${hexToRgba(accent, 0.18)}, transparent 72%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative space-y-3">
                    <h4 className="font-semibold text-foreground">{item.question}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function AboutBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(255, 107, 0, 0.18), transparent 58%), radial-gradient(circle at 82% 20%, rgba(0, 132, 201, 0.18), transparent 62%), radial-gradient(circle at 50% 120%, rgba(0, 168, 89, 0.24), transparent 68%)",
        }}
      />
      <div
        className="absolute -top-24 left-12 hidden h-56 w-56 -rotate-6 overflow-hidden rounded-3xl opacity-70 shadow-[0_40px_120px_-70px_rgba(17,24,39,0.8)] md:block"
        style={{ backgroundImage: WIPHLA_GRADIENT }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 hidden h-64 w-64 rotate-12 overflow-hidden rounded-[42px] border border-white/40 shadow-[0_50px_160px_-80px_rgba(17,24,39,0.85)] dark:border-white/10 lg:block"
        aria-hidden="true"
      >
        <div className="grid h-full w-full grid-cols-7">
          {WIPHLA_COLORS.map((color, index) => (
            <span key={`stripe-${color}-${index}`} style={{ backgroundColor: color }} className="h-full w-full" />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17, 24, 39, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 24, 39, 0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
