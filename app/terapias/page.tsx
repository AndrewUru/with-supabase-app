// app/terapias/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terapias | EDHUCO",
  description:
    "Terapias energéticas y sonoras: Tameana, Sonoterapia, Reiki, Limpieza energética, Meditación guiada y Viaje con tambor. Reserva sesiones presenciales en Valencia u online.",
};

type Therapy = {
  slug: string;
  title: string;
  short: string;
  bullets: string[];
  duration: string;
  mode: string;
  image: string;
  note?: string;
};

const THERAPIES: Therapy[] = [
  {
    slug: "tameana",
    title: "Tameana (Cuarzos y Geometría)",
    short:
      "Terapia vibracional con cuarzos y geometría sagrada para armonizar campo energético y emociones.",
    bullets: [
      "Equilibra centros energéticos y calma la mente.",
      "Acompaña procesos de cambio y liberación emocional.",
      "Favorece descanso profundo y claridad.",
    ],
    duration: "60–75 min",
    mode: "Presencial (Valencia) y online (adaptada).",
    image: "/images/terapias/tameana.jpg",
    note: "No sustituye tratamiento médico. Embarazo: consultar previamente.",
  },
  {
    slug: "sonoterapia",
    title: "Sonoterapia (Baño de Sonido)",
    short:
      "Trabajo con cuencos (tibetanos y de cuarzo), gongs, tambor y voz para inducir coherencia y relajación profunda.",
    bullets: [
      "Reduce estrés y ansiedad, mejora el descanso.",
      "Invita a la presencia y a la autoescucha.",
      "Apoya procesos de sanación emocional.",
    ],
    duration: "60–75 min",
    mode: "Sesión individual / dúo. Presencial.",
    image: "/images/terapias/sonoterapia.jpg",
  },
  {
    slug: "reiki",
    title: "Reiki Usui",
    short:
      "Canalización de energía vital a través de imposición de manos para equilibrar cuerpo, mente y espíritu.",
    bullets: [
      "Armoniza el sistema nervioso y energético.",
      "Acompaña en dolor físico y carga mental.",
      "Complemento a procesos terapéuticos.",
    ],
    duration: "50–60 min",
    mode: "Presencial y online.",
    image: "/images/terapias/reiki.jpg",
  },
  {
    slug: "limpieza-espacios",
    title: "Limpieza Energética de Espacios",
    short:
      "Armonización de viviendas/consultas mediante sonido, sahumos y geometrías para renovar el campo del lugar.",
    bullets: [
      "Reduce sensación de densidad o estancamiento.",
      "Favorece descanso, concentración y bienestar.",
      "Recomendable tras mudanzas, obras o conflictos.",
    ],
    duration: "90–120 min (según metros)",
    mode: "A domicilio. Valencia y alrededores.",
    image: "/images/terapias/limpieza-espacios.jpg",
  },
  {
    slug: "tambor-chamanico",
    title: "Viaje con Tambor Chamánico",
    short:
      "Inducción a estado de conciencia ampliada con tambor, para recuperar claridad, recursos y guía interior.",
    bullets: [
      "Comprender patrones repetitivos y tomar decisiones.",
      "Conectar con símbolos y animales de poder.",
      "Integración respetuosa posterior al viaje.",
    ],
    duration: "75–90 min",
    mode: "Presencial (individual/grupal).",
    image: "/images/terapias/tambor.jpg",
    note: "No recomendado en epilepsia fotosensible o crisis agudas. Consultar.",
  },
  {
    slug: "meditacion-guiada",
    title: "Meditación Guiada Personal",
    short:
      "Sesión a medida con respiración, visualización y sonido para regular emociones y enfocar la mente.",
    bullets: [
      "Protocolos personalizados para tu momento vital.",
      "Grabación breve de práctica para casa.",
      "Acompañamiento suave y progresivo.",
    ],
    duration: "50–60 min",
    mode: "Presencial y online.",
    image: "/images/terapias/meditacion-guiada.jpg",
  },
];

export default function TerapiasPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="container-app mx-auto px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Terapias
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Terapias
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Acompañamientos individuales y en pequeños grupos para
            <strong> armonizar, descansar y clarificar</strong> procesos
            personales, desde el respeto, la escucha y la vibración.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a href="#lista" className="underline-offset-4 hover:underline">
              Ver terapias
            </a>
            <span aria-hidden>•</span>
            <a href="#faq" className="underline-offset-4 hover:underline">
              Preguntas frecuentes
            </a>
            <span aria-hidden>•</span>
            <a href="#reserva" className="underline-offset-4 hover:underline">
              Reserva
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-t">
        <div className="container-app mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Un espacio de cuidado y coherencia
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Cada sesión es única. Utilizamos herramientas de energía, sonido y
              presencia para facilitar un reequilibrio suave del sistema,
              promoviendo descanso, claridad y bienestar integral.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/#contacto"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              >
                Consultar disponibilidad
              </Link>
              <Link
                href="/#agenda"
                className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
              >
                Ver próximas fechas
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-2xl border bg-background">
            <Image
              src="/images/terapias/cover.jpg" // reemplaza por tu imagen
              alt="Espacio preparado para una sesión terapéutica"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <figcaption className="sr-only">
              Espacio dispuesto con instrumentos y cojines.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* LISTA DE TERAPIAS */}
      <section id="lista" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">Terapias disponibles</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {THERAPIES.map((t) => (
              <article key={t.slug} className="group rounded-2xl border overflow-hidden bg-card">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.short}</p>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {t.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex rounded-full border px-3 py-1">
                      ⏱ {t.duration}
                    </span>
                    <span className="inline-flex rounded-full border px-3 py-1">
                      📍 {t.mode}
                    </span>
                  </div>

                  {t.note && (
                    <p className="mt-3 text-xs text-muted-foreground/90">
                      <strong>Nota:</strong> {t.note}
                    </p>
                  )}

                  <div className="mt-5 flex gap-3">
                    <Link
                      href="/#contacto"
                      className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
                    >
                      Solicitar información / reservar
                    </Link>
                    <Link
                      href="/#agenda"
                      className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted/50"
                    >
                      Ver agenda
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ BÁSICO */}
      <section id="faq" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">¿Cómo preparo mi sesión?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Llega 10 minutos antes, trae ropa cómoda y evita comidas muy
                pesadas. Si lo deseas, trae una intención o tema para trabajar.
              </p>
            </div>
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">¿Cuántas sesiones necesito?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Depende del proceso. Algunas personas sienten cambios en 1–2
                sesiones; otras prefieren un acompañamiento de 4–6 encuentros.
              </p>
            </div>
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">¿Hay contraindicaciones?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                En crisis agudas, epilepsia fotosensible o embarazo consulta
                antes. Las terapias no sustituyen diagnósticos ni tratamientos
                médicos.
              </p>
            </div>
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">¿Puedo combinar terapias?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sí. Podemos diseñar una sesión híbrida (por ejemplo, sonido +
                reiki) según tus necesidades y momento vital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="reserva" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            ¿Agendamos tu próxima sesión?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Cuéntame qué necesitas y te recomendaré la terapia o combinación más
            adecuada para ti.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
            >
              Contactar / Reservar
            </Link>
            <Link
              href="/#agenda"
              className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
            >
              Ver agenda completa
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
