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
    >
      {success ? (
        <Card className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl">
          <CardHeader className="gap-4">
            <CardTitle className="text-3xl">Revisa tu email</CardTitle>
            <CardDescription>
              Enviamos instrucciones para restablecer tu contrasena.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              Si te registraste con correo y contrasena recibirias un mensaje en
              pocos minutos. Revisa tambien tu carpeta de spam.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl">
          <CardHeader className="gap-4">
            <CardTitle className="text-3xl">
              Restablece tu contrasena
            </CardTitle>
            <CardDescription>
              Escribe tu correo y te enviaremos un enlace para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={handleForgotPassword} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@ejemplo.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              {error && (
                <p className="rounded-full bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full justify-center shadow-soft"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar enlace"}
              </Button>

              <div className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline"
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
