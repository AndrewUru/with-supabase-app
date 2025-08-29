export const metadata = {
  title: "Trips",
  description: "Viajes y experiencias.",
};

export default function TripsPage() {
  return (
    <section className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Trips</h1>
        <p className="text-sm text-muted-foreground">
          Próximamente: viajes chamánicos, retiros y escapadas.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border p-4">
          <h2 className="font-medium">Viaje 1</h2>
          <p className="text-sm text-muted-foreground">Ubicación · Fechas.</p>
        </article>
        <article className="rounded-xl border p-4">
          <h2 className="font-medium">Viaje 2</h2>
          <p className="text-sm text-muted-foreground">Ubicación · Fechas.</p>
        </article>
        <article className="rounded-xl border p-4">
          <h2 className="font-medium">Viaje 3</h2>
          <p className="text-sm text-muted-foreground">Ubicación · Fechas.</p>
        </article>
      </div>
    </section>
  );
}
