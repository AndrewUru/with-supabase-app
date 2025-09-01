// components/site/Navbar.tsx
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";

type NavbarProps = { brand?: string };

export default function Navbar({ brand = "EDHUCO" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 bg-background/95 transition-all duration-300">
      <div className="container-app grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 sm:py-4">
        {/* Logo con efecto de marca */}
        <Link
          href="/"
          className="group shrink-0 font-extrabold text-xl tracking-tight transition-all duration-200 
                   hover:scale-105 focus-visible:outline-none focus-visible:ring-brand rounded-lg px-2 py-1
                   bg-gradient-to-r from-brand to-accent-cool bg-clip-text text-transparent
                   hover:from-accent-cool hover:to-accent-warm"
          aria-label="Ir a inicio"
        >
          <span className="drop-shadow-sm">{brand}</span>
        </Link>

        {/* Navegación desktop mejorada */}
        <div className="min-w-0">
          <nav className="hidden md:flex items-center justify-center gap-1">
            {[
              { href: "/#servicios", label: "Servicios", icon: "🎯" },
              { href: "/#formaciones", label: "Formaciones", icon: "📚" },
              { href: "/#viajes", label: "Viajes", icon: "✈️" },
              { href: "/#contacto", label: "Contacto", icon: "💬" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 rounded-xl text-sm font-medium
                         transition-all duration-200 hover:bg-accent/60 hover:scale-105
                         focus-visible:outline-none focus-visible:ring-brand"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </span>
                  {item.label}
                </span>

                {/* Indicador activo mejorado */}
                <span
                  className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-brand to-accent-cool 
                               rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2"
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Acciones mejoradas */}
        <div className="flex items-center gap-3">
          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Botón área personal mejorado */}
            <Link
              href="/protected"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border/50
                       px-4 py-2.5 text-sm font-semibold bg-card/50 backdrop-blur-sm
                       transition-all duration-200 hover:bg-accent/80 hover:border-border
                       hover:shadow-soft hover:scale-105 focus-visible:outline-none focus-visible:ring-brand"
            >
              <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                👤
              </span>
              Área personal
            </Link>

            {/* Auth button wrapper mejorado */}
            <div className="surface px-1 py-1">
              <AuthButton
                className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap 
                                   transition-all duration-200 hover:scale-105"
              />
            </div>

            {/* Theme switcher en contenedor glass */}
            <div className="glass rounded-xl p-2">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Móvil mejorado */}
          <div className="md:hidden">
            <details className="group relative">
              {/* Trigger mejorado */}
              <summary
                className="list-none inline-flex items-center gap-2 rounded-xl border border-border/50
                               px-4 py-2.5 text-sm font-medium bg-card/80 backdrop-blur-sm cursor-pointer
                               transition-all duration-200 hover:bg-accent/80 hover:shadow-soft hover:scale-105
                               focus-visible:outline-none focus-visible:ring-brand
                               group-open:bg-accent group-open:shadow-soft group-open:scale-105"
              >
                {/* Icono animado */}
                <span className="block size-5 transition-transform duration-200 group-open:rotate-90">
                  <span className="i-lucide-menu block size-full" />
                </span>
                Menú
              </summary>

              {/* Panel mejorado */}
              <div
                className="absolute right-0 mt-3 w-[90vw] max-w-[340px] rounded-2xl border border-border/50
                            bg-popover/95 backdrop-blur-xl p-3 shadow-soft
                            animate-in slide-in-from-top-2 fade-in-0 duration-200"
              >
                {/* Navegación móvil */}
                <div className="space-y-1">
                  {[
                    { href: "/#servicios", label: "Servicios", icon: "🎯" },
                    { href: "/#formaciones", label: "Formaciones", icon: "📚" },
                    { href: "/#viajes", label: "Viajes", icon: "✈️" },
                    { href: "/#contacto", label: "Contacto", icon: "💬" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                               transition-all duration-200 hover:bg-accent/60 hover:scale-105"
                    >
                      <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                      {item.label}
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Separador elegante */}
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Área personal móvil */}
                <Link
                  href="/protected"
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                           transition-all duration-200 hover:bg-accent/60 hover:scale-105"
                >
                  <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                    👤
                  </span>
                  Área personal
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                    →
                  </span>
                </Link>

                {/* Auth button móvil */}
                <div className="mt-3 surface p-2">
                  <AuthButton
                    className="w-full justify-center overflow-hidden text-ellipsis whitespace-nowrap
                                       transition-all duration-200 hover:scale-105"
                  />
                </div>

                {/* Theme switcher móvil */}
                <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3 bg-accent/30">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-base">🎨</span>
                    Tema
                  </span>
                  <ThemeSwitcher />
                </div>

                {/* Indicador visual bottom */}
                <div className="mt-3 mx-auto w-12 h-1 bg-gradient-to-r from-brand to-accent-cool rounded-full opacity-40" />
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
