export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6 animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-6 w-40 rounded bg-muted" />
          <div className="mt-2 h-4 w-56 rounded bg-muted" />
        </div>
        <div className="h-9 w-24 rounded bg-muted" />
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="h-32 rounded-xl border bg-muted" />
        <div className="h-32 rounded-xl border bg-muted" />
        <div className="h-32 rounded-xl border bg-muted" />
      </section>

      <section className="mt-6 h-40 rounded-xl border bg-muted" />
    </main>
  );
}
