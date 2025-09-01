// app/layout.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <Navbar />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip link accesibilidad */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded bg-foreground px-3 py-2 text-background"
          >
            Ir al contenido
          </a>

          {/* Contenido principal */}
          <main id="main" className="flex-1">
            {children}
          </main>

          {/* Footer global */}
          {/* Footer global mejorado */}
          <footer className="relative border-t bg-card/30 backdrop-blur-sm">
            {/* Gradiente sutil superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

            <div className="container-app py-8 sm:py-12">
              {/* Contenido principal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Marca y descripción */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gradient">EDHUCO</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Transformando la educación a través de experiencias
                    innovadoras y viajes formativos.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/#contacto"
                      className="inline-flex items-center gap-2 text-sm text-brand hover:text-accent-cool 
                     transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      <span className="text-xs">📧</span>
                      Contactar
                    </Link>
                    <Link
                      href="/protected"
                      className="inline-flex items-center gap-2 text-sm text-brand hover:text-accent-cool 
                     transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      <span className="text-xs">👤</span>
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
                      { href: "/#servicios", label: "Servicios", icon: "🎯" },
                      {
                        href: "/#formaciones",
                        label: "Formaciones",
                        icon: "📚",
                      },
                      { href: "/#viajes", label: "Viajes", icon: "✈️" },
                      { href: "/#contacto", label: "Contacto", icon: "💬" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-2 text-sm text-muted-foreground 
                       hover:text-foreground transition-colors duration-200 rounded-lg px-2 py-1
                       hover:bg-accent/40"
                      >
                        <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Información de contacto */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-foreground">
                    Síguenos
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-accent/40 flex items-center justify-center text-sm">
                        📍
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Valencia, España
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-accent/40 flex items-center justify-center text-sm">
                        🌐
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Educación global
                      </span>
                    </div>
                  </div>

                  {/* Theme switcher integrado */}
                  <div className="flex items-center justify-between rounded-xl px-3 py-2 bg-accent/20">
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
                    ⚡
                  </span>
                </div>
              </div>

              {/* Copyright mejorado */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span>© {new Date().getFullYear()} EDHUCO</span>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span className="opacity-75">
                    Todos los derechos reservados
                  </span>
                </p>

                <div className="flex items-center gap-4">
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Privacidad
                  </Link>
                  <span className="opacity-50">•</span>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Términos
                  </Link>
                  <span className="opacity-50">•</span>
                  <span className="flex items-center gap-1 opacity-75">
                    Hecho con{" "}
                    <span className="text-red-500 animate-pulse">❤️</span> en
                    Valencia
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
