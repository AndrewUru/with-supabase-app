import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
const siteTitle = "EDHUCO · Reconexión Ancestral";
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning data-oid="wx3lnbb">
      <body
        className="bg-background text-foreground antialiased"
        data-oid="08mlyf2"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          data-oid="wn4f6d."
        >
          <div className="flex min-h-screen flex-col" data-oid="u_pkwvq">
            <Navbar data-oid="2bnf.qc" />

            <main id="main" className="mx-auto flex flex-1" data-oid="i:x_cal">
              {children}
            </main>
            <Footer data-oid="hivn:7:" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
