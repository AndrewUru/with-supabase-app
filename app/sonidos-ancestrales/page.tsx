// app/sonidos-ancestrales/page.tsx
import Image from "next/image";
import Link from "next/link";

const HERO_LINKS = [
  { href: "#principio", label: "Principio de resonancia" },
  { href: "#viaje-sonoro", label: "Cómo se vive" },
  { href: "#instrumentos", label: "Instrumentos" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#practica", label: "Práctica y meditación" },
];

const HIGHLIGHTS = [
  { label: "Duración habitual", value: "60 - 90 minutos" },
  { label: "Modalidades", value: "Sesiones individuales y grupales" },
  { label: "Formato", value: "Presencial / online en vivo" },
];

const INSTRUMENTS = [
  {
    name: "Cuencos Tibetanos",
    description: "Timbres ricos en armónicos que favorecen la relajación profunda.",
    quality: "Profundidad y contención",
  },
  {
    name: "Gongs",
    description:
      "Ondas expansivas que desbloquean patrones vibratorios y energéticos.",
    quality: "Liberación e impulso",
  },
  {
    name: "Cuencos de Cristal de Cuarzo",
    description: "Pureza tonal que invita a la coherencia celular y claridad mental.",
    quality: "Claridad y enfoque",
  },
  {
    name: "Flautas Nativas",
    description:
      "Melodías que conectan con la memoria ancestral y el pulso de la tierra.",
    quality: "Conexión y apertura",
  },
  {
    name: "Tambores Ceremoniales",
    description: "Pulso rítmico que ordena, enraíza y expande la conciencia.",
    quality: "Enraizamiento",
  },
  {
    name: "Voz",
    description:
      "Frecuencia viva que guía la experiencia y acompaña procesos internos.",
    quality: "Guía vibracional",
  },
];

const SESSION_JOURNEY = [
  {
    title: "Recepción consciente",
    description:
      "Llegada, respiración guiada y fijación de intención para activar la escucha interna.",
    focus: "Regula el sistema nervioso y prepara el terreno energético.",
  },
  {
    title: "Inmersión sonora",
    description:
      "Secuencias de cuencos, gongs, tambores y voz que recorren el cuerpo físico y sutil.",
    focus: "Desbloquea tensiones y armoniza los centros energéticos.",
  },
  {
    title: "Integración guiada",
    description:
      "Cierre en silencio, aromaterapia y pautas para extender la vibración en la vida diaria.",
    focus: "Asienta la experiencia y facilita cambios sostenibles.",
  },
];

const BENEFITS = [
  "Reduce significativamente el estrés y la ansiedad.",
  "Favorece la relajación profunda y el descanso reparador.",
  "Apoya procesos de sanación emocional y claridad mental.",
  "Fortalece el sistema inmunológico y la vitalidad.",
  "Facilita la introspección y la conexión con la propia esencia.",
];

const PRACTICE_TIPS = [
  {
    title: "Respiración somática",
    detail:
      "Inspiraciones profundas y exhalaciones lentas para sostener el estado meditativo y potenciar la escucha interna.",
  },
  {
    title: "Movimiento suave",
    detail:
      "Micro estiramientos y balanceos conscientes que distribuyen la vibración a lo largo del cuerpo.",
  },
  {
    title: "Hidratación vibracional",
    detail:
      "Agua o infusiones antes y después para acompañar la depuración celular y energética.",
  },
];

export const metadata = {
  title: "Sonidos Ancestrales | EDHUCO",
  description:
    "Sesiones y conciertos de Sonidos Ancestrales basados en la ley de resonancia. Armonización y equilibrio físico, emocional y mental con cuencos, gongs, flautas nativas, tambores y voz.",
};

export default function SonidosAncestralesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-background/80 to-muted/40">
        <div
          className="absolute -top-32 right-[10%] size-64 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 left-[-10%] size-72 translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-app mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl space-y-6">
            <span className="inline-flex w-fit items-center rounded-full border border-foreground/10 bg-background/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
              Sonoterapia integral
            </span>
            <div>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                Sonidos Ancestrales para armonizar cuerpo, mente y espíritu
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Crea un espacio de quietud y renovación vibracional a través de frecuencias que invitan a la coherencia interna. Diseñamos experiencias inmersivas para grupos, retiros y acompañamientos personalizados.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#agenda"
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
              >
                Reservar un lugar
              </Link>
              <Link
                href="#beneficios"
                className="inline-flex items-center rounded-full border border-foreground/10 px-6 py-3 text-sm font-semibold transition hover:border-foreground/30 hover:bg-background/80"
              >
                Explorar beneficios
              </Link>
            </div>
            <nav className="inline-flex flex-wrap items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-sm shadow-sm backdrop-blur">
              {HERO_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1 font-medium text-muted-foreground transition hover:bg-accent/10 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((highlight) => (
              <article
                key={highlight.label}
                className="rounded-2xl border border-foreground/10 bg-card/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {highlight.label}
                </span>
                <p className="mt-2 text-lg font-semibold leading-tight text-foreground">
                  {highlight.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="principio" className="border-t bg-background">
        <div className="container-app mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Fundamento vibracional
              </span>
              <h2 className="text-3xl font-bold md:text-4xl">La ley de resonancia en acción</h2>
            </div>
            <p className="text-base text-muted-foreground md:text-lg">
              Los sonidos actúan por vibración y resonancia, modulando nuestros sistemas físico, mental y emocional. Al interactuar con frecuencias armónicas, el organismo tiende a retornar a su vibración natural: orden, coherencia y equilibrio.
            </p>
            <p className="text-base text-muted-foreground md:text-lg">
              El ritmo acelerado, el estrés constante o los impactos emocionales generan desarmonía. Las sesiones crean un espacio seguro para reordenar el campo energético y recordar la propia frecuencia de bienestar.
            </p>
            <blockquote className="rounded-3xl border border-foreground/10 bg-muted/20 p-6 text-base italic text-muted-foreground">
              “La resonancia es la capacidad que tenemos de vibrar con aquello que sintoniza con nuestra esencia. Cuando elegimos conscientemente esa sintonía, el cuerpo encuentra nuevas posibilidades de equilibrio.”
            </blockquote>
            <div className="pt-2">
              <Link
                href="/#agenda"
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
              >
                Ver próximas sesiones
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/60 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-accent/10" aria-hidden="true" />
            <Image
              src="/images/sonidos-ancestrales.jpg" // Reemplaza por tu imagen
              alt="Cuencos tibetanos y de cuarzo dispuestos para una sesión de sonido"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <figcaption className="sr-only">
              Cuencos tibetanos y de cuarzo listos para una sesión.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="viaje-sonoro" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Experiencia guiada
              </span>
              <h2 className="text-3xl font-bold md:text-4xl">Cómo se vive una sesión de sonidos ancestrales</h2>
              <p className="text-base text-muted-foreground md:text-lg">
                Cada encuentro está cuidadosamente coreografiado para acompañarte en un viaje del exterior hacia tu mundo interno. Estas son las etapas que recorreremos juntos.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="inline-flex items-center rounded-full border border-foreground/10 px-6 py-3 text-sm font-semibold transition hover:border-foreground/30 hover:bg-background/80"
            >
              Solicitar una sesión privada
            </Link>
          </div>

          <ol className="mt-10 space-y-6">
            {SESSION_JOURNEY.map((step, index) => (
              <li
                key={step.title}
                className="group rounded-3xl border border-foreground/10 bg-card/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent md:size-14">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold leading-tight text-foreground md:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground md:text-base">
                        {step.description}
                      </p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      {step.focus}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="instrumentos" className="border-t bg-background">
        <div className="container-app mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Paleta sonora
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">Instrumentos terapéuticos que utilizamos</h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Cada instrumento aporta una textura vibratoria única. Al entrelazarlos, generamos paisajes sonoros que masajean el cuerpo interno y abren nuevas rutas de percepción.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INSTRUMENTS.map((instrument) => (
              <article
                key={instrument.name}
                className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold leading-tight text-foreground">
                    {instrument.name}
                  </h3>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    {instrument.quality}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground md:text-base">
                  {instrument.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="border-t bg-muted/20">
        <div className="container-app mx-auto grid gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Beneficios observados
              </span>
              <h2 className="text-3xl font-bold md:text-4xl">Resultados que experimentarás</h2>
            </div>
            <p className="text-base text-muted-foreground md:text-lg">
              Al armonizarnos a través del sonido entramos en un estado de calma, equilibrio y coherencia. El cuerpo puede segregar serotonina, dopamina y endorfinas, facilitando regeneración celular y claridad emocional.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground md:text-base">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/#agenda"
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
              >
                Agendar mi próxima experiencia
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-foreground/10 bg-card/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground">Escucha una muestra</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fragmento breve de cuencos y voz (coloca aquí tu pista de audio en /public/audio/...).
              </p>
              <audio className="mt-4 w-full" controls preload="none" src="/audio/muestra-sonidos-ancestrales.mp3">
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
            <blockquote className="rounded-3xl border border-foreground/10 bg-background/70 p-6 text-sm italic text-muted-foreground shadow-sm">
              “La sesión me permitió liberar tensiones guardadas y volver a conectar con mi respiración. Las vibraciones siguieron acompañándome varios días después.”
            </blockquote>
          </div>
        </div>
      </section>

      <section id="practica" className="border-t bg-background">
        <div className="container-app mx-auto px-4 py-16 md:py-24">
          <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Práctica y continuidad
                </span>
                <h2 className="text-3xl font-bold md:text-4xl">Integra la experiencia en tu día a día</h2>
              </div>
              <p className="text-base text-muted-foreground md:text-lg">
                Las sesiones de sonido crean un terreno fértil para sostener hábitos que expanden el bienestar. Estas recomendaciones potencian la práctica meditativa antes, durante y después del encuentro.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {PRACTICE_TIPS.map((tip) => (
                  <article
                    key={tip.title}
                    className="rounded-3xl border border-foreground/10 bg-card/70 p-5 text-sm text-muted-foreground shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md md:text-base"
                  >
                    <h3 className="text-base font-semibold text-foreground md:text-lg">
                      {tip.title}
                    </h3>
                    <p className="mt-2">{tip.detail}</p>
                  </article>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#agenda"
                  className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
                >
                  Próximas fechas
                </Link>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center rounded-full border border-foreground/10 px-6 py-3 text-sm font-semibold transition hover:border-foreground/30 hover:bg-background/80"
                >
                  Consultar una sesión privada
                </Link>
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/60 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-accent/10" aria-hidden="true" />
              <Image
                src="/images/sound-bath.jpg" // Reemplaza por tu imagen
                alt="Sesión de baño de sonido con gongs y cuencos"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
              <figcaption className="sr-only">
                Sesión de baño de sonido con gongs y cuencos.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}
