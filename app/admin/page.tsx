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
    <main className="mx-auto max-w-5xl p-6 space-y-10" data-oid="ffgnj.8">
      <h1 className="text-2xl font-bold" data-oid="425te6i">
        Admin
      </h1>

      {/* ---- Gestión de roles ---- */}
      <section className="space-y-4" data-oid="38t9foc">
        <h2 className="text-xl font-semibold" data-oid="0oele4q">
          Asignar rol
        </h2>
        <form
          action={setRole}
          className="flex flex-wrap gap-3 items-end"
          data-oid="j:52j3t"
        >
          <div className="flex flex-col" data-oid="z4rmt7s">
            <label className="text-sm" data-oid="203gg8x">
              Usuario
            </label>
            <select
              name="user_id"
              className="border rounded px-3 py-2 min-w-64"
              required
              data-oid="8-jw:lk"
            >
              <option value="" data-oid="sbo45x1">
                — Selecciona —
              </option>
              {(users ?? []).map((u) => (
                <option key={u.user_id} value={u.user_id} data-oid="5ub7:ij">
                  {u.email} ({u.role ?? "member"})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col" data-oid="d737pgz">
            <label className="text-sm" data-oid="7zdvlkq">
              Rol
            </label>
            <select
              name="role"
              className="border rounded px-3 py-2"
              defaultValue="member"
              data-oid=":di87x6"
            >
              <option value="member" data-oid="cybb3ay">
                member
              </option>
              <option value="editor" data-oid="j60:6e1">
                editor
              </option>
              <option value="admin" data-oid="e2l7iha">
                admin
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
            data-oid="a4e8reb"
          >
            Guardar
          </button>
        </form>

        <div className="text-sm text-muted-foreground" data-oid="3cs40m-">
          Usuarios: {(users ?? []).length}
        </div>
      </section>

      {/* ---- Crear recurso ---- */}
      <section className="space-y-4" data-oid="z_5eo39">
        <h2 className="text-xl font-semibold" data-oid="r:auehv">
          Crear recurso
        </h2>

        <form
          action={createResource}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          // NECESARIO para subir archivos:
          encType="multipart/form-data"
          data-oid="w3ukvil"
        >
          <div className="flex flex-col" data-oid="xp7p_jj">
            <label className="text-sm" data-oid="79niw.l">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              className="border rounded px-3 py-2"
              placeholder="p. ej. audio-relajacion"
              required
              data-oid="g15:g1h"
            />
          </div>

          <div className="flex flex-col" data-oid="c3fonit">
            <label className="text-sm" data-oid="0hh.tcb">
              Título
            </label>
            <input
              type="text"
              name="title"
              className="border rounded px-3 py-2"
              placeholder="Título del recurso"
              required
              data-oid="xwaqxwj"
            />
          </div>

          <div className="flex flex-col md:col-span-2" data-oid="oxii6r7">
            <label className="text-sm" data-oid=":p7-.cb">
              Extracto
            </label>
            <textarea
              name="excerpt"
              className="border rounded px-3 py-2"
              placeholder="Descripción breve…"
              rows={3}
              data-oid="w51:0_b"
            />
          </div>

          <div className="flex flex-col" data-oid="l0:x72p">
            <label className="text-sm" data-oid="zo8.m0t">
              Plan mínimo
            </label>
            <select
              name="min_plan"
              className="border rounded px-3 py-2"
              defaultValue="free"
              required
              data-oid="5411798"
            >
              <option value="free" data-oid="hv:ssch">
                free
              </option>
              <option value="premium" data-oid="gt595.c">
                premium
              </option>
            </select>
          </div>

          <div className="flex flex-col" data-oid="2a27cta">
            <label className="text-sm" data-oid="92to86d">
              Estado
            </label>
            <select
              name="status"
              className="border rounded px-3 py-2"
              defaultValue="published"
              required
              data-oid="zeolgj1"
            >
              <option value="draft" data-oid="m7d.x5v">
                draft
              </option>
              <option value="published" data-oid="6xvu604">
                published
              </option>
              <option value="archived" data-oid="ztyt_v_">
                archived
              </option>
            </select>
          </div>

          {/* NUEVO: archivo */}
          <div className="flex flex-col" data-oid="ju8lxtx">
            <label className="text-sm" data-oid="zjxvw50">
              Archivo (PDF / Audio / Video)
            </label>
            <input
              type="file"
              name="asset"
              className="border rounded px-3 py-2"
              accept=".pdf,audio/*,video/*"
              required
              data-oid="gqm6n4r"
            />

            <p
              className="text-xs text-muted-foreground mt-1"
              data-oid="cgis3eh"
            >
              Se guardará en el bucket <code data-oid="4owhgrr">resources</code>
              .
            </p>
          </div>

          {/* NUEVO: visibilidad */}
          <div className="flex flex-col" data-oid="0eoh218">
            <label className="text-sm" data-oid="_mg8sip">
              Visibilidad del archivo
            </label>
            <select
              name="visibility"
              className="border rounded px-3 py-2"
              defaultValue="private"
              required
              data-oid="yu-tig5"
            >
              <option value="private" data-oid="g1dl47b">
                Privado (recomendado)
              </option>
              <option value="public" data-oid="51qfw9b">
                Público
              </option>
            </select>
            <p
              className="text-xs text-muted-foreground mt-1"
              data-oid="bdctkod"
            >
              Privado: genera URL firmada al descargar. Público: usa URL pública
              directa.
            </p>
          </div>

          <div className="md:col-span-2" data-oid="wti492z">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
              data-oid="s.peeku"
            >
              Crear
            </button>
          </div>
        </form>
      </section>

      {/* ---- Listado de recursos ---- */}
      <section className="space-y-4" data-oid="6-rbkhw">
        <h2 className="text-xl font-semibold" data-oid="z3mpk1b">
          Recursos
        </h2>
        <div className="overflow-x-auto" data-oid="6fcwkl6">
          <table className="min-w-full text-sm border" data-oid=":91gick">
            <thead className="bg-muted/40" data-oid="b2outnw">
              <tr data-oid="9pi1mq1">
                <th className="text-left p-2 border-r" data-oid="_webo8q">
                  ID
                </th>
                <th className="text-left p-2 border-r" data-oid="1_7dyuy">
                  Slug
                </th>
                <th className="text-left p-2 border-r" data-oid=".5:-dyj">
                  Título
                </th>
                <th className="text-left p-2 border-r" data-oid="mwmoijz">
                  Plan
                </th>
                <th className="text-left p-2" data-oid=".i7l28:">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody data-oid="l18jwqd">
              {(resources ?? []).map((r) => (
                <tr key={r.id} className="border-t" data-oid="k1:rurs">
                  <td className="p-2 border-r" data-oid="msgscim">
                    {r.id}
                  </td>
                  <td className="p-2 border-r" data-oid="fe53sej">
                    {r.slug}
                  </td>
                  <td className="p-2 border-r" data-oid="mqfg5fm">
                    {r.title}
                  </td>
                  <td className="p-2 border-r" data-oid="z96f9:3">
                    {r.min_plan}
                  </td>
                  <td className="p-2" data-oid="5_jgskn">
                    {r.status}
                  </td>
                </tr>
              ))}
              {(!resources || resources.length === 0) && (
                <tr data-oid="ft-stas">
                  <td className="p-2" colSpan={5} data-oid="_40t1lo">
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
