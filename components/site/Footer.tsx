import Link from "next/link";

const NAV_LINKS = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#formaciones", label: "Formaciones" },
  { href: "/#viajes", label: "Viajes" },
  { href: "/#contacto", label: "Contacto" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacidad" },
  { href: "/terms", label: "Terminos" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-12" data-oid="jjwdwhr">
      <div
        className="container-app flex flex-col gap-6 text-center text-sm text-muted-foreground"
        data-oid="2i2t.qx"
      >
        <div className="space-y-2" data-oid="a:g:e.v">
          <p className="text-base text-foreground" data-oid="w6ghf:r">
            EDHUCO
          </p>
          <p data-oid="1ypu6s0">
            Acompanamos procesos de aprendizaje, bienestar y comunidad con
            herramientas sencillas y humanas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4" data-oid="4y4_8gl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
              data-oid="42vw723"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4" data-oid="zqzsyqs">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
              data-oid="8klt8a4"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs" data-oid="ouiwv9p">
          (c) {year} EDHUCO - Todos los derechos reservados. Hecho con cuidado
          desde Valencia.
        </p>
      </div>
    </footer>
  );
}
