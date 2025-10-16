"use client";

import { useState } from "react";
import Link from "next/link";
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
import { GoogleSignInButton } from "@/components/google-sign-in-button";

const SOCIAL_REDIRECT = "/protected";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email y contrasena son obligatorios.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || null,
            phone: phone || null,
          },
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined,
        },
      });
      if (signUpError) throw signUpError;

      const session = (await supabase.auth.getSession()).data.session;
      const userId = data.user?.id;

      if (session && userId) {
        const { error: upsertError } = await supabase.from("profiles").upsert(
          {
            id: userId,
            full_name: fullName || null,
            phone: phone || null,
          },
          { onConflict: "id" },
        );
        if (upsertError) {
          console.warn("No se pudo actualizar profiles:", upsertError.message);
        }
      }

      router.push("/auth/verify-email?sent=1");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrio un error al registrarte.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn("spiritual-aura mx-auto w-full max-w-lg", className)}
      {...props}
    >
      <Card className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl">Crea tu cuenta</CardTitle>
          <CardDescription>
            Registrate para acceder a tu area personal.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contrasena*</Label>
              <Input
                id="password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="repeat-password">Repite la contrasena*</Label>
              <Input
                id="repeat-password"
                type="password"
                value={repeatPassword}
                autoComplete="new-password"
                onChange={(event) => setRepeatPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="full_name">Nombre (opcional)</Label>
              <Input
                id="full_name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Telefono (opcional)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+34 600 000 000"
                autoComplete="tel"
              />
            </div>

            {error && (
              <p className="rounded-full bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full justify-center shadow-soft"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <div className="relative flex items-center gap-3 text-muted-foreground/70">
              <span className="flex-1 border-t border-border/60" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
                O continua con
              </span>
              <span className="flex-1 border-t border-border/60" />
            </div>

            <GoogleSignInButton next={SOCIAL_REDIRECT} className="w-full" />

            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
              Ya tienes cuenta?{" "}
              <Link
                className="text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline"
                href="/auth/login"
              >
                Inicia sesion
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
