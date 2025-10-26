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
      data-oid="oxounsp"
    >
      <div className="container-app space-y-12 text-center" data-oid="_1ihwai">
        <header className="space-y-4" data-oid="44izat:">
          {eyebrow ? (
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
              data-oid="_b9.r2y"
            >
              {eyebrow}
            </span>
          ) : null}

          <h2
            id={`${id}-title`}
            className="mx-auto max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
            data-oid="naf4:9v"
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg"
              data-oid="rblq9rp"
            >
              {subtitle}
            </p>
          ) : null}
        </header>

        <div
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          data-oid="6klz_5l"
        >
          {primaryCta ? (
            <Button asChild size="lg" data-oid="d7db8qh">
              <Link href={primaryCta.href} data-oid="d1-647:">
                {primaryCta.label}
              </Link>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button asChild variant="outline" size="lg" data-oid="eqw8t7_">
              <Link href={secondaryCta.href} data-oid="q.m802z">
                {secondaryCta.label}
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="mx-auto max-w-3xl space-y-3" data-oid="4l5r3rk">
          <h3
            className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            data-oid="mqzen:4"
          >
            Opciones rapidas
          </h3>
          <div className="grid gap-3 sm:grid-cols-3" data-oid="fretczr">
            {QUICK_ACTIONS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg border border-border/60 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted/40"
                data-oid="zv38tui"
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
