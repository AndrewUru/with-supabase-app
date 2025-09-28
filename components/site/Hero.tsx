import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mountain,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

export type BenefitIconName = "ShieldCheck" | "Mountain" | "GraduationCap";

type Stat = {
  value: string;
  label: string;
};

type Benefit = {
  label: string;
  icon?: BenefitIconName;
};

const ICONS: Record<BenefitIconName, LucideIcon> = {
  ShieldCheck,
  Mountain,
  GraduationCap,
};

export interface HeroProps {
  id?: string;
  pill?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  benefits?: Benefit[];
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  { value: "+2,500", label: "Personas acompañadas" },
  { value: "15 años", label: "Experiencia y práctica" },
  { value: "6 países", label: "Comunidad" },
];

const defaultBenefits: Benefit[] = [
  { label: "Enfoque respetuoso y seguro", icon: "ShieldCheck" },
  { label: "Retiros y viajes guiados", icon: "Mountain" },
  { label: "Formaciones vivenciales", icon: "GraduationCap" },
];

export default function Hero({
  id = "hero",
  pill = "Programa EDHUCO",
  title = "Educar para transformar vidas",
  highlight = "Desarrollo humano consciente",
  subtitle = "Terapias, viajes y formaciones que combinan tradición y herramientas actuales para acompañarte con claridad y presencia.",
  primaryCta = { href: "/auth/sign-up", label: "Reserva tu plaza" },
  secondaryCta = { href: "#beneficios", label: "Explorar servicios" },
  benefits = defaultBenefits,
  stats = defaultStats,
  className = "",
}: HeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate overflow-hidden bg-transparent py-20 md:py-24 ${className}`}
    >
      <BackgroundDecor />

      <div className="container-app grid gap-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div className="relative z-10 flex flex-col gap-8 text-left">
          {pill ? (
            <span className="inline-flex w-max items-center gap-2 rounded-full border border-border/70 bg-background/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              {pill}
            </span>
          ) : null}

          <div className="space-y-4">
            <h1
              id={`${id}-title`}
              className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              {title}
              {highlight ? (
                <span className="mt-3 block bg-gradient-to-r from-brand via-accent-cool to-accent-warm bg-clip-text text-transparent">
                  {highlight}
                </span>
              ) : null}
            </h1>
            {subtitle ? (
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>

          {benefits?.length ? (
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = ICONS[benefit.icon ?? "ShieldCheck"];
                const palette = [
                  "text-brand",
                  "text-accent-cool",
                  "text-accent-warm",
                ];
                const tint = palette[index % palette.length];

                return (
                  <li
                    key={`${benefit.label}-${index}`}
                    className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/80 px-4 py-3 backdrop-blur"
                  >
                    <Icon className={`h-4 w-4 ${tint}`} aria-hidden="true" />
                    <span className="font-medium text-foreground">
                      {benefit.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <aside className="relative z-10 flex flex-col gap-6">
          <div className="surface-soft relative overflow-hidden rounded-3xl p-8">
            <div
              className="absolute -top-32 right-10 h-56 w-56 rounded-full bg-brand/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 left-8 h-48 w-48 rounded-full bg-accent-warm/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Tu camino
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  Edhuco
                </span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                Diseñamos experiencias inmersivas que combinan ritual, práctica
                y aprendizaje continuo para sostener cambios reales en tu vida
                diaria.
              </p>
              <p className="text-sm text-muted-foreground">
                Cada programa se adapta al ritmo de la persona y se apoya en un
                equipo interdisciplinario que cuida la integridad del proceso.
              </p>
            </div>
          </div>

          {stats?.length ? (
            <dl className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-background/70 p-4 text-center shadow-soft"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,_black_60%,_transparent)]">
        <div className="absolute left-1/2 -top-32 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand/18 via-accent-cool/15 to-accent-warm/12 blur-3xl" />
        <div className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-accent-cool/18 blur-2xl" />
        <div className="absolute -right-16 top-1/2 h-72 w-72 rounded-full bg-accent-warm/15 blur-2xl" />
        <div className="absolute top-1/4 left-3/4 h-48 w-48 rounded-full bg-brand/12 blur-xl" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
