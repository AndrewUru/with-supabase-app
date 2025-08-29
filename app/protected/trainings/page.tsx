export const metadata = {
  title: "Trainings",
  description: "Formaciones y programas.",
};

export default function TrainingsPage() {
  return (
    <section className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Trainings</h1>
        <p className="text-sm text-muted-foreground">
          Próximamente: formaciones, programas y materiales.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border p-4">
          <h2 className="font-medium">Módulo 1</h2>
          <p className="text-sm text-muted-foreground">Descripción breve.</p>
        </article>
        <article className="rounded-xl border p-4">
          <h2 className="font-medium">Módulo 2</h2>
          <p className="text-sm text-muted-foreground">Descripción breve.</p>
        </article>
        <article className="rounded-xl border p-4">
          <h2 className="font-medium">Módulo 3</h2>
          <p className="text-sm text-muted-foreground">Descripción breve.</p>
        </article>
      </div>
    </section>
  );
}
