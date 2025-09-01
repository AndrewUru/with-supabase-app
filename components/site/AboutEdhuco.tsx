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
      className="mx-auto max-w-6xl px-6 py-20"
    >
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
          <LayoutDashboard className="w-3.5 h-3.5" />
          Cómo funciona la plataforma
        </span>
        <h2 id="about-title" className="mt-4 text-3xl font-bold">
          Tu área personal EDHUCO
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          En <strong>EDHUCO</strong> tienes un área personal donde accedes a{" "}
          <em>material didáctico</em>:<strong> audios</strong>,{" "}
          <strong>videos</strong> y <strong>PDFs</strong> descargables para tu
          práctica diaria. Puedes empezar gratis y, si quieres todo el contenido
          y funciones extra, suscríbete por solo
          <strong> 3,99 €/mes</strong>.
        </p>
      </div>

      {/* Qué incluye el área personal */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            Icon: FileText,
            title: "PDFs guiados",
            desc: "Guías, ejercicios y bitácoras para integrar cada práctica.",
          },
          {
            Icon: Headphones,
            title: "Audios",
            desc: "Meditaciones, respiración y sesiones de voz para tus rutinas.",
          },
          {
            Icon: Video,
            title: "Videos",
            desc: "Clases cortas y demostraciones paso a paso.",
          },
          {
            Icon: BookmarkCheck,
            title: "Favoritos",
            desc: "Guarda tus recursos clave para volver a ellos rápido.",
          },
          {
            Icon: Download,
            title: "Descargas",
            desc: "Acceso offline a PDFs seleccionados y materiales marcados.",
          },
          {
            Icon: BellRing,
            title: "Recordatorios",
            desc: "Notificaciones opcionales para sostener el hábito.",
          },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition"
          >
            <Icon className="w-6 h-6 text-accent mb-3" />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Planes: Gratis vs Suscripción */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Gratis */}
        <div className="rounded-2xl border bg-background p-6">
          <p className="text-sm font-medium">Plan</p>
          <h3 className="mt-1 text-2xl font-bold">Gratis</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Empieza sin coste y conoce la experiencia EDHUCO.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Acceso al área personal con perfil básico",
              "2 recursos abiertos/mes (audios o PDFs seleccionados)",
              "Agenda pública de actividades y eventos",
              "Newsletter con tips y mini-retos mensuales",
              "Favoritos limitados (hasta 5)",
              "Modo oscuro y experiencia sin anuncios intrusivos",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 w-4 h-4 text-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-muted/40"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </div>

        {/* Suscripción */}
        <div className="relative rounded-2xl border bg-card p-6 shadow-sm">
          <div className="absolute -top-3 right-4 rounded-full border bg-background px-3 py-1 text-xs font-medium">
            Recomendado
          </div>
          <p className="text-sm font-medium">Plan</p>
          <h3 className="mt-1 text-2xl font-bold">Suscripción EDHUCO</h3>
          <div className="mt-2 flex items-center gap-2">
            <Euro className="w-5 h-5" />
            <p className="text-lg font-semibold">3,99 €/mes</p>
            <span className="text-xs text-muted-foreground">
              cancela cuando quieras
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Acceso completo a biblioteca y funciones avanzadas.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Biblioteca completa (audios, videos y PDFs)",
              "Descargas ampliadas para uso offline",
              "Favoritos ilimitados y progreso guardado",
              "Listas/colecciones personalizadas",
              "Recordatorios avanzados y rutinas guiadas",
              "Acceso prioritario a nuevas formaciones y SOMRIU",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 w-4 h-4 text-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/signup?plan=pro"
              className="inline-flex items-center gap-2 rounded-lg bg-accent text-background px-5 py-3 font-semibold hover:opacity-90"
            >
              Empezar ahora <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-muted/40"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </div>

      {/* Preguntas rápidas */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
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
          <div key={q} className="rounded-xl border bg-background p-5">
            <p className="font-medium">{q}</p>
            <p className="mt-2 text-sm text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
