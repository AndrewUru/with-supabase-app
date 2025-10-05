// app/protected/layout.tsx
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";

type Props = { children: React.ReactNode };

export default function ProtectedLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Skip link para navegación por teclado */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-3 focus:py-2 focus:bg-foreground focus:text-background"
      >
        Ir al contenido
      </a>

      {/* Header fijo de toda la anchura */}

      <div className="mx-auto max-w-6xl">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Izquierda: espacio para marca/breadcrumb si lo necesitas */}
          <div className="flex items-center gap-3">
            {/* Placeholder para Brand o breadcrumb */}
          </div>

          {/* Derecha: avisos/env/theme/etc. */}
          <div className="flex items-center gap-3">
            {!hasEnvVars ? <EnvVarWarning /> : null}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <section
        id="content"
        className="
          mx-auto max-w-6xl px-4 py-8
          /* Hace que los anclajes no queden ocultos bajo el header */
          [scroll-margin-top:7rem]
          sm:[scroll-margin-top:8rem]
        "
      >
        <div className=" ">{children}</div>
      </section>
    </main>
  );
}
