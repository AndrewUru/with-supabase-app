// components/site/Navbar.tsx
import Link from "next/link";
import Script from "next/script";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type NavbarProps = { brand?: string };

type MegaLink = { label: string; href: string; desc?: string };
type MegaColumn = { title: string; links: MegaLink[] };

const CHAMANISMO_COLS: MegaColumn[] = [
  {
    title: "Formación",
    links: [
      {
        label: "Formación anual",
        href: "/chamanismo#formacion",
        desc: "Programa integral desde octubre",
      },
      {
        label: "Módulos y talleres",
        href: "/chamanismo#talleres",
        desc: "Encuentros temáticos",
      },
      { label: "Agenda", href: "/chamanismo#agenda", desc: "Próximas fechas" },
    ],
  },
  {
    title: "Experiencias",
    links: [
      {
        label: "Viajes chamánicos",
        href: "/viajes-chamanicos",
        desc: "Explora tu mundo interior",
      },
      {
        label: "Ceremonias",
        href: "/chamanismo#ceremonias",
        desc: "Cacao, tambor, cantos",
      },
      {
        label: "Retiros",
        href: "/chamanismo#retiros",
        desc: "Fines de semana y residenciales",
      },
    ],
  },
  {
    title: "Recursos",
    links: [
      {
        label: "Biblioteca completa",
        href: "/recursos",
        desc: "Gratis y Premium",
      },
      {
        label: "Podcast / Audio",
        href: "/recursos?tipo=audio",
        desc: "Prácticas guiadas",
      },
      {
        label: "Artículos",
        href: "/blog?tag=chamanismo",
        desc: "Lecturas y notas",
      },
      {
        label: "Meditaciones",
        href: "/recursos?categoria=Meditaciones",
        desc: "Atención y presencia",
      },
    ],
  },
];

const SONIDOS_COLS: MegaColumn[] = [
  {
    title: "Sesiones",
    links: [
      {
        label: "Viaje sonoro",
        href: "/sonidos-ancestrales#viaje",
        desc: "Baño de sonido meditativo",
      },
      {
        label: "Tameana grupal",
        href: "/sonidos-ancestrales#tameana",
        desc: "Cuarzos y vibración",
      },
      {
        label: "1:1 personalizada",
        href: "/sonidos-ancestrales#individual",
        desc: "Enfoque a medida",
      },
    ],
  },
  {
    title: "Aprendizaje",
    links: [
      {
        label: "Talleres",
        href: "/sonidos-ancestrales#talleres",
        desc: "Ritmo, voz y escucha",
      },
      {
        label: "Guitarra consciente",
        href: "/guitarra-consciente",
        desc: "Crear desde la presencia",
      },
      {
        label: "Recursos (audio gratis)",
        href: "/recursos?acceso=gratis&tipo=audio",
        desc: "Audios y guías",
      },
      {
        label: "Música de práctica",
        href: "/recursos?categoria=Música",
        desc: "Pistas y ambientes",
      },
    ],
  },
  {
    title: "Explora",
    links: [
      { label: "Calendario", href: "/agenda", desc: "Fechas y reservas" },
      {
        label: "Testimonios",
        href: "/sonidos-ancestrales#testimonios",
        desc: "Experiencias reales",
      },
      { label: "Contacto", href: "/contacto", desc: "Hablemos" },
    ],
  },
];

const TERAPIAS_COLS: MegaColumn[] = [
  {
    title: "Terapias",
    links: [
      {
        label: "Acompañamiento emocional",
        href: "/terapias#emocional",
        desc: "Gestión y claridad",
      },
      {
        label: "Bioenergética / Corporal",
        href: "/terapias#corporal",
        desc: "Cuerpo y presencia",
      },
      {
        label: "Lecturas / Orientación",
        href: "/terapias#lecturas",
        desc: "Brújula interior",
      },
    ],
  },
  {
    title: "Cómo funciona",
    links: [
      {
        label: "Reserva y tarifas",
        href: "/terapias#reservas",
        desc: "Formatos y precios",
      },
      {
        label: "Primera sesión",
        href: "/terapias#primera",
        desc: "Qué esperar",
      },
      {
        label: "Política y ética",
        href: "/terapias#etica",
        desc: "Cuidado y límites",
      },
    ],
  },
  {
    title: "Recursos",
    links: [
      {
        label: "Biblioteca de recursos",
        href: "/recursos",
        desc: "Gratis y Premium",
      },
      {
        label: "Meditaciones",
        href: "/recursos?categoria=Meditaciones",
        desc: "Regulación y calma",
      },
      {
        label: "Lecturas (guías PDF)",
        href: "/recursos?categoria=Lecturas",
        desc: "Material imprimible",
      },
    ],
  },
];

// -------- Server Action: cerrar sesión --------
export async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

function MegaMenuTrigger({ label, href }: { label: string; href?: string }) {
  return (
    <div className="relative group focus-within:outline-none">
      <Link
        href={href ?? "#"}
        className="group/btn relative inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent/60 hover:scale-105 focus-visible:outline-none focus-visible:ring-brand"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>{label}</span>
        <span
          aria-hidden
          className="text-xs opacity-60 group-hover/btn:opacity-100 transition"
        >
          ▾
        </span>
        <span className="pointer-events-none absolute left-1/2 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-brand to-accent-cool rounded-full transition-all duration-300 group-hover/btn:w-3/4 group-hover/btn:-translate-x-1/2" />
      </Link>
    </div>
  );
}

function MegaPanel({
  columns,
  align = "center",
}: {
  columns: MegaColumn[];
  align?: "center" | "left" | "right";
}) {
  const alignClass =
    align === "left"
      ? "left-0 -translate-x-0"
      : align === "right"
      ? "right-0 translate-x-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200
                  absolute top-full ${alignClass} mt-3 w-[min(96vw,980px)] z-50`}
    >
      <div className="rounded-2xl border border-border/50 bg-popover/95 backdrop-blur-xl shadow-soft p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block rounded-lg px-3 py-2 hover:bg-accent/50 transition"
                    >
                      <div className="text-sm font-medium">{l.label}</div>
                      {l.desc && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {l.desc}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------- Navbar (Server Component) -------
export default async function Navbar({ brand = "EDHUCO" }: NavbarProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 bg-background/95 transition-all duration-300">
      <div className="container-app">
        {/* Primera fila: Logo y acciones */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 border-b border-border/30">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Ir a inicio"
            className="group shrink-0 px-2 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-brand"
          >
            <span
              className="
                relative z-10 font-extrabold text-xl tracking-tight
                text-foreground isolate md:bg-clip-text md:text-transparent
                md:bg-[linear-gradient(90deg,var(--grad-from),var(--grad-to))]
                md:[--grad-from:theme(colors.indigo.500)]
                md:[--grad-to:theme(colors.cyan.400)]
                md:hover:[--grad-from:theme(colors.cyan.400)]
                md:hover:[--grad-to:theme(colors.amber.400)]
              "
            >
              {brand}
            </span>
          </Link>

          {/* Espacio central vacío */}
          <div className="min-w-0" />

          {/* Acciones */}
          <div className="flex items-center gap-3">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/protected"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-semibold bg-card/50 backdrop-blur-sm transition-all duration-200 hover:bg-accent/80 hover:border-border hover:shadow-soft hover:scale-105 focus-visible:outline-none focus-visible:ring-brand"
              >
                <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                  👤
                </span>
                Área personal
              </Link>

              <div className="surface px-1 py-1">
                <AuthButton
                  variant="avatar"
                  className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200 hover:scale-105"
                />
              </div>

              {/* Botón Cerrar sesión visible cuando hay usuario */}
              {user && (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-medium bg-card/70 hover:bg-destructive/80 hover:text-destructive-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-brand"
                    aria-label="Cerrar sesión"
                    title="Cerrar sesión"
                  >
                    ⎋ Cerrar sesión
                  </button>
                </form>
              )}

              <div className="glass rounded-xl p-2">
                <ThemeSwitcher />
              </div>
            </div>

            {/* Móvil */}
            <div className="md:hidden">
              <details id="mobile-menu" className="group relative">
                <summary className="list-none inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-medium bg-card/80 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-accent/80 hover:shadow-soft hover:scale-105 focus-visible:outline-none focus-visible:ring-brand group-open:bg-accent group-open:shadow-soft group-open:scale-105">
                  <span className="block size-5 transition-transform duration-200 group-open:rotate-90">
                    <span className="i-lucide-menu block size-full" />
                  </span>
                  Menú
                </summary>

                <div className="absolute right-0 mt-3 w-[90vw] max-w-[340px] rounded-2xl z-50 border border-border/50 bg-popover/95 backdrop-blur-xl p-3 shadow-soft animate-in slide-in-from-top-2 fade-in-0 duration-200">
                  <div className="space-y-1">
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
                      {
                        href: "/meditacion-gestion-emocional",
                        label: "Meditación y Gestión Emocional",
                      },
                      { href: "/terapias", label: "Terapias" },
                      { href: "/contacto", label: "Contacto" },
                      { href: "/recursos", label: "Recursos" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent/60 hover:scale-105"
                      >
                        <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                          {item.label}
                        </span>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <Link
                    href="/protected"
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent/60 hover:scale-105"
                  >
                    <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                      👤
                    </span>
                    Área personal
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      →
                    </span>
                  </Link>

                  <div className="mt-3 surface p-2">
                    <AuthButton
                      variant="avatar"
                      className="w-full justify-center overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200 hover:scale-105"
                    />
                  </div>

                  {/* Botón Cerrar sesión en móvil */}
                  {user && (
                    <form
                      action={signOut}
                      data-close-menu-on-submit
                      className="mt-2"
                    >
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 px-4 py-3 text-sm font-medium bg-card/70 hover:bg-destructive/80 hover:text-destructive-foreground transition-all duration-200"
                        aria-label="Cerrar sesión"
                        title="Cerrar sesión"
                      >
                        ⎋ Cerrar sesión
                      </button>
                    </form>
                  )}

                  <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3 bg-accent/30">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-base">🎨</span>
                      Tema
                    </span>
                    <ThemeSwitcher />
                  </div>

                  <div className="mt-3 mx-auto w-12 h-1 bg-gradient-to-r from-brand to-accent-cool rounded-full opacity-40" />
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Segunda fila: Navegación principal */}
        <div className="py-2">
          <nav className="hidden md:flex items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <div className="relative group">
                <MegaMenuTrigger label="Chamanismo" />
                <MegaPanel columns={CHAMANISMO_COLS} />
              </div>

              <div className="relative group">
                <MegaMenuTrigger label="Sonidos Ancestrales" />
                <MegaPanel columns={SONIDOS_COLS} />
              </div>

              <Link
                href="/guitarra-consciente"
                className="group relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent/60 hover:scale-105 focus-visible:outline-none focus-visible:ring-brand"
              >
                <span className="flex items-center gap-2">
                  Guitarra Consciente
                </span>
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-brand to-accent-cool rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2" />
              </Link>

              <div className="h-6 w-px bg-border/50 mx-2" />

              <div className="relative group">
                <MegaMenuTrigger label="Meditación" />
                <MegaPanel
                  columns={[
                    {
                      title: "Práctica",
                      links: [
                        {
                          label: "Sesiones guiadas",
                          href: "/meditacion-gestion-emocional#sesiones",
                          desc: "Individual y grupal",
                        },
                        {
                          label: "Programa 8 semanas",
                          href: "/meditacion-gestion-emocional#programa",
                          desc: "Hábitos y herramientas",
                        },
                        {
                          label: "Material descargable",
                          href: "/recursos#meditacion",
                          desc: "Audios y fichas",
                        },
                      ],
                    },
                    {
                      title: "Aprende",
                      links: [
                        {
                          label: "Artículos",
                          href: "/blog?tag=gestion-emocional",
                          desc: "Teoría y práctica",
                        },
                        {
                          label: "Agenda",
                          href: "/agenda?cat=meditacion",
                          desc: "Próximos encuentros",
                        },
                        {
                          label: "Contacto",
                          href: "/contacto",
                          desc: "Escríbenos",
                        },
                      ],
                    },
                  ]}
                  align="left"
                />
              </div>

              <div className="relative group">
                <MegaMenuTrigger label="Terapias" />
                <MegaPanel columns={TERAPIAS_COLS} />
              </div>

              <Link
                href="/contacto"
                className="group relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent/60 hover:scale-105 focus-visible:outline-none focus-visible:ring-brand"
              >
                <span className="flex items-center gap-2">Contacto</span>
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-brand to-accent-cool rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2" />
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Cerrar menú móvil al hacer click en un enlace o al enviar el logout */}
      <Script id="close-mobile-menu" strategy="afterInteractive">
        {`
  (function () {
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;

    const summary = menu.querySelector("summary");
    const closeMenu = () => {
      menu.removeAttribute("open");
      // Evita que el foco en el summary lo vuelva a abrir
      if (summary && typeof summary.blur === "function") summary.blur();
    };

    // 1) Cierra al tocar/clicar cualquier enlace dentro del menú (captura también toques en móvil)
    menu.addEventListener("click", function (e) {
      const target = e.target;
      const link = target && (target.closest ? target.closest("a") : null);
      if (link) closeMenu();
    }, true);

    // 2) Cierra al enviar el formulario de logout (si existe)
    menu.addEventListener("submit", function () { closeMenu(); });

    // 3) Cierra si se hace click/tap fuera del contenedor mientras está abierto
    document.addEventListener("click", function (e) {
      if (!menu.open) return;
      if (!menu.contains(e.target)) closeMenu();
    }, true);

    // 4) Cierra con tecla Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.open) closeMenu();
    });
  })();
`}
      </Script>
    </header>
  );
}
