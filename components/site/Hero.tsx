import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mountain,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

export type BenefitIconName = "ShieldCheck" | "Mountain" | "GraduationCap";

type Stat = { value: string; label: string };
type Benefit = { label: string; icon?: BenefitIconName };

type TrustedItem = { label: string };

const ICONS = { ShieldCheck, Mountain, GraduationCap };

const trustedBy: TrustedItem[] = [
  { label: "Mizentro" },
  { label: "Colegio San José" },
  { label: "Fundación Gaia" },
  { label: "Asociación UNO" },
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
  { value: "15 años", label: "Experiencia y práctica" },
  { value: "6 países", label: "Comunidad activa" },
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
      className={`relative isolate overflow-hidden bg-background/80 py-14 md:py-16 lg:py-20 ${className}`}
    >
      <BackgroundDecor />

      <div className="container-app">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-14">
          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                {pill && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand backdrop-blur-sm sm:text-xs">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    {pill}
                  </span>
                )}
                {tagLine && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-card/70 px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-sm ring-1 ring-border/70 sm:text-xs">
                    <span
                      className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-cool"
                      aria-hidden="true"
                    />
                    {tagLine}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <h1
                  id={`${id}-title`}
                  className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                >
                  {title}
                  {highlight && (
                    <span className="mt-2 block bg-gradient-to-r from-brand via-accent-cool to-accent-warm bg-clip-text text-3xl font-light text-transparent sm:text-4xl lg:text-5xl">
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
              <ul className="grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon ? ICONS[benefit.icon] : null;
                  return (
                    <li
                      key={`${benefit.label}-${index}`}
                      className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {Icon ? (
                        <Icon
                          className="h-4 w-4 text-brand"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-2 w-2 rounded-full bg-accent-cool"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {benefit.label}
                      </span>
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
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <span className="relative z-10">{primaryCta.label}</span>
                    <ArrowRight
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-0 -z-0 bg-gradient-to-r from-brand via-accent-cool to-accent-warm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground hover:text-foreground"
                  >
                    {secondaryCta.label}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>

              {tertiaryCta && (
                <Link
                  href={tertiaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  {tertiaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            {stats?.length > 0 && (
              <dl className="grid gap-3 pt-2 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/50 bg-card/80 p-4 text-left shadow-sm"
                  >
                    <dd className="text-2xl font-semibold text-foreground sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="relative z-10">
            <div className="absolute inset-0 -translate-x-6 translate-y-6 rounded-[36px] bg-gradient-to-br from-brand/20 via-accent-cool/15 to-accent-warm/10 blur-3xl" />
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="relative overflow-hidden rounded-[32px] border border-border/50 bg-card/80 p-2 shadow-2xl backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                  <Image
                    src={imageUrl}
                    alt="Sesión de cuencos ceremoniales de EDHUCO"
                    fill
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 right-6 hidden rounded-3xl border border-border/60 bg-background/95 px-6 py-5 shadow-xl backdrop-blur md:block">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent-cool">
                    <Sparkles
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      Acompañamiento personalizado
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Diseñamos rituales, sesiones y herramientas según tu ritmo
                      para sostener el proceso con integridad.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -top-6 right-10 hidden h-20 w-20 rounded-full bg-accent-warm/30 blur-3xl md:block" />
              <div className="pointer-events-none absolute top-1/2 -left-8 hidden h-24 w-24 rounded-full bg-brand/20 blur-3xl md:block" />
            </div>
          </div>
        </div>

        {trustedBy.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Confían en EDHUCO
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-muted-foreground/80 sm:text-base">
              {trustedBy.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full bg-card/60 px-4 py-2 ring-1 ring-border/50"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,_black_45%,_transparent)]">
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand/14 via-accent-cool/10 to-accent-warm/12 blur-3xl" />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent-cool/12 blur-3xl" />
        <div className="absolute -right-16 top-1/2 h-72 w-72 rounded-full bg-accent-warm/12 blur-3xl" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </div>
  );
}
