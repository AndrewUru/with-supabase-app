// components/site/AboutEdhuco.tsx
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Headphones,
  Video,
  Download,
  BookmarkCheck,
  BellRing,
  CheckCircle2,
  ArrowRight,
  Euro,
} from "lucide-react";

export default function AboutEdhuco() {
  return (
    <section
      id="about-edhuco"
      aria-labelledby="about-title"
      className="container-app section"
    >
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 surface px-3 py-1 text-xs font-medium">
          <LayoutDashboard className="w-3.5 h-3.5 text-brand" />
          Cómo funciona la plataforma
        </span>
        <h2 id="about-title" className="mt-6 text-gradient">
          Tu área personal EDHUCO
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          En <strong className="text-foreground">EDHUCO</strong> tienes un área
          personal donde accedes a <em>material didáctico</em>:{" "}
          <strong className="text-brand">audios</strong>,{" "}
          <strong className="text-brand">videos</strong> y{" "}
          <strong className="text-brand">PDFs</strong> descargables para tu
          práctica diaria. Puedes empezar gratis y, si quieres todo el contenido
          y funciones extra, suscríbete por solo
          <strong className="text-accent-warm"> 22 €/mes</strong>.
        </p>
      </div>

      {/* Qué incluye el área personal */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            Icon: FileText,
            title: "PDFs guiados",
            desc: "Guías, ejercicios y bitácoras para integrar cada práctica.",
            accent: "text-brand",
          },
          {
            Icon: Headphones,
            title: "Audios",
            desc: "Meditaciones, respiración y sesiones de voz para tus rutinas.",
            accent: "text-accent-cool",
          },
          {
            Icon: Video,
            title: "Videos",
            desc: "Clases cortas y demostraciones paso a paso.",
            accent: "text-accent-warm",
          },
          {
            Icon: BookmarkCheck,
            title: "Favoritos",
            desc: "Guarda tus recursos clave para volver a ellos rápido.",
            accent: "text-brand",
          },
          {
            Icon: Download,
            title: "Descargas",
            desc: "Acceso offline a PDFs seleccionados y materiales marcados.",
            accent: "text-accent-cool",
          },
          {
            Icon: BellRing,
            title: "Recordatorios",
            desc: "Notificaciones opcionales para sostener el hábito.",
            accent: "text-accent-warm",
          },
        ].map(({ Icon, title, desc, accent }) => (
          <div
            key={title}
            className="card p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group"
          >
            <Icon
              className={`w-6 h-6 ${accent} mb-3 transition-transform group-hover:scale-110`}
            />
            <h3 className="font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Planes: Gratis vs Suscripción */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {/* Gratis */}
        <div className="card p-6 hover:shadow-soft transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Plan</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">Gratis</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-brand">0€</p>
              <p className="text-xs text-muted-foreground">siempre</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Empieza sin coste y conoce la experiencia EDHUCO.
          </p>
          <ul className="space-y-3 text-sm">
            {[
              "Acceso al área personal con perfil básico",
              "2 recursos abiertos/mes (audios o PDFs seleccionados)",
              "Agenda pública de actividades y eventos",
              "Newsletter con tips y mini-retos mensuales",
              "Favoritos limitados (hasta 5)",
              "Modo oscuro y experiencia sin anuncios intrusivos",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 w-4 h-4 text-brand shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/auth/signup"
              className="btn-outline w-full justify-center py-3 hover:border-brand/30 hover:text-brand transition-colors"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </div>

        {/* Suscripción */}
        <div className="relative card p-6 shadow-soft border-brand/20">
          <div className="absolute -top-3 right-4 surface px-3 py-1 text-xs font-medium text-brand">
            Recomendado
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Plan</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">
                Suscripción EDHUCO
              </h3>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Euro className="w-5 h-5 text-accent-warm" />
                <p className="text-2xl font-bold text-brand">22</p>
              </div>
              <p className="text-xs text-muted-foreground">
                por mes - cancela cuando quieras
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Acceso completo a biblioteca y funciones avanzadas.
          </p>
          <ul className="space-y-3 text-sm">
            {[
              "Biblioteca completa (audios, videos y PDFs)",
              "Descargas ampliadas para uso offline",
              "Favoritos ilimitados y progreso guardado",
              "Listas/colecciones personalizadas",
              "Recordatorios avanzados y rutinas guiadas",
              "Acceso prioritario a nuevas formaciones y SOMRIU",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 w-4 h-4 text-brand shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth/signup?plan=pro"
              className="btn flex-1 justify-center py-3 shadow-sm hover:shadow-md transition-all"
            >
              Empezar ahora <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/auth/login"
              className="btn-outline justify-center py-3 hover:border-brand/30 hover:text-brand transition-colors"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </div>

      {/* Preguntas rápidas */}
      <div className="mt-16">
        <h3 className="text-center text-xl font-semibold mb-8 tracking-tight">
          Preguntas frecuentes
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              q: "¿Qué necesito para empezar?",
              a: "Crear una cuenta gratuita. Desde tu perfil podrás explorar recursos abiertos y probar la experiencia.",
            },
            {
              q: "¿Puedo cancelar cuando quiera?",
              a: "Sí. La suscripción es mensual y la puedes cancelar en cualquier momento desde tu área personal.",
            },
            {
              q: "¿Cómo se actualiza el contenido?",
              a: "Publicamos nuevos audios, videos y PDFs periódicamente. Te avisaremos con recordatorios opcionales.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="surface p-5 hover:shadow-soft transition-all duration-300"
            >
              <p className="font-medium text-brand mb-3">{q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
