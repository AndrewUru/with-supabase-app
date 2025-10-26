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
    <main className="min-h-screen" data-oid="-:.i4is">
      {/* HERO */}
      <section className="relative overflow-hidden" data-oid="p.da7g1">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background"
          data-oid="7r7tip9"
        />

        <div
          className="container-app mx-auto px-4 py-16 md:py-20"
          data-oid="arpfhhr"
        >
          <p
            className="text-sm uppercase tracking-widest text-muted-foreground"
            data-oid="kdvxit:"
          >
            Meditación y gestión emocional
          </p>
          <h1
            className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight"
            data-oid="xy39h.9"
          >
            Meditación y Gestión Emocional
          </h1>
          <p
            className="mt-4 max-w-3xl text-lg text-muted-foreground"
            data-oid="jc4:fzx"
          >
            Un espacio para aprender a respirar, observar, soltar y cultivar un{" "}
            <strong data-oid="5b2.nn2">estado de equilibrio interior</strong>{" "}
            frente a los desafíos del día a día.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
            data-oid="wv:10rd"
          >
            <a
              href="#beneficios"
              className="underline-offset-4 hover:underline"
              data-oid="132j6-z"
            >
              Beneficios
            </a>
            <span aria-hidden data-oid="8kpiivq">
              •
            </span>
            <a
              href="#practicas"
              className="underline-offset-4 hover:underline"
              data-oid="t_frjbk"
            >
              Prácticas
            </a>
            <span aria-hidden data-oid="z.wy88h">
              •
            </span>
            <a
              href="#dirigido"
              className="underline-offset-4 hover:underline"
              data-oid="7rlu83d"
            >
              A quién va dirigido
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" className="border-t" data-oid="oo18cmb">
        <div
          className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-[1.2fr_1fr]"
          data-oid="lkd4pm1"
        >
          <div data-oid="6_n-g35">
            <h2 className="text-2xl md:text-3xl font-bold" data-oid="gtgwkkh">
              Cultivar la calma y la claridad
            </h2>
            <p
              className="mt-4 text-base md:text-lg text-muted-foreground"
              data-oid="9lvynq7"
            >
              La meditación no es aislarse del mundo, sino aprender a habitarlo
              con mayor conciencia. A través de la respiración, la atención
              plena y técnicas de gestión emocional, podemos transformar la
              manera en que vivimos nuestras experiencias cotidianas.
            </p>
            <p
              className="mt-4 text-base md:text-lg text-muted-foreground"
              data-oid="o4.xfy7"
            >
              Este espacio ofrece herramientas simples y profundas para observar
              las emociones, regularlas y convertirlas en aliadas de nuestro
              desarrollo humano.
            </p>
          </div>

          <figure
            className="relative overflow-hidden rounded-2xl border bg-background"
            data-oid="ud9giqm"
          >
            <Image
              src="/images/meditacion.jpg" // Reemplaza por tu imagen
              alt="Persona meditando al aire libre en calma"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
              data-oid="l84bib1"
            />

            <figcaption className="sr-only" data-oid="5yr8ln3">
              Meditación al aire libre en calma.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="border-t bg-muted/20"
        data-oid="dnfe.a3"
      >
        <div
          className="container-app mx-auto px-4 py-14 md:py-20"
          data-oid="1xh7fry"
        >
          <h2 className="text-2xl md:text-3xl font-bold" data-oid="a2029f-">
            Beneficios
          </h2>
          <ul
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-muted-foreground"
            data-oid="tth03w9"
          >
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
                data-oid="dzq_tj6"
              >
                <span
                  className="block font-medium text-foreground"
                  data-oid=".4_t5ir"
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRÁCTICAS */}
      <section id="practicas" className="border-t" data-oid="p311y0a">
        <div
          className="container-app mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-2"
          data-oid="qlqj3nc"
        >
          <div data-oid="f9biiod">
            <h2 className="text-2xl md:text-3xl font-bold" data-oid="ins-.8:">
              ¿Qué prácticas utilizamos?
            </h2>
            <ul
              className="mt-6 space-y-3 text-base text-muted-foreground"
              data-oid="-5cir6d"
            >
              {[
                "Ejercicios de respiración consciente.",
                "Atención plena (mindfulness) en movimiento y quietud.",
                "Visualizaciones guiadas para claridad y bienestar.",
                "Técnicas de liberación y regulación emocional.",
                "Meditaciones con sonido y silencio.",
              ].map((p, i) => (
                <li key={i} className="flex gap-2" data-oid="mpv1xgz">
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60"
                    data-oid="nz_xu-d"
                  />

                  <span data-oid="upcd-:-">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border p-6 bg-card/50" data-oid="rhh:7qb">
            <h3 className="font-semibold" data-oid="q_8.1co">
              🎧 Audio de ejemplo
            </h3>
            <p
              className="mt-2 text-sm text-muted-foreground"
              data-oid="w.d2ig5"
            >
              Escucha una breve meditación guiada (coloca aquí tu archivo).
            </p>
            <audio
              className="mt-4 w-full"
              controls
              preload="none"
              src="/audio/meditacion-ejemplo.mp3" // Reemplaza por tu archivo
              data-oid="obg39h7"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>
      </section>

      {/* DIRIGIDO */}
      <section
        id="dirigido"
        className="border-t bg-muted/20"
        data-oid="oky2-q3"
      >
        <div
          className="container-app mx-auto px-4 py-14 md:py-20"
          data-oid="pyu0dw8"
        >
          <h2 className="text-2xl md:text-3xl font-bold" data-oid="h8:ik9h">
            ¿A quién va dirigido?
          </h2>
          <p
            className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground"
            data-oid="_adbs7r"
          >
            A cualquier persona que desee incorporar mayor serenidad en su vida,
            aprender a gestionar sus emociones o encontrar herramientas para
            relacionarse consigo misma y con los demás desde un lugar más
            consciente y saludable.
          </p>

          <ul
            className="mt-6 space-y-2 text-sm text-muted-foreground"
            data-oid="xqd4tm0"
          >
            {[
              "Personas con altos niveles de estrés.",
              "Quienes buscan claridad en procesos de cambio.",
              "Terapeutas o profesionales del bienestar.",
              "Cualquier persona que desee iniciar o profundizar en la meditación.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2" data-oid="fyzh87b">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/60"
                  data-oid="1c95tr5"
                />

                <span data-oid="7w1sf30">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3" data-oid="nvoeqmy">
            <Link
              href="/#agenda"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              data-oid="t.:tzl3"
            >
              Ver próximas sesiones
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
              data-oid="o9q04xf"
            >
              Solicitar información / reservar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
