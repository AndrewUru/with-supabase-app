"use client";

import type { LucideIcon } from "lucide-react";
import { CalendarDays, HeartHandshake, Sparkles } from "lucide-react";

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

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "FormaciÃ³n anual en Chamanismo Andino",
    description:
      "EdiciÃ³n 2025. Encuentros mensuales, prÃ¡cticas guiadas y comunidad. 99 â‚¬/mes (10 cuotas) o 880 â‚¬ al contado (ahorras 12%). Becas solidarias hasta âˆ’30% (plazas limitadas).",
    icon: Sparkles,
    highlight: "Plazas abiertas",
  },
  {
    title: "MÃ³dulos y talleres sueltos",
    description:
      "Avanza paso a paso con mÃ³dulos temÃ¡ticos y talleres prÃ¡cticos. Desde 120â€“180 â‚¬ por encuentro. Descuentos para alumnado y suscriptores EDHUCO.",
    icon: CalendarDays,
    highlight: "Flexible",
  },
  {
    title: "Sesiones de apoyo y retiros",
    description:
      "AcompaÃ±amiento individual/grupal para integrar el proceso. Retiros y viajes opcionales. SuscripciÃ³n EDHUCO: 22 â‚¬/mes para recursos, comunidad y ventajas en becas.",
    icon: HeartHandshake,
    highlight: "AcompaÃ±amiento",
  },
];

export default function BeneficiosSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="beneficios-title"
      className="section relative isolate overflow-hidden"
    >
      <BeneficiosBackgroundDecor />

      <div className="container-app relative z-10 grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[32px] bg-card/80 p-8 shadow-[0_30px_100px_-70px_rgba(17,24,39,0.85)] backdrop-blur-sm dark:bg-card/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/75 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <span
              className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/60 dark:ring-white/25"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
              aria-hidden="true"
            />
            FormaciÃ³n Â· EDHUCO
          </span>

          <h2
            id="beneficios-title"
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[44px]"
          >
            FormaciÃ³n en Chamanismo Andino Â· 2025
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Un recorrido iniciÃ¡tico que integra cosmovisiÃ³n andina, arte ritual,
            manejo de la energÃ­a y acompaÃ±amiento Ã©tico. Precio:{" "}
            <strong
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
            >
              99 â‚¬/mes Ã— 10
            </strong>{" "}
            o{" "}
            <strong
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
            >
              880 â‚¬ al contado
            </strong>
            . Becas solidarias hasta <strong>âˆ’30%</strong>.
          </p>

          <div className="rounded-3xl border border-white/15 bg-card/70 p-6 text-left shadow-[0_24px_70px_-60px_rgba(17,24,39,0.78)] backdrop-blur-sm dark:bg-card/55">
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
              QuÃ© incluye
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                Encuentros mensuales + prÃ¡cticas guiadas (presencial / online).
              </li>
              <li>
                Materiales (audios, guÃ­as y rituales) y comunidad privada.
              </li>
              <li>AcompaÃ±amiento Ã©tico por profesionales de la red.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground/90">
              <span className="rounded-full border border-white/20 bg-white/5 px-2 py-1 backdrop-blur-sm">
                MatrÃ­cula 60 â‚¬ Â· Cupos limitados
              </span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Â¿Solo recursos y comunidad? SuscrÃ­bete a EDHUCO por{" "}
            <strong>22 â‚¬/mes</strong> y accede a materiales mensuales y ventajas
            en becas.
          </div>
        </aside>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/60 to-transparent lg:block dark:via-white/20"
            aria-hidden="true"
          />
          <div className="grid gap-8">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              const primary = WIPHLA_COLORS[(index * 2) % WIPHLA_COLORS.length];
              const secondary =
                WIPHLA_COLORS[(index * 2 + 3) % WIPHLA_COLORS.length];

              return (
                <article
                  key={benefit.title}
                  className="group relative grid gap-6 rounded-[28px] border border-white/12 bg-card/85 p-6 shadow-[0_32px_90px_-62px_rgba(17,24,39,0.82)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_42px_110px_-60px_rgba(17,24,39,0.88)] dark:bg-card/60 lg:grid-cols-[auto_minmax(0,1fr)]"
                  style={{
                    background: `linear-gradient(125deg, ${hexToRgba(
                      primary,
                      0.16
                    )} 0%, ${hexToRgba(secondary, 0.12)} 100%)`,
                  }}
                >
                  <div className="relative flex flex-col items-center gap-3 lg:items-start">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl ring-1 ring-white/25 shadow-sm backdrop-blur"
                      style={{
                        backgroundImage: `linear-gradient(140deg, ${hexToRgba(
                          primary,
                          0.4
                        )} 0%, ${hexToRgba(secondary, 0.28)} 100%)`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-foreground/80 backdrop-blur-sm dark:text-white/80">
                      <span
                        className="h-1.5 w-10 rounded-full"
                        style={{ backgroundImage: WIPHLA_GRADIENT }}
                        aria-hidden="true"
                      />
                      {benefit.highlight}
                    </span>
                  </div>

                  <div className="relative space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {benefit.description}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                      <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur-sm">
                        Presencial / Online
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur-sm">
                        Comunidad
                      </span>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundImage: `radial-gradient(circle at 0% 0%, ${hexToRgba(
                        primary,
                        0.25
                      )}, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* estilos locales para la Wiphala animada */}
      <style jsx>{`
        .wiphala-flag {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: 132px;
          height: 132px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(7, 1fr);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 20px 60px -30px rgba(17, 24, 39, 0.55),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          transform: rotate(10deg);
          filter: saturate(1.05);
          animation: wiphala-float 9s ease-in-out infinite;
          opacity: 0.95;
          pointer-events: none; /* puramente decorativa */
        }
        .wiphala-flag > span {
          width: 100%;
          height: 100%;
          animation: wiphala-breathe 6.5s ease-in-out infinite;
          will-change: transform, box-shadow, filter;
        }
        /* Retardo escalonado por columna para efecto de oleaje */
        .wiphala-flag > span:nth-child(7n + 1) {
          animation-delay: 0s;
        }
        .wiphala-flag > span:nth-child(7n + 2) {
          animation-delay: 0.2s;
        }
        .wiphala-flag > span:nth-child(7n + 3) {
          animation-delay: 0.4s;
        }
        .wiphala-flag > span:nth-child(7n + 4) {
          animation-delay: 0.6s;
        }
        .wiphala-flag > span:nth-child(7n + 5) {
          animation-delay: 0.8s;
        }
        .wiphala-flag > span:nth-child(7n + 6) {
          animation-delay: 1s;
        }
        .wiphala-flag > span:nth-child(7n + 7) {
          animation-delay: 1.2s;
        }

        @keyframes wiphala-float {
          0% {
            transform: rotate(10deg) translateY(0);
          }
          50% {
            transform: rotate(10deg) translateY(-6px);
          }
          100% {
            transform: rotate(10deg) translateY(0);
          }
        }
        @keyframes wiphala-breathe {
          0%,
          100% {
            transform: scale(1);
            box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.015);
            box-shadow: inset 0 0 12px 0 rgba(255, 255, 255, 0.22);
            filter: brightness(1.05);
          }
        }
        /* Responsivo */
        @media (max-width: 640px) {
          .wiphala-flag {
            width: 100px;
            height: 100px;
            top: 1rem;
            right: 1rem;
            transform: rotate(8deg);
          }
        }
        /* Accesibilidad: reduce motion (mantiene Ã¡ngulo y estilo sin animar) */
        @media (prefers-reduced-motion: reduce) {
          .wiphala-flag {
            animation: none !important;
            transform: rotate(10deg);
          }
          .wiphala-flag > span {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function BeneficiosBackgroundDecor() {
  // SOLO conserva los radiales suaves y la ÃšNICA Wiphala animada.
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 8%, rgba(255, 107, 0, 0.2), transparent 58%), radial-gradient(circle at 80% 14%, rgba(0, 132, 201, 0.18), transparent 64%), radial-gradient(circle at 48% 110%, rgba(0, 168, 89, 0.2), transparent 72%)",
        }}
      />
      <WiphalaFlag />
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

/** ÃšNICA Wiphala animada (7x7 celdas diagonales) */
function WiphalaFlag() {
  const COLORS = WIPHLA_COLORS;
  const cells = Array.from({ length: 49 }, (_, i) => {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const colorIndex = (col - row + 7) % 7; // diagonal clÃ¡sica
    return COLORS[colorIndex];
  });

  return (
    <div className="wiphala-flag" aria-hidden="true">
      {cells.map((bg, i) => (
        <span key={i} style={{ backgroundColor: bg }} />
      ))}
    </div>
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

