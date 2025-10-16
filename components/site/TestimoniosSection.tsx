"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Testimonio = {
  name: string;
  text: string;
  rating: number;
  location: string;
};

const testimonios: Testimonio[] = [
  {
    name: "Caterina C. L.",
    text: "Un camino de sanaciÃ³n, humildad y empoderamiento. Resultados desde el primer momento.",
    rating: 5,
    location: "Barcelona, EspaÃ±a",
  },
  {
    name: "Alicia P.",
    text: "La mÃºsica me atravesÃ³. SalÃ­ mÃ¡s ligera y presente. Una experiencia que cambiÃ³ mi perspectiva completamente.",
    rating: 5,
    location: "Madrid, EspaÃ±a",
  },
  {
    name: "MarÃ­a JosÃ© R.",
    text: "IncreÃ­ble cÃ³mo la terapia con sonido puede liberar emociones guardadas por aÃ±os. Me siento renovada.",
    rating: 5,
    location: "Valencia, EspaÃ±a",
  },
  {
    name: "Carlos M.",
    text: "Nunca pensÃ© que los cuencos tibetanos pudieran tener un efecto tan profundo. Altamente recomendado.",
    rating: 5,
    location: "Sevilla, EspaÃ±a",
  },
  {
    name: "Ana SofÃ­a T.",
    text: "Cada sesiÃ³n es un viaje hacia el interior. La profesionalidad y calidez hacen la diferencia.",
    rating: 5,
    location: "Bilbao, EspaÃ±a",
  },
  {
    name: "Roberto L.",
    text: "DespuÃ©s de meses de estrÃ©s, encontrÃ© la paz que buscaba. Un enfoque holÃ­stico excepcional.",
    rating: 5,
    location: "Granada, EspaÃ±a",
  },
  {
    name: "Isabel V.",
    text: "La combinaciÃ³n de sonido y energÃ­a crea una atmÃ³sfera Ãºnica de sanaciÃ³n. Transformador.",
    rating: 5,
    location: "Zaragoza, EspaÃ±a",
  },
  {
    name: "Diego F.",
    text: "Resultados inmediatos y duraderos. Ahora entiendo el poder curativo del sonido.",
    rating: 5,
    location: "MÃ¡laga, EspaÃ±a",
  },
];

const AUTOPLAY_INTERVAL = 7000;
const PROGRESS_STEP_MS = 40;

const getPrevIndex = (index: number, length: number) =>
  (index - 1 + length) % length;

const getNextIndex = (index: number, length: number) => (index + 1) % length;

export default function TestimoniosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const shouldResumeRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      shouldResumeRef.current = false;
      setIsAutoPlaying(false);
    }
  }, [prefersReducedMotion]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => getNextIndex(prev, testimonios.length));
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => getPrevIndex(prev, testimonios.length));
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const increment = PROGRESS_STEP_MS / AUTOPLAY_INTERVAL;
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + increment;

        if (nextProgress >= 1) {
          handleNext();
          return 0;
        }

        return nextProgress;
      });
    }, PROGRESS_STEP_MS);

    return () => window.clearInterval(interval);
  }, [handleNext, isAutoPlaying, prefersReducedMotion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        shouldResumeRef.current = false;
        setIsAutoPlaying(false);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
        shouldResumeRef.current = false;
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeTestimonio = testimonios[currentIndex];

  const previewTestimonials = useMemo(() => {
    return Array.from({ length: 3 }, (_, previewIndex) => {
      const index = (currentIndex + previewIndex + 1) % testimonios.length;
      return testimonios[index];
    });
  }, [currentIndex]);

  const toggleAutoplay = () => {
    if (prefersReducedMotion) return;

    setIsAutoPlaying((prev) => {
      const next = !prev;
      shouldResumeRef.current = next;

      if (next) {
        setProgress(0);
      }

      return next;
    });
  };

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    shouldResumeRef.current = false;
    setIsAutoPlaying(false);
  };

  const handlePauseForInteraction = () => {
    if (prefersReducedMotion) return;

    shouldResumeRef.current = isAutoPlaying;
    setIsAutoPlaying(false);
  };

  const handleResumeAfterInteraction = () => {
    if (prefersReducedMotion) return;

    if (shouldResumeRef.current) {
      setIsAutoPlaying(true);
      setProgress(0);
    }

    shouldResumeRef.current = false;
  };

  const progressDegrees = Math.min(progress * 360, 360);

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden bg-muted/20 py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-[hsl(var(--accent-cool)/0.25)] via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[hsl(var(--accent-warm)/0.18)] via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-app relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 backdrop-blur">
            <Waves className="h-4 w-4" />
            Testimonios
          </span>

          <h2 className="mt-6 text-balance text-3xl font-semibold md:text-4xl">
            Historias reales de transformaciÃ³n sonora
          </h2>
          <p className="mt-4 text-muted-foreground">
            Voces que describen cÃ³mo las ceremonias, viajes y sesiones de sonido
            desbloquearon estados de calma profunda, claridad emocional y
            conexiÃ³n interior.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-soft">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="font-semibold text-foreground">4.9/5</span>
            <span>ValoraciÃ³n media (830+ sesiones)</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-soft">
            <CalendarClock className="h-4 w-4 text-[hsl(var(--brand))]" />
            <span>Sesiones individuales y grupales desde 2014</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-soft">
            <Sparkles className="h-4 w-4 text-[hsl(var(--accent-cool))]" />
            <span>100% experiencias verificadas</span>
          </div>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <div
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 p-8 shadow-soft backdrop-blur"
              onMouseEnter={handlePauseForInteraction}
              onMouseLeave={handleResumeAfterInteraction}
              onFocus={handlePauseForInteraction}
              onBlur={handleResumeAfterInteraction}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand)/0.08)] to-transparent" />
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={activeTestimonio.name}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative flex flex-col gap-6"
                >
                  <div className="relative flex items-center gap-4">
                    <div
                      className="relative h-16 w-16 rounded-full bg-border/50"
                      role="progressbar"
                      aria-valuenow={Math.round(progress * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage: `conic-gradient(hsl(var(--brand)) ${progressDegrees}deg, rgba(255,255,255,0.15) ${progressDegrees}deg)`,
                        }}
                      />
                      <div className="absolute inset-[4px] grid place-items-center rounded-full bg-background shadow-inner">
                        <Quote className="h-6 w-6 text-[hsl(var(--brand))]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                        Experiencia verificada
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {activeTestimonio.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activeTestimonio.location}
                      </p>
                    </div>
                  </div>

                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-lg leading-relaxed text-foreground/90"
                  >
                    â€œ{activeTestimonio.text}â€
                  </motion.blockquote>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: activeTestimonio.rating }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 fill-amber-300 text-amber-300"
                          />
                        )
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      CalificaciÃ³n
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                      Sonido terapÃ©utico
                    </span>
                    <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                      IntegraciÃ³n emocional
                    </span>
                    <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                      Calma profunda
                    </span>
                  </div>
                </motion.article>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Testimonio anterior"
                    className="h-10 w-10 rounded-full border border-border/70 bg-background/70 text-foreground shadow-sm hover:-translate-y-0.5 hover:border-border/40"
                    onClick={() => {
                      handlePrev();
                      shouldResumeRef.current = false;
                      setIsAutoPlaying(false);
                    }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Siguiente testimonio"
                    className="h-10 w-10 rounded-full border border-border/70 bg-background/70 text-foreground shadow-sm hover:-translate-y-0.5 hover:border-border/40"
                    onClick={() => {
                      handleNext();
                      shouldResumeRef.current = false;
                      setIsAutoPlaying(false);
                    }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={toggleAutoplay}
                  disabled={prefersReducedMotion ?? false}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 text-xs uppercase tracking-[0.2em] hover:border-[hsl(var(--brand)/0.4)]",
                    prefersReducedMotion && "opacity-60"
                  )}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pausar auto
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Reanudar
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-border/50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--brand))] via-[hsl(var(--accent-cool))] to-[hsl(var(--accent))]"
                  style={{ width: `${Math.max(progress, 0.02) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <aside className="w-full space-y-6 lg:w-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              PrÃ³ximas voces
            </p>
            <div className="space-y-4">
              {previewTestimonials.map((testimonio) => (
                <motion.button
                  key={testimonio.name}
                  type="button"
                  onClick={() => handleGoTo(testimonios.indexOf(testimonio))}
                  className="w-full rounded-2xl border border-border/50 bg-background/70 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[hsl(var(--brand)/0.4)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">
                      {testimonio.name}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--brand))]">
                      Explorar
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {testimonio.text}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: testimonio.rating }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          className="h-3.5 w-3.5 fill-amber-300 text-amber-300"
                        />
                      )
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="rounded-3xl border border-[hsl(var(--brand)/0.3)] bg-gradient-to-br from-[hsl(var(--brand)/0.2)] via-background to-[hsl(var(--accent)/0.1)] p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground">
                Â¿Listo para tu propia transformaciÃ³n?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Reserva una sesiÃ³n y vive en primera persona el poder del sonido
                sanador.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="default"
                  className="rounded-full bg-[hsl(var(--brand))] px-6 text-sm font-semibold text-[hsl(var(--brand-foreground))] shadow-soft hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Reserva tu espacio
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full border border-border/70 bg-background/80 px-6 text-sm font-semibold hover:border-[hsl(var(--brand)/0.4)]"
                >
                  Ver prÃ³ximas fechas
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-2">
          {testimonios.map((testimonio, index) => (
            <button
              key={testimonio.name}
              onClick={() => handleGoTo(index)}
              className={cn(
                "h-2.5 w-8 rounded-full border border-transparent transition",
                index === currentIndex
                  ? "bg-[hsl(var(--brand))] shadow-soft"
                  : "bg-border/60 hover:bg-border"
              )}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

