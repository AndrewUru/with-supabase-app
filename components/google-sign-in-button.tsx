"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type GoogleSignInButtonProps = {
  next?: string;
  className?: string;
};

export function GoogleSignInButton({
  next = "/protected",
  className,
}: GoogleSignInButtonProps) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setErrorMessage(null);
      setIsLoading(true);

      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(
        next,
      )}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("No se pudo iniciar sesion con Google.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center shadow-soft"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Conectando..." : "Continuar con Google"}
      </Button>
      {errorMessage ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
