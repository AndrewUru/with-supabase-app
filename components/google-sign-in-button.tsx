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
        className="w-full justify-center gap-2 shadow-soft"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          "Conectando..."
        ) : (
          <>
            <GoogleMark aria-hidden="true" />
            <span>Continuar con Google</span>
          </>
        )}
      </Button>
      {errorMessage ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

function GoogleMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.8454H13.8436C13.635 11.9795 13.0009 12.9341 12.0464 13.5682V15.8209H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z"
        fill="#4285F4"
      />
      <path
        d="M9 18C11.43 18 13.4673 17.1945 14.9564 15.8209L12.0464 13.5682C11.24 14.1127 10.21 14.4318 9 14.4318C6.65591 14.4318 4.67136 12.8527 3.96409 10.7309H0.957275V13.0527C2.43818 15.9832 5.48182 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.96409 10.7309C3.78409 10.1864 3.68182 9.60455 3.68182 9C3.68182 8.39545 3.78409 7.81363 3.96409 7.26909V4.94727H0.957273C0.347727 6.16727 0 7.54727 0 9C0 10.4527 0.347727 11.8327 0.957273 13.0527L3.96409 10.7309Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.56818C10.3218 3.56818 11.5073 4.02273 12.4382 4.90909L15.0218 2.325L14.9564 2.02181C13.4673 0.692727 11.43 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.94727L3.96409 7.26909C4.67136 5.14727 6.65591 3.56818 9 3.56818Z"
        fill="#EA4335"
      />
    </svg>
  );
}
