"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  className?: string;
}

const defaultPrimary = { href: "/auth/sign-up", label: "Comenzar" };
const defaultSecondary = { href: "/contacto", label: "Conocer mas" };

export default function Hero({
  id = "hero",
  eyebrow = "EDHUCO",
  title = "Acompanamos procesos de crecimiento humano",
  subtitle = "Terapias, formaciones y retiros para sostener tu transformacion desde la calma.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  className,
}: HeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 sm:py-28", className)}
    >
      <div className="container-app flex flex-col items-center gap-8 text-center">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {eyebrow}
          </span>
        ) : null}

        <div className="space-y-5">
          <h1
            id={`${id}-title`}
            className="mx-auto max-w-3xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            {title}
          </h1>

          {subtitle ? (
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
      </div>
    </section>
  );
}
