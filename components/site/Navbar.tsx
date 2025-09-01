// components/site/Navbar.tsx
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher"; // client child OK
import { AuthButton } from "@/components/auth-button"; // server OK

type NavbarProps = { brand?: string };

export default function Navbar({ brand = "EDHUCO" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90">
      <div className="mx-auto max-w-6xl grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 sm:p-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-extrabold text-lg tracking-tight hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
          aria-label="Ir a inicio"
        >
          {brand}
        </Link>

        {/* Nav desktop */}
        <div className="min-w-0">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              { href: "/#servicios", label: "Servicios" },
              { href: "/#formaciones", label: "Formaciones" },
              { href: "/#viajes", label: "Viajes" },
              { href: "/#contacto", label: "Contacto" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
              >
                <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2 min-w-0">
            <Link
              href="/protected"
              className="inline-flex shrink-0 items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Área personal
            </Link>
            <div className="min-w-0">
              <AuthButton className="max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap" />
            </div>
            <ThemeSwitcher />
          </div>

          {/* Móvil (nativo, sin JS) */}
          <div className="md:hidden">
            <details className="group relative">
              <summary
                className="list-none inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                aria-label="Abrir menú"
              >
                <span className="i-lucide-menu block size-5" />
                Menú
              </summary>

              <div className="absolute right-0 mt-2 w-[88vw] max-w-[320px] rounded-xl border bg-popover p-2 text-sm shadow-lg">
                <Link
                  href="/#servicios"
                  className="block rounded-lg px-3 py-2 hover:bg-muted"
                >
                  Servicios
                </Link>
                <Link
                  href="/#formaciones"
                  className="block rounded-lg px-3 py-2 hover:bg-muted"
                >
                  Formaciones
                </Link>
                <Link
                  href="/#viajes"
                  className="block rounded-lg px-3 py-2 hover:bg-muted"
                >
                  Viajes
                </Link>
                <Link
                  href="/#contacto"
                  className="block rounded-lg px-3 py-2 hover:bg-muted"
                >
                  Contacto
                </Link>

                <div className="my-2 h-px bg-border" />

                <Link
                  href="/protected"
                  className="block rounded-lg px-3 py-2 hover:bg-muted"
                >
                  Área personal
                </Link>

                <div className="mt-1">
                  <AuthButton className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap" />
                </div>

                <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
                  Tema
                  <ThemeSwitcher />
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
