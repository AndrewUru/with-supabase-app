export const metadata = {
  title: "Trainings",
  description: "Formaciones y programas.",
};

export default function TrainingsPage() {
  return (
    <section className="p-6" data-oid="3_j7mni">
      <header className="mb-6" data-oid="e8gsz::">
        <h1 className="text-2xl font-semibold" data-oid="o1z55j7">
          Trainings
        </h1>
        <p className="text-sm text-muted-foreground" data-oid="-l5j8q6">
          Próximamente: formaciones, programas y materiales.
        </p>
      </header>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-oid="4negiaz"
      >
        <article className="rounded-xl border p-4" data-oid="1xm7k.4">
          <h2 className="font-medium" data-oid="68wq0p4">
            Módulo 1
          </h2>
          <p className="text-sm text-muted-foreground" data-oid="p:ay9gt">
            Descripción breve.
          </p>
        </article>
        <article className="rounded-xl border p-4" data-oid="9:j9n53">
          <h2 className="font-medium" data-oid="-01e05i">
            Módulo 2
          </h2>
          <p className="text-sm text-muted-foreground" data-oid="5af0w57">
            Descripción breve.
          </p>
        </article>
        <article className="rounded-xl border p-4" data-oid="b33c5j1">
          <h2 className="font-medium" data-oid=".wocuv9">
            Módulo 3
          </h2>
          <p className="text-sm text-muted-foreground" data-oid="wg.fe_7">
            Descripción breve.
          </p>
        </article>
      </div>
    </section>
  );
}
