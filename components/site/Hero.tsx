import Link from "next/link";
import { ArrowRight, ShieldCheck, Mountain, GraduationCap } from "lucide-react";
import Image from "next/image";

export type BenefitIconName = "ShieldCheck" | "Mountain" | "GraduationCap";

type Stat = { value: string; label: string };
type Benefit = { label: string; icon?: BenefitIconName };

type TrustedItem = { label: string };

const ICONS = { ShieldCheck, Mountain, GraduationCap };

const trustedBy: TrustedItem[] = [
  { label: "Mizentro" },
  { label: "Colegio San José" },
  { label: "Fundación Gaia" },
  { label: "Asociación UNO" },
];

export interface HeroProps {
  id?: string;
  pill?: string;
  tagLine?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  tertiaryCta?: { href: string; label: string };
  benefits?: Benefit[];
  stats?: Stat[];
  imageUrl?: string;
  className?: string;
}

const defaultStats: Stat[] = [
  { value: "500+", label: "Personas acompañadas" },
  { value: "15 años", label: "Experiencia y práctica" },
  { value: "6 países", label: "Comunidad activa" },
];

const defaultBenefits: Benefit[] = [
  { label: "Acompañamiento seguro y ético", icon: "ShieldCheck" },
  { label: "Retiros y viajes conscientes", icon: "Mountain" },
  { label: "Formaciones vivenciales", icon: "GraduationCap" },
];

export default function Hero({
  id = "hero",
  pill = "EDHUCO · Comunidad viva",
  tagLine = "Sabiduría ancestral + herramientas contemporáneas",
  title = "Educar para transformar vidas",
  highlight = "Desarrollo humano consciente",
  subtitle = "Terapias, viajes y formaciones que integran tradición, ciencia y presencia para acompañarte a crear cambios reales y sostenibles.",
  primaryCta = { href: "/auth/sign-up", label: "Reserva tu plaza" },
  secondaryCta = { href: "#beneficios", label: "Explorar servicios" },
  tertiaryCta = { href: "#agenda", label: "Próximas fechas" },
  benefits = defaultBenefits,
  stats = defaultStats,
  imageUrl = "/images/hero-person.JPG",
  className = "",
}: HeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate overflow-hidden bg-[#f4efe5] py-14 md:py-16 lg:py-20 ${className}`}
    >
      <BackgroundDecor />

      <div className="container-app">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {pill && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-700">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-600"
                      aria-hidden="true"
                    />
                    {pill}
                  </span>
                )}
                {tagLine && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500 ring-1 ring-stone-200">
                    <span
                      className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-500/80"
                      aria-hidden="true"
                    />
                    {tagLine}
                  </span>
                )}
              </div>

              <div className="space-y-5">
                <h1
                  id={`${id}-title`}
                  className="text-balance text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-[52px]"
                >
                  {title}
                  {highlight && (
                    <span className="mt-3 block text-3xl font-medium text-emerald-800 sm:text-4xl lg:text-[40px]">
                      {highlight}
                    </span>
                  )}
                </h1>

                {subtitle && (
                  <p className="max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {benefits?.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon ? ICONS[benefit.icon] : null;
                  return (
                    <li
                      key={`${benefit.label}-${index}`}
                      className="flex items-center gap-3 rounded-2xl border border-emerald-100/80 bg-white/70 px-4 py-3 text-sm text-stone-700 shadow-sm"
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
                      )}
                      <span className="font-medium">{benefit.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex flex-1 flex-wrap gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300 px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                  >
                    {secondaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {tertiaryCta && (
                <Link
                  href={tertiaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                >
                  {tertiaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            {stats?.length > 0 && (
              <dl className="grid gap-4 pt-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-emerald-100/70 bg-white/60 p-4 text-left"
                  >
                    <dd className="text-2xl font-semibold text-emerald-900 sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="relative z-10 flex justify-center">
            <div className="absolute -top-16 right-2 h-44 w-44 rounded-full bg-emerald-300/25 blur-[120px]" aria-hidden />
            <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-amber-200/25 blur-[120px]" aria-hidden />
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] border border-stone-200/70 bg-[#fdfbf6] shadow-[0_32px_80px_-58px_rgba(32,64,40,0.65)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={imageUrl}
                  alt="Sesión de cuencos ceremoniales de EDHUCO"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d3a28]/35 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {trustedBy.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Confían en EDHUCO
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-stone-600 sm:text-base">
              {trustedBy.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full bg-white/80 px-4 py-2 ring-1 ring-emerald-100/60"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 18%, rgba(46, 106, 76, 0.18), transparent 55%), radial-gradient(circle at 82% 76%, rgba(168, 120, 64, 0.15), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(73, 54, 29, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(73, 54, 29, 0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
