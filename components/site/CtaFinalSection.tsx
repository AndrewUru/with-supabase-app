"use client";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowRight, CalendarDays, MessageCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type QuickActionTone = "brand" | "cool" | "warm";

type QuickAction = {
  label: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: QuickActionTone;
};

const toneClasses: Record<
  QuickActionTone,
  { icon: string; border: string; accent: string }
> = {
  brand: {
    icon: "from-[hsl(var(--brand))] to-[hsl(var(--accent-warm))]",
    border: "group-hover:border-[hsl(var(--brand)/0.45)]",
    accent: "text-[hsl(var(--brand))]",
  },
  cool: {
    icon: "from-[hsl(var(--accent-cool))] to-[hsl(var(--brand))]",
    border: "group-hover:border-[hsl(var(--accent-cool)/0.5)]",
    accent: "text-[hsl(var(--accent-cool))]",
  },
  warm: {
    icon: "from-[hsl(var(--accent-warm))] to-[hsl(var(--brand))]",
    border: "group-hover:border-[hsl(var(--accent-warm)/0.5)]",
    accent: "text-[hsl(var(--accent-warm))]",
  },
};

const quickActions: QuickAction[] = [
  {
    label: "Agendar entrevista inicial",
    description: "Reserva 20 minutos para conocer tu proceso y proximos pasos.",
    href: "/#agenda",
    icon: CalendarDays,
    tone: "brand",
  },
  {
    label: "Enviar un mensaje",
    description: "Comparte tus dudas y te respondemos en menos de 24 horas.",
    href: "/#contacto-form",
    icon: MessageCircle,
    tone: "cool",
  },
  {
    label: "Escribir a hola@edhuco.org",
    description: "Cuentanos tu intencion y disenamos un recorrido a medida.",
    href: "mailto:hola@edhuco.org",
    icon: Mail,
    tone: "warm",
  },
];

/** Paleta Wiphala (aprox. oficiales) */
const W = {
  R: "#FF0000", // Rojo
  O: "#FF7F00", // Naranja
  Y: "#FFFF00", // Amarillo
  W: "#FFFFFF", // Blanco
  G: "#00FF00", // Verde
  B: "#0000FF", // Azul
  V: "#800080", // Violeta
};

/**
 * Matriz 7x7 con diagonales de la Wiphala ()
 * Cada fila desplaza una casilla hacia la derecha, empezando desde la base inferior izquierda con V.
 * Centro diagonal en blanco, como version mas difundida.
 */
const WIPH_7x7: string[][] = [
  // fila 0 (arriba)
  [W.G, W.B, W.V, W.R, W.O, W.Y, W.W],
  // fila 1
  [W.B, W.V, W.R, W.O, W.Y, W.W, W.G],
  // fila 2
  [W.V, W.R, W.O, W.Y, W.W, W.G, W.B],
  // fila 3 (centro)
  [W.R, W.O, W.Y, W.W, W.G, W.B, W.V],
  // fila 4
  [W.O, W.Y, W.W, W.G, W.B, W.V, W.R],
  // fila 5
  [W.Y, W.W, W.G, W.B, W.V, W.R, W.O],
  // fila 6 (abajo)
  [W.W, W.G, W.B, W.V, W.R, W.O, W.Y],
];

export default function CtaFinalSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="cta-final-title"
      className="section relative isolate overflow-hidden spiritual-aura"
    >
      <DecorBackground />

      <div className="container-app">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-border/60 bg-card/90 shadow-lift backdrop-blur">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[hsl(var(--brand)/0.12)] via-transparent to-[hsl(var(--accent-cool)/0.12)]" />

          {/* Wiphala en la esquina superior izquierda del card */}
          <div className="pointer-events-none absolute -left-2 -top-2 z-10 rotate-[-6deg] sm:-left-3 sm:-top-3">
            <WiphalaFlag size={92} shadow />
          </div>

          <div className="grid gap-12 p-8 sm:p-12">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand)/0.45)] bg-[hsl(var(--brand)/0.1)] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(var(--brand))] sm:text-xs">
                Ultimo paso
              </span>

              <h2
                id="cta-final-title"
                className="mt-6 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
              >
                Inicia hoy tu camino con{" "}
                <span className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-[hsl(var(--brand))] via-[hsl(var(--accent-cool))] to-[hsl(var(--accent-warm))] px-3 py-1 text-lg font-semibold text-white shadow-soft sm:ml-3 sm:px-4 sm:py-1.5">
                  EDHUCO
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Reserva tu plaza en terapias, viajes o programas formativos y
                vive una experiencia acompanada, respetuosa y coherente con tu
                proposito. Estamos cerca de ti en cada fase del proceso, con una
                guia que integra tradicion y herramientas actuales.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="gap-3 shadow-soft">
                  <Link href="/auth/signup">
                    Unirme ahora
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Respuesta personalizada en menos de 24 horas
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {quickActions.map((action) => (
                <QuickActionCard key={action.label} action={action} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Estilos globales para la animacion (autocontenidos) */}
      <style jsx global>{`
        @keyframes wiphalaWave {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(-0.4deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        @keyframes confettiDrift {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.65;
          }
          100% {
            transform: translate3d(0, -60px, 0) rotate(25deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wiphala-cell,
          .andean-confetti > span {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function QuickActionCard({ action }: { action: QuickAction }) {
  const { label, description, href, icon: Icon, tone } = action;
  const { icon, border, accent } = toneClasses[tone];
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const cardContent = (
    <>
      <span
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-soft",
          icon,
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          {label}
        </span>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <span
        className={cn(
          "mt-auto inline-flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition group-hover:text-foreground",
          accent,
        )}
      >
        Ir ahora
        <ArrowRight
          className="h-3 w-3 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "group relative flex h-full flex-col gap-4 rounded-[2rem] border border-border/55 bg-card/75 p-6 text-left shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lift",
          border,
        )}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-[2rem] border border-border/55 bg-card/75 p-6 text-left shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lift",
        border,
      )}
    >
      {cardContent}
    </Link>
  );
}

function DecorBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    >
      {/* bruma radial */}
      <div
        className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--brand)/0.28) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-14rem] left-10 h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--accent-cool)/0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-0 top-1/3 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--accent-warm)/0.22) 0%, transparent 68%)",
        }}
      />

      {/* confetti andino sutil */}
      <AndeanConfetti />
    </div>
  );
}

/** Bandera Wiphala: 7x7, animacion tipo "oleaje" por columnas */
function WiphalaFlag({
  size = 96,
  shadow = false,
}: {
  size?: number;
  shadow?: boolean;
}) {
  const cell = Math.floor(size / 7);

  return (
    <figure
      aria-label="Bandera Wiphala"
      className={`relative grid aspect-square select-none rounded-[8px] border border-black/10 bg-white/30 p-[4px] backdrop-blur-sm ${
        shadow ? "shadow-[0_10px_35px_-10px_rgba(0,0,0,0.45)]" : ""
      }`}
      style={{
        width: size,
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(7, 1fr)",
      }}
    >
      {WIPH_7x7.map((row, r) =>
        row.map((color, c) => (
          <span
            key={`${r}-${c}`}
            className="wiphala-cell block rounded-[2px]"
            style={{
              width: cell,
              height: cell,
              backgroundColor: color,
              // onda por columna con pequeno retraso
              animation: `wiphalaWave 2.6s ease-in-out ${c * 90}ms infinite`,
              transformOrigin: "center",
              willChange: "transform",
            }}
          />
        ))
      )}
      {/* pequeno "palo" para sensacion de bandera */}
      <span
        className="absolute -left-[6px] top-0 h-full w-[3px] rounded-full bg-black/30"
        aria-hidden="true"
      />
      <figcaption className="sr-only">Wiphala animada</figcaption>
    </figure>
  );
}

/** Efecto decorativo: pequenos cuadraditos ascendiendo suavemente */
function AndeanConfetti() {
  const items = Array.from({ length: 14 });

  return (
    <div className="andean-confetti absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const size = 6 + Math.round(Math.random() * 8); // 6-14px
        const delay = Math.random() * 3.5; // s
        const duration = 6 + Math.random() * 5; // 6-11s
        const colors = [W.R, W.O, W.Y, W.W, W.G, W.B, W.V];
        const color = colors[i % colors.length];

        return (
          <span
            key={i}
            className="absolute block rounded-[2px] opacity-60"
            style={{
              left: `${left}%`,
              bottom: "-20px",
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              animation: `confettiDrift ${duration}s linear ${delay}s infinite`,
              filter: "blur(0.2px)",
            }}
          />
        );
      })}
    </div>
  );
}


