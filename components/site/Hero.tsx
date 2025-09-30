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

const ICONS = { ShieldCheck, Mountain, GraduationCap };

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
  imageUrl?: string;
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
  imageUrl = "/images/hero-person.jpg",
  className = "",
}: HeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // Capamos altura y recortamos padding. Usamos svh/dvh para móviles/desktop.
      className={`relative isolate bg-transparent py-10 md:py-12 lg:py-14 overflow-clip max-h-[100svh] md:max-h-[100dvh] ${className}`}
    >
      <BackgroundDecor />

      <div className="container-app">
        {/* Limitamos la altura del grid y centramos verticalmente */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 items-center max-h-[calc(100svh-2.5rem)] md:max-h-[calc(100dvh-3rem)]">
          {/* Columna de contenido */}
          <div className="relative z-10 flex flex-col gap-6 lg:gap-7">
            {pill && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <span className="inline-flex w-max items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-sm">
                  {pill}
                </span>
              </div>
            )}

            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100">
              <h1
                id={`${id}-title`}
                className="text-balance text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-[1.15]"
              >
                {title}
                {highlight && (
                  <span className="mt-1.5 block bg-gradient-to-r from-brand via-accent-cool to-accent-warm bg-clip-text text-transparent">
                    {highlight}
                  </span>
                )}
              </h1>
              {subtitle && (
                <p className="max-w-xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
              <div className="flex flex-wrap items-center gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <span className="relative z-10">{primaryCta.label}</span>
                    <ArrowRight
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-brand to-accent-cool opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="group inline-flex items-center gap-2 rounded-xl border-2 border-border/60 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/50 hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    {secondaryCta.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>

              {benefits?.length > 0 && (
                <ul className="flex flex-wrap gap-2.5">
                  {benefits.map((benefit, index) => {
                    const Icon = ICONS[benefit.icon ?? "ShieldCheck"];
                    return (
                      <li
                        key={`${benefit.label}-${index}`}
                        className="flex items-center gap-2 text-[13px] text-muted-foreground animate-in fade-in duration-300"
                        style={{ animationDelay: `${250 + index * 80}ms` }}
                      >
                        <Icon className="h-4 w-4 text-brand shrink-0" />
                        <span className="font-medium">{benefit.label}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {stats?.length > 0 && (
              <dl className="grid grid-cols-3 gap-3 pt-2 animate-in fade-in duration-500 delay-300">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-left">
                    <dd className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-brand to-accent-cool bg-clip-text text-transparent">
                      {stat.value}
                    </dd>
                    <dt className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Columna de imagen */}
          <div className="relative z-10 animate-in fade-in slide-in-from-right-6 duration-500 delay-100">
            <div className="relative mx-auto w-full max-w-[560px]">
              {/* Glow controlado */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand/20 via-accent-cool/20 to-accent-warm/20 blur-2xl opacity-50" />

              {/* Contenedor imagen con altura máxima para no exceder 100vh */}
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-2 shadow-2xl backdrop-blur-sm">
                <div className="relative aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-2xl max-h-[60svh] md:max-h-[65dvh]">
                  <Image
                    src={imageUrl}
                    alt="Persona en proceso de transformación personal"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105 rounded-2xl"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Card flotante (no desbordar) */}
              <div className="hidden md:block absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
                <div className="rounded-2xl border border-border/70 bg-background/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent-cool">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-semibold text-foreground">
                        Acompañamiento personalizado
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Cada programa se adapta al ritmo de la persona con
                        cuidado e integridad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blobs más pequeños para evitar overflow */}
              <div className="pointer-events-none absolute -top-4 -right-4 h-16 w-16 rounded-full bg-accent-warm/20 blur-2xl" />
              <div className="pointer-events-none absolute top-1/3 -left-5 h-20 w-20 rounded-full bg-brand/15 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Más pequeño y con máscara para no ocupar altura extra */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_55%_at_50%_40%,_black_35%,_transparent)]">
        <div className="absolute left-1/2 -top-24 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand/12 via-accent-cool/10 to-accent-warm/8 blur-3xl" />
        <div className="absolute -left-14 top-1/3 h-56 w-56 rounded-full bg-accent-cool/12 blur-3xl" />
        <div className="absolute -right-14 top-1/2 h-56 w-56 rounded-full bg-accent-warm/10 blur-3xl" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
