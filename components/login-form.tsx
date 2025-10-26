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
      data-oid="aqhw5:s"
    >
      <Card
        className="border border-border/55 bg-card/80 shadow-soft backdrop-blur-2xl"
        data-oid="gzli1sg"
      >
        <CardHeader className="gap-4" data-oid="jwr6mw4">
          <CardTitle className="text-3xl" data-oid="ot6jb0.">
            Iniciar sesion
          </CardTitle>
          <CardDescription data-oid="2lea15w">
            Ingresa tu email y contrasena para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2" data-oid="3qb91t0">
          <form
            action={signInAction}
            className="flex flex-col gap-6"
            data-oid="m:xdpcc"
          >
            <input type="hidden" name="next" value={next} data-oid="95--gxi" />

            <div className="grid gap-2" data-oid="v-_hh9b">
              <Label htmlFor="email" data-oid="gtrm1vc">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="m@ejemplo.com"
                data-oid="4y6eewu"
              />
            </div>

            <div className="grid gap-2" data-oid="-s9qk4d">
              <div className="flex items-center gap-2" data-oid="d2n45j.">
                <Label htmlFor="password" data-oid="uh:hls_">
                  Contrasena
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition-colors duration-200 hover:text-foreground"
                  data-oid="zu7sjph"
                >
                  Olvidaste tu contrasena?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                data-oid="lhmy87_"
              />
            </div>

            {Boolean(errorMessage) && (
              <p
                className="rounded-full bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive"
                data-oid="146.v77"
              >
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              className="w-full justify-center shadow-soft"
              data-oid="nlip0rl"
            >
              Acceso
            </Button>

            <div
              className="relative flex items-center gap-3 text-muted-foreground/70"
              data-oid="8ykzbo5"
            >
              <span
                className="flex-1 border-t border-border/60"
                data-oid="3zztm.o"
              />
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                data-oid="3:feb6g"
              >
                O continua con
              </span>
              <span
                className="flex-1 border-t border-border/60"
                data-oid="vx5p.vh"
              />
            </div>

            <GoogleSignInButton next={next} data-oid="q_m8l4j" />

            <div
              className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/80"
              data-oid="o14v4cb"
            >
              No tienes una cuenta?{" "}
              <Link
                href="/auth/sign-up"
                className="text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline"
                data-oid="h9ylef8"
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
