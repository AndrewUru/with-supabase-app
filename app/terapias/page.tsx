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

type Pillar = {
  title: string;
  description: string;
};

type FAQ = {
  question: string;
  answer: string;
};

const WIPHLA_ROWS: string[][] = [
  ["#EE3124", "#F97B00", "#FFD500", "#FFFFFF", "#00A859", "#0084C9", "#6D3B96"],
  ["#F97B00", "#FFD500", "#FFFFFF", "#00A859", "#0084C9", "#6D3B96", "#EE3124"],
  ["#FFD500", "#FFFFFF", "#00A859", "#0084C9", "#6D3B96", "#EE3124", "#F97B00"],
  ["#FFFFFF", "#00A859", "#0084C9", "#6D3B96", "#EE3124", "#F97B00", "#FFD500"],
  ["#00A859", "#0084C9", "#6D3B96", "#EE3124", "#F97B00", "#FFD500", "#FFFFFF"],
  ["#0084C9", "#6D3B96", "#EE3124", "#F97B00", "#FFD500", "#FFFFFF", "#00A859"],
  ["#6D3B96", "#EE3124", "#F97B00", "#FFD500", "#FFFFFF", "#00A859", "#0084C9"],
];

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
    mode: "Presencial (Valencia) y online adaptada.",
    image: "/images/terapias/tameana.jpg",
    note: "No sustituye tratamiento médico. Embarazo: consultar previamente.",
  },
  {
    slug: "sonoterapia",
    title: "Sonoterapia (Baño de Sonido)",
    short:
      "Cuencos, gongs, tambor y voz para inducir coherencia y relajación profunda en todo el sistema.",
    bullets: [
      "Reduce estrés y ansiedad, mejora el descanso.",
      "Invita a la presencia y a la autoescucha.",
      "Apoya procesos de sanación emocional.",
    ],
    duration: "60–75 min",
    mode: "Sesión individual o dúo. Presencial.",
    image: "/images/terapias/sonoterapia.jpg",
  },
  {
    slug: "reiki",
    title: "Reiki Usui",
    short:
      "Canalización de energía vital mediante imposición de manos para equilibrar cuerpo, mente y espíritu.",
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
      "Armonización de viviendas o consultas mediante sonido, sahumos y geometrías para renovar el campo del lugar.",
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
      "Inducción a estados de conciencia ampliada con tambor para recuperar claridad, recursos y guía interior.",
    bullets: [
      "Comprender patrones repetitivos y tomar decisiones.",
      "Conectar con símbolos, ancestros y animales de poder.",
      "Integración respetuosa posterior al viaje.",
    ],
    duration: "75–90 min",
    mode: "Presencial (individual o grupal).",
    image: "/images/terapias/tambor.jpg",
    note: "No recomendado en epilepsia fotosensible o crisis agudas. Consultar antes.",
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

const CEREMONIAL_PILLARS: Pillar[] = [
  {
    title: "Sabiduría ancestral viva",
    description:
      "Integramos legado andino-amazónico y prácticas contemporáneas con respeto, consentimiento y sentido de propósito.",
  },
  {
    title: "Espacios sagrados seguros",
    description:
      "Creamos ambientes contenidos, cálidos y cuidados donde la persona puede abrirse sin prisa, sostener procesos y descansar.",
  },
  {
    title: "Arte ritual y presencia",
    description:
      "Instrumentos, cantos, ofrendas y tejidos simbólicos se combinan con escucha terapéutica para anclar la experiencia en el cuerpo.",
  },
];

const FAQS: FAQ[] = [
  {
    question: "¿Cómo preparo mi sesión?",
    answer:
      "Llega unos minutos antes, trae ropa cómoda, hidrátate y evita comidas muy pesadas. Puedes traer una intención o tema claro si lo deseas.",
  },
  {
    question: "¿Cuántas sesiones necesito?",
    answer:
      "Depende del proceso y la profundidad que busques. Algunas personas sienten cambios en 1–2 sesiones, otras prefieren ciclos de 4–6 encuentros.",
  },
  {
    question: "¿Hay contraindicaciones?",
    answer:
      "En crisis agudas, epilepsia fotosensible, embarazo o procesos médicos delicados consulta antes. Las terapias no sustituyen diagnósticos ni tratamientos profesionales.",
  },
  {
    question: "¿Puedo combinar terapias?",
    answer:
      "Sí. Diseñamos sesiones híbridas (por ejemplo, sonido + reiki) o un recorrido progresivo según tus necesidades y momento vital.",
  },
];

export default function TerapiasPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(109,59,150,0.12),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(109,59,150,0.22),_transparent_60%)]">
      <HeroSection />
      <TherapiesSection />
      <CeremonialSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <HeroBackground />

      <div className="container-app relative z-10 mx-auto grid items-center gap-16 px-4 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-1.5 text-[11px] text-foreground backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
              <span className="h-2 w-2 rounded-sm" style={{ backgroundImage: wiphalaGradient }} aria-hidden="true" />
              Terapias vibracionales
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[hsl(var(--spiritual-light)/0.22)] px-4 py-1.5 text-[11px] text-[hsl(var(--spiritual-ember))] dark:bg-[hsl(var(--spiritual-shadow)/0.5)] dark:text-[hsl(var(--spiritual-light))]">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#EE3124] via-[#FFD500] to-[#00A859]" aria-hidden="true" />
              Sabiduría ancestral
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
              Acompañamientos que honran cuerpo, emoción y espíritu
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Ceremonias terapéuticas creadas para armonizar tu campo energético, descansar la mente y recuperar claridad. Un puente entre tradiciones nativas, sonido, respiración y presencia consciente.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-card/70 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-foreground">En Valencia y online</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Sesiones individuales, dúos o grupos reducidos según lo que tu proceso necesite.
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/70 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-foreground">Instrumentos rituales</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Cuarzos, tambor, cantos, cuencos, esencias y ofrendas inspiradas en cosmovisiones originarias.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90"
            >
              Reservar una sesión
            </Link>
            <Link
              href="#oferta"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-foreground/5"
            >
              Explorar terapias
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-card/60 shadow-[0_35px_90px_-45px_rgba(16,24,40,0.6)] backdrop-blur dark:border-white/10 dark:bg-card/40">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/terapias/sonoterapia.jpg"
                alt="Instrumentos ancestrales y cuarzos sobre un tapiz"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 420px"
                priority
              />
            </div>
            <div className="border-t border-white/20 bg-gradient-to-r from-white/60 via-transparent to-white/40 px-5 py-4 text-sm text-foreground dark:border-white/10 dark:from-white/5 dark:to-white/10">
              &ldquo;El sonido y la energía nos recuerdan lo que siempre estuvo dentro.&rdquo; — EDHUCO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(238,49,36,0.12)] via-[rgba(0,168,89,0.08)] to-[rgba(109,59,150,0.18)]" />
      <div
        className="absolute inset-x-0 top-0 hidden h-20 opacity-80 md:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(238,49,36,0.55) 0px, rgba(238,49,36,0.55) 24px, rgba(255,213,0,0.45) 24px, rgba(255,213,0,0.45) 48px, rgba(0,168,89,0.45) 48px, rgba(0,168,89,0.45) 72px, rgba(0,132,201,0.5) 72px, rgba(0,132,201,0.5) 96px)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hidden rotate-3 overflow-hidden rounded-[40px] border border-white/30 bg-white/35 p-3 shadow-[0_45px_120px_-70px_rgba(16,24,40,0.9)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 lg:block">
          <div className="grid grid-cols-7 gap-[2px]">
            {WIPHLA_ROWS.flat().map((color, index) => (
              <span
                key={index}
                className="aspect-square w-8 rounded-md animate-[pulse_8s_ease-in-out_infinite]"
                style={{
                  backgroundColor: color,
                  animationDelay: `${index * 60}ms`,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent" aria-hidden="true" />
    </div>
  );
}

function TherapiesSection() {
  return (
    <section id="oferta" className="relative border-t border-border/40 bg-gradient-to-b from-background via-background/80 to-background py-16 md:py-20">
      <div className="container-app mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Tratamientos</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Rutas terapéuticas para cada momento</h2>
          <p className="mt-4 text-muted-foreground">
            Selecciona la propuesta que resuena contigo o combínalas según tu proceso. Cada sesión inicia con escucha, intención y apertura del espacio sagrado.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {THERAPIES.map((therapy) => (
            <article
              key={therapy.slug}
              className="group relative overflow-hidden rounded-[32px] border border-border/50 bg-card/70 shadow-[0_35px_100px_-60px_rgba(16,24,40,0.55)] backdrop-blur-md transition hover:border-[rgba(238,49,36,0.35)] hover:shadow-[0_45px_120px_-55px_rgba(16,24,40,0.65)]"
            >
              <div
                className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(238,49,36,0.18) 0%, rgba(255,213,0,0.18) 35%, rgba(0,168,89,0.18) 65%, rgba(0,132,201,0.22) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={therapy.image}
                      alt={therapy.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {therapy.slug.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-xl font-semibold text-foreground">{therapy.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{therapy.short}</p>

                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {therapy.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-sm"
                          style={{ backgroundImage: wiphalaGradient }}
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 font-medium text-foreground/80">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#EE3124] via-[#FFD500] to-[#0084C9]" aria-hidden="true" />
                      {therapy.duration}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 font-medium text-foreground/80">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#00A859] via-[#FFD500] to-[#6D3B96]" aria-hidden="true" />
                      {therapy.mode}
                    </span>
                  </div>

                  {therapy.note && (
                    <p className="mt-4 text-xs text-muted-foreground/80">
                      <strong className="font-semibold text-foreground/80">Nota:</strong> {therapy.note}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/#contacto?interes=${therapy.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-background transition hover:bg-foreground/90"
                    >
                      Reservar
                    </Link>
                    <Link
                      href="/#agenda"
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-foreground hover:bg-foreground/5"
                    >
                      Ver agenda
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CeremonialSection() {
  return (
    <section className="relative border-t border-border/40 py-16 md:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(238,49,36,0.5)] to-transparent" aria-hidden="true" />
      <div className="container-app mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Círculo ceremonial</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Una experiencia con raíz y presente</h2>
          <p className="mt-4 text-muted-foreground">
            Cada encuentro honra la cosmovisión de los pueblos originarios andino-amazónicos. Sostenemos el espacio con ética, responsabilidad y belleza ritual.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CEREMONIAL_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/70 p-8 shadow-[0_30px_80px_-60px_rgba(16,24,40,0.5)] backdrop-blur transition hover:border-[rgba(0,168,89,0.45)] hover:shadow-[0_40px_110px_-65px_rgba(16,24,40,0.6)]"
            >
              <ChakanaGlyph />
              <h3 className="mt-6 text-lg font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="relative border-t border-border/40 bg-muted/20 py-16 md:py-20">
      <div className="container-app mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Preguntas frecuentes</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Para llegar con calma y confianza</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="relative overflow-hidden rounded-[26px] border border-border/50 bg-card/70 p-6 shadow-[0_30px_80px_-65px_rgba(16,24,40,0.5)] backdrop-blur"
            >
              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#FFD500]/20 via-transparent to-transparent" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="reserva" className="relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-background/90 to-background py-16 md:py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(255,213,0,0.35),_transparent_70%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_bottom,_rgba(0,132,201,0.25),_transparent_65%)]" aria-hidden="true" />
      </div>
      <div className="container-app relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          <span className="h-2 w-2 rounded-sm" style={{ backgroundImage: wiphalaGradient }} aria-hidden="true" />
          Agenda ceremonial
        </div>
        <h2 className="mt-5 text-3xl font-semibold text-foreground sm:text-4xl">¿Agendamos tu próxima sesión?</h2>
        <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
          Cuéntame qué necesitas y diseñaremos juntas la terapia o combinación más adecuada. Inspiradas en la sabiduría ancestral, sostenidas con rigor terapéutico.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow transition hover:bg-foreground/90"
          >
            Contactar / Reservar
          </Link>
          <Link
            href="/#agenda"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/40 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-foreground/5"
          >
            Ver agenda completa
          </Link>
        </div>
      </div>
    </section>
  );
}

function ChakanaGlyph() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-12 w-12 grid-cols-3 grid-rows-3">
        {[...Array(9)].map((_, index) => {
          const isCenter = index === 4;
          const isCrossArm = [1, 3, 4, 5, 7].includes(index);
          if (!isCenter && !isCrossArm) {
            return <span key={index} aria-hidden="true" />;
          }

          return (
            <span
              key={index}
              className="rounded-sm"
              style={{
                backgroundImage: wiphalaGradient,
                opacity: isCenter ? 0.9 : 0.7,
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ritual</span>
    </div>
  );
}

const wiphalaGradient =
  "linear-gradient(130deg, #EE3124, #F97B00, #FFD500, #FFFFFF, #00A859, #0084C9, #6D3B96)";



