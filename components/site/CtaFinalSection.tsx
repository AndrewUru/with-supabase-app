import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaFinalSection() {
  return (
    <section id="contacto" className="section text-center">
      <div className="container-app max-w-3xl">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-6">
          Da el siguiente paso en tu{" "}
          <span className="text-gradient">camino</span>
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Reserva tu plaza en nuestras terapias, formaciones o en el programa{" "}
          <strong>SOMRIU</strong>. Vive la experiencia EDHUCO y forma parte de
          una comunidad en crecimiento.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth/signup"
            className="btn inline-flex items-center gap-2 text-lg px-8 py-4 ring-brand-focus"
          >
            Unirme ahora <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/somriu"
            className="btn-outline inline-flex items-center gap-2 text-lg px-8 py-4 ring-brand-focus"
          >
            Conocer SOMRIU
          </Link>
        </div>
      </div>
    </section>
  );
}
