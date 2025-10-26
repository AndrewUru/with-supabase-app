"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("spiritual-aura flex flex-col gap-8", className)}
      {...props}
      data-oid="wla0rkr"
    >
      <Card
        className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl"
        data-oid="hky4bm1"
      >
        <CardHeader className="gap-4" data-oid="aeevhtp">
          <CardTitle className="text-3xl" data-oid=".ze_zcw">
            Reestablece tu contrasena
          </CardTitle>
          <CardDescription data-oid="2zx_fo.">
            Ingresa una nueva contrasena para actualizar tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2" data-oid="wo4guk:">
          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col gap-6"
            data-oid="bxi7fx-"
          >
            <div className="grid gap-2" data-oid="jn7m2y-">
              <Label htmlFor="password" data-oid=".d:-urp">
                Nueva contrasena
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nueva contrasena"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                data-oid="u.m6p6i"
              />
            </div>
            {error && (
              <p
                className="rounded-full bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive"
                data-oid="u.tll5a"
              >
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full justify-center shadow-soft"
              disabled={isLoading}
              data-oid="bdqg5py"
            >
              {isLoading ? "Guardando..." : "Guardar contrasena"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
