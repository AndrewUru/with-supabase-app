// app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/site/Hero";
import AboutEdhuco from "@/components/site/AboutEdhuco";
import SomriuSection from "@/components/site/SomriuSection";
import BeneficiosSection from "@/components/site/BeneficiosSection";
import TestimoniosSection from "@/components/site/TestimoniosSection";
import CtaFinalSection from "@/components/site/CtaFinalSection";

const siteTitle = "EDHUCO - Terapias, Viajes Chamanicos y Formaciones";
const siteDescription =
  "Descubre EDHUCO: terapias, viajes y formaciones diseniadas para reconectar con tu sabiduria interior.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://edhuco.com",
    siteName: "EDHUCO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EDHUCO - Reconexion Ancestral",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

const sections = [
  { id: "hero", component: Hero },
  { id: "about", component: AboutEdhuco },
  { id: "somriu", component: SomriuSection },
  { id: "beneficios", component: BeneficiosSection },
  { id: "testimonios", component: TestimoniosSection },
  { id: "cta-final", component: CtaFinalSection },
] as const;

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full flex-col bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-brand/10 via-background to-transparent" />
      {sections.map(({ id, component: Section }) => (
        <section key={id} id={id} className="scroll-mt-24">
          <Section />
        </section>
      ))}
    </main>
  );
}
