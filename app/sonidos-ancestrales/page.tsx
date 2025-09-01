// app/sonidos-ancestrales/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sonidos Ancestrales | EDHUCO",
  description:
    "Sesiones y conciertos de Sonidos Ancestrales basados en la ley de resonancia. Armonización y equilibrio físico, emocional y mental con cuencos, gongs, flautas nativas, tambores y voz.",
};

export default function SonidosAncestralesPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="container-app mx-auto px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Sonidos Ancestrales
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Sonidos Ancestrales
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Las sesiones o conciertos de Sonidos Ancestrales se fundamentan en
            la ley de resonancia: a través de diferentes frecuencias podemos
            armonizar y equilibrar el cuerpo físico, así como estados
            emocionales y mentales.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a href="#principio" className="underline-offset-4 hover:underline">
              Principio de resonancia
            </a>
            <span aria-hidden>•</span>
            <a
              href="#instrumentos"
              className="underline-offset-4 hover:underline"
            >
              Instrumentos
            </a>
            <span aria-hidden>•</span>
            <a
              href="#beneficios"
              className="underline-offset-4 hover:underline"
            >
              Beneficios
            </a>
            <span aria-hidden>•</span>
            <a href="#practica" className="underline-offset-4 hover:underline">
              Práctica y meditación
            </a>
          </div>
        </div>
      </section>

      {/* PRINCIPIO DE RESONANCIA */}
      <section id="principio" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Ley de resonancia
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Los sonidos actúan por vibración y resonancia, modulando nuestros
              sistemas físico, mental y emocional. Al interactuar con
              frecuencias armónicas, el organismo tiende a retornar a su
              vibración natural: orden, coherencia y equilibrio.
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              En la vida cotidiana nos desarmonizamos por estrés, impactos
              emocionales o interpretaciones distorsionadas del entorno. Ese
              desequilibrio puede derivar en malestar y enfermedad. El sonido
              facilita un reordenamiento profundo y amable.
            </p>

            <div className="mt-8">
              <Link
                href="/#agenda"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              >
                Ver próximas sesiones
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-2xl border bg-background">
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

      {/* INSTRUMENTOS */}
      <section id="instrumentos" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">
            Instrumentos terapéuticos
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Utilizamos instrumentos diseñados para trabajar de manera
            terapéutica: al interactuar con sus vibraciones modifican las
            vibraciones de nuestros cuerpos físico, mental y emocional,
            conduciéndolos a su estado natural.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Cuencos Tibetanos",
                desc: "Timbres ricos en armónicos que favorecen la relajación profunda.",
              },
              {
                name: "Gongs",
                desc: "Ondas amplias para desbloquear y reorganizar patrones vibratorios.",
              },
              {
                name: "Cuencos de Cristal de Cuarzo",
                desc: "Pureza tonal que invita a la coherencia y claridad mental.",
              },
              {
                name: "Flautas Nativas Indígenas",
                desc: "Melodías que conectan con lo ancestral y lo natural.",
              },
              {
                name: "Tambores Ceremoniales",
                desc: "Pulso rítmico que ordena, enraíza y expande la conciencia.",
              },
              {
                name: "Voz",
                desc: "Frecuencia viva que acompasa y guía procesos internos.",
              },
            ].map((i, idx) => (
              <article
                key={idx}
                className="rounded-2xl border p-5 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="font-semibold">{i.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Beneficios y efectos
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Al armonizarnos a través del sonido entramos en un estado de paz,
              equilibrio y coherencia. El cuerpo puede segregar serotonina,
              dopamina y endorfinas, promoviendo regeneración celular, reducción
              del estrés y la ansiedad, fortalecimiento del sistema
              inmunológico, y una apertura de conciencia que mejora la gestión
              de lo emocional.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Reduce significativamente el estrés y la ansiedad.",
                "Favorece la relajación profunda y el descanso reparador.",
                "Apoya procesos de sanación emocional y claridad mental.",
                "Fortalece el sistema inmunológico y la vitalidad.",
                "Facilita la introspección y la conexión con la propia esencia.",
              ].map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/#contacto"
                className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
              >
                Solicitar información / reservar
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border p-6 bg-card/50">
            <h3 className="font-semibold">Escucha una muestra</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fragmento breve de cuencos y voz (coloca aquí tu pista de audio).
            </p>
            {/* Sustituye el src por tu archivo en /public/audio/... */}
            <audio
              className="mt-4 w-full"
              controls
              preload="none"
              src="/audio/muestra-sonidos-ancestrales.mp3"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>
      </section>

      {/* PRÁCTICA Y MEDITACIÓN */}
      <section id="practica" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Práctica meditativa y equilibrio integral
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Las sesiones de sonido crean un espacio ideal para la práctica
                meditativa, así como para el equilibrio de cuerpo, mente y alma.
                La vibración nos invita a habitar el presente, soltar tensión,
                ordenar el campo emocional y reorientar la energía vital.
              </p>

              <div className="mt-8 flex gap-3">
                <Link
                  href="/#agenda"
                  className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
                >
                  Próximas fechas
                </Link>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
                >
                  Consultar una sesión privada
                </Link>
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-2xl border bg-background">
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
