import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { signInAction } from "@/app/auth/login/actions";
import { GoogleSignInButton } from "@/components/google-sign-in-button";

export function LoginForm({
  className,
  next = "/protected",
  errorMessage = "",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  next?: string;
  errorMessage?: string;
}) {
  return (
    <div
      className={cn("spiritual-aura flex flex-col gap-8", className)}
      {...props}
    >
      <Card className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl">Iniciar sesion</CardTitle>
          <CardDescription>
            Ingresa tu email y contrasena para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form action={signInAction} className="flex flex-col gap-6">
            <input type="hidden" name="next" value={next} />

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="m@ejemplo.com"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="password">Contrasena</Label>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition-colors duration-200 hover:text-foreground"
                >
                  Olvidaste tu contrasena?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>

            {Boolean(errorMessage) && (
              <p className="rounded-full bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              className="w-full justify-center shadow-soft"
            >
              Acceso
            </Button>

            <div className="relative flex items-center gap-3 text-muted-foreground/70">
              <span className="flex-1 border-t border-border/60" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
                O continua con
              </span>
              <span className="flex-1 border-t border-border/60" />
            </div>

            <GoogleSignInButton next={next} />

            <div className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
              No tienes una cuenta?{" "}
              <Link
                href="/auth/sign-up"
                className="text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline"
              >
                Registrarse
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
