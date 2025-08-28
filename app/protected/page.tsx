// app/protected/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  NotebookIcon,
  TicketIcon,
  UsersIcon,
  MapIcon,
} from "lucide-react";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data: userClaims, error } = await supabase.auth.getClaims();
  if (error || !userClaims?.claims) {
    redirect("/auth/login");
  }

  // Traer algunos datos de ejemplo (counts)
  const [{ count: servicesCount }, { count: eventsCount }] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Panel EDHUCO</h1>

      {/* Tabs de navegación */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="services">
            <NotebookIcon className="w-4 h-4 mr-1" />
            Servicios
          </TabsTrigger>
          <TabsTrigger value="trainings">
            <UsersIcon className="w-4 h-4 mr-1" />
            Formaciones
          </TabsTrigger>
          <TabsTrigger value="trips">
            <MapIcon className="w-4 h-4 mr-1" />
            Viajes
          </TabsTrigger>
          <TabsTrigger value="events">
            <CalendarIcon className="w-4 h-4 mr-1" />
            Agenda
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <TicketIcon className="w-4 h-4 mr-1" />
            Reservas
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-medium text-foreground/70">
                Servicios activos
              </h3>
              <p className="text-2xl font-bold">{servicesCount ?? 0}</p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-medium text-foreground/70">
                Eventos publicados
              </h3>
              <p className="text-2xl font-bold">{eventsCount ?? 0}</p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-medium text-foreground/70">
                Usuario logueado
              </h3>
              <pre className="text-xs font-mono mt-2 bg-muted/30 p-2 rounded">
                {JSON.stringify(userClaims.claims, null, 2)}
              </pre>
            </div>
          </div>
        </TabsContent>

        {/* Cada pestaña apunta a su ruta */}
        <TabsContent value="services">
          <p className="text-sm">
            Ir a{" "}
            <a href="/protected/services" className="underline">
              /protected/services
            </a>
          </p>
        </TabsContent>
        <TabsContent value="trainings">
          <p className="text-sm">
            Ir a{" "}
            <a href="/protected/trainings" className="underline">
              /protected/trainings
            </a>
          </p>
        </TabsContent>
        <TabsContent value="trips">
          <p className="text-sm">
            Ir a{" "}
            <a href="/protected/trips" className="underline">
              /protected/trips
            </a>
          </p>
        </TabsContent>
        <TabsContent value="events">
          <p className="text-sm">
            Ir a{" "}
            <a href="/protected/events" className="underline">
              /protected/events
            </a>
          </p>
        </TabsContent>
        <TabsContent value="bookings">
          <p className="text-sm">
            Ir a{" "}
            <a href="/protected/bookings" className="underline">
              /protected/bookings
            </a>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
