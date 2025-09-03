// app/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";
import Hero from "@/components/site/Hero";
import AboutEdhuco from "@/components/site/AboutEdhuco";
import SomriuSection from "@/components/site/SomriuSection";

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
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-clip">
      {/* HERO */}
      <Hero />
      <AboutEdhuco />
      <SomriuSection />

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
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition text-left"
            >
              <item.Icon className="w-7 h-7 text-accent mb-4" />
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
          Reserva tu plaza en nuestras terapias, formaciones o en el programa
          SOMRIU. Vive la experiencia EDHUCO.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth/signup"
            className="px-8 py-4 rounded-lg bg-accent text-background font-semibold text-lg hover:opacity-90 inline-flex items-center gap-2"
          >
            Unirme ahora <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/somriu"
            className="px-8 py-4 rounded-lg border font-semibold text-lg hover:bg-muted/40 inline-flex items-center gap-2"
          >
            Conocer SOMRIU
          </Link>
        </div>
      </section>
    </main>
  );
}
