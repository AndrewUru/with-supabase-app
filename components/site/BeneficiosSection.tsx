import { CalendarDays, HeartHandshake, Sparkles } from "lucide-react";

export default function BeneficiosSection() {
  const beneficios = [
    {
      title: "Terapias transformadoras",
      desc: "Sesiones individuales y grupales con música, voz y energía.",
      Icon: HeartHandshake,
    },
    {
      title: "Formaciones vivenciales",
      desc: "Aprende prácticas chamánicas y sabiduría ancestral.",
      Icon: Sparkles,
    },
    {
      title: "Viajes únicos",
      desc: "Retiros y experiencias en Perú, España y más destinos.",
      Icon: CalendarDays,
    },
  ] as const;

  return (
    <section id="servicios" className="section text-center">
      <div className="container-app">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">
          ¿Por qué elegir <span className="text-gradient">EDHUCO</span>?
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          Nuestra misión es ofrecer recursos y experiencias de alta calidad en
          terapias, formaciones y viajes. Gracias a tu apoyo, con una
          suscripción mensual de solo{" "}
          <strong className="text-foreground">22 €</strong>, mantenemos esta
          plataforma accesible y en crecimiento.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="surface p-6 text-left transition hover:shadow-soft"
            >
              <Icon className="mb-4 h-7 w-7 text-accent" aria-hidden />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
