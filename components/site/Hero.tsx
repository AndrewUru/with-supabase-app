"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "@/app/styles/hero-experience.css";

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
const defaultSecondary = { href: "/contacto", label: "Conocer más" };

export default function Hero({
  id = "hero",
  eyebrow = "EDHUCO",
  title = "Acompañamos procesos de crecimiento humano",
  subtitle = "Terapias, formaciones y retiros para sostener tu transformación desde la calma.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  className,
}: HeroProps) {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const loadExperience = async () => {
      const [{ gsap }, { ScrollTrigger }, LenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis").then((mod) => mod.default ?? mod),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      (window as unknown as Record<string, unknown>).gsap = gsap;
      (window as unknown as Record<string, unknown>).ScrollTrigger =
        ScrollTrigger;
      (window as unknown as Record<string, unknown>).Lenis = LenisModule;

      const script = document.createElement("script");
      script.src = "/js/hero-experience.js";
      script.async = true;
      document.body.appendChild(script);

      cleanup = () => {
        script.remove();
        delete (window as unknown as Record<string, unknown>).gsap;
        delete (window as unknown as Record<string, unknown>).ScrollTrigger;
        delete (window as unknown as Record<string, unknown>).Lenis;
      };
    };

    void loadExperience();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <>
      <div className="gradient-reveal"></div>

      <div className="audio-enable">
        <p>
          COMIENZA LA EXPERIENCIA
          <br />
          CON SONIDO
        </p>
        <button className="enable-button" id="enableBtn">
          INICIAR
        </button>
      </div>

      <div className="preloader" id="preloader">
        <span id="counter">[000]</span>
      </div>

      <div className="geometric-background">
        <svg className="geometric-svg" viewBox="0 0 1920 1080">
          <g id="grid-lines"></g>
          <g id="circles-outline"></g>
          <g id="circles-filled">
            <clipPath id="right-half">
              <rect x="960" y="0" width="960" height="1080" />
            </clipPath>
            <g clipPath="url(#right-half)"></g>
          </g>

          <text className="geometric-text" x="100" y="100">
            EL CAMINO
          </text>
          <text className="geometric-text" x="100" y="130">
            SONORO
          </text>

          <text className="geometric-text" x="1720" y="100">
            SONIDOS QUE
          </text>
          <text className="geometric-text" x="1720" y="130">
            TRANSFORMAN
          </text>

          <text className="geometric-text" x="100" y="980" id="debugLine1">
            VIBRACIÓN: SANADORA
          </text>
          <text className="geometric-text" x="100" y="995" id="debugLine2">
            ENERGÍA: CONSCIENTE
          </text>
          <text className="geometric-text" x="100" y="1010" id="debugLine3">
            ESTADO: EXPANDIDO
          </text>
          <text className="geometric-text" x="100" y="1025" id="debugLine4">
            PRESENCIA: VIVA
          </text>

          <text className="geometric-text" x="1620" y="950">
            ENTRE LA VIBRACIÓN
          </text>
          <text className="geometric-text" x="1620" y="985">
            Y EL SILENCIO
          </text>
        </svg>
      </div>

      <audio id="startClickSound" preload="auto">
        <source
          src="https://assets.codepen.io/7558/preloader-2s-001.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio id="preloaderSound" preload="auto">
        <source
          src="https://assets.codepen.io/7558/preloader-5s-001.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio id="scrollSound1" loop preload="auto">
        <source
          src="https://elsaltoweb.es/wp-content/uploads/2025/10/audio-flauta.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio id="scrollSound2" loop preload="auto">
        <source
          src="https://elsaltoweb.es/wp-content/uploads/2025/10/audio-flauta.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio id="scrollSound3" loop preload="auto">
        <source
          src="https://elsaltoweb.es/wp-content/uploads/2025/10/audio-flauta.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio id="hoverSound" preload="auto">
        <source
          src="https://assets.codepen.io/7558/preloader-2s-001.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio id="backgroundMusic" loop preload="auto">
        <source
          src="https://elsaltoweb.es/wp-content/uploads/2025/10/audio-flauta.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="center-circle">
        <div className="circle-container">
          <div className="glowing-circle" id="glowCircle"></div>
        </div>
      </div>

      <section id={id} className={cn("section section-1", className)}>
        <div className="section-content text-center">
          {eyebrow && (
            <span className="text-xl margin-top-5 font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </span>
          )}
          <div className="space-y-10">
            <h1 className="mx-auto max-w-3xl text-4xl sm:text-6xl font-semibold leading-tight tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-8">
            {primaryCta && (
              <Button asChild size="lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="section section-2">
        <div className="section-content"></div>
      </section>
      <section className="section section-3">
        <div className="section-content"></div>
      </section>

      <footer className="site-footer">
        <div className="footer-content-section">
          <div className="footer-content">
            <div className="footer-left text-center md:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                EN EL SILENCIO
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                NACE EL SONIDO
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                QUE TRANSFORMA
              </p>
              <br />
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                EN LA OSCURIDAD
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                SE ESCONDE
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                LA LUZ DEL DESPERTAR
              </p>
            </div>

            <div className="footer-right text-center md:text-right">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                LA VIBRACIÓN RECORRE
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                CADA ESPACIO INTERIOR
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                DESPIERTA MEMORIAS
              </p>
              <br />
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                SANA HERIDAS ANTIGUAS
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                Y NOS CONECTA CON
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                LA MAGIA DE LA VIDA
              </p>
            </div>
          </div>
          <div className="footer-credits">
            <p>
              Sonido y Sanación por{" "}
              <a
                href="https://open.spotify.com/artist/6YXgRMajnjib8j6Cxzcryp?si=iiLnt59BRp6QgKGizkG5Zg"
                target="_blank"
              >
                @SonidosAncestrales
              </a>
            </p>
          </div>
        </div>
        <div className="footer-svg-section"></div>
      </footer>
    </>
  );
}
