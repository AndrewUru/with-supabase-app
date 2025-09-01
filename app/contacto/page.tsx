// app/contacto/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { submitContact } from "./actions"; // 👈 importar aquí

export const metadata = {
  title: "Contacto | EDHUCO",
  description:
    "Escríbenos para reservas, terapias, formaciones y sesiones de sonido. Presencial en Valencia y online.",
};

// ---- Server Action: guarda mensaje y redirige con estado ----
export async function submitContact(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const topic = String(formData.get("topic") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const consent = formData.get("consent") === "on";

  if (!name || !email || !message || !consent) {
    redirect("/contacto?error=campos");
  }

  try {
    const supabase = await createClient();

    // Asegúrate de tener la tabla 'contact_messages' en tu Supabase:
    // create table contact_messages (
    //   id uuid primary key default gen_random_uuid(),
    //   name text not null,
    //   email text not null,
    //   phone text,
    //   topic text,
    //   message text not null,
    //   created_at timestamp with time zone default now()
    // );
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone,
      topic,
      message,
    });

    if (error) {
      // Si falla (tabla no existe o sin permisos), redirige con error
      redirect("/contacto?error=server");
    }

    redirect("/contacto?ok=1");
  } catch {
    redirect("/contacto?error=server");
  }
}

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const ok = sp?.ok === "1";
  const error = sp?.error;

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="container-app mx-auto px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Contacto
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Hablemos
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Reservas de sesiones, formaciones, eventos o cualquier consulta.
            Respondo normalmente en 24–48&nbsp;h.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a
              href="#via-rapida"
              className="underline-offset-4 hover:underline"
            >
              Vías rápidas
            </a>
            <span aria-hidden>•</span>
            <a
              href="#formulario"
              className="underline-offset-4 hover:underline"
            >
              Formulario
            </a>
            <span aria-hidden>•</span>
            <a href="#info" className="underline-offset-4 hover:underline">
              Información útil
            </a>
          </div>
        </div>
      </section>

      {/* ALERTAS */}
      {(ok || error) && (
        <section aria-live="polite">
          <div className="container-app mx-auto px-4">
            {ok && (
              <div className="mt-4 rounded-lg border bg-emerald-500/10 px-4 py-3 text-sm">
                ✅ ¡Gracias! Tu mensaje se envió correctamente. Te responderé lo
                antes posible.
              </div>
            )}
            {error && (
              <div className="mt-4 rounded-lg border bg-red-500/10 px-4 py-3 text-sm">
                ⚠️ No se pudo enviar el mensaje
                {error === "campos"
                  ? ": revisa los campos obligatorios."
                  : ". Inténtalo de nuevo en unos minutos."}
              </div>
            )}
          </div>
        </section>
      )}

      {/* VÍAS RÁPIDAS */}
      <section id="via-rapida" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Vías rápidas</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardAction
              title="WhatsApp"
              desc="Escríbeme directamente para dudas rápidas o reservas."
              href="https://wa.me/34644674392" // cambia al número correcto
              label="Abrir WhatsApp"
            />
            <CardAction
              title="Email"
              desc="Comparte tu consulta o propuesta con detalle."
              href="mailto:hola@edhuco.com" // cambia al correo real
              label="Enviar email"
            />
            <CardAction
              title="Instagram"
              desc="Sígueme y envía un DM para coordinar."
              href="https://www.instagram.com/sonidosancestrales8/" // cambia si hace falta
              label="Abrir Instagram"
            />
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="border-t">
        <div className="container-app mx-auto px-4 py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold">Envíame un mensaje</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Completa el formulario y me pondré en contacto contigo. Si
            prefieres, usa cualquiera de las vías rápidas de arriba.
          </p>

          <form action={submitContact} className="mt-8 grid gap-6 sm:max-w-2xl">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre y apellidos *
              </label>
              <input
                id="name"
                name="name"
                required
                minLength={2}
                className="w-full rounded-lg border bg-background px-3 py-2"
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border bg-background px-3 py-2"
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Teléfono (opcional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border bg-background px-3 py-2"
                  placeholder="+34 600 000 000"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="topic" className="text-sm font-medium">
                Tema
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full rounded-lg border bg-background px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option>Reserva de sesión</option>
                <option>Formación en chamanismo</option>
                <option>Sonidos ancestrales</option>
                <option>Guitarra consciente</option>
                <option>Colaboración / evento</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={6}
                className="w-full rounded-lg border bg-background px-3 py-2"
                placeholder="Cuéntame cómo puedo ayudarte…"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1"
              />
              <label
                htmlFor="consent"
                className="text-sm text-muted-foreground"
              >
                Acepto el tratamiento de mis datos para responder a mi consulta.
                <br />
                <span className="text-xs">
                  Responsable: EDHUCO. Finalidad: atender tu solicitud.
                  Derechos: acceso, rectificación y supresión. Más info en la
                  política de privacidad.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
              >
                Enviar mensaje
              </button>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
              >
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* INFO ÚTIL */}
      <section id="info" className="border-t bg-muted/20">
        <div className="container-app mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Información útil</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">Ubicación</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Valencia (España). Consultar dirección al reservar. Posibilidad
                de sesiones online.
              </p>
            </div>
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">Horarios</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Citas con reserva previa. Intento adaptarme a tu disponibilidad.
              </p>
            </div>
            <div className="rounded-2xl border p-6 bg-card/50">
              <h3 className="font-semibold">Política</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Las terapias no sustituyen atención médica. Aviso con 24&nbsp;h
                para cambios/cancelaciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- UI helper ---------- */
function CardAction({
  title,
  desc,
  href,
  label,
}: {
  title: string;
  desc: string;
  href: string;
  label: string;
}) {
  return (
    <article className="rounded-2xl border p-6 bg-card/50 backdrop-blur-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-4">
        <a
          href={href}
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted/50"
        >
          {label}
        </a>
      </div>
    </article>
  );
}
