// app/contacto/page.tsx
import Link from "next/link";
import { submitContact } from "./actions";

export const metadata = {
  title: "Contacto | EDHUCO",
  description:
    "Escríbenos para reservas, terapias, formaciones y sesiones de sonido. Presencial en Valencia y online.",
};

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const ok = sp?.ok === "1";
  const error = sp?.error;

  return (
    <main className="min-h-screen" data-oid="64e.bs1">
      {/* HERO */}
      <section className="relative overflow-hidden" data-oid="i3paop.">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background"
          data-oid="hzv6-zc"
        />

        <div
          className="container-app mx-auto px-4 py-16 md:py-20"
          data-oid="omdshs4"
        >
          <p
            className="text-sm uppercase tracking-widest text-muted-foreground"
            data-oid="k0-2g6n"
          >
            Contacto
          </p>
          <h1
            className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight"
            data-oid="c0h0o6o"
          >
            Hablemos
          </h1>
          <p
            className="mt-4 max-w-3xl text-lg text-muted-foreground"
            data-oid="8qu08vb"
          >
            Reservas de sesiones, formaciones, eventos o cualquier consulta.
            Respondo normalmente en 24–48&nbsp;h.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
            data-oid="sqf923d"
          >
            <a
              href="#via-rapida"
              className="underline-offset-4 hover:underline"
              data-oid="upa5rx6"
            >
              Vías rápidas
            </a>
            <span aria-hidden data-oid="2amiw4c">
              •
            </span>
            <a
              href="#formulario"
              className="underline-offset-4 hover:underline"
              data-oid="sgdtx4."
            >
              Formulario
            </a>
            <span aria-hidden data-oid="lin4djy">
              •
            </span>
            <a
              href="#info"
              className="underline-offset-4 hover:underline"
              data-oid="o5.0og5"
            >
              Información útil
            </a>
          </div>
        </div>
      </section>

      {/* ALERTAS */}
      {(ok || error) && (
        <section aria-live="polite" data-oid="vk2yz1d">
          <div className="container-app mx-auto px-4" data-oid="vhtjn0j">
            {ok && (
              <div
                className="mt-4 rounded-lg border bg-emerald-500/10 px-4 py-3 text-sm"
                data-oid="f.ewq2w"
              >
                ✅ ¡Gracias! Tu mensaje se envió correctamente. Te responderé lo
                antes posible.
              </div>
            )}
            {error && (
              <div
                className="mt-4 rounded-lg border bg-red-500/10 px-4 py-3 text-sm"
                data-oid="atbnol_"
              >
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
      <section
        id="via-rapida"
        className="border-t bg-muted/20"
        data-oid="wvynn_r"
      >
        <div
          className="container-app mx-auto px-4 py-12 md:py-16"
          data-oid="954.jqk"
        >
          <h2 className="text-2xl md:text-3xl font-bold" data-oid="xgr7d6c">
            Vías rápidas
          </h2>
          <div
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-oid="tz0veul"
          >
            <CardAction
              title="WhatsApp"
              desc="Escríbeme directamente para dudas rápidas o reservas."
              href="https://wa.me/34644674392"
              label="Abrir WhatsApp"
              data-oid="f_5pitg"
            />

            <CardAction
              title="Email"
              desc="Comparte tu consulta o propuesta con detalle."
              href="mailto:hola@edhuco.com"
              label="Enviar email"
              data-oid="ko3-j.u"
            />

            <CardAction
              title="Instagram"
              desc="Sígueme y envía un DM para coordinar."
              href="https://www.instagram.com/sonidosancestrales8/"
              label="Abrir Instagram"
              data-oid="dms.9uh"
            />
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="border-t" data-oid="4.bsv8c">
        <div
          className="container-app mx-auto px-4 py-14 md:py-20"
          data-oid="w1nxl0v"
        >
          <h2 className="text-2xl md:text-3xl font-bold" data-oid="..xfsll">
            Envíame un mensaje
          </h2>
          <p
            className="mt-2 max-w-2xl text-muted-foreground"
            data-oid="_z4ytiv"
          >
            Completa el formulario y me pondré en contacto contigo. Si
            prefieres, usa cualquiera de las vías rápidas de arriba.
          </p>

          <form
            action={submitContact}
            className="mt-8 grid gap-6 sm:max-w-2xl"
            data-oid="wumjehm"
          >
            <div className="grid gap-2" data-oid="l5yd5gt">
              <label
                htmlFor="name"
                className="text-sm font-medium"
                data-oid="gcv-6eb"
              >
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
                data-oid="kf9f9iv"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2" data-oid="slcqzor">
              <div className="grid gap-2" data-oid="f61pr:d">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                  data-oid="x2fw4.q"
                >
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
                  data-oid="-8cmdjp"
                />
              </div>
              <div className="grid gap-2" data-oid="cx1ja9n">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium"
                  data-oid="wad8fw:"
                >
                  Teléfono (opcional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border bg-background px-3 py-2"
                  placeholder="+34 600 000 000"
                  autoComplete="tel"
                  data-oid="nt5l.av"
                />
              </div>
            </div>

            <div className="grid gap-2" data-oid="6pq4bui">
              <label
                htmlFor="topic"
                className="text-sm font-medium"
                data-oid="37:w3kx"
              >
                Tema
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full rounded-lg border bg-background px-3 py-2"
                defaultValue=""
                data-oid="_rr-zfs"
              >
                <option value="" disabled data-oid="bdim.hf">
                  Selecciona una opción
                </option>
                <option data-oid="ie3zo3e">Reserva de sesión</option>
                <option data-oid="1n78un5">Formación en chamanismo</option>
                <option data-oid="xm0ownq">Sonidos ancestrales</option>
                <option data-oid="xnx5lpk">Guitarra consciente</option>
                <option data-oid="7nd96a-">Colaboración / evento</option>
                <option data-oid="txa-_yl">Otro</option>
              </select>
            </div>

            <div className="grid gap-2" data-oid="km63_d8">
              <label
                htmlFor="message"
                className="text-sm font-medium"
                data-oid="4z-yy:o"
              >
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
                data-oid="u3fzwmc"
              />
            </div>

            <div className="flex items-start gap-3" data-oid="nwm0dae">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1"
                data-oid="73tbreb"
              />

              <label
                htmlFor="consent"
                className="text-sm text-muted-foreground"
                data-oid="8o2ra7-"
              >
                Acepto el tratamiento de mis datos para responder a mi consulta.
                <br data-oid="fj7hk7q" />
                <span className="text-xs" data-oid="yj00gz_">
                  Responsable: EDHUCO. Finalidad: atender tu solicitud.
                  Derechos: acceso, rectificación y supresión. Más info en la
                  política de privacidad.
                </span>
              </label>
            </div>

            <div className="flex gap-3" data-oid="jn04_aj">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-semibold text-background hover:opacity-90"
                data-oid="mz:lsv0"
              >
                Enviar mensaje
              </button>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg border px-5 py-3 font-medium hover:bg-muted/50"
                data-oid="nhsst5_"
              >
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* INFO ÚTIL */}
      <section id="info" className="border-t bg-muted/20" data-oid="me66v-9">
        <div
          className="container-app mx-auto px-4 py-12 md:py-16"
          data-oid="i.dr60:"
        >
          <h2 className="text-2xl md:text-3xl font-bold" data-oid="8jg.u:z">
            Información útil
          </h2>
          <div
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-oid="8nrrdy6"
          >
            <div
              className="rounded-2xl border p-6 bg-card/50"
              data-oid="177g57c"
            >
              <h3 className="font-semibold" data-oid="wyt79c3">
                Ubicación
              </h3>
              <p
                className="mt-2 text-sm text-muted-foreground"
                data-oid="6tat5ep"
              >
                Valencia (España). Consultar dirección al reservar. Posibilidad
                de sesiones online.
              </p>
            </div>
            <div
              className="rounded-2xl border p-6 bg-card/50"
              data-oid="13iz2zq"
            >
              <h3 className="font-semibold" data-oid="ckii1p0">
                Horarios
              </h3>
              <p
                className="mt-2 text-sm text-muted-foreground"
                data-oid="o1v09vc"
              >
                Citas con reserva previa. Intento adaptarme a tu disponibilidad.
              </p>
            </div>
            <div
              className="rounded-2xl border p-6 bg-card/50"
              data-oid="3vs67h-"
            >
              <h3 className="font-semibold" data-oid="ij_77uk">
                Política
              </h3>
              <p
                className="mt-2 text-sm text-muted-foreground"
                data-oid="bn5-n.3"
              >
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
    <article
      className="rounded-2xl border p-6 bg-card/50 backdrop-blur-sm"
      data-oid="r:khwhu"
    >
      <h3 className="font-semibold" data-oid="8ed2si.">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground" data-oid="51gqqy8">
        {desc}
      </p>
      <div className="mt-4" data-oid="dx._21u">
        <a
          href={href}
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          data-oid="nerok1s"
        >
          {label}
        </a>
      </div>
    </article>
  );
}
