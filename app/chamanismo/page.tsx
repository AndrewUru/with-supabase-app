import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Chamanismo | EDHUCO",
  description:
    "Formación en chamanismo para un Desarrollo Humano Consciente. Viaje chamánico, rituales, arte simbólico y conexión con la naturaleza.",
};

const heroStats = [
  { value: "15+", label: "Años acompañando procesos" },
  { value: "800+", label: "Personas guiadas" },
  { value: "6", label: "Módulos vivenciales" },
];

const targetAudiences = [
  {
    icon: "🌿",
    title: "Amantes de la naturaleza",
    description:
      "Personas que desean reconectar con la Madre Tierra y con prácticas sagradas cotidianas.",
  },
  {
    icon: "🧰",
    title: "Terapeutas y facilitadores",
    description:
      "Profesionales que quieren sumar herramientas chamánicas a su acompañamiento.",
  },
  {
    icon: "🔥",
    title: "Buscadores de transformación",
    description:
      "Quienes atraviesan cambios profundos y buscan integrar sentido espiritual.",
  },
];

const modules = [
  {
    number: "01",
    title: "El camino iniciático",
    accent: "from-rose-500/20 via-rose-500/5 to-transparent",
    dotColor: "bg-rose-400/80",
    items: [
      "Origen prenatal y comprensión biológica",
      "Activación del código genético",
      "Resolución de conflictos familiares",
      "Arquetipos limitantes y de poder",
    ],
  },
  {
    number: "02",
    title: "Verdades internas y creencias",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    dotColor: "bg-amber-400/80",
    items: [
      "La existencia que habita en nosotros",
      "Mitos, leyendas y realidades simbólicas",
      "Transformación de creencias limitantes",
    ],
  },
  {
    number: "03",
    title: "Lenguaje del inconsciente",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    dotColor: "bg-emerald-400/80",
    items: [
      "Lenguaje simbólico y comunicación interior",
      "Procesos de sanación emocional",
      "Arte ritual y ceremonias",
    ],
  },
  {
    number: "04",
    title: "Energía, movimiento y sonido",
    accent: "from-teal-500/20 via-teal-500/5 to-transparent",
    dotColor: "bg-teal-400/80",
    items: [
      "Gestión y canalización energética",
      "Sonido como herramienta terapéutica",
      "El poder sanador de la palabra",
    ],
  },
  {
    number: "05",
    title: "Mapa iniciático y mundo sutil",
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
    dotColor: "bg-blue-400/80",
    items: [
      "Creación del altar y espacio sagrado",
      "Conexión con la Madre Tierra",
      "Construcciones metafísicas",
    ],
  },
  {
    number: "06",
    title: "Reciprocidad y manifestación",
    accent: "from-purple-500/20 via-purple-500/5 to-transparent",
    dotColor: "bg-purple-400/80",
    items: [
      "La ley de reciprocidad y bien común",
      "El amor como fuerza transformadora",
      "Manifestaciones conscientes",
    ],
  },
];

const journeySteps = [
  {
    step: "01",
    title: "Preparación consciente",
    description:
      "Respiración guiada, limpieza energética con sahumerio y definición de tu intención personal.",
  },
  {
    step: "02",
    title: "Inmersión sonora",
    description:
      "Viaje con tambor ceremonial, maracas, flautas nativas y cantos medicina que expanden la conciencia.",
  },
  {
    step: "03",
    title: "Integración",
    description:
      "Espacio de diálogo, escritura y sugerencias para sostener los aprendizajes en la vida cotidiana.",
  },
];

const journeyBenefits = [
  {
    icon: "🌀",
    title: "¿Para qué sirve?",
    items: [
      "Comprender bloqueos y patrones repetitivos",
      "Sanar memorias ancestrales y familiares",
      "Recibir guía interior y mensajes simbólicos",
      "Conectar con los elementos y animales de poder",
    ],
  },
  {
    icon: "✨",
    title: "¿A quién va dirigido?",
    items: [
      "Personas en procesos de autoconocimiento",
      "Quienes buscan transformación profunda",
      "Facilitadores que desean nuevas herramientas",
    ],
  },
];

const faqs = [
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "No. Iniciamos con prácticas de respiración y enraizamiento que permiten sumergirse de manera gradual. Solo necesitas apertura y respeto por el proceso.",
  },
  {
    question: "¿Cómo se estructura la formación?",
    answer:
      "Son seis módulos vivenciales combinados con encuentros de integración online. Cada módulo incluye material de estudio, rituales guiados y seguimiento personalizado.",
  },
  {
    question: "¿Qué debo llevar al viaje chamánico?",
    answer:
      "Te recomendamos ropa cómoda, libreta para anotar tus mensajes y un objeto personal que simbolice tu intención. El resto del altar lo facilitamos nosotros.",
  },
];

const events = [
  {
    title: "Namasté Ji Festival",
    subtitle: "Celebración del solsticio de verano",
    description:
      "Círculos de canto medicina, danzas y fogón ceremonial en comunidad.",
    gradient: "from-orange-400 to-rose-500",
    badge: "2023",
  },
  {
    title: "Herbes Alicia",
    subtitle: "Equinoccio de invierno en los Pirineos",
    description:
      "Rituales con plantas maestras y caminatas conscientes en la montaña.",
    gradient: "from-blue-500 to-indigo-500",
    badge: "2022",
  },
  {
    title: "Retiro Espíritu Vivo",
    subtitle: "Encuentro de medicina ancestral",
    description:
      "Tres días de ceremonias, temazcal y arte simbólico cerca del mar.",
    gradient: "from-emerald-500 to-teal-500",
    badge: "2024",
  },
  {
    title: "Ceremonia Luna Nueva",
    subtitle: "Círculo íntimo de sanación",
    description: "Honramos los ciclos con cantos, cacao ceremonial y oráculo.",
    gradient: "from-violet-500 to-purple-500",
    badge: "Mensual",
  },
];

export default function ChamanismoPage() {
  return (
    <main
      className="min-h-screen bg-background text-foreground"
      data-oid="1nzj3fq"
    >
      <section className="relative overflow-hidden border-b" data-oid="z9nba44">
        <div
          className="absolute -top-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-emerald-300/20 blur-3xl"
          aria-hidden="true"
          data-oid="egs7pzq"
        />

        <div
          className="absolute -bottom-56 -right-40 h-[34rem] w-[34rem] rounded-full bg-amber-200/25 blur-3xl"
          aria-hidden="true"
          data-oid="4si_4lt"
        />

        <div
          className="container relative mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center"
          data-oid="rfa9iu6"
        >
          <div className="space-y-10" data-oid="uruho6f">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-4 py-1.5 text-sm font-medium text-emerald-800"
              data-oid="0hql_b:"
            >
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                data-oid="a.3kzg-"
              />
              Formación ancestral viva
            </div>

            <div className="space-y-6" data-oid="8tp_6w6">
              <span
                className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground"
                data-oid="i5s2e95"
              >
                EDHUCO · Experiencias vivenciales
              </span>
              <h1
                className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl"
                data-oid="wwj_5hi"
              >
                Chamanismo
                <span
                  className="mt-2 block bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-3xl font-light text-transparent md:text-5xl"
                  data-oid="sjngws9"
                >
                  Desarrollo humano consciente
                </span>
              </h1>
              <p
                className="max-w-2xl text-lg text-muted-foreground md:text-xl"
                data-oid="3vg12x8"
              >
                Integra sabiduría ancestral en tu día a día con rituales, arte
                simbólico y una guía cercana que acompaña tu proceso de
                transformación personal y espiritual.
              </p>
            </div>

            <ul
              className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2"
              data-oid="-n6h7fj"
            >
              <li
                className="flex gap-3 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm"
                data-oid="ees4.od"
              >
                <span
                  className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                  data-oid="xk::g:7"
                />
                Cosmovisión andina aplicada a tu propósito actual.
              </li>
              <li
                className="flex gap-3 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm"
                data-oid="zko52q."
              >
                <span
                  className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                  data-oid="ic1f27i"
                />
                Mentoría personalizada en grupos reducidos.
              </li>
              <li
                className="flex gap-3 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm sm:col-span-2 lg:col-span-1"
                data-oid="nej_al1"
              >
                <span
                  className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                  data-oid="o_hq4fl"
                />
                Herramientas integrables para la vida cotidiana y tu labor
                terapéutica.
              </li>
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row" data-oid=".fe-98.">
              <Link
                href="#formacion"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                data-oid="c0.b4_r"
              >
                Conocer la formación completa
              </Link>
              <Link
                href="#viaje"
                className="inline-flex items-center justify-center rounded-full border border-foreground px-8 py-3 text-sm font-semibold transition hover:bg-foreground hover:text-background"
                data-oid="8hc0:9."
              >
                Explorar el viaje chamánico
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3" data-oid="z74iblp">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/50 bg-card/70 p-4 text-center shadow-sm"
                  data-oid="fx95318"
                >
                  <p
                    className="text-3xl font-semibold md:text-4xl"
                    data-oid=":s0l2f7"
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    data-oid="62ta33m"
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <nav
              className="flex flex-wrap gap-6 text-sm text-muted-foreground"
              data-oid="a5r3ehg"
            >
              <Link
                className="transition hover:text-foreground"
                href="#formacion"
                data-oid="jb.95mb"
              >
                Formación
              </Link>
              <Link
                className="transition hover:text-foreground"
                href="#viaje"
                data-oid="x4mi66c"
              >
                Viaje chamánico
              </Link>
              <Link
                className="transition hover:text-foreground"
                href="#eventos"
                data-oid="0.o5tjx"
              >
                Archivo de eventos
              </Link>
              <Link
                className="transition hover:text-foreground"
                href="#faq"
                data-oid="q5f-64m"
              >
                Preguntas frecuentes
              </Link>
            </nav>
          </div>

          <div className="relative" data-oid="r7a3m1m">
            <div
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card shadow-2xl"
              data-oid="d5-73y9"
            >
              <Image
                src="/images/hero-person.JPG"
                alt="Ceremonia chamánica guiada por EDHUCO"
                width={640}
                height={800}
                priority
                className="h-full w-full object-cover"
                data-oid="zqiki:8"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                data-oid="1q01_c."
              />
            </div>

            <div
              className="absolute -bottom-6 left-6 w-[260px] rounded-3xl border border-emerald-200/40 bg-background/90 p-6 shadow-xl backdrop-blur"
              data-oid=".t9dv2m"
            >
              <p
                className="text-sm uppercase tracking-[0.3em] text-emerald-500"
                data-oid="szhb0c2"
              >
                Propósito
              </p>
              <p
                className="mt-3 text-sm text-muted-foreground"
                data-oid="xjg7-8:"
              >
                Activamos memorias ancestrales para vivir con más claridad, amor
                y reciprocidad.
              </p>
            </div>

            <div
              className="absolute top-6 -right-6 rounded-3xl border border-amber-200/40 bg-background/90 p-5 text-sm shadow-xl backdrop-blur"
              data-oid="kai1dxi"
            >
              <p className="text-amber-500" data-oid="567bk.j">
                Próximo inicio
              </p>
              <p className="text-lg font-semibold" data-oid="bxjmd7v">
                Abril 2024
              </p>
              <Link
                href="/#contacto"
                className="mt-2 inline-flex text-xs font-semibold uppercase tracking-wide text-foreground/80 transition hover:text-foreground"
                data-oid="cf85fz-"
              >
                Reservar lugar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="formacion"
        className="relative border-b bg-muted/10"
        data-oid="0lh6wk4"
      >
        <div
          className="container mx-auto grid gap-16 px-4 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_360px]"
          data-oid="-bwteca"
        >
          <div className="space-y-12" data-oid="2-em6d_">
            <header className="space-y-6" data-oid=".mc2-9c">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
                data-oid="s._2so2"
              >
                <span
                  className="h-2 w-2 rounded-full bg-emerald-500"
                  data-oid="bnhrr2v"
                />
                Formación integral
              </div>
              <h2
                className="text-3xl font-bold leading-tight md:text-4xl"
                data-oid="3j19mu9"
              >
                Un camino iniciático de transformación consciente
              </h2>
              <p
                className="max-w-3xl text-lg text-muted-foreground md:text-xl"
                data-oid="-07o3v."
              >
                Combino prácticas ancestrales, rituales, arte simbólico y
                acompañamiento cercano para sanar la historia personal, activar
                el poder interior y crear una relación armoniosa con la
                naturaleza.
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-3" data-oid="oajdg2v">
              {targetAudiences.map((audience) => (
                <article
                  key={audience.title}
                  className="group rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  data-oid="wy59uk6"
                >
                  <span className="text-3xl" data-oid="vm6fwpj">
                    {audience.icon}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold" data-oid="zz5p-tf">
                    {audience.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    data-oid="s538icf"
                  >
                    {audience.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="space-y-8" data-oid="32bp_9z">
              <h3 className="text-2xl font-semibold" data-oid="l.23odb">
                Estructura de la formación
              </h3>
              <div className="grid gap-6 md:grid-cols-2" data-oid="mvk._l-">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.number}
                    {...module}
                    data-oid="-4kndz8"
                  />
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl border border-emerald-200/60 bg-gradient-to-r from-emerald-600 to-emerald-500 p-10 text-white shadow-xl"
              data-oid=".k:.gyf"
            >
              <h3 className="text-2xl font-semibold" data-oid="qiv5p2y">
                Lo que te llevas
              </h3>
              <div
                className="mt-4 grid gap-4 sm:grid-cols-3"
                data-oid="z4tlaxc"
              >
                <div data-oid="xdo0v5t">
                  <p className="text-3xl font-bold" data-oid="2d3c:iy">
                    +30
                  </p>
                  <p
                    className="mt-1 text-sm font-medium uppercase tracking-wide"
                    data-oid="478vuvz"
                  >
                    Horas prácticas
                  </p>
                </div>
                <div data-oid="o294esj">
                  <p className="text-3xl font-bold" data-oid="kv_e:t.">
                    Acompañamiento
                  </p>
                  <p
                    className="mt-1 text-sm font-medium uppercase tracking-wide"
                    data-oid="gxr3z46"
                  >
                    Mentoría personalizada
                  </p>
                </div>
                <div data-oid="ef97pbo">
                  <p className="text-3xl font-bold" data-oid="chs7_ge">
                    Biblioteca
                  </p>
                  <p
                    className="mt-1 text-sm font-medium uppercase tracking-wide"
                    data-oid="atv5kra"
                  >
                    Material digital y rituales
                  </p>
                </div>
              </div>
              <Link
                href="/#contacto"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-white/90"
                data-oid="4yktsog"
              >
                Solicitar entrevista de admisión
              </Link>
            </div>
          </div>

          <aside className="space-y-6" data-oid="s9d5z9:">
            <div
              className="rounded-3xl border border-border/50 bg-card/70 p-8 shadow-lg"
              data-oid="xpa-8-."
            >
              <h4 className="text-lg font-semibold" data-oid="udkv0:g">
                La formación incluye
              </h4>
              <ul
                className="mt-6 space-y-4 text-sm text-muted-foreground"
                data-oid="puevuw4"
              >
                <li className="flex gap-3" data-oid="yw:87a:">
                  <span
                    className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500"
                    data-oid="41leape"
                  />
                  Seis módulos presenciales + sesiones online de integración.
                </li>
                <li className="flex gap-3" data-oid="zblz_qo">
                  <span
                    className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500"
                    data-oid="xsm2-:x"
                  />
                  Material de estudio, rituales guiados y acompañamiento grupal.
                </li>
                <li className="flex gap-3" data-oid="sp-1wrf">
                  <span
                    className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500"
                    data-oid="gy5na6x"
                  />
                  Comunidad activa para compartir procesos y sostener el camino.
                </li>
              </ul>
            </div>

            <div
              className="rounded-3xl border border-border/50 bg-card/80 p-8 shadow-lg"
              data-oid="_a6mq31"
            >
              <p
                className="text-sm uppercase tracking-[0.3em] text-amber-500"
                data-oid="kwy_9da"
              >
                Sabiduría ancestral
              </p>
              <blockquote
                className="mt-4 text-lg font-medium leading-relaxed text-foreground"
                data-oid=".b2g8x4"
              >
                “El chamanismo es una forma de recordar que todo en la vida está
                vivo y merece reciprocidad.”
              </blockquote>
              <cite
                className="mt-4 block text-sm text-muted-foreground"
                data-oid="7wjnaqi"
              >
                EDHUCO · Círculo de facilitadores
              </cite>
            </div>

            <div
              className="rounded-3xl border border-border/50 bg-card/80 p-8 shadow-lg"
              data-oid="8f45nup"
            >
              <h4 className="text-lg font-semibold" data-oid="9s-r7qh">
                Próximos pasos
              </h4>
              <ol
                className="mt-4 space-y-3 text-sm text-muted-foreground"
                data-oid="hrdobto"
              >
                <li data-oid="na0yog-">
                  1. Agenda una entrevista de descubrimiento.
                </li>
                <li data-oid="s8u81ga">
                  2. Define tu intención y prepara tu altar personal.
                </li>
                <li data-oid="hvwz9y5">
                  3. Únete a la comunidad y recibe el kit de bienvenida.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="viaje"
        className="border-b bg-gradient-to-b from-background via-emerald-50/40 to-background"
        data-oid="j49whd4"
      >
        <div
          className="container mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-2 lg:items-center"
          data-oid="gn:s9sr"
        >
          <div className="space-y-10" data-oid="ehtp9n7">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
              data-oid="vit2.qq"
            >
              <span
                className="h-2 w-2 rounded-full bg-blue-500"
                data-oid="nyz0ta6"
              />
              Experiencia guiada
            </div>
            <div className="space-y-4" data-oid="gm1_i-7">
              <h2
                className="text-3xl font-bold leading-tight md:text-4xl"
                data-oid="2ie6dn9"
              >
                Viaje chamánico
              </h2>
              <p className="text-xl text-muted-foreground" data-oid="u1fx0am">
                Conecta con tu mundo interior a través del sonido ancestral, los
                elementos y la guía de tu animal de poder.
              </p>
            </div>
            <div className="grid gap-6" data-oid="lt.90gc">
              {journeySteps.map((step) => (
                <JourneyStep key={step.step} {...step} data-oid="e8t-_hl" />
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2" data-oid="v-q703y">
              {journeyBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.title}
                  {...benefit}
                  data-oid="r.v1xoa"
                />
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row" data-oid="iqf.rt3">
              <Link
                href="/#agenda"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                data-oid=":e8-yoe"
              >
                Ver próximas fechas
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center rounded-full border border-foreground px-8 py-3 text-sm font-semibold transition hover:bg-foreground hover:text-background"
                data-oid="kq4qt3j"
              >
                Solicitar más información
              </Link>
            </div>
          </div>

          <div className="relative" data-oid=".t:khy:">
            <div
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card shadow-2xl"
              data-oid="4nb4682"
            >
              <Image
                src="/images/viaje-chamanico.jpg"
                alt="Participantes durante un viaje chamánico guiado"
                width={620}
                height={780}
                className="h-full w-full object-cover"
                data-oid="pe8qn11"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                data-oid="9x3f6sp"
              />
            </div>
            <div
              className="absolute -bottom-6 right-8 w-[220px] rounded-3xl border border-blue-200/40 bg-background/90 p-6 text-sm shadow-xl backdrop-blur"
              data-oid="otvsiqo"
            >
              <p className="text-blue-500" data-oid="xcd:_j8">
                Duración
              </p>
              <p
                className="text-lg font-semibold text-foreground"
                data-oid="g29lp_."
              >
                90 minutos
              </p>
              <p className="mt-2 text-muted-foreground" data-oid="_i15lfc">
                Incluye círculo de integración y material de seguimiento.
              </p>
            </div>
            <div
              className="absolute top-8 -left-6 w-[180px] rounded-3xl border border-emerald-200/40 bg-background/90 p-5 text-sm shadow-xl backdrop-blur"
              data-oid="q:wib75"
            >
              <p className="text-emerald-500" data-oid="li0_sdt">
                Elementos guía
              </p>
              <p className="mt-2 text-muted-foreground" data-oid="ikt48wb">
                Tambor · Cacao · Sahumo · Cantos medicina
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="eventos" className="border-b" data-oid="te5g31f">
        <div
          className="container mx-auto px-4 py-20 md:py-28"
          data-oid="4al3c4y"
        >
          <div
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            data-oid="n.chy6l"
          >
            <div data-oid="7v6cbsq">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700"
                data-oid="1iwtdz8"
              >
                <span
                  className="h-2 w-2 rounded-full bg-violet-500"
                  data-oid="3i7p1pw"
                />
                Archivo vivo
              </div>
              <h2
                className="mt-4 text-3xl font-bold md:text-4xl"
                data-oid="nybc-we"
              >
                Eventos anteriores
              </h2>
              <p
                className="mt-2 max-w-xl text-sm text-muted-foreground"
                data-oid="atfigz8"
              >
                Recorridos que nos recuerdan la fuerza de la comunidad y la
                medicina compartida.
              </p>
            </div>
            <Link
              href="/#agenda"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
              data-oid="7nb:c9f"
            >
              Ver agenda completa
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                data-oid="e6.qg__"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-oid="k63j:d4"
                />
              </svg>
            </Link>
          </div>

          <div
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            data-oid="pztz48f"
          >
            {events.map((event) => (
              <EventCard key={event.title} {...event} data-oid="1l-_6n:" />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-b bg-muted/10" data-oid="0-gyv:k">
        <div
          className="container mx-auto px-4 py-20 md:py-28"
          data-oid="w-z-hv8"
        >
          <div className="mx-auto max-w-3xl text-center" data-oid="r3nrfft">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700"
              data-oid="qb5.7r8"
            >
              <span
                className="h-2 w-2 rounded-full bg-amber-500"
                data-oid="5-6aejp"
              />
              Preguntas frecuentes
            </div>
            <h2
              className="mt-4 text-3xl font-bold md:text-4xl"
              data-oid="qbm_ykn"
            >
              Resolvemos tus dudas antes de comenzar
            </h2>
            <p className="mt-3 text-muted-foreground" data-oid=":zdkqhq">
              Si necesitas más información, agenda una llamada y diseñamos
              juntas/os el recorrido perfecto para ti.
            </p>
          </div>

          <div
            className="mx-auto mt-12 grid max-w-3xl gap-4"
            data-oid="l2.4j6c"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} data-oid="dgrn73h" />
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500"
        data-oid="-mmdv2i"
      >
        <div
          className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-white md:flex-row md:justify-between md:text-left"
          data-oid="vzj578f"
        >
          <div className="space-y-2" data-oid="j3k.62y">
            <h2
              className="text-2xl font-semibold md:text-3xl"
              data-oid="3gpogo-"
            >
              ¿Listo para iniciar tu camino chamánico?
            </h2>
            <p
              className="max-w-xl text-sm text-white/80 md:text-base"
              data-oid="x.:ugq9"
            >
              Agenda una conversación sin costo y descubre cómo podemos
              acompañarte según tu momento vital y tu propósito.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row" data-oid="yaui7td">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:bg-white/90"
              data-oid=":j1kb8o"
            >
              Coordinar entrevista
            </Link>
            <Link
              href="/#agenda"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              data-oid="z8v6ymr"
            >
              Ver calendario completo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/** ---------- UI Components ---------- */

type ModuleCardProps = (typeof modules)[number];

type BenefitCardProps = (typeof journeyBenefits)[number];

type JourneyStepProps = (typeof journeySteps)[number];

type FaqItemProps = (typeof faqs)[number];

type EventCardProps = (typeof events)[number];

function ModuleCard({
  number,
  title,
  accent,
  dotColor,
  items,
}: ModuleCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-oid="bwyy-7w"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-70`}
        aria-hidden="true"
        data-oid="ue_8a:h"
      />

      <div className="relative flex flex-col gap-6" data-oid="e.1.xg8">
        <div className="flex items-center gap-4" data-oid="kj.naq8">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-lg font-semibold"
            data-oid="yee07yb"
          >
            {number}
          </span>
          <h4
            className="text-xl font-semibold leading-tight"
            data-oid="g3:4xcv"
          >
            {title}
          </h4>
        </div>
        <ul
          className="space-y-3 text-sm text-muted-foreground"
          data-oid="vaj_qvt"
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 leading-relaxed"
              data-oid="71y3cof"
            >
              <span
                className={`mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
                data-oid="h7tqy8l"
              />

              <span data-oid="nlsh97r">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function BenefitCard({ icon, title, items }: BenefitCardProps) {
  return (
    <article
      className="rounded-2xl border border-border/40 bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      data-oid="21h5_le"
    >
      <div className="flex items-center gap-3 text-xl" data-oid="qa:s19u">
        <span className="text-3xl" data-oid="b6f0fnc">
          {icon}
        </span>
        <h4 className="text-lg font-semibold" data-oid="u80:-aj">
          {title}
        </h4>
      </div>
      <ul
        className="mt-4 space-y-2 text-sm text-muted-foreground"
        data-oid="y7i-vy7"
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-relaxed"
            data-oid="0.0hxxd"
          >
            <span
              className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
              data-oid="apbkq0w"
            />

            <span data-oid="vlny4b7">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function JourneyStep({ step, title, description }: JourneyStepProps) {
  return (
    <article
      className="relative rounded-2xl border border-border/40 bg-card/70 p-6 shadow-sm"
      data-oid="l2epom0"
    >
      <span
        className="absolute -top-3 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white shadow-lg"
        data-oid=".8grnu4"
      >
        {step}
      </span>
      <div className="mt-6" data-oid="741:jey">
        <h3 className="text-lg font-semibold" data-oid="43ezup6">
          {title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
          data-oid="bhnxy1n"
        >
          {description}
        </p>
      </div>
    </article>
  );
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details
      className="group rounded-2xl border border-border/40 bg-card/60 p-6 shadow-sm transition"
      data-oid="3hx8xk1"
    >
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold"
        data-oid="n117r49"
      >
        <span data-oid="r8q0ocz">{question}</span>
        <svg
          className="h-4 w-4 shrink-0 transition group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          data-oid="iuq2_rs"
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-oid="6ggjmm2"
          />
        </svg>
      </summary>
      <p
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
        data-oid="92rpeac"
      >
        {answer}
      </p>
    </details>
  );
}

function EventCard({
  title,
  subtitle,
  description,
  gradient,
  badge,
}: EventCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/70 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      data-oid="4uolm5o"
    >
      <div
        className={`h-40 bg-gradient-to-br ${gradient}`}
        data-oid="si1w9ly"
      />

      <div className="p-6" data-oid="vv5_yb1">
        <span
          className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          data-oid="34x3o5f"
        >
          {badge}
        </span>
        <h3 className="mt-4 text-lg font-semibold" data-oid="zkjvw-f">
          {title}
        </h3>
        <p
          className="mt-1 text-sm font-medium text-muted-foreground"
          data-oid="jmav38f"
        >
          {subtitle}
        </p>
        <p
          className="mt-4 text-sm leading-relaxed text-muted-foreground"
          data-oid="ze1_qh_"
        >
          {description}
        </p>
        <div
          className="mt-6 inline-flex items-center text-sm font-semibold text-foreground/80 transition group-hover:text-foreground"
          data-oid="0zdkez6"
        >
          Ver galería
          <svg
            className="ml-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            data-oid="31jjq60"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-oid="vxqwp7_"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
