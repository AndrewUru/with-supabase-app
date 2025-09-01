// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/site/Navbar";

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
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col`}
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
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded bg-foreground px-3 py-2 text-background"
          >
            Ir al contenido
          </a>

          {/* Contenido principal */}
          <main id="main" className="flex-1">
            <Navbar />
            {children}
          </main>

          {/* Footer global */}
          <footer className="border-t text-center text-xs text-muted-foreground py-6">
            <p>
              © {new Date().getFullYear()} EDHUCO · Construido con{" "}
              <a
                href="https://nextjs.org/"
                target="_blank"
                className="hover:underline"
              >
                Next.js
              </a>{" "}
              &{" "}
              <a
                href="https://supabase.com/"
                target="_blank"
                className="hover:underline"
              >
                Supabase
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
