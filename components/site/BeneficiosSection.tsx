import type { LucideIcon } from "lucide-react";
import { CalendarDays, HeartHandshake, Sparkles } from "lucide-react";

const WIPHLA_COLORS = [
  "#EE3124",
  "#FF6B00",
  "#FFD500",
  "#FFFFFF",
  "#00A859",
  "#0084C9",
  "#6D3B96",
];

const WIPHLA_GRADIENT =
  "linear-gradient(120deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "Terapias transformadoras",
    description:
      "Sesiones individuales y grupales para soltar carga, armonizar cuerpo y voz, y reactivar la confianza personal.",
    icon: HeartHandshake,
    highlight: "Cuidado profundo",
  },
  {
    title: "Formaciones vivenciales",
    description:
      "Programas inmersivos que integran sabiduria ancestral, herramientas contemporaneas y practicas eticas de acompanamiento.",
    icon: Sparkles,
    highlight: "Aprendizaje vivo",
  },
  {
    title: "Viajes y retiros",
    description:
      "Experiencias en Peru, Espana y otros territorios sagrados para reconectar con la naturaleza, la comunidad y el proposito.",
    icon: CalendarDays,
    highlight: "Movimiento consciente",
  },
];

export default function BeneficiosSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="beneficios-title"
      className="section relative isolate overflow-hidden"
    >
      <BeneficiosBackgroundDecor />

      <div className="container-app relative z-10 grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[32px] bg-card/80 p-8 shadow-[0_30px_100px_-70px_rgba(17,24,39,0.85)] backdrop-blur-sm dark:bg-card/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/75 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <span
              className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/60 dark:ring-white/25"
              style={{ backgroundImage: WIPHLA_GRADIENT }}
              aria-hidden="true"
            />
            Ecosistema EDHUCO
          </span>

          <h2
            id="beneficios-title"
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[44px]"
          >
            Tres caminos para acompanarte en la transformacion
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada propuesta nace del tejido entre pueblos originarios y metodologias actuales. Tu suscripcion de{' '}
            <strong className="bg-clip-text text-transparent" style={{ backgroundImage: WIPHLA_GRADIENT }}>
              22 EUR/mes
            </strong>{' '}permite sumar becas, materiales y experiencias abiertas a mas personas.
          </p>

          <div className="rounded-3xl border border-white/15 bg-card/70 p-6 text-left shadow-[0_24px_70px_-60px_rgba(17,24,39,0.78)] backdrop-blur-sm dark:bg-card/55">
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Que recibes</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Acceso a sesiones y recursos ineditos cada mes.</li>
              <li>Acompanamiento etico con profesionales de la red.</li>
              <li>Comunidad internacional para sostener procesos.</li>
            </ul>
          </div>
        </aside>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/60 to-transparent lg:block dark:via-white/20"
            aria-hidden="true"
          />
          <div className="grid gap-8">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              const primary = WIPHLA_COLORS[(index * 2) % WIPHLA_COLORS.length];
              const secondary = WIPHLA_COLORS[(index * 2 + 3) % WIPHLA_COLORS.length];

              return (
                <article
                  key={benefit.title}
                  className="group relative grid gap-6 rounded-[28px] border border-white/12 bg-card/85 p-6 shadow-[0_32px_90px_-62px_rgba(17,24,39,0.82)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_42px_110px_-60px_rgba(17,24,39,0.88)] dark:bg-card/60 lg:grid-cols-[auto_minmax(0,1fr)]"
                  style={{
                    background: `linear-gradient(125deg, ${hexToRgba(primary, 0.16)} 0%, ${hexToRgba(secondary, 0.12)} 100%)`,
                  }}
                >
                  <div className="relative flex flex-col items-center gap-3 lg:items-start">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl ring-1 ring-white/25 shadow-sm backdrop-blur"
                      style={{
                        backgroundImage: `linear-gradient(140deg, ${hexToRgba(primary, 0.4)} 0%, ${hexToRgba(secondary, 0.28)} 100%)`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-foreground/80 backdrop-blur-sm dark:text-white/80">
                      <span
                        className="h-1.5 w-10 rounded-full"
                        style={{ backgroundImage: WIPHLA_GRADIENT }}
                        aria-hidden="true"
                      />
                      {benefit.highlight}
                    </span>
                  </div>

                  <div className="relative space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{benefit.description}</p>

                    <div className="flex flex-wrap gap-3 pt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                      <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur-sm">
                        Presencial / Online
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur-sm">
                        Comunidad
                      </span>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundImage: `radial-gradient(circle at 0% 0%, ${hexToRgba(primary, 0.25)}, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function BeneficiosBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 8%, rgba(255, 107, 0, 0.2), transparent 58%), radial-gradient(circle at 80% 14%, rgba(0, 132, 201, 0.18), transparent 64%), radial-gradient(circle at 48% 110%, rgba(0, 168, 89, 0.2), transparent 72%)",
        }}
      />
      <div
        className="absolute left-8 top-[40%] hidden h-60 w-60 -translate-y-1/2 rotate-6 overflow-hidden rounded-3xl opacity-80 shadow-[0_40px_120px_-68px_rgba(17,24,39,0.82)] md:block"
        style={{ backgroundImage: WIPHLA_GRADIENT }}
        aria-hidden="true"
      />
      <div
        className="absolute right-10 bottom-8 hidden h-64 w-64 rotate-12 overflow-hidden rounded-[40px] border border-white/30 shadow-[0_48px_150px_-72px_rgba(17,24,39,0.9)] dark:border-white/10 lg:block"
        aria-hidden="true"
      >
        <div className="grid h-full w-full grid-cols-7">
          {WIPHLA_COLORS.map((color, index) => (
            <span key={`stripe-${color}-${index}`} style={{ backgroundColor: color }} className="h-full w-full" />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17, 24, 39, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 24, 39, 0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
