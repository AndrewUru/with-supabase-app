// app/precios/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Precios | EDHUCO",
  description:
    "Elige tu plan: acceso Gratis o Premium con toda la biblioteca y contenidos exclusivos.",
  openGraph: {
    title: "Precios | EDHUCO",
    description:
      "Comienza gratis o pasa a Premium para desbloquear todo el contenido.",
    url: "/precios",
    siteName: "EDHUCO",
  },
};

type SubscriptionPlan = "free" | "basic" | "pro" | "vip";
type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete";

type Subscription = {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  provider: "stripe" | "manual" | null; // o "paypal" si lo usas
};

const featuresFree: string[] = [
  "Acceso a recursos básicos (audios y PDFs introductorios)",
  "Noticias y novedades de la plataforma",
  "Acceso a eventos abiertos (según disponibilidad)",
];

const featuresPremium: string[] = [
  "Acceso completo a biblioteca (audios, vídeos y PDFs)",
  "Nuevos contenidos y bonus incluidos",
  "Actualizaciones continuas",
  "Prioridad en soporte y futuras funcionalidades",
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span
        aria-hidden
        className="mt-1 inline-block h-4 w-4 rounded-full border"
      />
      <span>{children}</span>
    </li>
  );
}

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let activePlan: SubscriptionPlan = "free";

  if (user) {
    const { data: sub }: { data: Subscription | null } = await supabase
      .from("subscriptions")
      .select(
        "id,user_id,plan,status,current_period_end,cancel_at_period_end,provider"
      )
      .eq("user_id", user.id)
      .in("status", ["active", "trialing", "past_due"])
      .order("current_period_end", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sub?.plan) activePlan = sub.plan;
  }

  const isPremium =
    activePlan === "vip" || activePlan === "pro" || activePlan === "basic";

  return (
    <main className="container-app section">
      {/* Hero */}
      <header className="container-app-narrow text-center">
        <p className="text-sm text-muted-foreground">Planes EDHUCO</p>
        <h1 className="mt-2 text-gradient font-semibold text-4xl md:text-5xl">
          Elige tu plan
        </h1>
        <p className="mt-3 text-muted-foreground text-balance">
          Empieza gratis y, cuando quieras, pasa a Premium para desbloquear todo
          el contenido.
        </p>
      </header>

      {/* Cards */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* FREE */}
        <article className="card surface radius p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Gratis</h2>
            <p className="text-sm text-muted-foreground">
              Empieza hoy sin coste.
            </p>
          </div>

          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold">0€</span>
            <span className="text-sm text-muted-foreground">/ mes</span>
          </div>

          <ul className="mb-6 space-y-2">
            {featuresFree.map((f) => (
              <CheckItem key={f}>{f}</CheckItem>
            ))}
          </ul>

          <div className="mt-auto">
            {user ? (
              <Link
                href="/protected"
                className="btn-outline w-full ring-brand-focus"
              >
                {isPremium ? "Tienes Premium activo" : "Seguir con plan Gratis"}
              </Link>
            ) : (
              <Link href="/auth/signup" className="btn-outline w-full">
                Crear cuenta gratis
              </Link>
            )}
          </div>
        </article>

        {/* PREMIUM */}
        <article className="card surface-strong radius p-6 ring-1 ring-[hsl(var(--brand)/0.18)] relative">
          <div className="absolute right-4 top-4 rounded-full border px-3 py-1 text-xs bg-background/80">
            Recomendado
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Premium</h2>
            <p className="text-sm text-muted-foreground">
              Todo EDHUCO, sin límites.
            </p>
          </div>

          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold">22€</span>
            <span className="text-sm text-muted-foreground">/ mes</span>
          </div>

          <ul className="mb-6 space-y-2">
            {featuresPremium.map((f) => (
              <CheckItem key={f}>{f}</CheckItem>
            ))}
          </ul>

          <div className="mt-auto">
            {user ? (
              isPremium ? (
                <button
                  className="btn w-full cursor-not-allowed opacity-60"
                  disabled
                  aria-disabled="true"
                >
                  Plan Premium activo
                </button>
              ) : (
                <form action="/api/paypal/subscribe" method="POST">
                  <input type="hidden" name="plan" value="premium-monthly" />
                  <button type="submit" className="btn w-full">
                    Activar Premium
                  </button>
                </form>
              )
            ) : (
              <Link href="/auth/signup?plan=premium" className="btn w-full">
                Crear cuenta y activar Premium
              </Link>
            )}
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Cancela cuando quieras. Facturación y gestión desde tu área
            personal.
          </p>
        </article>
      </section>

      {/* FAQs */}
      <section className="container-app-narrow mt-12 grid gap-6 md:grid-cols-2">
        <div className="card p-5">
          <h3 className="mb-2 text-sm font-semibold">¿Cómo pago Premium?</h3>
          <p className="text-sm text-muted-foreground">
            Usamos PayPal para las suscripciones mensuales. Una vez activado,
            verás tu estado en <strong>Tu área personal</strong>.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="mb-2 text-sm font-semibold">
            ¿Puedo cambiar de plan?
          </h3>
          <p className="text-sm text-muted-foreground">
            Sí. Puedes pasar de Gratis a Premium cuando quieras y gestionar la
            suscripción desde el portal de facturación.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="container-app-narrow mt-10 text-center">
        <div className="glass radius p-6 shadow-soft">
          <h3 className="text-lg font-semibold">¿Tienes dudas?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Escríbenos y te ayudamos a elegir el plan ideal para ti.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/contacto" className="btn">
              Contacto
            </Link>
            <Link href="/protected" className="btn-outline">
              Ver mi área personal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
