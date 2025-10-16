import Link from "next/link";

const BULLETS = [
  "Modulos vivenciales que combinan voz, movimiento y respiracion consciente.",
  "Adaptable a equipos, aulas y comunidades que necesitan cohesion y energia.",
  "Impacto inmediato en bienestar, gestion emocional y confianza colectiva.",
];

const STATS = [
  { label: "Duracion sugerida", value: "90-120 min" },
  { label: "Grupos", value: "12-60 personas" },
  { label: "Modalidad", value: "Presencial o hibrida" },
];

const FAQS = [
  {
    question: "Para quien es SOMRIU?",
    answer:
      "Organizaciones, asociaciones y centros educativos que buscan experiencias sencillas para sumar alegria y calma a su rutina.",
  },
  {
    question: "Como se personaliza?",
    answer:
      "Ajustamos repertorio, ritmo e intensidad segun edades, objetivos y contexto de cada grupo.",
  },
  {
    question: "Siguiente paso?",
    answer:
      "Escribenos y coordinamos fechas, modalidad y una propuesta acorde a tus necesidades.",
  },
];

export default function SomriuSection() {
  return (
    <section id="somriu" aria-labelledby="somriu-title" className="py-16">
      <div className="container-app space-y-8">
        <header className="space-y-3 text-center">
          <span className="text-sm text-muted-foreground">Programa SOMRIU</span>
          <h2 id="somriu-title" className="mx-auto max-w-2xl text-3xl text-foreground sm:text-4xl">
            Sonido, movimiento y risa para la unidad
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            SOMRIU propone un encuentro simple: respiracion, voz y cuerpo para sumar bienestar y
            cohesion a cada grupo.
          </p>
        </header>

        <ul className="mx-auto max-w-3xl space-y-2 text-sm text-muted-foreground">
          {BULLETS.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="space-y-1 text-center">
              <p className="text-muted-foreground">{stat.label}</p>
              <p className="text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Link href="/somriu" className="text-sm text-primary">
            Conocer SOMRIU
          </Link>
          <Link href="/contacto?tipo=somriu" className="text-sm text-primary">
            Solicitar propuesta
          </Link>
        </div>

        <section className="space-y-4" aria-label="Preguntas frecuentes SOMRIU">
          <header className="space-y-1 text-center">
            <h3 className="text-lg text-foreground">Preguntas frecuentes</h3>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Resolvemos dudas antes de programar tu sesion.
            </p>
          </header>
          <div className="grid gap-3 md:grid-cols-3">
            {FAQS.map((faq) => (
              <article key={faq.question} className="space-y-1 text-sm text-muted-foreground">
                <h4 className="text-foreground">{faq.question}</h4>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
