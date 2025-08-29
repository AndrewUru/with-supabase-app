// app/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Mountain,
  GraduationCap,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";

export const metadata = {
  title: "EDHUCO – Terapias, Viajes Chamánicos y Formaciones",
  description:
    "Descubre EDHUCO: sesiones de terapia, viajes chamánicos y formaciones transformadoras. Reconecta con tu sabiduría interior.",
  openGraph: {
    title: "EDHUCO – Reconexión Ancestral",
    description:
      "Plataforma EDHUCO: terapias, formaciones y viajes chamánicos.",
    url: "https://edhuco.com",
    siteName: "EDHUCO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EDHUCO – Reconexión Ancestral",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-3 p-3 sm:p-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-lg tracking-tight hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
            aria-label="Ir a inicio"
          >
            EDHUCO
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/#servicios"
              className="relative px-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
            >
              <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                Servicios
              </span>
            </Link>
            <Link
              href="/#formaciones"
              className="relative px-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
            >
              <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                Formaciones
              </span>
            </Link>
            <Link
              href="/#viajes"
              className="relative px-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
            >
              <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                Viajes
              </span>
            </Link>
            <Link
              href="/#contacto"
              className="relative px-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
            >
              <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                Contacto
              </span>
            </Link>
          </nav>

          {/* Acciones desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/protected"
              className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Área personal
            </Link>
            <AuthButton />
            <ThemeSwitcher />
          </div>

          {/* Móvil: menú con <details> nativo accesible */}
          <div className="md:hidden">
            <details className="group relative">
              <summary
                className="list-none inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                aria-label="Abrir menú"
              >
                <span className="i-lucide-menu block size-5" />
                Menú
              </summary>

              {/* Panel */}
              <div
                className="absolute right-0 mt-2 w-[88vw] max-w-xs rounded-xl border bg-background/95 backdrop-blur p-4 shadow-xl"
                role="menu"
                aria-label="Navegación principal"
              >
                <nav className="flex flex-col gap-2 text-base">
                  <Link
                    href="/#servicios"
                    className="rounded-md px-2 py-2 hover:bg-muted"
                    role="menuitem"
                  >
                    Servicios
                  </Link>
                  <Link
                    href="/#formaciones"
                    className="rounded-md px-2 py-2 hover:bg-muted"
                    role="menuitem"
                  >
                    Formaciones
                  </Link>
                  <Link
                    href="/#viajes"
                    className="rounded-md px-2 py-2 hover:bg-muted"
                    role="menuitem"
                  >
                    Viajes
                  </Link>
                  <Link
                    href="/#contacto"
                    className="rounded-md px-2 py-2 hover:bg-muted"
                    role="menuitem"
                  >
                    Contacto
                  </Link>
                </nav>

                <div className="my-3 h-px bg-border" />

                <div className="flex flex-col gap-2">
                  <Link
                    href="/protected"
                    className="w-full rounded-xl border px-4 py-2 text-center text-sm font-semibold hover:bg-muted"
                    role="menuitem"
                  >
                    Área personal
                  </Link>
                  <AuthButton />
                  <div className="flex justify-end">
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden py-24 sm:py-32"
      >
        {/* background decor (compatible light/dark) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* capa 1: máscara radial para foco */}
          <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,_black_60%,_transparent)]">
            <div className="absolute left-1/2 -top-28 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/60 blur-2xl" />
            <div className="absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-primary/15 blur-2xl" />
          </div>
          {/* capa 2: grid suave para profundidad */}
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
          {/* pill superior */}
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Programa integral de bienestar</span>
          </span>

          {/* título */}
          <h1
            id="hero-title"
            className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl"
          >
            Reconecta con tu{" "}
            <span className="text-gradient">sabiduría interior</span>
          </h1>

          {/* subtítulo */}
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Terapias, viajes chamánicos y formaciones para tu transformación
            personal. Acompañamiento respetuoso, herramientas claras y práctica
            real.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {/* CTA primario */}
            <Link
              href="/auth/signup"
              className="group inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              Empieza ahora
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* CTA secundario */}
            <Link
              href="#servicios"
              className="inline-flex min-w-40 items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Ver servicios
            </Link>
          </div>

          {/* social proof / mini-benefits */}
          <div
            className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            aria-label="Beneficios principales"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Enfoque respetuoso y seguro
            </span>
            <span className="inline-flex items-center gap-2">
              <Mountain className="h-4 w-4" aria-hidden="true" />
              Retiros y viajes guiados
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Formaciones vivenciales
            </span>
          </div>

          {/* scroll cue */}
          <div className="mt-10 flex justify-center">
            <Link
              href="#servicios"
              className="group inline-flex flex-col items-center text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              aria-label="Desplázate para ver los servicios"
            >
              <span className="mb-2">Desliza para descubrir</span>
              <span className="inline-block rounded-full border p-2 transition group-hover:translate-y-0.5">
                {/* caret / chevron */}
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
        </div>
      </section>

      {/* BENEFICIOS */}
      <section
        id="servicios"
        className="mx-auto max-w-6xl py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-12">¿Por qué elegir EDHUCO?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Terapias transformadoras",
              desc: "Sesiones individuales y grupales con música, voz y energía.",
            },
            {
              title: "Formaciones vivenciales",
              desc: "Aprende prácticas chamánicas y sabiduría ancestral.",
            },
            {
              title: "Viajes únicos",
              desc: "Retiros y experiencias en Perú, España y más destinos.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition"
            >
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-muted/30 py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Lo que dicen</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Caterina C.L.",
                text: "Un camino de sanación, humildad y empoderamiento. Resultados desde el primer momento.",
              },
              {
                name: "Alicia P.",
                text: "La música me atravesó. Salí más ligera y presente.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 border rounded-xl bg-background shadow-sm text-left"
              >
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <p className="italic text-muted-foreground">“{t.text}”</p>
                <p className="mt-4 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        id="contacto"
        className="mx-auto max-w-4xl text-center py-20 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Da el siguiente paso en tu camino
        </h2>
        <p className="text-muted-foreground mb-8">
          Reserva tu plaza en nuestras terapias, formaciones o viajes. Vive la
          experiencia EDHUCO.
        </p>
        <Link
          href="/auth/signup"
          className="px-8 py-4 rounded-lg bg-accent text-background font-semibold text-lg hover:opacity-90 inline-flex items-center gap-2"
        >
          Unirme ahora <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}
