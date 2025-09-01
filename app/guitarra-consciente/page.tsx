// app/guitarra-consciente/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Guitarra Consciente | EDHUCO",
  description:
    "Clases de guitarra consciente: un espacio para sentir, crear e improvisar. Técnica progresiva, escucha, presencia y expresión emocional. Presencial en Valencia y online.",
};

export default function GuitarraConscientePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="container-app mx-auto px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Guitarra consciente
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Guitarra Consciente
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Un espacio para <strong>sentir, crear y expresarte</strong> a través
            de la música.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a href="#sobre" className="underline-offset-4 hover:underline">
              Sobre el enfoque
            </a>
            <span aria-hidden>•</span>
            <a
              href="#trabajamos"
              className="underline-offset-4 hover:underline"
            >
              ¿Qué trabajamos?
            </a>
            <span aria-hidden>•</span>
            <a href="#modalidad" className="underline-offset-4 hover:underline">
              Modalidad y reserva
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE EL ENFOQUE */}
      <section id="sobre" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Una forma de estar con el instrumento
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              La guitarra ha sido mi compañera desde siempre. Es el primer
              instrumento con el que conecté profundamente, el que me ha
              acompañado en cada etapa de mi camino, y una de las formas más
              genuinas que tengo para expresar lo que habita en mi interior.
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              En estas clases no enseño solo técnica, sino presencia: un
              encuentro donde el sonido, la emoción y la conciencia se
              entrelazan. Más que “clases tradicionales”, es un proceso de
              escucha, creación y descubrimiento personal.
            </p>

            <div className="mt-8">
              <Link
                href="/#contacto"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              >
                Consultar disponibilidad
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-2xl border bg-background">
            <Image
              src="/images/guitarra-consciente.jpg" // Reemplaza por tu imagen
              alt="Guitarra consciente: manos sobre la guitarra en actitud atenta y relajada"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <figcaption className="sr-only">
              Guitarra y manos en una sesión de guitarra consciente.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* QUÉ TRABAJAMOS */}
      <section id="trabajamos" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">¿Qué trabajamos?</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Acordes, ritmos y melodías",
                desc: "Desarrollo técnico y musical de forma progresiva y amable.",
              },
              {
                title: "Coordinación y enfoque",
                desc: "Escucha consciente, control motor fino y presencia en la ejecución.",
              },
              {
                title: "Expresión emocional",
                desc: "Canalizar lo que sientes a través del sonido como lenguaje propio.",
              },
              {
                title: "Improvisación y creación",
                desc: "Espacios guiados para explorar, componer y encontrar tu voz.",
              },
              {
                title: "Cuerpo e instrumento",
                desc: "Ergonomía, respiración y hábitos para tocar sin tensiones.",
              },
              {
                title: "Rutinas significativas",
                desc: "Prácticas cortas y sostenibles que integren música en tu día a día.",
              },
            ].map((c, i) => (
              <article
                key={i}
                className="rounded-2xl border p-6 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </article>
            ))}
          </div>

          {/* Filosofía del lenguaje */}
          <div className="mt-12 rounded-2xl border p-6 bg-card/50">
            <h3 className="font-semibold">Una nota sobre las palabras</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              No lo llamo “clases de guitarra” en el sentido tradicional. No me
              gusta la palabra “alumno”, porque significa “sin luz”. Prefiero
              decir <em>estudiantes</em>, porque cada persona que se acerca a
              este espacio trae su luz, su ritmo y su voz.
            </p>
          </div>
        </div>
      </section>

      {/* DESTINATARIOS Y MODALIDAD */}
      <section id="modalidad" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              ¿A quién está dirigido?
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              A cualquier persona que sienta el deseo de tocar, sin importar el
              nivel o la experiencia previa. Solo hace falta disposición,
              apertura y ganas de encontrarte con la música desde un lugar más
              auténtico.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Iniciación desde cero con acompañamiento cercano.",
                "Retomar la guitarra con motivación y claridad.",
                "Profundizar en presencia, expresión e improvisación.",
                "Integrar la música como práctica de bienestar.",
              ].map((it, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border p-6 bg-card/50">
            <h3 className="font-semibold">🎵 Modalidad</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                Clases <strong>individuales</strong> o <strong>grupales</strong>
                .
              </li>
              <li>
                📍 <strong>Presencial en Valencia</strong> — consulta también
                por <strong>clases online</strong>.
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#contacto"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              >
                Pedir información / reservar
              </Link>
              <Link
                href="/#agenda"
                className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
              >
                Ver próximas fechas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
