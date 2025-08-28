// app/protected/layout.tsx
import Link from "next/link";
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";

type Props = { children: React.ReactNode };

const navItems = [
  { href: "/protected", label: "Resumen" },
  { href: "/protected/notes", label: "Notas" },
  { href: "/protected/events", label: "Agenda" },
  { href: "/protected/bookings", label: "Reservas" },
];

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
                href="/protected"
                className="inline-flex items-center gap-2 font-semibold tracking-tight hover:opacity-90"
              >
                {/* Si tienes logo, colócalo aquí */}
                <span className="inline-block rounded-md bg-foreground/10 px-2 py-1 text-xs uppercase">
                  EDHUCO
                </span>
                <span className="hidden sm:inline">Panel</span>
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <DeployButton />
              </div>
            </div>

            {/* Right: Env/Session + Theme */}
            <div className="flex items-center gap-3">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Sub-nav de secciones */}
        <nav className="border-t border-foreground/10">
          <div className="mx-auto max-w-6xl px-2 sm:px-4">
            <ul className="flex flex-wrap items-center gap-1 py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/20 data-[active=true]:bg-foreground/10"
                    data-active={
                      typeof window !== "undefined"
                        ? location.pathname === item.href
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
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
                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline"
              >
                Supabase
              </a>
              .
            </p>
            <div className="flex items-center gap-2">
              <DeployButton />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
