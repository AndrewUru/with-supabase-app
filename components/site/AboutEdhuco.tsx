import Link from "next/link";

const PILLARS = [
  { label: "Recursos", text: "Audios, videos y guias para integrar la experiencia EDHUCO." },
  { label: "Acompanamiento", text: "Profesionales que sostienen procesos eticos y humanos." },
  { label: "Comunidad", text: "Personas en varios paises construyendo bienestar desde la presencia." },
];

const PLANS = [
  {
    title: "Gratis",
    price: "0 EUR",
    helper: "Siempre disponible",
    features: [
      "Acceso basico al area personal",
      "Recursos abiertos seleccionados",
      "Newsletter con practicas mensuales",
    ],
    cta: { href: "/auth/signup", label: "Crear cuenta" },
  },
  {
    title: "Suscripcion EDHUCO",
    price: "22 EUR/mes",
    helper: "Cancela cuando quieras",
    features: [
      "Biblioteca completa y descargas",
      "Listas personalizadas y recordatorios",
      "Prioridad en nuevas formaciones",
    ],
    cta: { href: "/auth/signup?plan=pro", label: "Empezar ahora" },
  },
];

const FAQ_ITEMS = [
  {
    question: "Que necesito para empezar?",
    answer: "Crea una cuenta gratuita y explora los recursos abiertos para familiarizarte con la experiencia.",
  },
  {
    question: "Puedo cancelar cuando quiera?",
    answer: "Si. La suscripcion es mensual y se cancela desde tu area personal sin permanencias.",
  },
  {
    question: "Como se actualiza el contenido?",
    answer: "Publicamos nuevos materiales periodicamente y te avisamos con recordatorios opcionales.",
  },
];

export default function AboutEdhuco() {
  return (
    <section id="about-edhuco" aria-labelledby="about-title" className="py-16">
      <div className="container-app space-y-12">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <span className="text-sm text-muted-foreground">Comunidad viva</span>
          <h2 id="about-title" className="text-3xl text-foreground sm:text-4xl">
            EDHUCO es un espacio para aprender, sanar y compartir
          </h2>
          <p className="text-base text-muted-foreground">
            Entrelazamos saberes ancestrales y herramientas actuales para ofrecer recursos, acompanamiento y
            comunidad en un solo lugar.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="space-y-2 text-sm text-muted-foreground">
              <p className="text-foreground">{pillar.label}</p>
              <p>{pillar.text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {PLANS.map((plan) => (
            <article key={plan.title} className="space-y-3 border border-border/60 p-6">
              <header className="space-y-1">
                <p className="text-sm text-muted-foreground">{plan.helper}</p>
                <h3 className="text-2xl text-foreground">{plan.title}</h3>
              </header>

              <p className="text-xl text-foreground">{plan.price}</p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <Link href={plan.cta.href} className="inline-flex text-sm text-primary">
                {plan.cta.label}
              </Link>
            </article>
          ))}
        </section>

        <section className="space-y-4" aria-label="Preguntas frecuentes">
          <h3 className="text-lg text-foreground">Preguntas frecuentes</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {FAQ_ITEMS.map((faq) => (
              <article key={faq.question} className="space-y-2 text-sm text-muted-foreground">
                <h4 className="text-foreground">{faq.question}</h4>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
