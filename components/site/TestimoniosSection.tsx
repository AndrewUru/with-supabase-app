"use client";

import { useState } from "react";
import { Quote, MapPin, Star } from "lucide-react";

const TESTIMONIOS = [
  {
    name: "Caterina C.",
    text: "Un camino de sanacion, humildad y empoderamiento. Sentis cambios desde el primer momento.",
    location: "Barcelona, España",
    rating: 5,
  },
  {
    name: "Alicia P.",
    text: "La musica me atraveso. Sali mas ligera y presente. Una experiencia que cambia la perspectiva.",
    location: "Madrid, España",
    rating: 5,
  },
  {
    name: "Carlos M.",
    text: "Nunca pense que el sonido tuviera un efecto tan profundo. Altamente recomendado.",
    location: "Sevilla, España",
    rating: 5,
  },
];

const WIPHLA_GRADIENT =
  "linear-gradient(120deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

export default function TestimoniosSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="relative py-20 md:py-24 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 dark:opacity-10"
          style={{ background: WIPHLA_GRADIENT }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] opacity-20 dark:opacity-10"
          style={{ background: WIPHLA_GRADIENT }}
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <header className="space-y-4 text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700 ring-1 ring-purple-200/60 backdrop-blur-sm dark:bg-purple-950/60 dark:text-purple-300 dark:ring-purple-500/30">
            <span
              className="h-2 w-2 rounded-full shadow-sm ring-2 ring-white/70 dark:ring-white/20"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
              aria-hidden="true"
            />
            Lo que dicen quienes nos visitan
          </div>

          <h2
            id="testimonios-title"
            className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl lg:text-[52px]"
          >
            Voces que confían en{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
            >
              EDHUCO
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Testimonios sencillos que resumen la experiencia de quienes
            participan en nuestras sesiones y programas.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIOS.map((testimonio, index) => (
            <article
              key={testimonio.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 dark:bg-slate-800/60 ${
                hoveredIndex === index
                  ? "border-purple-300 shadow-2xl shadow-purple-200/40 scale-[1.03] -translate-y-2 dark:border-purple-500/50 dark:shadow-purple-900/40"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-5 dark:opacity-10" : ""
                }`}
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />

              {/* Quote icon */}
              <div
                className={`absolute -top-2 -right-2 rounded-full p-3 transition-all duration-500 ${
                  hoveredIndex === index
                    ? "bg-purple-100 dark:bg-purple-900/50 scale-110"
                    : "bg-slate-100 dark:bg-slate-700/50"
                }`}
              >
                <Quote
                  className={`h-5 w-5 transition-colors duration-500 ${
                    hoveredIndex === index
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className="relative space-y-5">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonio.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 fill-current transition-all duration-300 ${
                        hoveredIndex === index
                          ? "text-yellow-500 scale-110"
                          : "text-yellow-400"
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  &ldquo;{testimonio.text}&rdquo;
                </p>

                {/* Divider */}
                <div
                  className={`h-px w-full transition-all duration-500 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-r from-transparent via-purple-400 to-transparent dark:via-purple-600"
                      : "bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"
                  }`}
                />

                {/* Author info */}
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {testimonio.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{testimonio.location}</span>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                className={`absolute bottom-0 right-0 h-20 w-20 rounded-tl-full opacity-0 blur-2xl transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-30 dark:opacity-20" : ""
                }`}
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/80 px-6 py-3 text-sm font-semibold text-purple-700 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg hover:scale-105 dark:border-purple-700 dark:bg-slate-800/60 dark:text-purple-300 dark:hover:bg-slate-700/80 dark:hover:border-purple-600"
          >
            Comparte tu experiencia
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        article {
          animation: fade-in-up 0.6s ease-out backwards;
        }
      `}</style>
    </section>
  );
}
