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
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="container-app mx-auto px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Chamanismo
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Formación en Chamanismo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Enseñanzas para un <strong>Desarrollo Humano Consciente</strong>,
            basadas en la cosmovisión andina y transmitidas desde la experiencia
            y la práctica.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a href="#formacion" className="underline-offset-4 hover:underline">
              Ver la formación
            </a>
            <span aria-hidden>•</span>
            <a href="#viaje" className="underline-offset-4 hover:underline">
              Viaje Chamánico
            </a>
            <span aria-hidden>•</span>
            <a href="#eventos" className="underline-offset-4 hover:underline">
              Eventos anteriores
            </a>
          </div>
        </div>
      </section>

      {/* FORMACIÓN */}
      <section id="formacion" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold">
              ✨ ¿Qué es esta formación?
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Un camino iniciático de transformación personal, sanación interior
              y activación del poder personal y espiritual, a través de
              prácticas ancestrales, rituales y arte simbólico. Dirigido a
              personas que desean vivir con mayor sentido, sanar su historia y
              reconectarse con el mundo espiritual y natural.
            </p>
          </div>

          {/* A quién va dirigida */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "A quienes buscan una conexión profunda con su esencia y la naturaleza.",
              "A terapeutas que quieran incorporar herramientas chamánicas.",
              "A personas en búsqueda de sanación, claridad y transformación vital.",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border p-5 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="font-semibold">👥 A quién va dirigida</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>

          {/* Estructura de la formación */}
          <div className="mt-12">
            <h3 className="text-xl md:text-2xl font-bold">
              🔍 Estructura de la Formación
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Módulo I */}
              <ModuleCard
                title="📘 Módulo I – El Camino Iniciático"
                items={[
                  "Origen prenatal y la comprensión de la biología",
                  "Activación del código genético",
                  "Resolución de conflictos con madre, padre y uno mismo",
                  "Arquetipos limitantes y arquetipos de poder",
                ]}
              />
              {/* Módulo II */}
              <ModuleCard
                title="📘 Módulo II – Verdades Internas y Sistemas de Creencias"
                items={[
                  "La existencia que habita en nosotros",
                  "Mitos, leyendas y realidades simbólicas",
                  "Identificación y transformación de creencias limitantes",
                ]}
              />
              {/* Módulo III */}
              <ModuleCard
                title="📘 Módulo III – Lenguaje del Inconsciente y Sanación Emocional"
                items={[
                  "Lenguaje simbólico y comunicación interior",
                  "Procesos de sanación y liberación emocional",
                  "Arte ritual y ceremonias",
                ]}
              />
              {/* Módulo IV */}
              <ModuleCard
                title="📘 Módulo IV – Energía, Movimiento y Sonido"
                items={[
                  "Gestión y canalización de la energía",
                  "Sonido como herramienta terapéutica",
                  "El poder de la palabra",
                ]}
              />
              {/* Módulo V */}
              <ModuleCard
                title="📘 Módulo V – El Mapa Iniciático y el Mundo Sutil"
                items={[
                  "Creación del altar y espacio sagrado",
                  "Conexión con la Madre Tierra y los mundos sutiles",
                  "Construcciones metafísicas y líneas del tiempo",
                ]}
              />
              {/* Módulo VI */}
              <ModuleCard
                title="📘 Módulo VI – Reciprocidad y Manifestación"
                items={[
                  "La ley de reciprocidad y el bien común",
                  "Amor como fuerza transformadora",
                  "Manifestación consciente de la realidad propia",
                ]}
              />
            </div>

            {/* CTA opcional */}
            <div className="mt-10">
              <Link
                href="/#contacto"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              >
                Solicitar información / reservar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VIAJE CHAMÁNICO */}
      <section id="viaje" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Viaje Chamánico
              </h2>
              <p className="mt-2 text-muted-foreground">
                Una experiencia guiada de conexión profunda con tu mundo
                interior
              </p>

              <p className="mt-6 text-base md:text-lg text-muted-foreground">
                El Viaje Chamánico es una práctica ancestral y guiada que va
                mucho más allá de una meditación. Utilizando instrumentos como
                el tambor ceremonial, maracas, flautas nativas y la voz, se
                facilita el acceso a un estado de conciencia ampliada. En ese
                estado, se abren las puertas del inconsciente y de los mundos
                sutiles, permitiendo recuperar memorias, conectar con animales
                de poder, recibir guía espiritual y resolver situaciones
                repetitivas (emocionales, físicas, espirituales o
                existenciales).
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <BulletCard
                  title="✨ ¿Para qué sirve?"
                  items={[
                    "Comprender bloqueos o patrones repetitivos",
                    "Sanar memorias antiguas",
                    "Recibir guía interior y mensajes del alma",
                    "Reforzar la conexión con los elementos y la esencia",
                  ]}
                />
                <BulletCard
                  title="👥 ¿A quién está dirigido?"
                  items={[
                    "Personas que quieran conocerse mejor",
                    "Quienes deseen transformar su historia personal",
                    "Quienes abren un nuevo ciclo con mayor conexión",
                  ]}
                />
              </div>

              <div className="mt-8">
                <Link
                  href="/#agenda"
                  className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
                >
                  Ver próximas fechas
                </Link>
              </div>
            </div>

            {/* Imagen del evento */}
            <figure className="relative overflow-hidden rounded-2xl border bg-background">
              <Image
                src="/images/viaje-chamanico.jpg" // Reemplaza por tu imagen
                alt="Viaje Chamánico con tambor ceremonial y flautas nativas"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
              <figcaption className="sr-only">
                Fotografía representativa del Viaje Chamánico.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* EVENTOS ANTERIORES */}
      <section id="eventos" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Eventos anteriores
            </h2>
            <Link
              href="/#agenda"
              className="text-sm underline underline-offset-4 hover:opacity-80"
            >
              Ver agenda completa
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titulo: "Namasté Ji Festival",
                subt: "Celebración Solsticio de Verano",
              },
              {
                titulo: "Herbes Alicia",
                subt: "Celebración equinoccio de invierno",
              },
              { titulo: "Retiro", subt: "Celebración Solsticio de Verano" },
              {
                titulo: "Herbes Alicia",
                subt: "Celebración equinoccio de invierno",
              },
            ].map((ev, i) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted" />
                <h3 className="mt-4 font-semibold tracking-tight">
                  {ev.titulo}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{ev.subt}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    Archivo
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/** ---------- UI helpers ---------- */

function ModuleCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border p-6 bg-card/50 backdrop-blur-sm">
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border p-6 bg-card/50">
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
