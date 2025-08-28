import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("id, title, excerpt, price_eur, status")
    .order("created_at", { ascending: false });

  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Servicios</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {services?.map((s) => (
          <li
            key={s.id}
            className="rounded-xl border bg-card p-5 shadow-sm flex flex-col gap-2"
          >
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-foreground/70">{s.excerpt}</p>
            <span className="text-sm font-medium">{s.price_eur} €</span>
            <span className="text-xs uppercase text-muted-foreground">
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
