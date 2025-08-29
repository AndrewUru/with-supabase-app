// components/protected-sub-nav.tsx
"use client"; // Marca esto como un Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/protected", label: "Resumen" },
  { href: "/protected/notes", label: "Notas" },
  { href: "/protected/events", label: "Agenda" },
  { href: "/protected/bookings", label: "Reservas" },
];

export function ProtectedSubNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <ul className="flex flex-nowrap items-center gap-1 py-2 overflow-x-auto scrollbar-hide sm:flex-wrap">
          {navItems.map((item) => (
            <li key={item.href} className="flex-shrink-0">
              <Link
                href={item.href}
                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/20 data-[active=true]:bg-foreground/10"
                data-active={pathname === item.href ? "true" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
