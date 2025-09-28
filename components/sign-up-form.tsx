// components/sign-up-form.tsx
"use client";

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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  // Nuevos (opcionales)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email y contraseña son obligatorios.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: signUpErr } = await supabase.auth.signUp({
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
      if (signUpErr) throw signUpErr;

      const session = (await supabase.auth.getSession()).data.session;
      const userId = data.user?.id;

      if (session && userId) {
        const { error: upsertErr } = await supabase.from("profiles").upsert(
          {
            id: userId,
            full_name: fullName || null,
            phone: phone || null,
          },
          { onConflict: "id" }
        );
        if (upsertErr) {
          console.warn("No se pudo upsert en profiles:", upsertErr.message);
        }
      }

      router.push("/auth/verify-email?sent=1");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error al registrarte.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("mx-auto w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crea tu cuenta</CardTitle>
          <CardDescription>
            Regístrate para acceder a tu área personal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña*</Label>
              <Input
                id="password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="repeat">Repite la contraseña*</Label>
              <Input
                id="repeat"
                type="password"
                value={repeatPassword}
                autoComplete="new-password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {/* Opcionales */}
            <div className="grid gap-2">
              <Label htmlFor="full_name">Nombre (opcional)</Label>
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                autoComplete="tel"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <div className="relative flex items-center">
              <span className="flex-1 border-t" />
              <span className="px-3 text-xs uppercase text-muted-foreground">
                O continúa con
              </span>
              <span className="flex-1 border-t" />
            </div>

            <GoogleSignInButton
              next={SOCIAL_REDIRECT}
              className="w-full"
            />

            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link className="underline" href="/auth/login">
                Inicia sesión
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
