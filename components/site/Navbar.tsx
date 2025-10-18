import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User, Sparkle } from "lucide-react";
import { MobileMenuCloser } from "./MobileMenuCloser";

type NavbarProps = { brand?: string };

type MegaLink = { label: string; href: string };
type MegaColumn = { title: string; links: MegaLink[] };

const CHAMANISMO_COLS: MegaColumn[] = [
  {
    title: "Explorar",
    links: [
      { label: "Formacion", href: "/chamanismo#formacion" },
      { label: "Viajes chamanicos", href: "/viajes-chamanicos" },
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
      { label: "Acompanamiento emocional", href: "/terapias#emocional" },
      { label: "Terapia corporal", href: "/terapias#corporal" },
      { label: "Reservar sesion", href: "/terapias#reservas" },
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

export async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

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
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:text-foreground"
      aria-haspopup="true"
    >
      <span>{label}</span>
      <CaretDown className="w-3 h-3 opacity-70" />
    </Link>
  );
}

function MegaPanel({ columns }: { columns: MegaColumn[] }) {
  return (
    <div
      className="invisible absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 rounded-[1.75rem] border border-border/60 bg-card/85 p-5 opacity-0 shadow-soft backdrop-blur-xl transition duration-200 group-hover:visible group-hover:opacity-100"
      role="menu"
    >
      <div className="space-y-5">
        {columns.map((col) => (
          <div key={col.title} className="space-y-3">
            <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/75 transition hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground"
                    role="menuitem"
                  >
                    {link.label}
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

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:text-foreground"
    >
      {children}
    </Link>
  );
}

export default async function Navbar({ brand = "EDHUCO" }: NavbarProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-app flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Volver al inicio"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <Sparkle
            className="h-4 w-4 text-[hsl(var(--brand))]"
            aria-hidden="true"
          />
          {brand}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div className="group relative">
            <MegaMenuTrigger label="Chamanismo" href="/chamanismo" />
            <MegaPanel columns={CHAMANISMO_COLS} />
          </div>

          <div className="group relative">
            <MegaMenuTrigger label="Sonidos" href="/sonidos-ancestrales" />
            <MegaPanel columns={SONIDOS_COLS} />
          </div>

          <NavLink href="/guitarra-consciente">Guitarra</NavLink>

          <div className="group relative">
            <MegaMenuTrigger label="Terapias" href="/terapias" />
            <MegaPanel columns={TERAPIAS_COLS} />
          </div>

          <div className="group relative">
            <MegaMenuTrigger label="Recursos" href="/recursos" />
            <MegaPanel columns={RECURSOS_COLS} />
          </div>

          <NavLink href="/contacto">Contacto</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/protected"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/85 transition hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Mi cuenta
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition hover:-translate-y-0.5 hover:bg-destructive/70 hover:text-destructive-foreground"
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

        <div className="md:hidden">
          <details id="mobile-menu" className="group relative">
            <summary className="list-none inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition hover:bg-accent/60 hover:text-foreground">
              Menu
              <CaretDown className="h-3 w-3 transition group-open:rotate-180" />
            </summary>

            <div className="absolute right-0 mt-3 w-72 rounded-[1.75rem] border border-border/60 bg-card/85 p-4 shadow-soft backdrop-blur-xl">
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
                    className="block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:bg-accent/60 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="my-3 h-px bg-border/70" />

              {user ? (
                <>
                  <Link
                    href="/protected"
                    className="block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:bg-accent/60 hover:text-foreground"
                  >
                    Mi cuenta
                  </Link>
                  <form action={signOut} className="mt-1">
                    <button
                      type="submit"
                      className="w-full rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:bg-destructive/70 hover:text-destructive-foreground"
                    >
                      Cerrar sesion
                    </button>
                  </form>
                </>
              ) : (
                <AuthButton
                  variant="default"
                  className="mt-1 w-full justify-center"
                />
              )}

              <div className="mt-3 flex justify-center">
                <ThemeSwitcher />
              </div>
            </div>
          </details>
        </div>
      </div>

      <MobileMenuCloser menuId="mobile-menu" />
    </header>
  );
}
