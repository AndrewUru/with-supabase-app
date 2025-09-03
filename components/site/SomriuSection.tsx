import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Music2,
  Sparkles,
  Users,
} from "lucide-react";

export default function SomriuSection() {
  const bullets = [
    {
      Icon: Music2,
      text: "Módulos experienciales con voz, percusión corporal y respiración consciente.",
    },
    {
      Icon: Users,
      text: "Formatos flexibles: talleres abiertos, ciclos, team-building y jornadas de bienestar.",
    },
    {
      Icon: CheckCircle2,
      text: "Beneficios: conexión, gestión emocional, motivación y mejora del clima grupal.",
    },
  ] as const;

  const stats = [
    { label: "Duración", value: "90–120 min" },
    { label: "Participantes", value: "12–60 (adaptable)" },
    { label: "Modalidad", value: "Presencial / Híbrida" },
    { label: "Intensidad", value: "Suave a dinámica" },
  ] as const;

  const faqs = [
    {
      q: "¿Para quién es?",
      a: "Equipos, asociaciones, centros educativos y espacios comunitarios que deseen un impulso de bienestar y cohesión.",
    },
    {
      q: "¿Se adapta a cada grupo?",
      a: "Sí. Ajustamos intensidad, repertorio y dinámicas según edades, objetivos y contexto del grupo.",
    },
    {
      q: "¿Cómo lo reservo?",
      a: "Contáctanos para armar una propuesta a medida y disponibilidad de fechas.",
    },
  ] as const;

  return (
    <section
      id="somriu"
      aria-labelledby="somriu-title"
      className="section relative isolate overflow-x-clip"
    >
      {/* fondo suave + máscara radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_40%,_black_60%,_transparent)]"
      >
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-primary/15 blur-2xl" />
      </div>

      <div className="container-app">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Texto */}
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium surface">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              <span>Nuevo proyecto EDHUCO</span>
            </span>

            <h2
              id="somriu-title"
              className="mt-4 text-balance text-3xl font-semibold md:text-4xl"
            >
              SOMRIU —{" "}
              <span className="text-gradient">Sonido, Movimiento y Risa</span>{" "}
              para la Unidad
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong>SOMRIU</strong> es un programa de bienestar comunitario
              que combina música, voz, movimiento y dinámicas lúdicas para
              activar la alegría, la cohesión grupal y la regulación emocional.
              Ideal para centros culturales, asociaciones, empresas y escuelas
              que deseen impulsar climas saludables y creativos.
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 h-5 w-5 text-accent shrink-0"
                    aria-hidden
                  />
                  <span className="text-sm text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/somriu"
                className="btn ring-brand-focus inline-flex items-center gap-2"
                aria-label="Conocer SOMRIU"
              >
                Conocer SOMRIU <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contacto?tipo=somriu"
                className="btn-outline ring-brand-focus inline-flex items-center gap-2"
                aria-label="Solicitar propuesta SOMRIU"
              >
                Solicitar propuesta
              </Link>
            </div>
          </div>

          {/* Tarjeta visual */}
          <div className="relative">
            <div className="surface shadow-soft p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/25">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">SOMRIU Kit</p>
                  <p className="text-xs text-muted-foreground">
                    Guía de sesión + playlist + dinámicas
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="surface p-4">
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 glass radius p-4">
                <p className="text-sm font-medium">Resultados esperados</p>
                <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
                  <li>• Mayor cohesión y confianza</li>
                  <li>• Regulación del estrés y claridad mental</li>
                  <li>• Energía, motivación y sentido de pertenencia</li>
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/somriu#agenda"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline focus:outline-none ring-brand-focus"
                >
                  Ver próximas fechas{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* mini-faq */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {faqs.map((item) => (
            <div key={item.q} className="surface p-5">
              <p className="font-medium">{item.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
