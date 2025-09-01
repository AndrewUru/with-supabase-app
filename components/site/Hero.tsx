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
 * - Tailwind-ready
 * - Accesible (aria-labelledby)
 * - Props para reutilización
 *
 * Nota: para el degradado del highlight se usa la clase utilitaria `text-gradient`.
 * Añade en tu CSS global (o Tailwind plugin) algo como:
 * .text-gradient{ @apply bg-gradient-to-r from-brand to-accent-cool bg-clip-text text-transparent; }
 */
export default function Hero({
  id = "hero",
  pill = "Desarrollo Humano Consciente",
  title = "Reconecta con tu",
  highlight = "sabiduría interior",
  subtitle = "Terapias, viajes chamánicos y formaciones para tu transformación personal. Acompañamiento respetuoso, herramientas claras y práctica real.",
  primaryCta = { href: "/auth/signup", label: "Empieza ahora" },
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
      className={`relative isolate overflow-hidden py-24 sm:py-32 ${className}`}
    >
      {/* Background decor (light/dark) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Capa 1: máscara radial para foco */}
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,_black_60%,_transparent)]">
          <div className="absolute left-1/2 -top-28 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/60 blur-2xl" />
          <div className="absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-primary/15 blur-2xl" />
        </div>
        {/* Capa 2: grid suave para profundidad */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            color: "oklch(var(--foreground)/0.5)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Pill superior */}
        {pill ? (
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{pill}</span>
          </span>
        ) : null}

        {/* Título */}
        <h1
          id={`${id}-title`}
          className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl"
        >
          {title} <span className="text-gradient">{highlight}</span>
        </h1>

        {/* Subtítulo */}
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            {subtitle}
          </p>
        ) : null}

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="group inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              {primaryCta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : null}

          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex min-w-40 items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>

        {/* Social proof / mini-benefits */}
        {benefits?.length ? (
          <div
            className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            aria-label="Beneficios principales"
          >
            {benefits.map((b, i) => {
              const Icon = ICONS[(b.icon as BenefitIconName) ?? "ShieldCheck"]; // fallback
              return (
                <span
                  key={`${b.label}-${i}`}
                  className="inline-flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {b.label}
                </span>
              );
            })}
          </div>
        ) : null}

        {/* Scroll cue */}
        {secondaryCta?.href?.startsWith("#") ? (
          <div className="mt-10 flex justify-center">
            <Link
              href={secondaryCta.href}
              className="group inline-flex flex-col items-center text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              aria-label="Desplázate para ver más"
            >
              <span className="mb-2">Desliza para descubrir</span>
              <span className="inline-block rounded-full border p-2 transition group-hover:translate-y-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
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
