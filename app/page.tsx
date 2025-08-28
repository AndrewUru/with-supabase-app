// app/page.tsx
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";

export const metadata = {
  title: "EDHUCO – Terapias, Viajes Chamánicos y Formaciones",
  description:
    "Descubre EDHUCO: sesiones de terapia, viajes chamánicos y formaciones transformadoras. Reconecta con tu sabiduría interior.",
  openGraph: {
    title: "EDHUCO – Reconexión Ancestral",
    description:
      "Plataforma EDHUCO: terapias, formaciones y viajes chamánicos.",
    url: "https://edhuco.com",
    siteName: "EDHUCO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EDHUCO – Reconexión Ancestral",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b backdrop-blur bg-background/80">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight hover:opacity-80"
          >
            EDHUCO
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            <Link href="/#servicios" className="hover:text-accent">
              Servicios
            </Link>
            <Link href="/#formaciones" className="hover:text-accent">
              Formaciones
            </Link>
            <Link href="/#viajes" className="hover:text-accent">
              Viajes
            </Link>
            <Link href="/#contacto" className="hover:text-accent">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <AuthButton />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 relative overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
          Reconecta con tu{" "}
          <span className="text-accent">sabiduría interior</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Terapias, viajes chamánicos y formaciones para tu transformación
          personal.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/auth/signup"
            className="px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:opacity-90 inline-flex items-center gap-2"
          >
            Empieza ahora <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#servicios"
            className="px-6 py-3 rounded-lg border hover:bg-muted/30"
          >
            Ver más
          </Link>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section
        id="servicios"
        className="mx-auto max-w-6xl py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-12">¿Por qué elegir EDHUCO?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Terapias transformadoras",
              desc: "Sesiones individuales y grupales con música, voz y energía.",
            },
            {
              title: "Formaciones vivenciales",
              desc: "Aprende prácticas chamánicas y sabiduría ancestral.",
            },
            {
              title: "Viajes únicos",
              desc: "Retiros y experiencias en Perú, España y más destinos.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition"
            >
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-muted/30 py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Lo que dicen</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Caterina C.L.",
                text: "Un camino de sanación, humildad y empoderamiento. Resultados desde el primer momento.",
              },
              {
                name: "Alicia P.",
                text: "La música me atravesó. Salí más ligera y presente.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 border rounded-xl bg-background shadow-sm text-left"
              >
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <p className="italic text-muted-foreground">“{t.text}”</p>
                <p className="mt-4 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        id="contacto"
        className="mx-auto max-w-4xl text-center py-20 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Da el siguiente paso en tu camino
        </h2>
        <p className="text-muted-foreground mb-8">
          Reserva tu plaza en nuestras terapias, formaciones o viajes. Vive la
          experiencia EDHUCO.
        </p>
        <Link
          href="/auth/signup"
          className="px-8 py-4 rounded-lg bg-accent text-background font-semibold text-lg hover:opacity-90 inline-flex items-center gap-2"
        >
          Unirme ahora <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} EDHUCO ·{" "}
          <Link href="/privacy" className="hover:underline">
            Privacidad
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="hover:underline">
            Términos
          </Link>
        </p>
      </footer>
    </main>
  );
}
