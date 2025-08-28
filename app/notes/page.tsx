// app/notes/page.tsx
import { createClient } from "@/lib/supabase/server";

export default async function NotesPage() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase.from("notes").select("*");

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Notas</h1>
      <ul className="space-y-2">
        {notes?.map((n) => (
          <li key={n.id} className="rounded border p-3">
            {n.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
