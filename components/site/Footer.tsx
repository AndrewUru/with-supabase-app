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
    <footer className="border-t border-border/60 py-12">
      <div className="container-app flex flex-col gap-6 text-center text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="text-base text-foreground">EDHUCO</p>
          <p>
            Acompanamos procesos de aprendizaje, bienestar y comunidad con herramientas sencillas y
            humanas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs">
          (c) {year} EDHUCO - Todos los derechos reservados. Hecho con cuidado desde Valencia.
        </p>
      </div>
    </footer>
  );
}
