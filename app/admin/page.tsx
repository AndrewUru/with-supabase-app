import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { setRole, createResource } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | EDHUCO",
  description: "Panel mínimo de administración (roles y recursos).",
};

type Role = "member" | "editor" | "admin";
type MinPlan = "free" | "premium";
type ResourceStatus = "draft" | "published" | "archived";

interface UserRow {
  user_id: string;
  email: string;
  role: Role | null;
}

interface ResourceRow {
  id: number;
  slug: string;
  title: string;
  min_plan: MinPlan;
  status: ResourceStatus;
  // opcionales si quieres mostrarlos en la tabla
  // public_url?: string | null;
  // file_path?: string | null;
}

export default async function AdminMVP() {
  const supabase = await createClient();

  const [{ data: users, error: usersErr }, { data: resources, error: resErr }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("user_id,email,role")
        .returns<UserRow[]>(),
      supabase
        .from("resources")
        .select("id,slug,title,min_plan,status")
        .returns<ResourceRow[]>(),
    ]);

  if (usersErr) console.error(usersErr);
  if (resErr) console.error(resErr);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin</h1>

      {/* ---- Gestión de roles ---- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Asignar rol</h2>
        <form action={setRole} className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col">
            <label className="text-sm">Usuario</label>
            <select
              name="user_id"
              className="border rounded px-3 py-2 min-w-64"
              required
            >
              <option value="">— Selecciona —</option>
              {(users ?? []).map((u) => (
                <option key={u.user_id} value={u.user_id}>
                  {u.email} ({u.role ?? "member"})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Rol</label>
            <select
              name="role"
              className="border rounded px-3 py-2"
              defaultValue="member"
            >
              <option value="member">member</option>
              <option value="editor">editor</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
          >
            Guardar
          </button>
        </form>

        <div className="text-sm text-muted-foreground">
          Usuarios: {(users ?? []).length}
        </div>
      </section>

      {/* ---- Crear recurso ---- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Crear recurso</h2>

        <form
          action={createResource}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          // NECESARIO para subir archivos:
          encType="multipart/form-data"
        >
          <div className="flex flex-col">
            <label className="text-sm">Slug</label>
            <input
              type="text"
              name="slug"
              className="border rounded px-3 py-2"
              placeholder="p. ej. audio-relajacion"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Título</label>
            <input
              type="text"
              name="title"
              className="border rounded px-3 py-2"
              placeholder="Título del recurso"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm">Extracto</label>
            <textarea
              name="excerpt"
              className="border rounded px-3 py-2"
              placeholder="Descripción breve…"
              rows={3}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Plan mínimo</label>
            <select
              name="min_plan"
              className="border rounded px-3 py-2"
              defaultValue="free"
              required
            >
              <option value="free">free</option>
              <option value="premium">premium</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Estado</label>
            <select
              name="status"
              className="border rounded px-3 py-2"
              defaultValue="published"
              required
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </div>

          {/* NUEVO: archivo */}
          <div className="flex flex-col">
            <label className="text-sm">Archivo (PDF / Audio / Video)</label>
            <input
              type="file"
              name="asset"
              className="border rounded px-3 py-2"
              accept=".pdf,audio/*,video/*"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Se guardará en el bucket <code>resources</code>.
            </p>
          </div>

          {/* NUEVO: visibilidad */}
          <div className="flex flex-col">
            <label className="text-sm">Visibilidad del archivo</label>
            <select
              name="visibility"
              className="border rounded px-3 py-2"
              defaultValue="private"
              required
            >
              <option value="private">Privado (recomendado)</option>
              <option value="public">Público</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Privado: genera URL firmada al descargar. Público: usa URL pública
              directa.
            </p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
            >
              Crear
            </button>
          </div>
        </form>
      </section>

      {/* ---- Listado de recursos ---- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recursos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left p-2 border-r">ID</th>
                <th className="text-left p-2 border-r">Slug</th>
                <th className="text-left p-2 border-r">Título</th>
                <th className="text-left p-2 border-r">Plan</th>
                <th className="text-left p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {(resources ?? []).map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2 border-r">{r.id}</td>
                  <td className="p-2 border-r">{r.slug}</td>
                  <td className="p-2 border-r">{r.title}</td>
                  <td className="p-2 border-r">{r.min_plan}</td>
                  <td className="p-2">{r.status}</td>
                </tr>
              ))}
              {(!resources || resources.length === 0) && (
                <tr>
                  <td className="p-2" colSpan={5}>
                    Sin recursos aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
