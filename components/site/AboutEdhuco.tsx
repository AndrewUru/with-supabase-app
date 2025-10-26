"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PILLARS = [
  {
    label: "Recursos",
    text: "Audios, videos y guías para integrar la experiencia EDHUCO.",
  },
  {
    label: "Acompañamiento",
    text: "Profesionales que sostienen procesos éticos y humanos.",
  },
  {
    label: "Comunidad",
    text: "Personas en varios países construyendo bienestar desde la presencia.",
  },
];

const PLANS = [
  {
    title: "Gratis",
    price: "0 €",
    helper: "Siempre disponible",
    features: [
      "Acceso básico al área personal",
      "Recursos abiertos seleccionados",
      "Newsletter con prácticas mensuales",
    ],

    cta: { href: "/auth/signup", label: "Crear cuenta" },
  },
  {
    title: "Suscripción EDHUCO",
    price: "22 €/mes",
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
    question: "¿Qué necesito para empezar?",
    answer:
      "Crea una cuenta gratuita y explora los recursos abiertos para familiarizarte con la experiencia.",
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer:
      "Sí. La suscripción es mensual y se cancela desde tu área personal sin permanencias.",
  },
  {
    question: "¿Cómo se actualiza el contenido?",
    answer:
      "Publicamos nuevos materiales periódicamente y te avisamos con recordatorios opcionales.",
  },
];

export default function AboutEdhuco() {
  return (
    <section
      id="about-edhuco"
      aria-labelledby="about-title"
      className="py-24 bg-background"
      data-oid="xpibsxs"
    >
      <div className="container-app space-y-16" data-oid="lbew3al">
        {/* Header */}
        <header
          className="mx-auto max-w-3xl space-y-4 text-center"
          data-oid="m-kh2lr"
        >
          <span
            className="text-sm font-medium text-primary/70 tracking-wider"
            data-oid="4p:7l_k"
          >
            Comunidad viva
          </span>
          <h2
            id="about-title"
            className="text-4xl font-semibold text-foreground sm:text-5xl leading-tight"
            data-oid="81o65fz"
          >
            EDHUCO es un espacio para aprender, sanar y compartir
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed"
            data-oid="9h3uf89"
          >
            Entrelazamos saberes ancestrales y herramientas actuales para
            ofrecer{" "}
            <strong className="text-foreground/90" data-oid="w44v_us">
              recursos, acompañamiento y comunidad
            </strong>{" "}
            en un solo lugar.
          </p>
        </header>

        {/* Pillars */}
        <section className="grid gap-8 sm:grid-cols-3" data-oid="l5cb9re">
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-xl bg-muted/30 p-6 backdrop-blur-sm hover:bg-muted/40 transition-all"
              data-oid="dka7gsv"
            >
              <h3
                className="text-lg font-medium text-foreground mb-2"
                data-oid="rn-kp.3"
              >
                {pillar.label}
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                data-oid="9m1xc14"
              >
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Plans */}
        <section className="grid gap-8 lg:grid-cols-2" data-oid="-8u-e4i">
          {PLANS.map((plan) => (
            <motion.article
              key={plan.title}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-8 shadow-sm hover:shadow-md transition-all"
              data-oid="-k8q9.1"
            >
              <header className="space-y-1" data-oid="im7t77h">
                <p className="text-sm text-muted-foreground" data-oid="4.jt3sw">
                  {plan.helper}
                </p>
                <h3
                  className="text-2xl font-semibold text-foreground"
                  data-oid="cri-1rk"
                >
                  {plan.title}
                </h3>
              </header>

              <p
                className="text-3xl font-medium text-primary mt-2"
                data-oid="tf:gzhl"
              >
                {plan.price}
              </p>

              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="2qybx80"
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2"
                    data-oid="4m7.l_s"
                  >
                    <span className="text-primary" data-oid="_yb4r1.">
                      •
                    </span>{" "}
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className="inline-flex mt-6 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-background transition-all"
                data-oid="wp.lgda"
              >
                {plan.cta.label}
              </Link>
            </motion.article>
          ))}
        </section>

        {/* FAQ */}
        <section
          className="space-y-6"
          aria-label="Preguntas frecuentes"
          data-oid="khgeshy"
        >
          <h3
            className="text-xl font-semibold text-foreground text-center"
            data-oid="-ov1k7w"
          >
            Preguntas frecuentes
          </h3>
          <div className="grid gap-6 md:grid-cols-3" data-oid="zci0nsg">
            {FAQ_ITEMS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl bg-muted/30 p-6 hover:bg-muted/40 transition-colors"
                data-oid="f8ql_1v"
              >
                <h4
                  className="text-base font-medium text-foreground mb-2"
                  data-oid="6.mzo:6"
                >
                  {faq.question}
                </h4>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-oid="ilni17r"
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
