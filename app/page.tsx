// app/page.tsx
import Hero from "@/components/site/Hero";
import AboutEdhuco from "@/components/site/AboutEdhuco";
import SomriuSection from "@/components/site/SomriuSection";
import BeneficiosSection from "@/components/site/BeneficiosSection";
import TestimoniosSection from "@/components/site/TestimoniosSection";
import CtaFinalSection from "@/components/site/CtaFinalSection";

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
      <BeneficiosSection />
      {/* TESTIMONIOS */}
      <TestimoniosSection />

      {/* CTA FINAL */}
      <CtaFinalSection />
    </main>
  );
}
