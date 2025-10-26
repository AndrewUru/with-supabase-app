export const metadata = {
  title: "Trips",
  description: "Viajes y experiencias.",
};

export default function TripsPage() {
  return (
    <section className="p-6" data-oid="714ls4c">
      <header className="mb-6" data-oid="2j5c7r7">
        <h1 className="text-2xl font-semibold" data-oid=".5eh6-b">
          Trips
        </h1>
        <p className="text-sm text-muted-foreground" data-oid="jnhbsc1">
          Próximamente: viajes chamánicos, retiros y escapadas.
        </p>
      </header>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-oid="j8-oo2e"
      >
        <article className="rounded-xl border p-4" data-oid="p15qidk">
          <h2 className="font-medium" data-oid="bfenate">
            Viaje 1
          </h2>
          <p className="text-sm text-muted-foreground" data-oid="y93qfy.">
            Ubicación · Fechas.
          </p>
        </article>
        <article className="rounded-xl border p-4" data-oid="7n5ts53">
          <h2 className="font-medium" data-oid="mumb90t">
            Viaje 2
          </h2>
          <p className="text-sm text-muted-foreground" data-oid="17ixdjq">
            Ubicación · Fechas.
          </p>
        </article>
        <article className="rounded-xl border p-4" data-oid="lo0:vn:">
          <h2 className="font-medium" data-oid="r4ril_s">
            Viaje 3
          </h2>
          <p className="text-sm text-muted-foreground" data-oid="l2.hb9.">
            Ubicación · Fechas.
          </p>
        </article>
      </div>
    </section>
  );
}
