// components/site/Navbar.tsx
import Link from "next/link";
import Script from "next/script";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User } from "lucide-react";

type NavbarProps = { brand?: string };

type MegaLink = { label: string; href: string };
type MegaColumn = { title: string; links: MegaLink[] };

// --- DATA SIMPLIFICADA ---
const CHAMANISMO_COLS: MegaColumn[] = [
  {
    title: "Explorar",
    links: [
      { label: "Formación", href: "/chamanismo#formacion" },
      { label: "Viajes chamánicos", href: "/viajes-chamanicos" },
      { label: "Agenda", href: "/chamanismo#agenda" },
    ],
  },
];

const SONIDOS_COLS: MegaColumn[] = [
  {
    title: "Sesiones",
    links: [
      { label: "Viaje sonoro", href: "/sonidos-ancestrales#viaje" },
      { label: "Tameana", href: "/sonidos-ancestrales#tameana" },
      { label: "Talleres", href: "/sonidos-ancestrales#talleres" },
    ],
  },
];

const TERAPIAS_COLS: MegaColumn[] = [
  {
    title: "Servicios",
    links: [
      { label: "Acompañamiento emocional", href: "/terapias#emocional" },
      { label: "Terapia corporal", href: "/terapias#corporal" },
      { label: "Reservar sesión", href: "/terapias#reservas" },
    ],
  },
];

const RECURSOS_COLS: MegaColumn[] = [
  {
    title: "Biblioteca",
    links: [
      { label: "Ver todo", href: "/recursos" },
      { label: "Recursos gratis", href: "/recursos?acceso=gratis" },
      { label: "Contenido premium", href: "/recursos?acceso=premium" },
    ],
  },
];

// -------- Server Action --------
export async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ---------- UI Components ----------
function CaretDown({ className = "w-3 h-3" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.2 3.33a.75.75 0 0 1-.94 0l-4.2-3.33a.75.75 0 0 1 .02-1.18z" />
    </svg>
  );
}

function MegaMenuTrigger({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
      aria-haspopup="true"
    >
      <span>{label}</span>
      <CaretDown className="w-3 h-3 opacity-60" />
    </Link>
  );
}

function MegaPanel({ columns }: { columns: MegaColumn[] }) {
  return (
    <div
      className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200
                  absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 z-50"
      role="menu"
    >
      <div className="rounded-lg border bg-popover shadow-lg p-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold text-muted-foreground mb-3">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                    role="menuitem"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------- Navbar -------
export default async function Navbar({ brand = "EDHUCO" }: NavbarProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Inicio"
            className="text-lg font-bold tracking-tight"
          >
            {brand}
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative group">
              <MegaMenuTrigger label="Chamanismo" href="/chamanismo" />
              <MegaPanel columns={CHAMANISMO_COLS} />
            </div>

            <div className="relative group">
              <MegaMenuTrigger label="Sonidos" href="/sonidos-ancestrales" />
              <MegaPanel columns={SONIDOS_COLS} />
            </div>

            <Link
              href="/guitarra-consciente"
              className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Guitarra
            </Link>

            <div className="relative group">
              <MegaMenuTrigger label="Terapias" href="/terapias" />
              <MegaPanel columns={TERAPIAS_COLS} />
            </div>

            <div className="relative group">
              <MegaMenuTrigger label="Recursos" href="/recursos" />
              <MegaPanel columns={RECURSOS_COLS} />
            </div>

            <Link
              href="/contacto"
              className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/protected"
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm border hover:bg-muted"
                >
                  <User className="w-4 h-4" />
                  Mi cuenta
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="rounded-md px-3 py-1.5 text-sm border hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Salir
                  </button>
                </form>
              </>
            ) : (
              <AuthButton variant="default" />
            )}
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <details id="mobile-menu" className="group relative">
              <summary className="list-none flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer">
                Menú
                <CaretDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
              </summary>

              <div className="absolute right-0 mt-2 w-72 rounded-lg border bg-popover shadow-lg p-3 z-50">
                <nav className="space-y-1">
                  {[
                    { href: "/chamanismo", label: "Chamanismo" },
                    {
                      href: "/sonidos-ancestrales",
                      label: "Sonidos Ancestrales",
                    },
                    {
                      href: "/guitarra-consciente",
                      label: "Guitarra Consciente",
                    },
                    { href: "/terapias", label: "Terapias" },
                    { href: "/recursos", label: "Recursos" },
                    { href: "/contacto", label: "Contacto" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="my-3 h-px bg-border" />

                {user ? (
                  <>
                    <Link
                      href="/protected"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      Mi cuenta
                    </Link>
                    <form action={signOut} className="mt-1">
                      <button
                        type="submit"
                        className="w-full text-left rounded-md px-3 py-2 text-sm border hover:bg-destructive hover:text-destructive-foreground"
                      >
                        Cerrar sesión
                      </button>
                    </form>
                  </>
                ) : (
                  <AuthButton variant="default" className="w-full" />
                )}

                <div className="mt-3 px-3">
                  <ThemeSwitcher />
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Mobile Menu Script */}
      <Script id="close-mobile-menu" strategy="afterInteractive">
        {`
(function () {
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  const summary = menu.querySelector("summary");
  const closeMenu = () => {
    menu.removeAttribute("open");
    summary?.blur();
  };
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) closeMenu();
  });
})();
        `}
      </Script>
    </header>
  );
}
