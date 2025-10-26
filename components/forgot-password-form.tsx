"use client";

import { useState } from "react";
import Link from "next/link";
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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/update-password`,
        },
      );
      if (resetError) throw resetError;
      setSuccess(true);
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
      data-oid="np8l5uu"
    >
      {success ? (
        <Card
          className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl"
          data-oid="o7-qmja"
        >
          <CardHeader className="gap-4" data-oid="ged3i2_">
            <CardTitle className="text-3xl" data-oid="4865628">
              Revisa tu email
            </CardTitle>
            <CardDescription data-oid="b33s9lq">
              Enviamos instrucciones para restablecer tu contrasena.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2" data-oid="st2ooel">
            <p className="text-sm text-muted-foreground" data-oid="iuw3n9d">
              Si te registraste con correo y contrasena recibirias un mensaje en
              pocos minutos. Revisa tambien tu carpeta de spam.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card
          className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl"
          data-oid="onuinx5"
        >
          <CardHeader className="gap-4" data-oid="5u0kxkr">
            <CardTitle className="text-3xl" data-oid="gmgm6ai">
              Restablece tu contrasena
            </CardTitle>
            <CardDescription data-oid="_g92_99">
              Escribe tu correo y te enviaremos un enlace para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2" data-oid="d_3y9zn">
            <form
              onSubmit={handleForgotPassword}
              className="flex flex-col gap-6"
              data-oid="1ng2pam"
            >
              <div className="grid gap-2" data-oid="uz99btu">
                <Label htmlFor="email" data-oid=".52o6tx">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@ejemplo.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  data-oid="tl-t.-y"
                />
              </div>

              {error && (
                <p
                  className="rounded-full bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive"
                  data-oid="e-fup75"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full justify-center shadow-soft"
                disabled={isLoading}
                data-oid="x8dklmu"
              >
                {isLoading ? "Enviando..." : "Enviar enlace"}
              </Button>

              <div
                className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/80"
                data-oid="tz1c6kr"
              >
                Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline"
                  data-oid="-rxle6."
                >
                  Iniciar sesion
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
