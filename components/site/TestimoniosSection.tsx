"use client";

const TESTIMONIOS = [
  {
    name: "Caterina C.",
    text: "Un camino de sanacion, humildad y empoderamiento. Sentis cambios desde el primer momento.",
    location: "Barcelona, Espana",
  },
  {
    name: "Alicia P.",
    text: "La musica me atraveso. Sali mas ligera y presente. Una experiencia que cambia la perspectiva.",
    location: "Madrid, Espana",
  },
  {
    name: "Carlos M.",
    text: "Nunca pense que el sonido tuviera un efecto tan profundo. Altamente recomendado.",
    location: "Sevilla, Espana",
  },
];

export default function TestimoniosSection() {
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="py-16">
      <div className="container-app space-y-8">
        <header className="space-y-3 text-center">
          <span className="text-sm text-muted-foreground">Lo que dicen quienes nos visitan</span>
          <h2 id="testimonios-title" className="text-3xl text-foreground sm:text-4xl">
            Voces que confian en EDHUCO
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Testimonios sencillos que resumen la experiencia de quienes participan en nuestras sesiones y
            programas.
          </p>
        </header>

        <div className="space-y-6">
          {TESTIMONIOS.map((testimonio) => (
            <article key={testimonio.name} className="space-y-2 text-sm text-muted-foreground">
              <p className="text-foreground">{testimonio.text}</p>
              <p>
                <span className="text-foreground">{testimonio.name}</span> — {testimonio.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
