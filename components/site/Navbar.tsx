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
      data-oid="m3ftvsi"
    >
      <path
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.2 3.33a.75.75 0 0 1-.94 0l-4.2-3.33a.75.75 0 0 1 .02-1.18z"
        data-oid="aw5ig:0"
      />
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
      data-oid="wj_-8ck"
    >
      <span data-oid="e6spu_1">{label}</span>
      <CaretDown className="w-3 h-3 opacity-90" data-oid="rp1-o1x" />
    </Link>
  );
}

function MegaPanel({ columns }: { columns: MegaColumn[] }) {
  return (
    <div
      className="invisible absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 rounded-[1.75rem] border border-border/80 bg-black p-5  shadow-soft transition duration-200 group-hover:visible group-hover:opacity-100 z-index-50 "
      role="menu"
      data-oid="9_337mq"
    >
      <div className="space-y-5" data-oid="be9w29k">
        {columns.map((col) => (
          <div key={col.title} className="space-y-3" data-oid="3rohdd-">
            <h4
              className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70"
              data-oid="1605ip2"
            >
              {col.title}
            </h4>
            <ul className="space-y-2.5" data-oid="4vj.dzw">
              {col.links.map((link) => (
                <li key={link.href} data-oid="n.34xuj">
                  <Link
                    href={link.href}
                    className="block rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/75 transition hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground"
                    role="menuitem"
                    data-oid="v:_055h"
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
      data-oid="235_hmi"
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
    <header
      className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl"
      data-oid="ogotedp"
    >
      <div
        className="container-app flex h-20 items-center justify-between gap-6"
        data-oid="_.hu0er"
      >
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          aria-label="Volver al inicio"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          data-oid="lax:f5z"
        >
          <Sparkle
            className="h-4 w-4 text-[hsl(var(--brand))]"
            aria-hidden="true"
            data-oid="wokn9vn"
          />

          {brand}
        </a>

        <nav className="hidden items-center gap-1 md:flex" data-oid="be9vaik">
          <div className="group relative" data-oid="bynyfwc">
            <MegaMenuTrigger
              label="Chamanismo"
              href="/chamanismo"
              data-oid="tzk99d3"
            />
            <MegaPanel columns={CHAMANISMO_COLS} data-oid="b8o15w2" />
          </div>

          <div className="group relative" data-oid="taiin2-">
            <MegaMenuTrigger
              label="Sonidos"
              href="/sonidos-ancestrales"
              data-oid="bzq8:j0"
            />
            <MegaPanel columns={SONIDOS_COLS} data-oid="mb3s0qv" />
          </div>

          <NavLink href="/guitarra-consciente" data-oid="lq1584t">
            Guitarra
          </NavLink>

          <div className="group relative" data-oid="c5nlzu8">
            <MegaMenuTrigger
              label="Terapias"
              href="/terapias"
              data-oid="x.l.4p1"
            />
            <MegaPanel columns={TERAPIAS_COLS} data-oid="0pn4eug" />
          </div>

          <div className="group relative" data-oid="fh8fdi.">
            <MegaMenuTrigger
              label="Recursos"
              href="/recursos"
              data-oid="h825a9f"
            />
            <MegaPanel columns={RECURSOS_COLS} data-oid="zd3:ql7" />
          </div>

          <NavLink href="/contacto" data-oid="hlul55w">
            Contacto
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex" data-oid="ilv_uq0">
          {user ? (
            <>
              <Link
                href="/protected"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/85 transition hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground"
                data-oid="cxwd4tt"
              >
                <User
                  className="h-4 w-4"
                  aria-hidden="true"
                  data-oid="jer1lqn"
                />
                Mi cuenta
              </Link>
              <form action={signOut} data-oid="nkjl6nv">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition hover:-translate-y-0.5 hover:bg-destructive/70 hover:text-destructive-foreground"
                  data-oid="sct7o4h"
                >
                  Salir
                </button>
              </form>
            </>
          ) : (
            <AuthButton variant="default" data-oid="iv7tb0n" />
          )}
          <ThemeSwitcher data-oid="kxj89-w" />
        </div>

        <div className="md:hidden" data-oid="0o7e5:2">
          <details
            id="mobile-menu"
            className="group relative"
            data-oid="j0t5:.c"
          >
            <summary
              className="list-none inline-flex items-center gap-2 rounded-full border border-border/60 bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition hover:bg-accent/60 hover:text-foreground"
              data-oid="q14_slb"
            >
              Menu
              <CaretDown
                className="h-3 w-3 transition group-open:rotate-180"
                data-oid="6hxc19:"
              />
            </summary>

            <div
              className="absolute right-0 mt-3 w-72 rounded-[1.75rem] border border-border/60 bg-black p-4 shadow-soft backdrop-blur-xl"
              data-oid="kn9k.10"
            >
              <nav className="space-y-1" data-oid=":t6sw:9">
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
                    data-oid="5mnuwyt"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="my-3 h-px bg-border/70" data-oid="8-s6whk" />

              {user ? (
                <>
                  <Link
                    href="/protected"
                    className="block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:bg-accent/60 hover:text-foreground"
                    data-oid="3fpxp.l"
                  >
                    Mi cuenta
                  </Link>
                  <form action={signOut} className="mt-1" data-oid="q.h6yew">
                    <button
                      type="submit"
                      className="w-full rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 transition hover:bg-destructive/70 hover:text-destructive-foreground"
                      data-oid="z2.wrxl"
                    >
                      Cerrar sesion
                    </button>
                  </form>
                </>
              ) : (
                <AuthButton
                  variant="default"
                  className="mt-1 w-full justify-center"
                  data-oid="4_8mn-j"
                />
              )}

              <div className="mt-3 flex justify-center" data-oid="icx6kks">
                <ThemeSwitcher data-oid="z27xts4" />
              </div>
            </div>
          </details>
        </div>
      </div>

      <MobileMenuCloser menuId="mobile-menu" data-oid="xeo9au5" />
    </header>
  );
}
