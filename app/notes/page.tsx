// app/notes/page.tsx
import { createClient } from "@/lib/supabase/server";

export default async function NotesPage() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase.from("notes").select("*");

  if (error) return <div data-oid="a3c8o7h">Error: {error.message}</div>;

  return (
    <main className="p-6" data-oid="j570m5g">
      <h1 className="text-2xl font-semibold mb-4" data-oid="o8ey3k_">
        Notas
      </h1>
      <ul className="space-y-2" data-oid="thx6cuq">
        {notes?.map((n) => (
          <li key={n.id} className="rounded border p-3" data-oid="yftr5t4">
            {n.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
