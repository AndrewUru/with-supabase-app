// app/meditacion-gestion-emocional/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Meditación y Gestión Emocional | EDHUCO",
  description:
    "Sesiones de meditación y gestión emocional para cultivar presencia, equilibrio y claridad. Técnicas de respiración, atención plena y recursos prácticos para el día a día.",
};

export default function MeditacionGestionEmocionalPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="container-app mx-auto px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Meditación y gestión emocional
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Meditación y Gestión Emocional
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Un espacio para aprender a respirar, observar, soltar y cultivar un{" "}
            <strong>estado de equilibrio interior</strong> frente a los desafíos
            del día a día.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a
              href="#beneficios"
              className="underline-offset-4 hover:underline"
            >
              Beneficios
            </a>
            <span aria-hidden>•</span>
            <a href="#practicas" className="underline-offset-4 hover:underline">
              Prácticas
            </a>
            <span aria-hidden>•</span>
            <a href="#dirigido" className="underline-offset-4 hover:underline">
              A quién va dirigido
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Cultivar la calma y la claridad
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              La meditación no es aislarse del mundo, sino aprender a habitarlo
              con mayor conciencia. A través de la respiración, la atención
              plena y técnicas de gestión emocional, podemos transformar la
              manera en que vivimos nuestras experiencias cotidianas.
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Este espacio ofrece herramientas simples y profundas para observar
              las emociones, regularlas y convertirlas en aliadas de nuestro
              desarrollo humano.
            </p>
          </div>

          <figure className="relative overflow-hidden rounded-2xl border bg-background">
            <Image
              src="/images/meditacion.jpg" // Reemplaza por tu imagen
              alt="Persona meditando al aire libre en calma"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <figcaption className="sr-only">
              Meditación al aire libre en calma.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">Beneficios</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-muted-foreground">
            {[
              "Reduce el estrés y la ansiedad.",
              "Favorece la concentración y la claridad mental.",
              "Mejora la gestión de emociones difíciles.",
              "Refuerza el sistema inmunológico.",
              "Aumenta la resiliencia ante los desafíos.",
              "Promueve un estado de paz y equilibrio interior.",
            ].map((b, i) => (
              <li
                key={i}
                className="rounded-2xl border p-6 bg-card/50 backdrop-blur-sm"
              >
                <span className="block font-medium text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRÁCTICAS */}
      <section id="practicas" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              ¿Qué prácticas utilizamos?
            </h2>
            <ul className="mt-6 space-y-3 text-base text-muted-foreground">
              {[
                "Ejercicios de respiración consciente.",
                "Atención plena (mindfulness) en movimiento y quietud.",
                "Visualizaciones guiadas para claridad y bienestar.",
                "Técnicas de liberación y regulación emocional.",
                "Meditaciones con sonido y silencio.",
              ].map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border p-6 bg-card/50">
            <h3 className="font-semibold">🎧 Audio de ejemplo</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Escucha una breve meditación guiada (coloca aquí tu archivo).
            </p>
            <audio
              className="mt-4 w-full"
              controls
              preload="none"
              src="/audio/meditacion-ejemplo.mp3" // Reemplaza por tu archivo
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>
      </section>

      {/* DIRIGIDO */}
      <section id="dirigido" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">
            ¿A quién va dirigido?
          </h2>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground">
            A cualquier persona que desee incorporar mayor serenidad en su vida,
            aprender a gestionar sus emociones o encontrar herramientas para
            relacionarse consigo misma y con los demás desde un lugar más
            consciente y saludable.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {[
              "Personas con altos niveles de estrés.",
              "Quienes buscan claridad en procesos de cambio.",
              "Terapeutas o profesionales del bienestar.",
              "Cualquier persona que desee iniciar o profundizar en la meditación.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3">
            <Link
              href="/#agenda"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
            >
              Ver próximas sesiones
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
            >
              Solicitar información / reservar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
