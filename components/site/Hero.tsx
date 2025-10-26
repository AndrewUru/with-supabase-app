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
  title = "Acompaño procesos de crecimiento humano",
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
    <div className="hero-experience-wrapper" data-oid="nv3f0ld">
      <div className="gradient-reveal" data-oid="la3wtja"></div>

      <div
        className="audio-enable w-full h-full"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
        aria-labelledby="audioPromptTitle"
        aria-describedby="audioPromptDescription"
        data-oid="-dy.:na"
      >
        <div className="audio-enable__content" data-oid="4gr767b">
          <p id="audioPromptTitle" data-oid="k06w32y">
            COMIENZA LA EXPERIENCIA
            <br data-oid="fwbsnhl" />
            CON SONIDO
          </p>
          <p
            id="audioPromptDescription"
            className="audio-enable__subtitle"
            data-oid="g-t2qi-"
          >
            Activa la ambientación sonora para disfrutar la experiencia animada.
          </p>
          <div className="audio-enable__actions" data-oid="52s2qwa">
            <button
              className="enable-button"
              id="enableBtn"
              type="button"
              aria-label="Iniciar experiencia con sonido"
              data-oid="3a16sp1"
            >
              Iniciar
            </button>
            <button
              className="skip-button"
              id="skipBtn"
              type="button"
              aria-label="Continuar sin activar el sonido"
              data-oid="dz5h0dp"
            >
              Continuar sin sonido
            </button>
          </div>
          <p className="audio-enable__hint" data-oid="pwygm:f">
            Puedes activar el sonido más tarde desde la navegación.
          </p>
        </div>
      </div>

      <div
        className="preloader"
        id="preloader"
        role="status"
        aria-live="polite"
        aria-hidden="true"
        data-oid="a0i2x:2"
      >
        <span id="counter" data-oid="o5nx19k">
          [000]
        </span>
      </div>

      <div className="geometric-background" data-oid="5yxwlst">
        <svg
          className="geometric-svg"
          viewBox="0 0 1920 1080"
          data-oid="22x:657"
        >
          <g id="grid-lines" data-oid="p0v98s:"></g>
          <g id="circles-outline" data-oid="scajcgi"></g>
          <g id="circles-filled" data-oid="hvjsc0t">
            <clipPath id="right-half" data-oid="m7p4j59">
              <rect
                x="960"
                y="0"
                width="960"
                height="1080"
                data-oid="4s3uzp9"
              />
            </clipPath>
            <g clipPath="url(#right-half)" data-oid="sk-29_7"></g>
          </g>

          <text className="geometric-text" x="100" y="100" data-oid="gbecpw4">
            EL CAMINO
          </text>
          <text className="geometric-text" x="100" y="130" data-oid="4ufp_ex">
            SONORO
          </text>

          <text className="geometric-text" x="1720" y="100" data-oid="yv5h_8f">
            SONIDOS QUE
          </text>
          <text className="geometric-text" x="1720" y="130" data-oid="ci9i5dh">
            TRANSFORMAN
          </text>

          <text
            className="geometric-text"
            x="100"
            y="92vh"
            id="debugLine1"
            data-oid="5l-ldri"
          >
            VIBRACIÓN: SANADORA
          </text>
          <text
            className="geometric-text"
            x="100"
            y="94vh"
            id="debugLine2"
            data-oid="-l2pt2l"
          >
            ENERGÍA: CONSCIENTE
          </text>
          <text
            className="geometric-text"
            x="100"
            y="96vh"
            id="debugLine3"
            data-oid="dh1xxxn"
          >
            ESTADO: EXPANDIDO
          </text>
          <text
            className="geometric-text"
            x="100"
            y="98vh"
            id="debugLine4"
            data-oid=":14vkeq"
          >
            PRESENCIA: VIVA
          </text>

          <text className="geometric-text" x="1620" y="950" data-oid="25lzam9">
            ENTRE LA VIBRACIÓN
          </text>
          <text className="geometric-text" x="1620" y="985" data-oid="j3344tt">
            Y EL SILENCIO
          </text>
        </svg>
      </div>

      <audio id="startClickSound" preload="auto" data-oid="cy942y7">
        <source
          src="https://assets.codepen.io/7558/preloader-2s-001.mp3"
          type="audio/mpeg"
          data-oid=":dibs_d"
        />
      </audio>
      <audio id="preloaderSound" preload="auto" data-oid="-0trc5f">
        <source
          src="https://assets.codepen.io/7558/preloader-5s-001.mp3"
          type="audio/mpeg"
          data-oid="ojmddf_"
        />
      </audio>
      <audio id="scrollSound1" loop preload="auto" data-oid="fuepbz5">
        <source
          src=""
          type="audio/mpeg"
          data-oid="38xck6h"
        />
      </audio>
      <audio id="scrollSound2" loop preload="auto" data-oid="oe0ehzs">
        <source
          src=""
          type="audio/mpeg"
          data-oid="9ie4261"
        />
      </audio>
      <audio id="scrollSound3" loop preload="auto" data-oid="9ifz7gr">
        <source
          src=""
          type="audio/mpeg"
          data-oid="pqn-5h3"
        />
      </audio>
      <audio id="hoverSound" preload="auto" data-oid="joy1h96">
        <source
          src="https://assets.codepen.io/7558/preloader-2s-001.mp3"
          type="audio/mpeg"
          data-oid="kl:hc2w"
        />
      </audio>
      <audio id="backgroundMusic" loop preload="auto" data-oid="d83qmlz">
        <source
          src="https://elsaltoweb.es/wp-content/uploads/2025/10/AUDIO-CHAMANICO-ZOOM-1.mp3"
          type="audio/mpeg"
          data-oid="4i.l9nv"
        />
      </audio>

      <div className="center-circle" data-oid="na1o066">
        <div className="circle-container" data-oid="1hjf9fo">
          <div
            className="glowing-circle"
            id="glowCircle"
            data-oid="26h1-pw"
          ></div>
        </div>
      </div>

      <section
        id={id}
        className={cn("section section-1", className)}
        data-oid="_fd61hp"
      >
        <div className="section-content text-center" data-oid="qzrk93d">
          {eyebrow && (
            <span
              className="text-xl font-semibold uppercase tracking-[0.3em] text-muted-foreground"
              data-oid="rjfzy45"
            >
              {eyebrow}
            </span>
          )}
          <div className="space-y-10" data-oid="qsgw6a4">
            <h1
              className="mx-auto max-w-3xl text-4xl sm:text-6xl font-semibold leading-tight tracking-tight text-foreground"
              data-oid="3hz_bub"
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg"
                data-oid="s0c_0-k"
              >
                {subtitle}
              </p>
            )}
          </div>

          <div
            className="flex flex-col gap-3 sm:flex-row sm:items-center mt-8"
            data-oid="y0eno11"
          >
            {primaryCta && (
              <Button asChild size="lg" data-oid="_hy61m3">
                <Link href={primaryCta.href} data-oid="cyla-.o">
                  {primaryCta.label}
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" data-oid="0ngj1ht">
                <Link href={secondaryCta.href} data-oid="8b94htr">
                  {secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="section section-2" data-oid="r-vze2h">
        <div className="section-content" data-oid="y4yqa03"></div>
      </section>
      <section className="section section-3" data-oid="f4zv3cz">
        <div className="section-content" data-oid="xk0ulu5"></div>
      </section>

      <footer className="site-footer" data-oid="fxrpw.5">
        <div className="footer-content-section" data-oid="38lhowl">
          <div className="footer-content" data-oid="gk_kvk3">
            <div className="footer-left" data-oid="vo5sle.">
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="8b12dw1"
              >
                EN EL SILENCIO
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="4_4rhtc"
              >
                NACE EL SONIDO
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="2jejrpc"
              >
                QUE TRANSFORMA
              </p>
              <br data-oid="qab-_54" />
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="0q31gfq"
              >
                EN LA OSCURIDAD
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="4vxs6mk"
              >
                SE ESCONDE
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="t8mrigl"
              >
                LA LUZ DEL DESPERTAR
              </p>
            </div>

            <div className="footer-right" data-oid="z1zsrrc">
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="hf.ypcz"
              >
                LA VIBRACIÓN RECORRE
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="g2bjtmr"
              >
                CADA ESPACIO INTERIOR
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid=":x01_.:"
              >
                DESPIERTA MEMORIAS
              </p>
              <br data-oid="cpb_dxb" />
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="xkfysla"
              >
                SANA HERIDAS ANTIGUAS
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="yusry1h"
              >
                Y NOS CONECTA CON
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight"
                data-oid="l0z28ft"
              >
                LA MAGIA DE LA VIDA
              </p>
            </div>
          </div>
          <div className="footer-credits" data-oid="dpdf1mv">
            <p data-oid="n_bcccw">
              Sonido y Sanación por{" "}
              <a
                href="https://open.spotify.com/artist/6YXgRMajnjib8j6Cxzcryp?si=iiLnt59BRp6QgKGizkG5Zg"
                target="_blank"
                data-oid="o3vo475"
              >
                @SonidosAncestrales
              </a>
            </p>
          </div>
        </div>
        <div className="footer-svg-section" data-oid="tlsq56x"></div>
      </footer>
    </div>
  );
}
