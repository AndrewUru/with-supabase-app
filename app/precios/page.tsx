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
    <li className="flex items-start gap-2 text-sm" data-oid="oj4qt_-">
      <span
        aria-hidden
        className="mt-1 inline-block h-4 w-4 rounded-full border"
        data-oid="2rj.x:5"
      />

      <span data-oid="yuwpd.4">{children}</span>
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
        "id,user_id,plan,status,current_period_end,cancel_at_period_end,provider",
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
    <main className="container-app section" data-oid="9e1ea4a">
      {/* Hero */}
      <header className="container-app-narrow text-center" data-oid="plxenr9">
        <p className="text-sm text-muted-foreground" data-oid="m:u5cf5">
          Planes EDHUCO
        </p>
        <h1
          className="mt-2 text-gradient font-semibold text-4xl md:text-5xl"
          data-oid="ot_-0ie"
        >
          Elige tu plan
        </h1>
        <p
          className="mt-3 text-muted-foreground text-balance"
          data-oid="nrnx..6"
        >
          Empieza gratis y, cuando quieras, pasa a Premium para desbloquear todo
          el contenido.
        </p>
      </header>

      {/* Cards */}
      <section className="mt-10 grid gap-6 md:grid-cols-2" data-oid="t5mwsg5">
        {/* FREE */}
        <article className="card surface radius p-6" data-oid="fk53wnz">
          <div className="mb-4" data-oid="dhetk54">
            <h2
              className="text-xl font-semibold tracking-tight"
              data-oid="-mpaisw"
            >
              Gratis
            </h2>
            <p className="text-sm text-muted-foreground" data-oid="19me:cr">
              Empieza hoy sin coste.
            </p>
          </div>

          <div className="mb-6 flex items-baseline gap-2" data-oid="m6v4i-s">
            <span className="text-4xl font-bold" data-oid="sct53tz">
              0€
            </span>
            <span className="text-sm text-muted-foreground" data-oid="mhijm4o">
              / mes
            </span>
          </div>

          <ul className="mb-6 space-y-2" data-oid="4:xh4sd">
            {featuresFree.map((f) => (
              <CheckItem key={f} data-oid="b4kifzh">
                {f}
              </CheckItem>
            ))}
          </ul>

          <div className="mt-auto" data-oid="k:i5tep">
            {user ? (
              <Link
                href="/protected"
                className="btn-outline w-full ring-brand-focus"
                data-oid="uczil3o"
              >
                {isPremium ? "Tienes Premium activo" : "Seguir con plan Gratis"}
              </Link>
            ) : (
              <Link
                href="/auth/signup"
                className="btn-outline w-full"
                data-oid="giey_hp"
              >
                Crear cuenta gratis
              </Link>
            )}
          </div>
        </article>

        {/* PREMIUM */}
        <article
          className="card surface-strong radius p-6 ring-1 ring-[hsl(var(--brand)/0.18)] relative"
          data-oid=":6s4lq6"
        >
          <div
            className="absolute right-4 top-4 rounded-full border px-3 py-1 text-xs bg-background/80"
            data-oid="7i4kofd"
          >
            Recomendado
          </div>

          <div className="mb-4" data-oid="3sr26qh">
            <h2
              className="text-xl font-semibold tracking-tight"
              data-oid="..x21g3"
            >
              Premium
            </h2>
            <p className="text-sm text-muted-foreground" data-oid="bpeu:ye">
              Todo EDHUCO, sin límites.
            </p>
          </div>

          <div className="mb-6 flex items-baseline gap-2" data-oid="p_0g0:s">
            <span className="text-4xl font-bold" data-oid="3npinqf">
              22€
            </span>
            <span className="text-sm text-muted-foreground" data-oid="aj0oupn">
              / mes
            </span>
          </div>

          <ul className="mb-6 space-y-2" data-oid="zal9.gf">
            {featuresPremium.map((f) => (
              <CheckItem key={f} data-oid="hqwm-.v">
                {f}
              </CheckItem>
            ))}
          </ul>

          <div className="mt-auto" data-oid="74jqhtv">
            {user ? (
              isPremium ? (
                <button
                  className="btn w-full cursor-not-allowed opacity-60"
                  disabled
                  aria-disabled="true"
                  data-oid="wmmeq_-"
                >
                  Plan Premium activo
                </button>
              ) : (
                <form
                  action="/api/paypal/subscribe"
                  method="POST"
                  data-oid="7z3e2yi"
                >
                  <input
                    type="hidden"
                    name="plan"
                    value="premium-monthly"
                    data-oid="ccazz_5"
                  />

                  <button
                    type="submit"
                    className="btn w-full"
                    data-oid="7lzsa9f"
                  >
                    Activar Premium
                  </button>
                </form>
              )
            ) : (
              <Link
                href="/auth/signup?plan=premium"
                className="btn w-full"
                data-oid="jcd3cb."
              >
                Crear cuenta y activar Premium
              </Link>
            )}
          </div>

          <p
            className="mt-3 text-center text-xs text-muted-foreground"
            data-oid="biulepv"
          >
            Cancela cuando quieras. Facturación y gestión desde tu área
            personal.
          </p>
        </article>
      </section>

      {/* FAQs */}
      <section
        className="container-app-narrow mt-12 grid gap-6 md:grid-cols-2"
        data-oid=":o:_c4w"
      >
        <div className="card p-5" data-oid="tdxhr6s">
          <h3 className="mb-2 text-sm font-semibold" data-oid="ax7.cic">
            ¿Cómo pago Premium?
          </h3>
          <p className="text-sm text-muted-foreground" data-oid="8rk8pq2">
            Usamos PayPal para las suscripciones mensuales. Una vez activado,
            verás tu estado en{" "}
            <strong data-oid="i-qm_ke">Tu área personal</strong>.
          </p>
        </div>
        <div className="card p-5" data-oid="-ch2bhs">
          <h3 className="mb-2 text-sm font-semibold" data-oid=".ugqupj">
            ¿Puedo cambiar de plan?
          </h3>
          <p className="text-sm text-muted-foreground" data-oid="_4aodad">
            Sí. Puedes pasar de Gratis a Premium cuando quieras y gestionar la
            suscripción desde el portal de facturación.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="container-app-narrow mt-10 text-center"
        data-oid="l:uw8x5"
      >
        <div className="glass radius p-6 shadow-soft" data-oid="7thf4_8">
          <h3 className="text-lg font-semibold" data-oid="z31u3x1">
            ¿Tienes dudas?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground" data-oid="uitdgha">
            Escríbenos y te ayudamos a elegir el plan ideal para ti.
          </p>
          <div
            className="mt-4 flex flex-wrap justify-center gap-3"
            data-oid="oijz-j2"
          >
            <Link href="/contacto" className="btn" data-oid="5-31ymg">
              Contacto
            </Link>
            <Link href="/protected" className="btn-outline" data-oid="3wwa-0l">
              Ver mi área personal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
