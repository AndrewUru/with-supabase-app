"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  Heart,
  Check,
  Sparkles,
  GraduationCap,
  Clock,
  Award,
} from "lucide-react";

const BENEFITS = [
  {
    title: "Formación anual en Chamanismo Andino",
    note: "Plazas abiertas",
    icon: "GraduationCap",
    description:
      "Edición 2025 con encuentros mensuales, prácticas guiadas y comunidad cercana. 99 euros al mes (10 cuotas) o 880 euros al contado. Becas solidarias disponibles hasta el 30 por ciento.",
    highlight: "Programa completo",
    price: "99€/mes",
  },
  {
    title: "Módulos y talleres sueltos",
    note: "Formato flexible",
    icon: "Calendar",
    description:
      "Elige módulos temáticos o talleres prácticos desde 120 a 180 euros por encuentro. Descuentos para alumnado y personas suscritas a EDHUCO.",
    highlight: "A tu ritmo",
    price: "120-180€",
  },
  {
    title: "Sesiones de apoyo y retiros",
    note: "Acompañamiento continuo",
    icon: "Heart",
    description:
      "Sesiones individuales o grupales para integrar el proceso, retiros opcionales y suscripción EDHUCO con recursos mensuales por 22 euros.",
    highlight: "Apoyo personalizado",
    price: "Desde 22€",
  },
];

const INCLUDES = [
  {
    text: "Encuentros mensuales o módulos puntuales con seguimiento sencillo.",
    icon: "Calendar",
  },
  {
    text: "Materiales digitales y espacio comunitario para sostener la práctica.",
    icon: "Users",
  },
  {
    text: "Acompañamiento ético por profesionales de la red.",
    icon: "Award",
  },
];

const ICONS = {
  GraduationCap,
  Calendar,
  Heart,
  Users,
  Award,
  Clock,
};

const WIPHLA_GRADIENT =
  "linear-gradient(120deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

export default function BeneficiosSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="servicios"
      aria-labelledby="beneficios-title"
      className="relative py-20 md:py-24 overflow-hidden "
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[140px] opacity-20 dark:opacity-10 animate-pulse-slow"
          style={{ background: WIPHLA_GRADIENT }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[140px] opacity-20 dark:opacity-10 animate-pulse-slow"
          style={{
            background:
              "linear-gradient(135deg, #6D3B96 0%, #0084C9 50%, #00A859 100%)",
            animationDelay: "2s",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(100, 116, 139, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <header className="space-y-4 text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700 ring-1 ring-purple-200/60 backdrop-blur-sm dark:bg-purple-950/60 dark:text-purple-300 dark:ring-purple-500/30">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Formación EDHUCO
          </div>

          <h2
            id="beneficios-title"
            className="mx-auto max-w-3xl text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl lg:text-[52px]"
          >
            Formación y acompañamiento para{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
            >
              2025
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Diseñamos experiencias simples para integrar cosmovisión andina,
            arte ritual y cuidado del territorio, con opciones según tu ritmo y
            posibilidades.
          </p>
        </header>

        <div className="grid gap-6 md:gap-8 mb-12">
          {BENEFITS.map((benefit, index) => {
            const Icon = ICONS[benefit.icon as keyof typeof ICONS];
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;

            return (
              <article
                key={benefit.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`group relative overflow-hidden rounded-3xl border bg-white/80 backdrop-blur-sm transition-all duration-500 cursor-pointer dark:bg-slate-800/60 ${
                  isHovered || isExpanded
                    ? "border-purple-300 shadow-2xl shadow-purple-200/40 dark:border-purple-500/50 dark:shadow-purple-900/40"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                    isHovered || isExpanded ? "opacity-5 dark:opacity-10" : ""
                  }`}
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                  aria-hidden="true"
                />

                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div
                        className={`rounded-2xl p-3.5 transition-all duration-500 ${
                          isHovered || isExpanded
                            ? "bg-purple-100 dark:bg-purple-900/50 scale-110"
                            : "bg-slate-100 dark:bg-slate-700/50"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 transition-colors duration-500 ${
                            isHovered || isExpanded
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Title and note */}
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                          {benefit.title}
                        </h3>
                        {benefit.note && (
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-500/30">
                            <div
                              className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                              aria-hidden="true"
                            />
                            {benefit.note}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price badge */}
                    <div
                      className={`shrink-0 rounded-2xl px-4 py-2 text-center transition-all duration-500 ${
                        isHovered || isExpanded
                          ? "bg-purple-100 dark:bg-purple-900/50"
                          : "bg-slate-100 dark:bg-slate-700/50"
                      }`}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {benefit.highlight}
                      </div>
                      <div
                        className={`text-lg font-bold transition-colors duration-500 ${
                          isHovered || isExpanded
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {benefit.price}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 pl-0 md:pl-[72px]">
                    {benefit.description}
                  </p>

                  {/* Hover indicator */}
                  <div
                    className={`mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 pl-0 md:pl-[72px] ${
                      isHovered || isExpanded
                        ? "text-purple-600 dark:text-purple-400 translate-x-2"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    <span>Más información</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300"
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
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className={`absolute bottom-0 right-0 h-24 w-24 rounded-tl-full opacity-0 blur-2xl transition-opacity duration-500 ${
                    isHovered || isExpanded ? "opacity-30 dark:opacity-20" : ""
                  }`}
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* What's included section */}
        <section
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 md:p-10 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/60"
          aria-label="Qué incluye"
        >
          <div
            className="absolute inset-0 opacity-5 dark:opacity-10"
            style={{ backgroundImage: WIPHLA_GRADIENT }}
            aria-hidden="true"
          />

          <div className="relative space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-2.5 dark:bg-purple-900/50">
                <Check
                  className="h-5 w-5 text-purple-600 dark:text-purple-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Qué incluye
              </h3>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDES.map((item, index) => {
                const Icon = ICONS[item.icon as keyof typeof ICONS];
                return (
                  <li
                    key={index}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-lg hover:scale-105 dark:border-slate-700 dark:bg-slate-700/30 dark:hover:border-purple-500/50 dark:hover:bg-purple-900/20"
                  >
                    <div className="shrink-0 rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800">
                      <Icon
                        className="h-4 w-4 text-purple-600 dark:text-purple-400"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
          >
            Reserva tu plaza para 2025
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

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }

        article {
          animation: fade-in-up 0.6s ease-out backwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
