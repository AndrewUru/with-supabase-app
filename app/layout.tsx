// app/layout.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
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

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "EDHUCO – Reconexión Ancestral",
    template: "%s | EDHUCO",
  },
  description:
    "Plataforma EDHUCO: terapias, viajes chamánicos, formaciones y comunidad.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased min-h-dvh w-full overflow-x-clip flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip link accesibilidad */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 radius bg-foreground px-3 py-2 text-background"
          >
            Ir al contenido
          </a>

          <Navbar />

          {/* Contenido principal */}
          <main id="main" className="flex-1">
            {children}
          </main>

          {/* Footer global */}
          <footer className="relative border-t surface">
            {/* Gradiente sutil superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

            <div className="container-app section">
              {/* Contenido principal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Marca y descripción */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gradient">EDHUCO</h3>
                  <p className="text-sm text-muted-foreground text-balance">
                    Transformando la educación a través de experiencias
                    innovadoras y viajes formativos.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/#contacto"
                      className="inline-flex items-center gap-2 text-sm text-brand hover:text-accent-cool transition-colors duration-200 hover:underline underline-offset-4 ring-brand-focus"
                    >
                      <Mail className="w-3 h-3" />
                      Contactar
                    </Link>
                    <Link
                      href="/protected"
                      className="inline-flex items-center gap-2 text-sm text-brand hover:text-accent-cool transition-colors duration-200 hover:underline underline-offset-4 ring-brand-focus"
                    >
                      <User className="w-3 h-3" />
                      Área personal
                    </Link>
                  </div>
                </div>

                {/* Enlaces rápidos */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-foreground">
                    Navegación
                  </h4>
                  <nav className="grid grid-cols-2 gap-2">
                    {[
                      { href: "/#servicios", label: "Servicios", icon: Target },
                      {
                        href: "/#formaciones",
                        label: "Formaciones",
                        icon: BookOpen,
                      },
                      { href: "/#viajes", label: "Viajes", icon: Plane },
                      {
                        href: "/#contacto",
                        label: "Contacto",
                        icon: MessageCircle,
                      },
                    ].map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 radius px-2 py-1 hover:bg-accent/40 ring-brand-focus"
                        >
                          <IconComponent className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Información de contacto */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-foreground">
                    Síguenos
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="size-8 radius bg-accent/40 flex items-center justify-center text-sm">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Valencia, España
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="size-8 radius bg-accent/40 flex items-center justify-center text-sm">
                        <Globe className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Educación global
                      </span>
                    </div>
                  </div>

                  {/* Theme switcher integrado */}
                  <div className="glass flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-muted-foreground">Tema</span>
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>

              {/* Separador elegante */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-4 text-xs text-muted-foreground">
                    <Zap className="w-3 h-3 inline" />
                  </span>
                </div>
              </div>

              {/* Copyright */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2 text-balance">
                  <span>© {new Date().getFullYear()} EDHUCO</span>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span className="opacity-75">
                    Todos los derechos reservados
                  </span>
                </p>

                <div className="flex items-center gap-4">
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4 ring-brand-focus"
                  >
                    Privacidad
                  </Link>
                  <span className="opacity-50">•</span>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4 ring-brand-focus"
                  >
                    Términos
                  </Link>
                  <span className="opacity-50">•</span>
                  <span className="flex items-center gap-1 opacity-75">
                    Hecho con{" "}
                    <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                    en Valencia
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
