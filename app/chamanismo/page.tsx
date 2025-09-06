// app/chamanismo/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Chamanismo | EDHUCO",
  description:
    "Formación en chamanismo para un Desarrollo Humano Consciente. Viaje Chamánico, rituales, arte simbólico y conexión con la naturaleza.",
};

export default function ChamanismoPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-amber-50/50 via-background to-emerald-50/30" />
        <div className="absolute inset-0 -z-10 opacity-5">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
            <span className="mr-2">🌟</span>
            Formación Ancestral
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            Chamanismo
            <span className="block text-3xl md:text-5xl lg:text-6xl font-light text-muted-foreground">
              Desarrollo Humano Consciente
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Enseñanzas ancestrales basadas en la cosmovisión andina,
            transmitidas desde la experiencia y la práctica para la
            transformación personal y espiritual.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#formacion"
              className="inline-flex items-center justify-center rounded-lg bg-foreground px-8 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg"
            >
              Conocer la formación
            </Link>
            <Link
              href="#viaje"
              className="inline-flex items-center justify-center rounded-lg border-2 border-foreground px-8 py-3 font-semibold transition-all hover:bg-foreground hover:text-background"
            >
              Viaje Chamánico
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-12 flex flex-wrap items-center gap-6 text-sm">
            <a
              href="#formacion"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-current group-hover:scale-150 transition-transform" />
              Ver la formación
            </a>
            <a
              href="#viaje"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-current group-hover:scale-150 transition-transform" />
              Viaje Chamánico
            </a>
            <a
              href="#eventos"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-current group-hover:scale-150 transition-transform" />
              Eventos anteriores
            </a>
          </nav>
        </div>
      </section>

      {/* FORMACIÓN */}
      <section id="formacion" className="relative border-t">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
            {/* Content */}
            <div>
              {/* Section Header */}
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200 mb-6">
                  <span className="mr-2">✨</span>
                  Formación Integral
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Un camino iniciático de transformación
                </h2>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Prácticas ancestrales, rituales y arte simbólico para la
                  sanación interior y activación del poder personal y
                  espiritual. Dirigido a personas que desean vivir con mayor
                  sentido y reconectarse con su esencia.
                </p>
              </div>

              {/* Target Audience Cards */}
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: "🌿",
                    title: "Conexión Natural",
                    description:
                      "Para quienes buscan una conexión profunda con su esencia y la naturaleza.",
                  },
                  {
                    icon: "🎭",
                    title: "Terapeutas",
                    description:
                      "Para profesionales que desean incorporar herramientas chamánicas.",
                  },
                  {
                    icon: "🦋",
                    title: "Transformación",
                    description:
                      "Para personas en búsqueda de sanación, claridad y cambio vital.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card to-card/50 p-6 transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <div className="mb-4 text-3xl">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Modules Section */}
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl font-bold mb-8">
                  Estructura de la Formación
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      number: "I",
                      title: "El Camino Iniciático",
                      color: "from-red-100 to-red-50 border-red-200",
                      textColor: "text-red-800",
                      items: [
                        "Origen prenatal y comprensión biológica",
                        "Activación del código genético",
                        "Resolución de conflictos familiares",
                        "Arquetipos limitantes y de poder",
                      ],
                    },
                    {
                      number: "II",
                      title: "Verdades Internas y Sistemas de Creencias",
                      color: "from-orange-100 to-orange-50 border-orange-200",
                      textColor: "text-orange-800",
                      items: [
                        "La existencia que habita en nosotros",
                        "Mitos, leyendas y realidades simbólicas",
                        "Transformación de creencias limitantes",
                      ],
                    },
                    {
                      number: "III",
                      title: "Lenguaje del Inconsciente y Sanación",
                      color: "from-amber-100 to-amber-50 border-amber-200",
                      textColor: "text-amber-800",
                      items: [
                        "Lenguaje simbólico y comunicación interior",
                        "Procesos de sanación emocional",
                        "Arte ritual y ceremonias",
                      ],
                    },
                    {
                      number: "IV",
                      title: "Energía, Movimiento y Sonido",
                      color:
                        "from-emerald-100 to-emerald-50 border-emerald-200",
                      textColor: "text-emerald-800",
                      items: [
                        "Gestión y canalización energética",
                        "Sonido como herramienta terapéutica",
                        "El poder de la palabra",
                      ],
                    },
                    {
                      number: "V",
                      title: "El Mapa Iniciático y el Mundo Sutil",
                      color: "from-blue-100 to-blue-50 border-blue-200",
                      textColor: "text-blue-800",
                      items: [
                        "Creación del altar y espacio sagrado",
                        "Conexión con la Madre Tierra",
                        "Construcciones metafísicas",
                      ],
                    },
                    {
                      number: "VI",
                      title: "Reciprocidad y Manifestación",
                      color: "from-purple-100 to-purple-50 border-purple-200",
                      textColor: "text-purple-800",
                      items: [
                        "La ley de reciprocidad y bien común",
                        "Amor como fuerza transformadora",
                        "Manifestación consciente",
                      ],
                    },
                  ].map((module, i) => (
                    <ModuleCard key={i} {...module} />
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <Link
                    href="/#contacto"
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <span className="mr-2">📞</span>
                    Solicitar información
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Stats Card */}
              <div className="rounded-2xl border bg-gradient-to-br from-card to-card/50 p-8">
                <h4 className="font-semibold text-lg mb-6">
                  La formación incluye
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      📚
                    </div>
                    <div>
                      <p className="font-medium">6 Módulos</p>
                      <p className="text-sm text-muted-foreground">
                        Contenido estructurado
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      🎭
                    </div>
                    <div>
                      <p className="font-medium">Prácticas Vivenciales</p>
                      <p className="text-sm text-muted-foreground">
                        Rituales y ceremonias
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      🌟
                    </div>
                    <div>
                      <p className="font-medium">Acompañamiento</p>
                      <p className="text-sm text-muted-foreground">
                        Proceso personalizado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="rounded-2xl border bg-gradient-to-br from-amber-50 to-amber-100/50 p-8">
                <blockquote className="text-lg font-medium text-amber-900 leading-relaxed">
                  &ldquo;El chamanismo no es una religión, es una forma de vivir
                  en conexión con todas las formas de vida.&rdquo;
                </blockquote>
                <cite className="mt-4 block text-sm text-amber-700">
                  — Sabiduría Ancestral
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIAJE CHAMÁNICO */}
      <section
        id="viaje"
        className="border-t bg-gradient-to-b from-muted/20 to-background"
      >
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 ring-1 ring-blue-200 mb-6">
                <span className="mr-2">🥁</span>
                Experiencia Guiada
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Viaje Chamánico
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Conexión profunda con tu mundo interior a través del sonido
                ancestral
              </p>

              <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  El Viaje Chamánico es una práctica ancestral que va más allá
                  de una meditación. Utilizando instrumentos como el tambor
                  ceremonial, maracas, flautas nativas y la voz, facilitamos el
                  acceso a un estado de conciencia ampliada.
                </p>
                <p>
                  En este estado se abren las puertas del inconsciente y de los
                  mundos sutiles, permitiendo recuperar memorias, conectar con
                  animales de poder, recibir guía espiritual y resolver
                  situaciones repetitivas.
                </p>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <BenefitCard
                  icon="✨"
                  title="¿Para qué sirve?"
                  items={[
                    "Comprender bloqueos y patrones",
                    "Sanar memorias ancestrales",
                    "Recibir guía interior",
                    "Conectar con los elementos",
                  ]}
                />
                <BenefitCard
                  icon="👥"
                  title="¿A quién va dirigido?"
                  items={[
                    "Personas en autoconocimiento",
                    "Quienes buscan transformación",
                    "Personas iniciando nuevo ciclo",
                  ]}
                />
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#agenda"
                  className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:scale-105"
                >
                  Ver próximas fechas
                </Link>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center justify-center rounded-lg border px-6 py-3 font-medium transition-all hover:bg-muted/50"
                >
                  Más información
                </Link>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border shadow-2xl">
                <Image
                  src="/images/viaje-chamanico.jpg"
                  alt="Viaje Chamánico con tambor ceremonial y flautas nativas"
                  width={600}
                  height={800}
                  className="aspect-[3/4] w-full object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-4 -right-4 rounded-2xl border bg-background p-4 shadow-lg">
                <p className="text-2xl">🥁</p>
              </div>
              <div className="absolute -top-4 -left-4 rounded-2xl border bg-background p-4 shadow-lg">
                <p className="text-2xl">🪶</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTOS ANTERIORES */}
      <section id="eventos" className="border-t">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-800 ring-1 ring-violet-200 mb-4">
                <span className="mr-2">📸</span>
                Archivo
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Eventos anteriores
              </h2>
            </div>
            <Link
              href="/#agenda"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors"
            >
              Ver agenda completa
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titulo: "Namasté Ji Festival",
                subt: "Celebración Solsticio de Verano",
                color: "from-orange-400 to-red-500",
              },
              {
                titulo: "Herbes Alicia",
                subt: "Celebración equinoccio de invierno",
                color: "from-blue-400 to-purple-500",
              },
              {
                titulo: "Retiro Espiritual",
                subt: "Celebración Solsticio de Verano",
                color: "from-emerald-400 to-teal-500",
              },
              {
                titulo: "Ceremonia Luna Nueva",
                subt: "Ritual de sanación ancestral",
                color: "from-violet-400 to-purple-500",
              },
            ].map((ev, i) => (
              <EventCard key={i} {...ev} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/** ---------- UI Components ---------- */

function ModuleCard({
  number,
  title,
  color,
  textColor,
  items,
}: {
  number: string;
  title: string;
  color: string;
  textColor: string;
  items: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-50`}
      />
      <div className="relative bg-background/90 p-8">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${color} font-bold ${textColor}`}
          >
            {number}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-4">{title}</h4>
            <ul className="space-y-3">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 text-2xl">{icon}</div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventCard({
  titulo,
  subt,
  color,
}: {
  titulo: string;
  subt: string;
  color: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:scale-105 hover:shadow-xl">
      <div className={`aspect-[16/10] w-full bg-gradient-to-br ${color}`} />
      <div className="p-6">
        <h3 className="font-bold text-lg tracking-tight mb-2">{titulo}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {subt}
        </p>
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="mr-2">📁</span>
          Archivo
        </div>
      </div>
    </article>
  );
}
