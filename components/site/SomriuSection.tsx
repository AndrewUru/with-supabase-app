import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Music2,
  Sparkles,
  Users,
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

const SOMRIU_IMAGE_PLACEHOLDER = "/images/somriu-placeholder.png";

type Bullet = {
  icon: LucideIcon;
  text: string;
};

type Stat = {
  label: string;
  value: string;
};

type Faq = {
  question: string;
  answer: string;
};

const BULLETS: Bullet[] = [
  {
    icon: Music2,
    text: "Modulos experienciales con voz, percusion corporal y respiracion consciente.",
  },
  {
    icon: Users,
    text: "Formatos flexibles: talleres abiertos, ciclos, team-building y jornadas de bienestar.",
  },
  {
    icon: CheckCircle2,
    text: "Beneficios: conexion, gestion emocional, motivacion y mejora del clima grupal.",
  },
];

const STATS: Stat[] = [
  { label: "Duracion", value: "90-120 min" },
  { label: "Participantes", value: "12-60 (adaptable)" },
  { label: "Modalidad", value: "Presencial / Hibrida" },
  { label: "Intensidad", value: "Suave a dinamica" },
];

const FAQS: Faq[] = [
  {
    question: "Para quién es?",
    answer:
      "Equipos, asociaciones, centros educativos y espacios comunitarios que buscan un impulso de bienestar y cohesión.",
  },
  {
    question: "Se adapta a cada grupo?",
    answer:
      "Si. Ajustamos intensidad, repertorio y dinámicas según edades, objetivos y contexto del grupo.",
  },
  {
    question: "Como lo reservo?",
    answer:
      "Contactanos para armar una propuesta a medida y revisar fechas disponibles.",
  },
];

export default function SomriuSection() {
  return (
    <section
      id="somriu"
      aria-labelledby="somriu-title"
      className="section relative isolate overflow-hidden"
    >
      <SomriuBackgroundDecor />

      <div className="container-app relative z-10 space-y-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/75 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <span
                className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/60 dark:ring-white/25"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              <Sparkles
                className="h-3.5 w-3.5 text-foreground/80 dark:text-white/80"
                aria-hidden="true"
              />
              Nuevo proyecto EDHUCO
            </span>

            <div className="space-y-4">
              <h2
                id="somriu-title"
                className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              >
                SOMRIU --{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                >
                  Sonido, Movimiento y Risa
                </span>{" "}
                para la Unidad
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                <strong className="text-foreground">SOMRIU</strong> es un
                programa de bienestar comunitario que combina musica, voz,
                movimiento y dinamicas ludicas para activar la alegria, la
                cohesion grupal y la regulacion emocional. Ideal para centros
                culturales, asociaciones, empresas y escuelas que desean
                impulsar climas saludables y creativos.
              </p>
            </div>

            <ul className="space-y-4">
              {BULLETS.map((bullet, index) => {
                const Icon = bullet.icon;
                const accent = WIPHLA_COLORS[index % WIPHLA_COLORS.length];
                const glow = hexToRgba(accent, 0.32);

                return (
                  <li
                    key={bullet.text}
                    className="group flex items-start gap-3 rounded-2xl border border-transparent bg-card/70 p-4 shadow-[0_20px_60px_-58px_rgba(17,24,39,0.8)] transition-colors duration-300 hover:border-white/20 hover:bg-card/90 dark:bg-card/60"
                  >
                    <span
                      className="relative mt-0.5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/25 shadow-sm backdrop-blur-sm"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${hexToRgba(
                          accent,
                          0.3
                        )} 0%, ${hexToRgba(
                          WIPHLA_COLORS[(index + 3) % WIPHLA_COLORS.length],
                          0.2
                        )} 100%)`,
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 0%, ${glow}, transparent 68%)`,
                        }}
                      />
                      <Icon className="relative h-5 w-5 text-white" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {bullet.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/somriu"
                className="btn inline-flex items-center gap-2 bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:shadow-md"
                aria-label="Conocer SOMRIU"
              >
                Conocer SOMRIU
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contacto?tipo=somriu"
                className="btn-outline inline-flex items-center gap-2 border border-white/40 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/60 hover:text-foreground dark:border-white/20 dark:hover:border-white/40"
                aria-label="Solicitar propuesta SOMRIU"
              >
                Solicitar propuesta
              </Link>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[32px] border border-white/12 bg-card/80 shadow-[0_32px_90px_-64px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/60">
            <div
              className="absolute -left-16 top-10 h-32 w-32 rounded-full"
              style={{
                backgroundImage: WIPHLA_GRADIENT,
                opacity: 0.28,
                filter: "blur(24px)",
              }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-t-[28px]">
              <Image
                src={SOMRIU_IMAGE_PLACEHOLDER}
                alt="Grupo escolar participando en una sesion SOMRIU"
                width={720}
                height={480}
                className="h-72 w-full object-cover"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                aria-hidden="true"
              />
            </div>

            <div className="relative space-y-6 p-6">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl ring-1 ring-white/20 shadow-sm backdrop-blur"
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                  aria-hidden="true"
                >
                  <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    SOMRIU Kit
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Guia de sesion + playlist + dinamicas
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {STATS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-card/70 p-4 text-sm shadow-[0_20px_60px_-58px_rgba(17,24,39,0.82)] backdrop-blur-sm dark:bg-card/60"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(
                        WIPHLA_COLORS[(index + 2) % WIPHLA_COLORS.length],
                        0.1
                      )} 0%, ${hexToRgba(
                        WIPHLA_COLORS[(index + 4) % WIPHLA_COLORS.length],
                        0.16
                      )} 100%)`,
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-card/75 p-5 shadow-[0_24px_70px_-62px_rgba(17,24,39,0.85)] backdrop-blur-sm dark:bg-card/60">
                <p className="text-sm font-semibold text-foreground">
                  Resultados esperados
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Mayor cohesion y confianza</li>
                  <li>Regulacion del estres y claridad mental</li>
                  <li>Energia, motivacion y sentido de pertenencia</li>
                </ul>
              </div>

              <Link
                href="/somriu#agenda"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                Ver proximas fechas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="space-y-8" aria-label="Preguntas frecuentes SOMRIU">
          <div className="text-center">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-[4px]"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Preguntas frecuentes
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              Resolver dudas en minutos
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FAQS.map((faq, index) => (
              <article
                key={faq.question}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 p-5 shadow-[0_24px_60px_-56px_rgba(17,24,39,0.78)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_88px_-54px_rgba(17,24,39,0.82)] dark:bg-card/60"
                style={{
                  background: `linear-gradient(135deg, ${hexToRgba(
                    WIPHLA_COLORS[(index + 1) % WIPHLA_COLORS.length],
                    0.12
                  )} 0%, ${hexToRgba(
                    WIPHLA_COLORS[(index + 3) % WIPHLA_COLORS.length],
                    0.16
                  )} 100%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `radial-gradient(circle at 0% 0%, ${hexToRgba(
                      WIPHLA_COLORS[(index + 1) % WIPHLA_COLORS.length],
                      0.24
                    )}, transparent 72%)`,
                  }}
                  aria-hidden="true"
                />
                <div className="relative space-y-3">
                  <h4 className="font-semibold text-foreground">
                    {faq.question}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SomriuBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 20%, rgba(238, 49, 36, 0.18), transparent 60%), radial-gradient(circle at 82% 16%, rgba(0, 132, 201, 0.2), transparent 62%), radial-gradient(circle at 50% 110%, rgba(0, 168, 89, 0.18), transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[42%] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rotate-6 overflow-hidden rounded-3xl opacity-80 shadow-[0_44px_140px_-68px_rgba(17,24,39,0.82)] sm:block"
        style={{ backgroundImage: WIPHLA_GRADIENT }}
        aria-hidden="true"
      />
      <div
        className="absolute right-12 bottom-8 hidden h-60 w-60 rotate-12 overflow-hidden rounded-[40px] border border-white/30 shadow-[0_48px_150px_-72px_rgba(17,24,39,0.9)] dark:border-white/10 lg:block"
        aria-hidden="true"
      >
        <div className="grid h-full w-full grid-cols-7">
          {WIPHLA_COLORS.map((color, index) => (
            <span
              key={`stripe-${color}-${index}`}
              style={{ backgroundColor: color }}
              className="h-full w-full"
            />
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
