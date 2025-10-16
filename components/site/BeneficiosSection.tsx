"use client";

const BENEFITS = [
  {
    title: "Formacion anual en Chamanismo Andino",
    note: "Plazas abiertas",
    description:
      "Edicion 2025 con encuentros mensuales, practicas guiadas y comunidad cercana. 99 euros al mes (10 cuotas) o 880 euros al contado. Becas solidarias disponibles hasta el 30 por ciento.",
  },
  {
    title: "Modulos y talleres sueltos",
    note: "Formato flexible",
    description:
      "Elige modulos tematicos o talleres practicos desde 120 a 180 euros por encuentro. Descuentos para alumnado y personas suscritas a EDHUCO.",
  },
  {
    title: "Sesiones de apoyo y retiros",
    note: "Acompanamiento continuo",
    description:
      "Sesiones individuales o grupales para integrar el proceso, retiros opcionales y suscripcion EDHUCO con recursos mensuales por 22 euros.",
  },
];

const INCLUDES = [
  "Encuentros mensuales o modulos puntuales con seguimiento sencillo.",
  "Materiales digitales y espacio comunitario para sostener la practica.",
  "Acompanamiento etico por profesionales de la red.",
];

export default function BeneficiosSection() {
  return (
    <section id="servicios" aria-labelledby="beneficios-title" className="py-16">
      <div className="container-app space-y-10">
        <header className="space-y-3 text-center">
          <span className="text-sm text-muted-foreground">Formacion EDHUCO</span>
          <h2 id="beneficios-title" className="mx-auto max-w-3xl text-3xl text-foreground sm:text-4xl">
            Formacion y acompanamiento para 2025
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Disenamos experiencias simples para integrar cosmovision andina, arte ritual y cuidado del
            territorio, con opciones segun tu ritmo y posibilidades.
          </p>
        </header>

        <div className="space-y-6">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="space-y-2">
              <h3 className="text-xl text-foreground">{benefit.title}</h3>
              {benefit.note ? <p className="text-sm text-muted-foreground">{benefit.note}</p> : null}
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </article>
          ))}
        </div>

        <section className="space-y-3" aria-label="Que incluye">
          <h3 className="text-lg text-foreground">Que incluye</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
