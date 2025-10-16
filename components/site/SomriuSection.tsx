import Link from "next/link";

const WIPHLA_GRADIENT =
  "linear-gradient(90deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

const BULLETS = [
  "Modulos experienciales con voz, movimiento y respiracion consciente.",
  "Formatos adaptables para equipos, centros educativos y espacios comunitarios.",
  "Beneficios: cohesion, gestion emocional y claridad colectiva.",
];

const STATS = [
  { label: "Duracion", value: "90-120 min" },
  { label: "Participantes", value: "12-60 personas" },
  { label: "Modalidad", value: "Presencial o hibrida" },
];

const FAQS = [
  {
    question: "Para quien es?",
    answer:
      "Equipos, asociaciones y centros que buscan integrar bienestar, creatividad y cohesion en su dia a dia.",
  },
  {
    question: "Se adapta a cada grupo?",
    answer:
      "Si. Ajustamos repertorio, intensidad y dinamicas segun edades, objetivos y contexto.",
  },
  {
    question: "Como lo reservo?",
    answer:
      "Escr?benos para coordinar fechas, modalidad y una propuesta a medida.",
  },
];

export default function SomriuSection() {
  return (
    <section
      id="somriu"
      aria-labelledby="somriu-title"
      className="section relative isolate overflow-hidden"
    >
      <FlagBackdrop />

      <div className="container-app relative z-10 space-y-12">
        <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <span
                className="h-2 w-10 rounded-full"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Programa SOMRIU
            </span>

            <div className="space-y-4">
              <h2
                id="somriu-title"
                className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[46px]"
              >
                Sonido, movimiento y risa para la unidad
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                SOMRIU te acompa?a a crear espacios de bienestar emocional y cohesi?n grupal. Un encuentro minimalista: respiraci?n, voz y cuerpo enlazados con presencia.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              {BULLETS.map((bullet) => (
                <div key={bullet} className="flex gap-3">
                  <span
                    className="mt-1 h-2 w-10 rounded-full"
                    style={{ backgroundImage: WIPHLA_GRADIENT }}
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/somriu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/35 hover:text-foreground"
              >
                Conocer SOMRIU
              </Link>
              <Link
                href="/contacto?tipo=somriu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/35 hover:text-foreground"
              >
                Solicitar propuesta
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-white/20 bg-card/70 p-6 text-sm text-muted-foreground shadow-[0_36px_110px_-72px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/55">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80">
              Datos clave
            </p>
            <ul className="space-y-2">
              {STATS.map((stat) => (
                <li key={stat.label} className="flex justify-between text-foreground/90">
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              &ldquo;SOMRIU es un ritual simple: escuchar, movernos y recordar que la alegría es contagiosa.&rdquo; 
            </p>
          </div>
        </header>

        <section className="space-y-6" aria-label="Preguntas frecuentes SOMRIU">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">
              <span
                className="h-2 w-10 rounded-full"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Preguntas frecuentes
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Resolver dudas en minutos
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {FAQS.map((faq) => (
              <article
                key={faq.question}
                className="space-y-2 rounded-2xl border border-white/15 bg-card/70 p-5 text-left text-sm text-muted-foreground shadow-[0_24px_70px_-64px_rgba(17,24,39,0.78)] backdrop-blur-sm dark:bg-card/55"
              >
                <h4 className="font-semibold text-foreground">{faq.question}</h4>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function FlagBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-background">
      <div className="hidden h-full max-h-[520px] w-full max-w-[720px] overflow-hidden rounded-[48px] border border-white/20 shadow-[0_50px_160px_-80px_rgba(17,24,39,0.85)] md:flex">
        <div className="grid h-full w-full grid-cols-7">
          <span className="h-full w-full" style={{ backgroundColor: "#EE3124" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FF6B00" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FFD500" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FFFFFF" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#00A859" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#0084C9" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#6D3B96" }} aria-hidden="true" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" aria-hidden="true" />
    </div>
  );
}


