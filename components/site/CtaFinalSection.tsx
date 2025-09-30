import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowRight, CalendarDays, MessageCircle, Mail } from "lucide-react";

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
    description: "Reserva 20 minutos para conocer tu proceso y próximos pasos.",
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
    description: "Cuéntanos tu intención y diseñamos un recorrido a medida.",
    href: "mailto:hola@edhuco.org",
    icon: Mail,
    tone: "warm",
  },
];

export default function CtaFinalSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="cta-final-title"
      className="relative isolate overflow-hidden py-20 sm:py-24"
    >
      <DecorBackground />

      <div className="container-app">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-border/60 bg-card/90 shadow-lift backdrop-blur">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[hsl(var(--brand)/0.12)] via-transparent to-[hsl(var(--accent-cool)/0.12)]" />

          <div className="grid gap-12 p-8 sm:p-12">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand)/0.45)] bg-[hsl(var(--brand)/0.1)] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(var(--brand))] sm:text-xs">
                Último paso
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
                vive una experiencia acompañada, respetuosa y coherente con tu
                propósito. Estamos cerca de ti en cada fase del proceso, con una
                guía que integra tradición y herramientas actuales.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/auth/signup"
                  className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand))] px-7 py-3 text-sm font-semibold text-[hsl(var(--brand-foreground))] shadow-lg shadow-[hsl(var(--brand)/0.35)] transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Unirme ahora
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
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
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${icon} text-white shadow-md shadow-[hsl(var(--foreground)/0.18)]`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <span
        className={`mt-auto inline-flex items-center gap-1 text-xs font-semibold transition group-hover:text-foreground ${accent}`}
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
        className={`group relative flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card/90 p-5 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${border}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card/90 p-5 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${border}`}
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
    </div>
  );
}
