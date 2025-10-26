import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("id, title, excerpt, price_eur, status")
    .order("created_at", { ascending: false });

  if (error)
    return (
      <p className="text-red-500" data-oid="egfgm5g">
        {error.message}
      </p>
    );

  return (
    <div className="space-y-6" data-oid="sruvemu">
      <h2 className="text-xl font-bold" data-oid="x42wp0k">
        Servicios
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2" data-oid="w3.r.fj">
        {services?.map((s) => (
          <li
            key={s.id}
            className="rounded-xl border bg-card p-5 shadow-sm flex flex-col gap-2"
            data-oid="fp9t-ds"
          >
            <h3 className="font-semibold" data-oid="dem5kd_">
              {s.title}
            </h3>
            <p className="text-sm text-foreground/70" data-oid="fmi-81a">
              {s.excerpt}
            </p>
            <span className="text-sm font-medium" data-oid="qwb1sqo">
              {s.price_eur} €
            </span>
            <span
              className="text-xs uppercase text-muted-foreground"
              data-oid="8:f6w6x"
            >
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
