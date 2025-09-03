import { CheckCircle2 } from "lucide-react";

export default function TestimoniosSection() {
  const testimonios = [
    {
      name: "Caterina C.L.",
      text: "Un camino de sanación, humildad y empoderamiento. Resultados desde el primer momento.",
    },
    {
      name: "Alicia P.",
      text: "La música me atravesó. Salí más ligera y presente.",
    },
  ] as const;

  return (
    <section id="testimonios" className="section bg-muted/30">
      <div className="container-app text-center">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-12">
          Lo que dicen{" "}
          <span className="text-gradient">
            quienes ya vivieron la experiencia
          </span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonios.map((t) => (
            <div key={t.name} className="surface p-6 text-left">
              <CheckCircle2 className="mb-3 h-6 w-6 text-accent" aria-hidden />
              <p className="italic text-muted-foreground">“{t.text}”</p>
              <p className="mt-4 font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
