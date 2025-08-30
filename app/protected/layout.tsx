// app/protected/layout.tsx
import Link from "next/link";

import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ProtectedSubNav } from "@/components/protected-sub-nav"; // Importa el nuevo componente
import { hasEnvVars } from "@/lib/utils";

type Props = { children: React.ReactNode };

// Los navItems ya no son necesarios aquí, se definen en ProtectedSubNav
// const navItems = [
//   { href: "/protected", label: "Resumen" },
//   { href: "/protected/notes", label: "Notas" },
//   { href: "/protected/events", label: "Agenda" },
//   { href: "/protected/bookings", label: "Reservas" },
// ];

export default function ProtectedLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Skip link para navegación por teclado */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-3 focus:py-2 focus:bg-foreground focus:text-background"
      >
        Ir al contenido
      </a>

      {/* Header fijo */}
      <header className="sticky top-0 z-40 border-b border-foreground/10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Brand + Deploy */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-semibold tracking-tight hover:opacity-90"
              >
                {/* Si tienes logo, colócalo aquí */}
                <span className="inline-block rounded-md bg-foreground/10 px-2 py-1 text-xs uppercase">
                  EDHUCO
                </span>
                <span className="hidden sm:inline">Panel</span>
              </Link>
              <div className="hidden sm:flex items-center gap-2"></div>
            </div>

            {/* Right: Env/Session + Theme */}
            <div className="flex items-center gap-3">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Sub-nav de secciones - Ahora un Client Component */}
        <ProtectedSubNav />
      </header>

      {/* Contenido */}
      <section id="content" className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-foreground/10 bg-card/60 p-5 shadow-sm">
          {children}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-foreground/70">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Hecho con ♥ para <span className="font-semibold">EDHUCO</span>.
              &nbsp;Powered by{" "}
              <a
                href="https://elsaltoweb.es"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline"
              >
                ElsaltoWeb.es
              </a>
              .
            </p>
            <div className="flex items-center gap-2">
              {/* Aquí podrías tener otro ThemeSwitcher si lo deseas, o ajustarlo */}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
