// app/layout.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { LucideIcon } from "lucide-react";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Mail,
  User,
  Target,
  BookOpen,
  Plane,
  MessageCircle,
  MapPin,
  Globe,
  Zap,
  Heart,
} from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const siteTitle = "EDHUCO · Reconexón Ancestral";
const siteDescription =
  "Plataforma EDHUCO: terapias, viajes chamánicos, formaciones y comunidad.";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: siteTitle,
    template: "%s | EDHUCO",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: defaultUrl,
    siteName: "EDHUCO",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  display: "swap",
  subsets: ["latin"],
});

const quickLinks: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/#servicios", label: "Servicios", icon: Target },
  { href: "/#formaciones", label: "Formaciones", icon: BookOpen },
  { href: "/#viajes", label: "Viajes", icon: Plane },
  { href: "/#contacto", label: "Contacto", icon: MessageCircle },
];

const contactHighlights: Array<{ icon: LucideIcon; label: string }> = [
  { icon: MapPin, label: "Valencia, España" },
  { icon: Globe, label: "Educación global" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} w-full overflow-x-clip bg-background bg-[radial-gradient(120%_120%_at_12%_20%,_hsl(var(--spiritual-light)/0.18)_0%,_transparent_70%)] font-sans antialiased text-foreground selection:bg-[hsl(var(--spiritual-aurora)/0.25)] selection:text-white spiritual-aura`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {/* Fondos decorativos */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
              <div
                className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, hsl(var(--spiritual-ember) / 0.32), transparent 65%)",
                }}
              />
              <div
                className="absolute -left-24 top-1/3 h-[420px] w-[420px] opacity-70 blur-[140px]"
                style={{
                  background:
                    "radial-gradient(circle at 32% 40%, hsl(var(--spiritual-mist) / 0.28), transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-[-18%] right-[-12%] h-[420px] w-[420px] opacity-70 blur-[140px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, hsl(var(--spiritual-aurora) / 0.32), transparent 72%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "linear-gradient(140deg, hsl(var(--spiritual-shadow) / 0.18) 0%, transparent 55%)",
                }}
              />
            </div>

            {/* Skip link accesible */}
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg transition"
            >
              Ir al contenido principal
            </a>

            <Navbar />

            <main id="main" className="relative flex-1">
              {children}
            </main>

            <footer
              className="relative mt-12 overflow-hidden border-t border-transparent bg-background/90 backdrop-blur-xl"
              aria-labelledby="footer-heading"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--spiritual-shadow) / 0.8) 0%, hsl(var(--background) / 0.9) 38%, hsl(var(--spiritual-mist) / 0.22) 100%)",
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--spiritual-aurora)/0.45)] to-transparent" />
              <div className="container-app section">
                <div className="flex flex-col gap-2 ">
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div className="space-y-5">
                      <h2
                        id="footer-heading"
                        className="text-lg font-semibold tracking-tight"
                      >
                        EDHUCO
                      </h2>
                      <p className="text-sm text-muted-foreground text-balance">
                        {
                          "Transformamos la educación mediante experiencias inmersivas, viajes formativos y acompañamiento humano."
                        }
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="/#contacto"
                          className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[linear-gradient(120deg,_hsl(var(--spiritual-ember))_0%,_hsl(var(--spiritual-aurora))_65%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_hsl(var(--spiritual-ember)/0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-20px_hsl(var(--spiritual-aurora)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--spiritual-light)/0.6)] focus-visible:ring-offset-2"
                        >
                          <Mail className="h-4 w-4" />
                          Contactar
                        </Link>
                        <Link
                          href="/protected"
                          className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--spiritual-light)/0.4)] bg-[hsl(var(--spiritual-light)/0.08)] px-3.5 py-1.5 text-sm font-medium text-foreground transition hover:bg-[hsl(var(--spiritual-light)/0.14)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--spiritual-ember)/0.4)] focus-visible:ring-offset-2"
                        >
                          <User className="h-4 w-4" />
                          {"Área personal"}
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {"Navegación"}
                      </h3>
                      <nav
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                        aria-label="Enlaces rápidos"
                      >
                        {quickLinks.map(({ href, label, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-[hsl(var(--spiritual-ember)/0.35)] hover:bg-[hsl(var(--spiritual-light)/0.12)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--spiritual-aurora)/0.4)] focus-visible:ring-offset-2"
                          >
                            <span className="inline-flex size-8 items-center justify-center rounded-md bg-[hsl(var(--spiritual-light)/0.15)] text-[hsl(var(--spiritual-ember))] shadow-[0_12px_30px_-18px_hsl(var(--spiritual-ember)/0.6)] transition group-hover:bg-[hsl(var(--spiritual-light)/0.28)] group-hover:text-white">
                              <Icon className="h-4 w-4" />
                            </span>
                            {label}
                          </Link>
                        ))}
                      </nav>
                    </div>

                    <div className="space-y-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Conecta con nosotros
                      </h3>
                      <div className="space-y-4">
                        {contactHighlights.map(({ icon: Icon, label }) => (
                          <div
                            key={label}
                            className="flex items-center gap-3 text-sm text-muted-foreground"
                          >
                            <span className="inline-flex size-8 items-center justify-center rounded-md bg-[hsl(var(--spiritual-light)/0.12)] text-[hsl(var(--spiritual-ember))] shadow-[0_12px_26px_-18px_hsl(var(--spiritual-ember)/0.55)]">
                              <Icon className="h-4 w-4" />
                            </span>
                            {label}
                          </div>
                        ))}
                      </div>
                      <div
                        className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3 shadow-inner backdrop-blur-sm"
                        aria-label="Selector de tema"
                        style={{
                          borderColor: "hsl(var(--spiritual-light) / 0.3)",
                          background:
                            "linear-gradient(120deg, hsl(var(--spiritual-shadow) / 0.4) 0%, hsl(var(--background) / 0.75) 50%, hsl(var(--spiritual-light) / 0.12) 100%)",
                          boxShadow: "inset 0 1px 12px hsl(var(--spiritual-light) / 0.15)",
                        }}
                      >
                        <span className="text-sm text-muted-foreground">
                          Tema
                        </span>
                        <ThemeSwitcher />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden
                    >
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--spiritual-light)/0.2)] to-transparent" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="rounded-full bg-background px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <Zap className="mr-2 inline-block h-3 w-3 align-middle" />
                        {"Inspiración en movimiento"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
                    <p className="flex items-center gap-2 text-balance">
                      <span>
                        {"©"} {currentYear} EDHUCO
                      </span>
                      <span className="hidden opacity-50 sm:inline">{"•"}</span>
                      <span className="opacity-75">
                        Todos los derechos reservados
                      </span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href="/privacy"
                        className="transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        Privacidad
                      </Link>
                      <span className="opacity-50">{"•"}</span>
                      <Link
                        href="/terms"
                        className="transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        {"Términos"}
                      </Link>
                      <span className="opacity-50">{"•"}</span>
                      <span className="flex items-center gap-1">
                        Hecho con
                        <Heart className="h-3 w-3 text-red-500" aria-hidden />
                        en Valencia
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
