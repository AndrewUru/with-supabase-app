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

const ICONS: Record<BenefitIconName, LucideIcon> = {
  ShieldCheck,
  Mountain,
  GraduationCap,
};

export interface HeroProps {
  id?: string;
  pill?: string; // Texto pequeño sobre el título
  title?: string; // Título principal sin la parte destacada
  highlight?: string; // Palabra/frase destacada con degradado
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  benefits?: Array<{ label: string; icon?: BenefitIconName }>;
  className?: string;
}

/**
 * Hero server-component (sin "use client").
 * - Tailwind-ready con design system personalizado
 * - Accesible (aria-labelledby)
 * - Props para reutilización
 * - Usa las clases del design system: text-gradient, surface, btn, etc.
 */
export default function Hero({
  id = "hero",
  pill = "EDHUCO",
  title = "Educación para el",
  highlight = "Desarrollo Humano Consciente",
  subtitle = "Terapias, viajes chamánicos y formaciones para tu transformación personal. Acompañamiento respetuoso, herramientas claras y práctica real.",
  primaryCta = { href: "/auth/sign-up", label: "Empieza ahora" },
  secondaryCta = { href: "#servicios", label: "Ver servicios" },
  benefits = [
    { label: "Enfoque respetuoso y seguro", icon: "ShieldCheck" },
    { label: "Retiros y viajes guiados", icon: "Mountain" },
    { label: "Formaciones vivenciales", icon: "GraduationCap" },
  ],
  className = "",
}: HeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate overflow-hidden section ${className}`}
    >
      {/* Background decor con colores del design system */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Capa 1: efectos con colores de marca */}
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,_black_60%,_transparent)]">
          {/* Gradiente principal con colores de marca */}
          <div className="absolute left-1/2 -top-28 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand/20 via-accent-cool/15 to-accent-warm/10 blur-3xl" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent-cool/20 blur-2xl" />
          <div className="absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-accent-warm/15 blur-2xl" />
          <div className="absolute top-1/4 left-3/4 h-48 w-48 rounded-full bg-brand/10 blur-xl" />
        </div>
        {/* Capa 2: grid suave con opacidad ajustada */}
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

      <div className="container-app text-center">
        {/* Pill superior con glass effect */}
        {pill ? (
          <span className="inline-flex items-center gap-2 surface px-4 py-2 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span className="text-foreground">{pill}</span>
          </span>
        ) : null}

        {/* Título con mejores espacios y hierarchy */}
        <h1
          id={`${id}-title`}
          className="mt-8 text-balance font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            lineHeight: "1.1",
          }}
        >
          <span className="block text-foreground">{title}</span>
          <span className="text-gradient block mt-2">{highlight}</span>
        </h1>

        {/* Subtítulo con mejor legibilidad */}
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        ) : null}

        {/* CTAs usando clases del design system */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="btn group shadow-soft hover:shadow-md transition-all duration-300"
            >
              {primaryCta.label}
              <ArrowRight
                className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : null}

          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="btn-outline hover:border-brand/30 hover:text-brand transition-all duration-300"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>

        {/* Social proof / mini-benefits con mejores colores */}
        {benefits?.length ? (
          <div
            className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm"
            aria-label="Beneficios principales"
          >
            {benefits.map((b, i) => {
              const Icon = ICONS[(b.icon as BenefitIconName) ?? "ShieldCheck"];
              const colors = [
                "text-brand",
                "text-accent-cool",
                "text-accent-warm",
              ];
              const iconColor = colors[i % colors.length];

              return (
                <span
                  key={`${b.label}-${i}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
                  <span className="font-medium">{b.label}</span>
                </span>
              );
            })}
          </div>
        ) : null}

        {/* Scroll cue mejorado */}
        {secondaryCta?.href?.startsWith("#") ? (
          <div className="mt-16 flex justify-center">
            <Link
              href={secondaryCta.href}
              className="group inline-flex flex-col items-center text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
              aria-label="Desplázate para ver más"
            >
              <span className="mb-3 font-medium">Desliza para descubrir</span>
              <span className="inline-flex items-center justify-center w-10 h-10 surface transition-all group-hover:translate-y-1 group-hover:shadow-md">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-brand"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* --- Ejemplo de uso (Next.js App Router) ---
import Hero from "@/components/site/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
    </main>
  );
}
*/
