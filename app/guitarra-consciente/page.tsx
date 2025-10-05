// app/guitarra-consciente/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Clock,
  Guitar,
  Heart,
  Laptop,
  MapPin,
  Music2,
  Sparkles,
  Waves,
} from "lucide-react";

export const metadata = {
  title: "Guitarra Consciente | EDHUCO",
  description:
    "Clases de guitarra consciente: sentir, crear e improvisar con presencia. Tecnica progresiva, escucha profunda y acompanamiento humano en Valencia u online.",
};

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

const HERO_LINKS = [
  { href: "#sobre", label: "Sobre el enfoque" },
  { href: "#trabajamos", label: "Lo que practicamos" },
  { href: "#modalidad", label: "Modalidad y agenda" },
] as const;

const FOCUS_ITEMS = [
  {
    icon: Music2,
    title: "Presencia sonora",
    description:
      "Respiracion, escucha y conciencia corporal para tocar con calma.",
  },
  {
    icon: Sparkles,
    title: "Tecnica amable",
    description:
      "Progresion personalizada: acordes, ritmos y recursos creativos sin rigidez.",
  },
  {
    icon: Heart,
    title: "Expresion viva",
    description:
      "Espacios guiados para traducir emociones en improvisacion y composicion.",
  },
] as const;

const PRACTICE_PILLARS = [
  {
    title: "Lenguaje musical integrador",
    description:
      "Comprende acordes, armonia funcional y patrones ritmicos desde la experiencia y no solo desde la teoria.",
    tags: ["Armonia esencial", "Ritmo vivo", "Memoria corporal"],
  },
  {
    title: "Cuerpo + instrumento",
    description:
      "Posturas sostenibles, respiracion y atencion para tocar sin tensiones y con energia estable.",
    tags: ["Respiracion", "Ergonomia", "Habitos"],
  },
  {
    title: "Improvisacion consciente",
    description:
      "Explora tu voz con mapas sonoros, dinamicas ludo creativas y escucha en tiempo real.",
    tags: ["Mapas tonales", "Looping", "Dialogo sonoro"],
  },
  {
    title: "Rutinas significativas",
    description:
      "Disena micro practicas que caben en tu semana y mantienen viva la conexion con la guitarra.",
    tags: ["Micro practicas", "Seguimiento", "Bitacora"],
  },
  {
    title: "Integracion emocional",
    description:
      "Utiliza el sonido como canal de liberacion, claridad y reparacion interna.",
    tags: ["Liberar", "Nombrar", "Transformar"],
  },
  {
    title: "Proyectos en comunidad",
    description:
      "Co crea piezas con otras personas, graba sesiones compartidas y celebra los avances.",
    tags: ["Co creacion", "Feedback", "Celebracion"],
  },
] as const;

const MODALIDAD_FEATURES = [
  {
    icon: MapPin,
    title: "Presencial en Valencia",
    description: "Estudio intimo en Benimaclet con sonido cuidado y materiales incluidos.",
  },
  {
    icon: Laptop,
    title: "Online inmersivo",
    description: "Camaras multi angulo y recursos grabados para que practiques desde donde estes.",
  },
  {
    icon: Clock,
    title: "Sesiones flexibles",
    description: "Duracion de 60 o 90 minutos, individuales o micro grupos (2-3 personas).",
  },
  {
    icon: CalendarClock,
    title: "Seguimiento continuo",
    description: "Cuaderno digital, playlists y feedback entre sesiones para sostener el proceso.",
  },
] as const;

export default function GuitarraConscientePage() {
  return (
    <main className="flex flex-col">
      <section className="relative isolate overflow-hidden py-20" aria-labelledby="guitarra-hero-title">
        <HeroBackgroundDecor />
        <div className="container-app relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <span
                className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/40 dark:ring-white/25"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Guitarra consciente
            </span>

            <div className="space-y-5">
              <h1
                id="guitarra-hero-title"
                className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              >
                Guitarra Consciente
                <span
                  className="mt-2 block bg-clip-text text-3xl text-transparent sm:text-[40px]"
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                >
                  Sentir. Crear. Resonarte.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Un espacio para encontrarte con la musica desde la presencia: tecnica amable, improvisacion guiada y acompanamiento humano que honra tu ritmo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80">
              {HERO_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
                >
                  <span
                    className="h-1.5 w-10 rounded-full"
                    style={{ backgroundImage: WIPHLA_GRADIENT }}
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-lg"
              >
                Reservar una sesion
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#agenda"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
              >
                Ver agenda abierta
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-card/85 shadow-[0_44px_120px_-70px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/65">
            <div className="absolute -left-10 top-8 h-32 w-32 rounded-full" style={{ backgroundImage: WIPHLA_GRADIENT, opacity: 0.28, filter: "blur(26px)" }} aria-hidden="true" />
            <div className="relative overflow-hidden rounded-t-[28px]">
              <Image
                src="/images/guitarra-consciente.jpg"
                alt="Manos sobre una guitarra durante una sesion consciente"
                width={960}
                height={1200}
                className="h-80 w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" aria-hidden="true" />
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">
                <Guitar className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                Programa vivo
              </div>
              <p className="text-sm text-muted-foreground">
                Elige sesiones sueltas o recorridos de 6 y 12 encuentros. Incluyen bitacora digital, playlists y seguimiento entre clases.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm">Resonancia</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm">Improvisar</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm">Cuidar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="relative isolate overflow-hidden border-t border-white/5 bg-card/5 py-20">
        <FocusBackgroundDecor />
        <div className="container-app relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="space-y-8">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px]">
              Una forma de estar con el instrumento
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              La guitarra ha sido mi companera desde la infancia. Aqui no solo aprendemos recursos tecnicos: cultivamos presencia, respiracion y escucha para que cada nota exprese lo que habita en ti.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Las sesiones combinan cuerpo, sonido y reflexion. No hay recetas rigidas: hay preguntas, exploraciones y el sosten de una comunidad que celebra cada avance.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {FOCUS_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const accent = WIPHLA_COLORS[index % WIPHLA_COLORS.length];
                const companion = WIPHLA_COLORS[(index + 3) % WIPHLA_COLORS.length];

                return (
                  <article
                    key={item.title}
                    className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/75 p-5 shadow-[0_28px_80px_-64px_rgba(17,24,39,0.78)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_36px_110px_-62px_rgba(17,24,39,0.84)] dark:bg-card/55"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(accent, 0.16)} 0%, ${hexToRgba(companion, 0.14)} 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10" aria-hidden="true">
                        <Icon className="h-5 w-5 text-white" />
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground/90">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 rounded-[28px] border border-white/15 bg-card/75 p-6 shadow-[0_32px_90px_-66px_rgba(17,24,39,0.82)] backdrop-blur-sm dark:bg-card/55">
            <h3 className="text-lg font-semibold text-foreground">Que necesitas</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Tu guitarra (si no tienes, podemos facilitar una temporal).</li>
              <li>Disponibilidad para practicar 10-15 minutos diarios.</li>
              <li>Ganas de escuchar, sentir y compartir.</li>
            </ul>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-muted-foreground">
              <p>
                "No lo llamo alumnos, porque alumna significa sin luz. Cada persona que llega trae su propia llama; mi labor es acompanarla a que suene con verdad."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="trabajamos" className="relative isolate overflow-hidden py-20">
        <PracticeBackgroundDecor />
        <div className="container-app relative z-10 space-y-12">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/80 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-[4px]" style={{ backgroundImage: WIPHLA_GRADIENT }} aria-hidden="true" />
              Lo que practicamos
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px]">
              Un mapa que combina tecnica, emocion y comunidad
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Cada bloque se adapta a tu experiencia y objetivos. Alternamos sesiones vivas con recursos grabados, retos semanales y espacios de integracion.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PRACTICE_PILLARS.map((pillar, index) => {
              const accent = WIPHLA_COLORS[(index + 1) % WIPHLA_COLORS.length];
              const companion = WIPHLA_COLORS[(index + 4) % WIPHLA_COLORS.length];

              return (
                <article
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/15 bg-card/80 p-6 text-left shadow-[0_32px_90px_-68px_rgba(17,24,39,0.85)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_40px_120px_-66px_rgba(17,24,39,0.9)] dark:bg-card/60"
                  style={{
                    background: `linear-gradient(140deg, ${hexToRgba(accent, 0.18)} 0%, ${hexToRgba(companion, 0.16)} 100%)`,
                  }}
                >
                  <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">
                    {pillar.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="modalidad" className="relative isolate overflow-hidden border-t border-white/5 bg-card/5 py-20">
        <ModalidadBackgroundDecor />
        <div className="container-app relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-8">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px]">
              Modalidad y agenda
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Elige la combinacion que mejor se alinea con tu ritmo. Podemos iniciar con una sesion diagnostica y luego decidir si continuamos en formato individual, micro grupo o residencias intensivas.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {MODALIDAD_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                const accent = WIPHLA_COLORS[(index + 2) % WIPHLA_COLORS.length];

                return (
                  <article
                    key={feature.title}
                    className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/75 p-5 shadow-[0_28px_80px_-64px_rgba(17,24,39,0.82)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_36px_110px_-62px_rgba(17,24,39,0.88)] dark:bg-card/55"
                  >
                    <span
                      className="absolute -top-10 right-6 h-20 w-20 opacity-40"
                      style={{ backgroundImage: `radial-gradient(circle, ${hexToRgba(accent, 0.32)} 0%, transparent 70%)` }}
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10" aria-hidden="true">
                        <Icon className="h-5 w-5 text-white" />
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-lg"
              >
                Pedir informacion y reservar
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#somriu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
              >
                Conocer otros programas
              </Link>
            </div>
          </div>

          <div className="space-y-6 rounded-[28px] border border-white/15 bg-card/75 p-6 shadow-[0_32px_90px_-66px_rgba(17,24,39,0.84)] backdrop-blur-sm dark:bg-card/55">
            <h3 className="text-lg font-semibold text-foreground">Mini FAQ</h3>
            <dl className="space-y-4 text-sm text-muted-foreground">
              <div>
                <dt className="font-semibold text-foreground">Necesito experiencia previa?</dt>
                <dd>Para nada. Disenamos el recorrido desde tu punto de partida, incluso si es tu primer acercamiento.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Que incluye la sesion diagnostica?</dt>
                <dd>Escucha de tu historia, evaluacion corporal, mapas sonoros iniciales y propuesta personalizada.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Hay materiales extra?</dt>
                <dd>Playlists, PDF interactivos, grabaciones de ejercicios y seguimiento por mensajeria entre sesiones.</dd>
              </div>
            </dl>
            <div className="rounded-2xl border border-white/20 bg-white/8 p-4 text-sm text-muted-foreground">
              <p>
                "La guitarra se vuelve un ritual cotidiano: un lugar para respirar y recordar que estas vivo."
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function HeroBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 10%, rgba(238, 49, 36, 0.22), transparent 58%), radial-gradient(circle at 82% 18%, rgba(0, 132, 201, 0.2), transparent 64%), radial-gradient(circle at 50% 120%, rgba(0, 168, 89, 0.22), transparent 70%)",
        }}
      />
      <div
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 rotate-6 overflow-hidden rounded-[42px] border border-white/15 shadow-[0_50px_140px_-80px_rgba(17,24,39,0.88)] lg:block"
        aria-hidden="true"
      >
        <div className="grid h-48 w-48 grid-cols-7">
          {WIPHLA_COLORS.map((color, index) => (
            <span key={`hero-stripe-${color}-${index}`} style={{ backgroundColor: color }} className="h-full w-full" />
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

function FocusBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(255, 107, 0, 0.18), transparent 58%), radial-gradient(circle at 78% 24%, rgba(0, 132, 201, 0.18), transparent 62%), radial-gradient(circle at 52% 110%, rgba(0, 168, 89, 0.22), transparent 72%)",
        }}
      />
    </div>
  );
}

function PracticeBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(238, 49, 36, 0.18), transparent 58%), radial-gradient(circle at 82% 18%, rgba(0, 132, 201, 0.18), transparent 64%), radial-gradient(circle at 50% 118%, rgba(0, 168, 89, 0.2), transparent 70%)",
        }}
      />
    </div>
  );
}

function ModalidadBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 14%, rgba(255, 213, 0, 0.22), transparent 62%), radial-gradient(circle at 78% 18%, rgba(0, 132, 201, 0.2), transparent 66%), radial-gradient(circle at 46% 120%, rgba(238, 49, 36, 0.18), transparent 74%)",
        }}
      />
    </div>
  );
}
