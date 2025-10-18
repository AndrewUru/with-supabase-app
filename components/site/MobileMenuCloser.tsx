'use client';

import { useEffect } from "react";

type MobileMenuCloserProps = {
  menuId?: string;
};

export function MobileMenuCloser({ menuId = "mobile-menu" }: MobileMenuCloserProps) {
  useEffect(() => {
    const menu = document.getElementById(menuId) as HTMLDetailsElement | null;
    if (!menu) return;

    const summary = menu.querySelector("summary") as HTMLElement | null;

    const closeMenu = () => {
      menu.removeAttribute("open");
      summary?.blur();
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a")) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        closeMenu();
      }
    };

    menu.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      menu.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuId]);

  return null;
}
