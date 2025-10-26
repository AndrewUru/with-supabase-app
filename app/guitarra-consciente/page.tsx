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
    description:
      "Estudio intimo en Benimaclet con sonido cuidado y materiales incluidos.",
  },
  {
    icon: Laptop,
    title: "Online inmersivo",
    description:
      "Camaras multi angulo y recursos grabados para que practiques desde donde estes.",
  },
  {
    icon: Clock,
    title: "Sesiones flexibles",
    description:
      "Duracion de 60 o 90 minutos, individuales o micro grupos (2-3 personas).",
  },
  {
    icon: CalendarClock,
    title: "Seguimiento continuo",
    description:
      "Cuaderno digital, playlists y feedback entre sesiones para sostener el proceso.",
  },
] as const;

export default function GuitarraConscientePage() {
  return (
    <main className="flex flex-col" data-oid="zn:6-0q">
      <section
        className="relative isolate overflow-hidden py-20"
        aria-labelledby="guitarra-hero-title"
        data-oid="lyi2vg7"
      >
        <HeroBackgroundDecor data-oid="ztp42xp" />
        <div
          className="container-app relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center"
          data-oid="l_vpck7"
        >
          <div className="space-y-8" data-oid="4c:50mb">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80"
              data-oid="4l6n:30"
            >
              <span
                className="h-2 w-2 rounded-[4px] shadow-sm ring-1 ring-white/40 dark:ring-white/25"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
                data-oid="xnkbrzd"
              />
              Guitarra consciente
            </span>

            <div className="space-y-5" data-oid="sxhitoh">
              <h1
                id="guitarra-hero-title"
                className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
                data-oid="gb6zwf-"
              >
                Guitarra Consciente
                <span
                  className="mt-2 block bg-clip-text text-3xl text-transparent sm:text-[40px]"
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                  data-oid="n15xfnx"
                >
                  Sentir. Crear. Resonarte.
                </span>
              </h1>

              <p
                className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                data-oid="y8qtzrw"
              >
                Un espacio para encontrarte con la musica desde la presencia:
                tecnica amable, improvisacion guiada y acompanamiento humano que
                honra tu ritmo.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80"
              data-oid="utdqvuf"
            >
              {HERO_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
                  data-oid="jswa1ga"
                >
                  <span
                    className="h-1.5 w-10 rounded-full"
                    style={{ backgroundImage: WIPHLA_GRADIENT }}
                    aria-hidden="true"
                    data-oid="eez031l"
                  />

                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3" data-oid="f_warrw">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-lg"
                data-oid="wbi:cla"
              >
                Reservar una sesion
                <ArrowRight
                  className="h-4 w-4"
                  aria-hidden="true"
                  data-oid="jenrw::"
                />
              </Link>
              <Link
                href="/#agenda"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
                data-oid="umahj2d"
              >
                Ver agenda abierta
              </Link>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[32px] border border-white/20 bg-card/85 shadow-[0_44px_120px_-70px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/65"
            data-oid="r53lwak"
          >
            <div
              className="absolute -left-10 top-8 h-32 w-32 rounded-full"
              style={{
                backgroundImage: WIPHLA_GRADIENT,
                opacity: 0.28,
                filter: "blur(26px)",
              }}
              aria-hidden="true"
              data-oid="8l9o997"
            />

            <div
              className="relative overflow-hidden rounded-t-[28px]"
              data-oid="34g.np6"
            >
              <Image
                src="/images/guitarra-consciente.jpg"
                alt="Manos sobre una guitarra durante una sesion consciente"
                width={960}
                height={1200}
                className="h-80 w-full object-cover"
                priority
                data-oid=".gf3mjv"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                aria-hidden="true"
                data-oid="ls:8bfb"
              />
            </div>
            <div className="space-y-4 p-6" data-oid="-k8:u0h">
              <div
                className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-muted-foreground"
                data-oid="4t_sy64"
              >
                <Guitar
                  className="h-4 w-4 text-foreground/80"
                  aria-hidden="true"
                  data-oid="v.8ynq_"
                />
                Programa vivo
              </div>
              <p className="text-sm text-muted-foreground" data-oid="z8opzzq">
                Elige sesiones sueltas o recorridos de 6 y 12 encuentros.
                Incluyen bitacora digital, playlists y seguimiento entre clases.
              </p>
              <div
                className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/70"
                data-oid="eo8-u3e"
              >
                <span
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm"
                  data-oid="o_khhqq"
                >
                  Resonancia
                </span>
                <span
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm"
                  data-oid="zz8d0b4"
                >
                  Improvisar
                </span>
                <span
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm"
                  data-oid="appuni-"
                >
                  Cuidar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="sobre"
        className="relative isolate overflow-hidden border-t border-white/5 bg-card/5 py-20"
        data-oid="w6ac70t"
      >
        <FocusBackgroundDecor data-oid="ob32l_k" />
        <div
          className="container-app relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"
          data-oid="b68-pac"
        >
          <div className="space-y-8" data-oid="p8j4-so">
            <h2
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px]"
              data-oid="s9hztp1"
            >
              Una forma de estar con el instrumento
            </h2>
            <p
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-oid="v-zj7hl"
            >
              La guitarra ha sido mi companera desde la infancia. Aqui no solo
              aprendemos recursos tecnicos: cultivamos presencia, respiracion y
              escucha para que cada nota exprese lo que habita en ti.
            </p>
            <p
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-oid="7qsyqq1"
            >
              Las sesiones combinan cuerpo, sonido y reflexion. No hay recetas
              rigidas: hay preguntas, exploraciones y el sosten de una comunidad
              que celebra cada avance.
            </p>
            <div className="grid gap-4 sm:grid-cols-3" data-oid="iwxi_.3">
              {FOCUS_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const accent = WIPHLA_COLORS[index % WIPHLA_COLORS.length];
                const companion =
                  WIPHLA_COLORS[(index + 3) % WIPHLA_COLORS.length];

                return (
                  <article
                    key={item.title}
                    className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/75 p-5 shadow-[0_28px_80px_-64px_rgba(17,24,39,0.78)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_36px_110px_-62px_rgba(17,24,39,0.84)] dark:bg-card/55"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(accent, 0.16)} 0%, ${hexToRgba(companion, 0.14)} 100%)`,
                    }}
                    data-oid="hifzjty"
                  >
                    <div className="flex items-center gap-3" data-oid="r:3rvsi">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10"
                        aria-hidden="true"
                        data-oid="7ys.f9a"
                      >
                        <Icon
                          className="h-5 w-5 text-white"
                          data-oid="1ie6l43"
                        />
                      </span>
                      <h3
                        className="text-sm font-semibold text-foreground"
                        data-oid="x8:x4lz"
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className="mt-3 text-xs leading-relaxed text-muted-foreground/90"
                      data-oid="hh-9_fh"
                    >
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div
            className="space-y-6 rounded-[28px] border border-white/15 bg-card/75 p-6 shadow-[0_32px_90px_-66px_rgba(17,24,39,0.82)] backdrop-blur-sm dark:bg-card/55"
            data-oid="lotsjqf"
          >
            <h3
              className="text-lg font-semibold text-foreground"
              data-oid="eqkplga"
            >
              Que necesitas
            </h3>
            <ul
              className="space-y-3 text-sm text-muted-foreground"
              data-oid="qjjjt85"
            >
              <li data-oid="hhc15ag">
                Tu guitarra (si no tienes, podemos facilitar una temporal).
              </li>
              <li data-oid="1x:i9dz">
                Disponibilidad para practicar 10-15 minutos diarios.
              </li>
              <li data-oid="de_mj7o">Ganas de escuchar, sentir y compartir.</li>
            </ul>
            <div
              className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-muted-foreground"
              data-oid="73zjvsx"
            >
              <p data-oid="1x6ex9m">
                &quot;No lo llamo alumnos, porque alumna significa sin luz. Cada
                persona que llega trae su propia llama; mi labor es acompanarla
                a que suene con verdad.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="trabajamos"
        className="relative isolate overflow-hidden py-20"
        data-oid="e-m0c:o"
      >
        <PracticeBackgroundDecor data-oid="m40ksb0" />
        <div
          className="container-app relative z-10 space-y-12"
          data-oid="pztr2bx"
        >
          <div
            className="mx-auto max-w-3xl text-center space-y-4"
            data-oid="im-kw_j"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/80 backdrop-blur-sm"
              data-oid="8-1ck:n"
            >
              <span
                className="h-2 w-2 rounded-[4px]"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
                data-oid="xnajxb8"
              />
              Lo que practicamos
            </span>
            <h2
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px]"
              data-oid="i_q24z2"
            >
              Un mapa que combina tecnica, emocion y comunidad
            </h2>
            <p
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-oid="tr-onmk"
            >
              Cada bloque se adapta a tu experiencia y objetivos. Alternamos
              sesiones vivas con recursos grabados, retos semanales y espacios
              de integracion.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3" data-oid="tlpvsp6">
            {PRACTICE_PILLARS.map((pillar, index) => {
              const accent = WIPHLA_COLORS[(index + 1) % WIPHLA_COLORS.length];
              const companion =
                WIPHLA_COLORS[(index + 4) % WIPHLA_COLORS.length];

              return (
                <article
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/15 bg-card/80 p-6 text-left shadow-[0_32px_90px_-68px_rgba(17,24,39,0.85)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_40px_120px_-66px_rgba(17,24,39,0.9)] dark:bg-card/60"
                  style={{
                    background: `linear-gradient(140deg, ${hexToRgba(accent, 0.18)} 0%, ${hexToRgba(companion, 0.16)} 100%)`,
                  }}
                  data-oid="_n70u8c"
                >
                  <h3
                    className="text-lg font-semibold text-foreground"
                    data-oid="e.-wzef"
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    data-oid="e2nkyoh"
                  >
                    {pillar.description}
                  </p>
                  <div
                    className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80"
                    data-oid="6v_x:yh"
                  >
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm"
                        data-oid="7qfunz3"
                      >
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

      <section
        id="modalidad"
        className="relative isolate overflow-hidden border-t border-white/5 bg-card/5 py-20"
        data-oid="qjs42jo"
      >
        <ModalidadBackgroundDecor data-oid="1ns0:2u" />
        <div
          className="container-app relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]"
          data-oid="96qyxvb"
        >
          <div className="space-y-8" data-oid=".n_gq-j">
            <h2
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px]"
              data-oid="tx4pth5"
            >
              Modalidad y agenda
            </h2>
            <p
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-oid="lzn_s3:"
            >
              Elige la combinacion que mejor se alinea con tu ritmo. Podemos
              iniciar con una sesion diagnostica y luego decidir si continuamos
              en formato individual, micro grupo o residencias intensivas.
            </p>
            <div className="grid gap-4 sm:grid-cols-2" data-oid="lxb.vx1">
              {MODALIDAD_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                const accent =
                  WIPHLA_COLORS[(index + 2) % WIPHLA_COLORS.length];

                return (
                  <article
                    key={feature.title}
                    className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/75 p-5 shadow-[0_28px_80px_-64px_rgba(17,24,39,0.82)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_36px_110px_-62px_rgba(17,24,39,0.88)] dark:bg-card/55"
                    data-oid="yr9926d"
                  >
                    <span
                      className="absolute -top-10 right-6 h-20 w-20 opacity-40"
                      style={{
                        backgroundImage: `radial-gradient(circle, ${hexToRgba(accent, 0.32)} 0%, transparent 70%)`,
                      }}
                      aria-hidden="true"
                      data-oid="jvkleze"
                    />

                    <div className="flex items-center gap-3" data-oid="njfwtpc">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10"
                        aria-hidden="true"
                        data-oid="8uj541h"
                      >
                        <Icon
                          className="h-5 w-5 text-white"
                          data-oid="mbgcty1"
                        />
                      </span>
                      <h3
                        className="text-sm font-semibold text-foreground"
                        data-oid="76bkxju"
                      >
                        {feature.title}
                      </h3>
                    </div>
                    <p
                      className="mt-3 text-sm leading-relaxed text-muted-foreground"
                      data-oid="rk5q1-l"
                    >
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3" data-oid="iwx0ugf">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE3124] via-[#FFD500] to-[#00A859] px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-lg"
                data-oid="mlmkz6j"
              >
                Pedir informacion y reservar
                <ArrowRight
                  className="h-4 w-4"
                  aria-hidden="true"
                  data-oid="uheeprw"
                />
              </Link>
              <Link
                href="/#somriu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/40 hover:text-foreground"
                data-oid="5h_1-wa"
              >
                Conocer otros programas
              </Link>
            </div>
          </div>

          <div
            className="space-y-6 rounded-[28px] border border-white/15 bg-card/75 p-6 shadow-[0_32px_90px_-66px_rgba(17,24,39,0.84)] backdrop-blur-sm dark:bg-card/55"
            data-oid="sgomwji"
          >
            <h3
              className="text-lg font-semibold text-foreground"
              data-oid="l_9p8gt"
            >
              Mini FAQ
            </h3>
            <dl
              className="space-y-4 text-sm text-muted-foreground"
              data-oid="vtid77k"
            >
              <div data-oid="5vqljh2">
                <dt
                  className="font-semibold text-foreground"
                  data-oid="0m9-ql6"
                >
                  Necesito experiencia previa?
                </dt>
                <dd data-oid="g6e0j5-">
                  Para nada. Disenamos el recorrido desde tu punto de partida,
                  incluso si es tu primer acercamiento.
                </dd>
              </div>
              <div data-oid="97v..g3">
                <dt
                  className="font-semibold text-foreground"
                  data-oid="xls9t.2"
                >
                  Que incluye la sesion diagnostica?
                </dt>
                <dd data-oid="bitqe_h">
                  Escucha de tu historia, evaluacion corporal, mapas sonoros
                  iniciales y propuesta personalizada.
                </dd>
              </div>
              <div data-oid="jdw0q6r">
                <dt
                  className="font-semibold text-foreground"
                  data-oid="jrqcyu2"
                >
                  Hay materiales extra?
                </dt>
                <dd data-oid="uf8cisy">
                  Playlists, PDF interactivos, grabaciones de ejercicios y
                  seguimiento por mensajeria entre sesiones.
                </dd>
              </div>
            </dl>
            <div
              className="rounded-2xl border border-white/20 bg-white/8 p-4 text-sm text-muted-foreground"
              data-oid="pjjh3c5"
            >
              <p data-oid="qzrcnwu">
                &quot;La guitarra se vuelve un ritual cotidiano: un lugar para
                respirar y recordar que estas vivo.&quot;
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
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      data-oid="y3sglbn"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 10%, rgba(238, 49, 36, 0.22), transparent 58%), radial-gradient(circle at 82% 18%, rgba(0, 132, 201, 0.2), transparent 64%), radial-gradient(circle at 50% 120%, rgba(0, 168, 89, 0.22), transparent 70%)",
        }}
        data-oid="8o-umhm"
      />

      <div
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 rotate-6 overflow-hidden rounded-[42px] border border-white/15 shadow-[0_50px_140px_-80px_rgba(17,24,39,0.88)] lg:block"
        aria-hidden="true"
        data-oid="c2x0l2x"
      >
        <div className="grid h-48 w-48 grid-cols-7" data-oid="ideue_4">
          {WIPHLA_COLORS.map((color, index) => (
            <span
              key={`hero-stripe-${color}-${index}`}
              style={{ backgroundColor: color }}
              className="h-full w-full"
              data-oid="dg3q8lk"
            />
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
        data-oid="ysi-r81"
      />
    </div>
  );
}

function FocusBackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      data-oid="z6_2:dn"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(255, 107, 0, 0.18), transparent 58%), radial-gradient(circle at 78% 24%, rgba(0, 132, 201, 0.18), transparent 62%), radial-gradient(circle at 52% 110%, rgba(0, 168, 89, 0.22), transparent 72%)",
        }}
        data-oid="tib3ei4"
      />
    </div>
  );
}

function PracticeBackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      data-oid="m:3z:sf"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(238, 49, 36, 0.18), transparent 58%), radial-gradient(circle at 82% 18%, rgba(0, 132, 201, 0.18), transparent 64%), radial-gradient(circle at 50% 118%, rgba(0, 168, 89, 0.2), transparent 70%)",
        }}
        data-oid="_u3f50w"
      />
    </div>
  );
}

function ModalidadBackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      data-oid="dtbo:od"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 14%, rgba(255, 213, 0, 0.22), transparent 62%), radial-gradient(circle at 78% 18%, rgba(0, 132, 201, 0.2), transparent 66%), radial-gradient(circle at 46% 120%, rgba(238, 49, 36, 0.18), transparent 74%)",
        }}
        data-oid="llaezt6"
      />
    </div>
  );
}
