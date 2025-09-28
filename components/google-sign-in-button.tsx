"use client";

import { useState } from "react";
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
        setErrorMessage("No se pudo iniciar sesión con Google.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Conectando..." : "Continuar con Google"}
      </Button>
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      ) : null}
    </div>
  );
}
