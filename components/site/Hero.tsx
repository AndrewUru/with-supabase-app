"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Mountain, GraduationCap } from "lucide-react";
import Image from "next/image";

export type BenefitIconName = "ShieldCheck" | "Mountain" | "GraduationCap";

type Stat = { value: string; label: string };
type Benefit = { label: string; icon?: BenefitIconName };

type TrustedItem = { label: string };

const ICONS = { ShieldCheck, Mountain, GraduationCap };

// Wiphala diagonal stripes referencing the Andean flag palette.
const WIPHLA_ROWS: string[][] = [
  ["#6D3B96", "#0084C9", "#00A859", "#FFFFFF", "#FFD500", "#FF6B00", "#EE3124"],
  ["#0084C9", "#00A859", "#FFFFFF", "#FFD500", "#FF6B00", "#EE3124", "#6D3B96"],
  ["#00A859", "#FFFFFF", "#FFD500", "#FF6B00", "#EE3124", "#6D3B96", "#0084C9"],
  ["#FFFFFF", "#FFD500", "#FF6B00", "#EE3124", "#6D3B96", "#0084C9", "#00A859"],
  ["#FFD500", "#FF6B00", "#EE3124", "#6D3B96", "#0084C9", "#00A859", "#FFFFFF"],
  ["#FF6B00", "#EE3124", "#6D3B96", "#0084C9", "#00A859", "#FFFFFF", "#FFD500"],
  ["#EE3124", "#6D3B96", "#0084C9", "#00A859", "#FFFFFF", "#FFD500", "#FF6B00"],
];

const WIPHLA_GRADIENT =
  "linear-gradient(120deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

const trustedBy: TrustedItem[] = [
  { label: "Espacio le Dones" },
  { label: "Colegio San Jose" },
  { label: "SOMRIU" },
  { label: "Asociacion UNO" },
];

export interface HeroProps {
  id?: string;
  pill?: string;
  tagLine?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  tertiaryCta?: { href: string; label: string };
  benefits?: Benefit[];
  stats?: Stat[];
  imageUrl?: string;
  className?: string;
}

const defaultStats: Stat[] = [
  { value: "500+", label: "Personas acompañadas" },
  { value: "10 años", label: "Experiencia y práctica" },
  { value: "4 países", label: "Comunidad activa" },
];

const defaultBenefits: Benefit[] = [
  { label: "Acompañamiento seguro y ético", icon: "ShieldCheck" },
  { label: "Retiros y viajes conscientes", icon: "Mountain" },
  { label: "Formaciones vivenciales", icon: "GraduationCap" },
];

export default function Hero({
  id = "hero",
  pill = "EDHUCO · Comunidad viva",
  tagLine = "Sabiduría ancestral + herramientas contemporáneas",
  title = "Educar para transformar vidas",
  highlight = "Desarrollo humano consciente",
  subtitle = "Terapias, viajes y formaciones que integran tradición, ciencia y presencia para acompañarte a crear cambios reales y sostenibles.",
  primaryCta = { href: "/auth/sign-up", label: "Reserva tu plaza" },
  secondaryCta = { href: "#beneficios", label: "Explorar servicios" },
  tertiaryCta = { href: "#agenda", label: "Próximas fechas" },
  benefits = defaultBenefits,
  stats = defaultStats,
  imageUrl = "/images/hero-person.JPG",
  className = "",
}: HeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate overflow-hidden bg-[hsl(var(--background))] py-14 md:py-16 lg:py-20 ${className}`}
    >
      <BackgroundDecor />

      <div className="container-app">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {pill && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--spiritual-light)/0.32)] bg-[hsl(var(--spiritual-light)/0.16)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[hsl(var(--spiritual-ember))] dark:border-[hsl(var(--spiritual-light)/0.24)] dark:bg-[hsl(var(--spiritual-shadow)/0.68)] dark:text-[hsl(var(--spiritual-light))]">
                    <span
                      className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/70 dark:ring-white/20"
                      style={{ backgroundImage: WIPHLA_GRADIENT }}
                      aria-hidden="true"
                    />
                    {pill}
                  </span>
                )}
                {tagLine && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground ring-1 ring-border/60 dark:bg-card/60">
                    <span
                      className="inline-flex h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/60 dark:ring-white/20"
                      style={{ backgroundImage: WIPHLA_GRADIENT }}
                      aria-hidden="true"
                    />
                    {tagLine}
                  </span>
                )}
              </div>

              <div className="space-y-5">
                <h1
                  id={`${id}-title`}
                  className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[52px]"
                >
                  {title}
                  {highlight && (
                    <span
                      className="mt-3 inline-block bg-clip-text text-3xl font-medium text-transparent sm:text-4xl lg:text-[40px]"
                      style={{ backgroundImage: WIPHLA_GRADIENT }}
                    >
                      {highlight}
                    </span>
                  )}
                </h1>

                {subtitle && (
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {benefits?.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon ? ICONS[benefit.icon] : null;
                  return (
                    <li
                      key={`${benefit.label}-${index}`}
                      className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground/90 shadow-sm backdrop-blur-sm dark:bg-card/60"
                    >
                      {Icon ? (
                        <Icon
                          className="h-4 w-4 text-[hsl(var(--spiritual-ember))] dark:text-[hsl(var(--spiritual-light))]"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-2 w-2 rounded-full bg-[hsl(var(--spiritual-ember))] dark:bg-[hsl(var(--spiritual-light))]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-medium">{benefit.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex flex-1 flex-wrap gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--spiritual-ember))] px-6 py-3 text-sm font-semibold text-[hsl(var(--spiritual-light))] shadow-[0_18px_40px_-28px_hsl(var(--spiritual-ember)/0.8)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--spiritual-light)/0.6)] focus-visible:ring-offset-2"
                  >
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--spiritual-light)/0.35)] bg-transparent px-6 py-3 text-sm font-semibold text-[hsl(var(--spiritual-ember))] transition hover:bg-[hsl(var(--spiritual-light)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--spiritual-aurora)/0.4)] focus-visible:ring-offset-2 dark:border-[hsl(var(--spiritual-light)/0.25)] dark:text-[hsl(var(--spiritual-light))] dark:hover:bg-[hsl(var(--spiritual-shadow)/0.5)]"
                  >
                    {secondaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {tertiaryCta && (
                <Link
                  href={tertiaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--spiritual-ember))] transition hover:text-[hsl(var(--spiritual-ember)/0.8)] dark:text-[hsl(var(--spiritual-light))] dark:hover:text-[hsl(var(--spiritual-light)/0.8)]"
                >
                  {tertiaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            {stats?.length > 0 && (
              <dl className="grid gap-4 pt-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/60 bg-card/70 p-4 text-left shadow-sm backdrop-blur-sm dark:bg-card/50"
                  >
                    <dd className="text-2xl font-semibold text-foreground sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="relative z-10 flex justify-center">
            <div
              className="absolute -top-16 right-2 h-44 w-44 rounded-full bg-[hsl(var(--spiritual-ember)/0.25)] blur-[120px] dark:bg-[hsl(var(--spiritual-aurora)/0.22)]"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-[hsl(var(--spiritual-light)/0.2)] blur-[120px] dark:bg-[hsl(var(--spiritual-shadow)/0.6)]"
              aria-hidden="true"
            />

            {/* Tarjeta imagen principal */}
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] border border-border/60 bg-card/80 shadow-[0_32px_80px_-58px_hsl(var(--spiritual-shadow)/0.85)] backdrop-blur-sm dark:bg-card/60">
              {/* Wiphala "ondeando" pegada a la tarjeta */}
              <div className="pointer-events-none absolute -left-3 -top-3 z-20 rotate-[-8deg] sm:-left-4 sm:-top-4">
                <WiphalaFlag size={96} stick />
              </div>

              <div className="relative aspect-[4/5]">
                <Image
                  src={imageUrl}
                  alt="Sesion de cuencos ceremoniales de EDHUCO"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--spiritual-shadow)/0.38)] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {trustedBy.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Confian en EDHUCO
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-foreground/80 sm:text-base">
              {trustedBy.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full bg-card/80 px-4 py-2 ring-1 ring-border/60 backdrop-blur-sm dark:bg-card/60"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animaciones globales (autocontenidas) */}
      <style jsx global>{`
        @keyframes wiphalaWave {
          0% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-3px) rotate(-0.4deg);
          }
          100% {
            transform: translateY(0) rotate(0);
          }
        }
        @keyframes bgWave {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(-0.3deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        @keyframes bgFloat {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
          100% {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wiphala-cell,
          .wiphala-bg-cell {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(109, 59, 150, 0.16) 0%, rgba(0, 132, 201, 0.18) 18%, rgba(0, 168, 89, 0.16) 36%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 213, 0, 0.2) 66%, rgba(255, 107, 0, 0.18) 82%, rgba(238, 49, 36, 0.22) 100%)",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/10 dark:from-black/25 dark:to-black/40"
        aria-hidden="true"
      />
      {/* Mosaico Wiphala de fondo con oleaje sutil */}
      <div
        aria-hidden="true"
        className="hidden selection:absolute left-1/2 top-[45%]  -translate-x-1/2 -translate-y-1/2 rotate-6 overflow-hidden  sm:flex"
      >
        <div className="grid grid-cols-7">
          {WIPHLA_ROWS.map((row, r) =>
            row.map((color, c) => (
              <span
                key={`${r}-${c}`}
                style={{
                  backgroundColor: color,
                  animation: `bgWave 6s ease-in-out ${
                    c * 120
                  }ms infinite, bgFloat 18s ease-in-out ${r * 160}ms infinite`,
                }}
                className="wiphala-bg-cell aspect-square w-12 md:w-14 lg:w-16"
              />
            ))
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17, 24, 39, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 24, 39, 0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

/** Bandera Wiphala 7x7 con animación por columnas */
function WiphalaFlag({
  size = 96,
  stick = false,
}: {
  size?: number;
  stick?: boolean; // dibuja un pequeño "palo"
}) {
  const cell = Math.floor(size / 7);
  return (
    <figure
      aria-label="Bandera Wiphala"
      className="relative grid aspect-square select-none rounded-[8px] border border-black/10 bg-white/30 p-[4px] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.45)] backdrop-blur-sm"
      style={{
        width: size,
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(7, 1fr)",
      }}
    >
      {WIPHLA_ROWS.map((row, r) =>
        row.map((color, c) => (
          <span
            key={`${r}-${c}`}
            className="wiphala-cell block rounded-[2px]"
            style={{
              width: cell,
              height: cell,
              backgroundColor: color,
              animation: `wiphalaWave 2.8s ease-in-out ${c * 90}ms infinite`,
              transformOrigin: "center",
              willChange: "transform",
            }}
          />
        ))
      )}
      {stick && (
        <span
          className="absolute -left-[6px] top-0 h-full w-[3px] rounded-full bg-black/30"
          aria-hidden="true"
        />
      )}
      <figcaption className="sr-only">Wiphala animada</figcaption>
    </figure>
  );
}
