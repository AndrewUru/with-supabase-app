// app/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Music2,
  Users,
  CalendarDays,
} from "lucide-react";
import Hero from "@/components/site/Hero";
import AboutEdhuco from "@/components/site/AboutEdhuco";

export const metadata = {
  title: "EDHUCO – Terapias, Viajes Chamánicos y Formaciones",
  description:
    "Descubre EDHUCO: sesiones de terapia, viajes chamánicos y formaciones transformadoras. Reconecta con tu sabiduría interior.",
  openGraph: {
    title: "EDHUCO – Reconexión Ancestral",
    description:
      "Plataforma EDHUCO: terapias, formaciones y viajes chamánicos.",
    url: "https://edhuco.com",
    siteName: "EDHUCO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EDHUCO – Reconexión Ancestral",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-clip">
      {/* HERO */}
      <Hero />
      <AboutEdhuco />

      {/* BENEFICIOS */}
      <section
        id="servicios"
        className="mx-auto max-w-6xl py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-12">¿Por qué elegir EDHUCO?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Terapias transformadoras",
              desc: "Sesiones individuales y grupales con música, voz y energía.",
              Icon: HeartHandshake,
            },
            {
              title: "Formaciones vivenciales",
              desc: "Aprende prácticas chamánicas y sabiduría ancestral.",
              Icon: Sparkles,
            },
            {
              title: "Viajes únicos",
              desc: "Retiros y experiencias en Perú, España y más destinos.",
              Icon: CalendarDays,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition text-left"
            >
              <item.Icon className="w-7 h-7 text-accent mb-4" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOMRIU – NUEVO PROYECTO */}
      <section
        id="somriu"
        aria-labelledby="somriu-title"
        className="relative isolate py-20 overflow-x-clip"
      >
        {/* fondo suave */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_40%,_black_60%,_transparent)]"
        >
          <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-primary/15 blur-2xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Nuevo proyecto EDHUCO
              </div>
              <h2 id="somriu-title" className="mt-4 text-3xl font-bold">
                SOMRIU — Sonido, Movimiento y Risa para la Unidad
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                <strong>SOMRIU</strong> es un programa de bienestar comunitario
                que combina música, voz, movimiento y dinámicas lúdicas para
                activar la alegría, la cohesión grupal y la regulación
                emocional. Ideal para centros culturales, asociaciones, empresas
                y escuelas que deseen impulsar climas saludables y creativos.
              </p>

              <ul className="mt-6 space-y-3">
                {[
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
                ].map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className="mt-0.5 w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/somriu"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent text-background px-5 py-3 font-semibold hover:opacity-90"
                >
                  Conocer SOMRIU <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contacto?tipo=somriu"
                  className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-muted/40"
                >
                  Solicitar propuesta
                </Link>
              </div>
            </div>

            {/* Tarjeta visual */}
            <div className="relative">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 grid place-items-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">SOMRIU Kit</p>
                    <p className="text-xs text-muted-foreground">
                      Guía de sesión + playlist + dinámicas
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Duración", value: "90–120 min" },
                    { label: "Participantes", value: "12–60 (adaptable)" },
                    { label: "Modalidad", value: "Presencial / Híbrida" },
                    { label: "Intensidad", value: "Suave a dinámica" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border bg-background p-4"
                    >
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border bg-background p-4">
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
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    Ver próximas fechas <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* mini-faq breve */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
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
            ].map((item) => (
              <div key={item.q} className="rounded-xl border bg-card p-5">
                <p className="font-medium">{item.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-muted/30 py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Lo que dicen</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Caterina C.L.",
                text: "Un camino de sanación, humildad y empoderamiento. Resultados desde el primer momento.",
              },
              {
                name: "Alicia P.",
                text: "La música me atravesó. Salí más ligera y presente.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 border rounded-xl bg-background shadow-sm text-left"
              >
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <p className="italic text-muted-foreground">“{t.text}”</p>
                <p className="mt-4 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        id="contacto"
        className="mx-auto max-w-4xl text-center py-20 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Da el siguiente paso en tu camino
        </h2>
        <p className="text-muted-foreground mb-8">
          Reserva tu plaza en nuestras terapias, formaciones o en el programa
          SOMRIU. Vive la experiencia EDHUCO.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth/signup"
            className="px-8 py-4 rounded-lg bg-accent text-background font-semibold text-lg hover:opacity-90 inline-flex items-center gap-2"
          >
            Unirme ahora <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/somriu"
            className="px-8 py-4 rounded-lg border font-semibold text-lg hover:bg-muted/40 inline-flex items-center gap-2"
          >
            Conocer SOMRIU
          </Link>
        </div>
      </section>
    </main>
  );
}
