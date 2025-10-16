"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "Agendar entrevista inicial", href: "/#agenda" },
  { label: "Enviar tus dudas", href: "/#contacto-form" },
  { label: "Escribir a hola@edhuco.org", href: "mailto:hola@edhuco.org" },
];

export interface CtaFinalSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  className?: string;
}

const defaultPrimary = { href: "/contacto", label: "Coordinar llamada" };
const defaultSecondary = { href: "/#agenda", label: "Ver disponibilidad" };

export default function CtaFinalSection({
  id = "contacto",
  eyebrow = "Ultimo paso",
  title = "Empezamos cuando quieras",
  subtitle = "Coordina una llamada o escribe un mensaje para diseñar juntos tu recorrido.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  className,
}: CtaFinalSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-24 sm:py-28", className)}
    >
      <div className="container-app space-y-12 text-center">
        <header className="space-y-4">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}

          <h2
            id={`${id}-title`}
            className="mx-auto max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </h2>

          {subtitle ? (
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </header>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {primaryCta ? (
            <Button asChild size="lg">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Opciones rapidas
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {QUICK_ACTIONS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg border border-border/60 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted/40"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
