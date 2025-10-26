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

function CaretDown({ className = "site-navbar__caret" }) {
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
      className="site-navbar__trigger"
      aria-haspopup="true"
      data-oid="wj_-8ck"
    >
      <span data-oid="e6spu_1">{label}</span>
      <CaretDown className="site-navbar__caret" data-oid="rp1-o1x" />
    </Link>
  );
}

function MegaPanel({ columns }: { columns: MegaColumn[] }) {
  return (
    <div
      className="site-navbar__panel"
      role="menu"
      data-oid="9_337mq"
    >
      <div className="site-navbar__panel-columns" data-oid="be9w29k">
        {columns.map((col) => (
          <div key={col.title} data-oid="3rohdd-">
            <h4 className="site-navbar__panel-title" data-oid="1605ip2">
              {col.title}
            </h4>
            <ul className="site-navbar__panel-links" data-oid="4vj.dzw">
              {col.links.map((link) => (
                <li key={link.href} data-oid="n.34xuj">
                  <Link
                    href={link.href}
                    className="site-navbar__panel-link"
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
    <Link href={href} className="site-navbar__link" data-oid="235_hmi">
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
    <header className="site-navbar" data-oid="ogotedp">
      <div className="site-navbar__inner container-app" data-oid="_.hu0er">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          aria-label="Volver al inicio"
          className="site-navbar__brand"
          data-oid="lax:f5z"
        >
          <Sparkle
            className="site-navbar__brand-icon"
            aria-hidden="true"
            data-oid="wokn9vn"
          />

          {brand}
        </a>

        <nav className="site-navbar__menu" data-oid="be9vaik">
          <div className="site-navbar__mega" data-oid="bynyfwc">
            <MegaMenuTrigger
              label="Chamanismo"
              href="/chamanismo"
              data-oid="tzk99d3"
            />
            <MegaPanel columns={CHAMANISMO_COLS} data-oid="b8o15w2" />
          </div>

          <div className="site-navbar__mega" data-oid="taiin2-">
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

          <div className="site-navbar__mega" data-oid="c5nlzu8">
            <MegaMenuTrigger
              label="Terapias"
              href="/terapias"
              data-oid="x.l.4p1"
            />
            <MegaPanel columns={TERAPIAS_COLS} data-oid="0pn4eug" />
          </div>

          <div className="site-navbar__mega" data-oid="fh8fdi.">
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

        <div className="site-navbar__actions" data-oid="ilv_uq0">
          {user ? (
            <>
              <Link
                href="/protected"
                className="site-navbar__account"
                data-oid="cxwd4tt"
              >
                <User
                  className="site-navbar__account-icon"
                  aria-hidden="true"
                  data-oid="jer1lqn"
                />
                Mi cuenta
              </Link>
              <form action={signOut} data-oid="nkjl6nv">
                <button
                  type="submit"
                  className="site-navbar__signout"
                  data-oid="sct7o4h"
                >
                  Salir
                </button>
              </form>
            </>
          ) : (
            <AuthButton
              variant="default"
              className="site-navbar__login"
              data-oid="iv7tb0n"
            />
          )}
          <ThemeSwitcher data-oid="kxj89-w" />
        </div>

        <div className="site-navbar__mobile" data-oid="0o7e5:2">
          <details
            id="mobile-menu"
            className="site-navbar__mobile-details"
            data-oid="j0t5:.c"
          >
            <summary
              className="site-navbar__mobile-toggle"
              data-oid="q14_slb"
            >
              Menu
              <CaretDown
                className="site-navbar__caret"
                data-oid="6hxc19:"
              />
            </summary>

            <div
              className="site-navbar__mobile-panel"
              data-oid="kn9k.10"
            >
              <nav className="site-navbar__mobile-links" data-oid=":t6sw:9">
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
                    className="site-navbar__mobile-link"
                    data-oid="5mnuwyt"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="site-navbar__divider" data-oid="8-s6whk" />

              {user ? (
                <>
                  <Link
                    href="/protected"
                    className="site-navbar__mobile-link"
                    data-oid="3fpxp.l"
                  >
                    Mi cuenta
                  </Link>
                  <form
                    action={signOut}
                    className="site-navbar__mobile-signout-form"
                    data-oid="q.h6yew"
                  >
                    <button
                      type="submit"
                      className="site-navbar__mobile-signout"
                      data-oid="z2.wrxl"
                    >
                      Cerrar sesion
                    </button>
                  </form>
                </>
              ) : (
                <AuthButton
                  variant="default"
                  className="site-navbar__mobile-auth site-navbar__login"
                  data-oid="4_8mn-j"
                />
              )}

              <div className="site-navbar__mobile-footer" data-oid="icx6kks">
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
