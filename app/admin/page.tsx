import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* =========================
   Tipos locales (sin any)
   ========================= */
type Role = "member" | "admin";
type Plan = "free" | "basic" | "pro";
type ContentStatus = "draft" | "published";

interface ProfileRow {
  user_id: string;
  role: Role;
  full_name: string | null;
  created_at: string;
  // join a auth.users(email)
  auth?: { email: string | null } | null;
}

interface ResourceRow {
  id: string;
  slug: string;
  title: string;
  min_plan: Plan;
  status: ContentStatus;
  created_at: string;
}

interface ResourceInsert {
  slug: string;
  title: string;
  excerpt?: string | null;
  min_plan: Plan;
  status: ContentStatus;
}

/* =========================
   Server Actions
   ========================= */
export async function setRole(formData: FormData) {
  "use server";
  const supabase = await createClient();

  const user_id = String(formData.get("user_id") ?? "");
  const roleValue = String(formData.get("role") ?? "member");
  const role: Role = roleValue === "admin" ? "admin" : "member";

  if (!user_id) throw new Error("Falta user_id");

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("user_id", user_id);

  if (error) throw error;
}

export async function createResource(formData: FormData) {
  "use server";
  const supabase = await createClient();

  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;

  const minPlanValue = String(formData.get("min_plan") ?? "free");
  const min_plan: Plan =
    minPlanValue === "basic"
      ? "basic"
      : minPlanValue === "pro"
      ? "pro"
      : "free";

  const statusValue = String(formData.get("status") ?? "published");
  const status: ContentStatus = statusValue === "draft" ? "draft" : "published";

  const payload: ResourceInsert = { slug, title, excerpt, min_plan, status };

  if (!payload.slug || !payload.title) throw new Error("Faltan slug o título");

  const { error } = await supabase.from("resources").insert(payload);
  if (error) throw error;
}

/* =========================
   Página Admin MVP
   ========================= */
export default async function AdminMVP() {
  const supabase = await createClient();

  const [
    { data: usersData, error: usersErr },
    { data: resourcesData, error: resErr },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("user_id, role, full_name, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("resources")
      .select("id, slug, title, min_plan, status, created_at")
      .order("created_at", { ascending: false }),
  ]);

  if (usersErr) throw usersErr;
  if (resErr) throw resErr;

  // Tipamos los resultados sin usar 'any'
  const users: ProfileRow[] = (usersData ?? []).map((u) => ({
    user_id: u.user_id as string,
    role: (u.role as Role) ?? "member",
    full_name: (u.full_name as string | null) ?? null,
    created_at: u.created_at as string,
    auth: null,
  }));

  const resources: ResourceRow[] = (resourcesData ?? []).map((r) => ({
    id: r.id as string,
    slug: r.slug as string,
    title: r.title as string,
    min_plan: (r.min_plan as Plan) ?? "free",
    status: (r.status as ContentStatus) ?? "published",
    created_at: r.created_at as string,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container-app flex items-center justify-between py-3">
          <h1 className="text-lg font-bold">EDHUCO · Admin (MVP)</h1>
          <nav className="flex gap-4 text-sm">
            <a href="#users" className="hover:underline">
              Usuarios
            </a>
            <a href="#resources" className="hover:underline">
              Recursos
            </a>
          </nav>
        </div>
      </header>

      <div className="container-app space-y-10 py-6">
        {/* Usuarios */}
        <section id="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Usuarios</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Email</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Rol</th>
                  <th className="p-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id} className="border-t">
                    <td className="p-3">{u.auth?.email ?? "—"}</td>
                    <td className="p-3">{u.full_name ?? "—"}</td>
                    <td className="p-3">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <form
                        action={setRole}
                        className="flex items-center gap-2"
                      >
                        <input type="hidden" name="user_id" value={u.user_id} />
                        <select
                          name="role"
                          defaultValue={u.role}
                          className="rounded border bg-background px-2 py-1 text-sm"
                        >
                          <option value="member">member</option>
                          <option value="admin">admin</option>
                        </select>
                        <button className="rounded-lg border px-3 py-1 text-sm hover:bg-muted">
                          Guardar
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td className="p-3 italic opacity-70" colSpan={4}>
                      Sin usuarios
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recursos */}
        <section id="resources" className="space-y-4">
          <h2 className="text-xl font-semibold">Recursos</h2>

          {/* Crear recurso rápido */}
          <form
            action={createResource}
            className="grid gap-3 rounded-2xl border p-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span>Slug</span>
                <input
                  name="slug"
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="meditacion-amanecer"
                  required
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Título</span>
                <input
                  name="title"
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="Meditación Amanecer"
                  required
                />
              </label>
            </div>
            <label className="grid gap-1 text-sm">
              <span>Resumen</span>
              <input
                name="excerpt"
                className="rounded-md border bg-background px-3 py-2"
                placeholder="Breve descripción"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span>Plan mínimo</span>
                <select
                  name="min_plan"
                  defaultValue="free"
                  className="rounded-md border bg-background px-3 py-2"
                >
                  <option value="free">free</option>
                  <option value="basic">basic</option>
                  <option value="pro">pro</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm">
                <span>Estado</span>
                <select
                  name="status"
                  defaultValue="published"
                  className="rounded-md border bg-background px-3 py-2"
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>
            </div>
            <div className="flex justify-end">
              <button className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">
                Crear
              </button>
            </div>
          </form>

          {/* Tabla de recursos */}
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Título</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-3">{r.title}</td>
                    <td className="p-3">{r.slug}</td>
                    <td className="p-3">{r.min_plan}</td>
                    <td className="p-3">{r.status}</td>
                  </tr>
                ))}
                {resources.length === 0 && (
                  <tr>
                    <td className="p-3 italic opacity-70" colSpan={4}>
                      Sin recursos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
