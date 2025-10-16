// components/site/AboutEdhuco.tsx
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const WIPHLA_GRADIENT =
  "linear-gradient(90deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

const FAQ_ITEMS = [
  {
    question: "Que necesito para empezar?",
    answer:
      "Crea una cuenta gratuita. Desde tu perfil podras explorar recursos abiertos y probar la experiencia.",
  },
  {
    question: "Puedo cancelar cuando quiera?",
    answer:
      "Si. La suscripcion es mensual y la puedes cancelar en cualquier momento desde tu area personal.",
  },
  {
    question: "Como se actualiza el contenido?",
    answer:
      "Publicamos nuevos audios, videos y PDFs periodicamente. Te avisaremos con recordatorios opcionales.",
  },
];

const PILLARS = [
  {
    label: "Recursos",
    text: "Audios, videos y PDFs seleccionados para integrar la experiencia EDHUCO." ,
  },
  {
    label: "Acompanamiento",
    text: "Profesionales que sostienen procesos eticos y humanos." ,
  },
  {
    label: "Comunidad",
    text: "Personas en seis paises construyendo bienestar desde la presencia." ,
  },
];

const PLANS = [
  {
    title: "Gratis",
    price: "0 EUR",
    helper: "Siempre",
    features: [
      "Acceso al area personal basico",
      "Recursos abiertos seleccionados",
      "Newsletter con practicas mensuales",
      "Favoritos limitados",
    ],
    cta: { href: "/auth/signup", label: "Crear cuenta" },
  },
  {
    title: "Suscripcion EDHUCO",
    price: "22 EUR/mes",
    helper: "Cancela cuando quieras",
    features: [
      "Biblioteca completa",
      "Descargas ampliadas y progreso guardado",
      "Listas personalizadas y recordatorios",
      "Acceso prioritario a nuevas formaciones",
    ],
    cta: { href: "/auth/signup?plan=pro", label: "Empezar ahora" },
  },
];

export default function AboutEdhuco() {
  return (
    <section
      id="about-edhuco"
      aria-labelledby="about-title"
      className="section relative isolate overflow-hidden"
    >
      <FlagBackground />

      <div className="container-app relative z-10 space-y-12">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/75 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <span
              className="h-2 w-10 rounded-full"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
              aria-hidden="true"
            />
            Comunidad viva
          </span>

          <h2
            id="about-title"
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[44px]"
          >
            EDHUCO es tu espacio para aprender, sanar y compartir
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Una plataforma que entrelaza saberes ancestrales y herramientas contemporaneas. Accede a recursos, acompanamiento y comunidad en un solo lugar.
          </p>
        </header>

        <section className="grid gap-4 rounded-3xl border border-white/20 bg-card/70 p-6 text-sm shadow-[0_26px_90px_-70px_rgba(17,24,39,0.8)] backdrop-blur-sm dark:bg-card/55 sm:grid-cols-3 sm:p-8">
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="space-y-2 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                {pillar.label}
              </p>
              <p className="text-sm text-muted-foreground/90">{pillar.text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.title}
              className="space-y-4 rounded-3xl border border-white/20 bg-card/75 p-6 shadow-[0_32px_100px_-72px_rgba(17,24,39,0.84)] backdrop-blur-sm dark:bg-card/55"
            >
              <header className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                  Plan
                </p>
                <h3 className="text-2xl font-semibold text-foreground">{plan.title}</h3>
                <p className="text-sm text-muted-foreground">{plan.helper}</p>
              </header>

              <div>
                <p className="text-3xl font-semibold text-foreground">{plan.price}</p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  href={plan.cta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/35 hover:text-foreground"
                >
                  {plan.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-6" aria-label="Preguntas frecuentes">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">
              <span
                className="h-2 w-10 rounded-full"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Preguntas frecuentes
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Resuelve tus dudas rapido
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {FAQ_ITEMS.map((faq) => (
              <article
                key={faq.question}
                className="space-y-2 rounded-2xl border border-white/15 bg-card/70 p-5 text-left text-sm text-muted-foreground shadow-[0_24px_70px_-64px_rgba(17,24,39,0.78)] backdrop-blur-sm dark:bg-card/55"
              >
                <h4 className="font-semibold text-foreground">{faq.question}</h4>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function FlagBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-background">
      <div className="hidden h-full max-h-[520px] w-full max-w-[720px] overflow-hidden rounded-[48px] border border-white/20 shadow-[0_50px_160px_-80px_rgba(17,24,39,0.85)] md:flex">
        <div className="grid h-full w-full grid-cols-7">
          <span className="h-full w-full" style={{ backgroundColor: "#EE3124" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FF6B00" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FFD500" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FFFFFF" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#00A859" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#0084C9" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#6D3B96" }} aria-hidden="true" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" aria-hidden="true" />
    </div>
  );
}

