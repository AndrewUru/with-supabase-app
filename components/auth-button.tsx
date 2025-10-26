"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

type AuthButtonProps = Omit<ButtonProps, "children" | "asChild"> & {
  href?: string;
  children?: ReactNode;
  label?: ReactNode;
};

export function AuthButton({
  href = "/auth/login",
  children,
  label = "Iniciar sesion",
  ...buttonProps
}: AuthButtonProps) {
  const content = children ?? label;

  return (
    <Button asChild {...buttonProps}>
      <Link href={href}>{content}</Link>
    </Button>
  );
}
