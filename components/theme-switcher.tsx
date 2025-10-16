// components/theme-switcher.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Laptop, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ThemeOptionValue = "light" | "dark" | "system";

type ThemeOption = {
  value: ThemeOptionValue;
  label: string;
  description: string;
  icon: LucideIcon;
  tint: string;
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "light",
    label: "Claro",
    description: "Ideal para espacios luminosos.",
    icon: Sun,
    tint: "text-amber-500",
  },
  {
    value: "dark",
    label: "Oscuro",
    description: "Cuida la vista en ambientes tenues.",
    icon: Moon,
    tint: "text-indigo-400",
  },
  {
    value: "system",
    label: "Sistema (auto)",
    description: "Se ajusta al modo de tu dispositivo.",
    icon: Laptop,
    tint: "text-sky-500",
  },
];

const ICON_SIZE = 18;

const isThemeOption = (value: string | undefined): value is ThemeOptionValue =>
  value === "light" || value === "dark" || value === "system";

const getThemeOption = (value: ThemeOptionValue) =>
  THEME_OPTIONS.find((option) => option.value === value) ?? THEME_OPTIONS[0];

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = isThemeOption(theme) ? theme : "system";
  const currentOption = getThemeOption(currentTheme);
  const resolvedValue = isThemeOption(resolvedTheme) ? resolvedTheme : "light";
  const resolvedOption = getThemeOption(resolvedValue);
  const displayOption =
    currentTheme === "system" ? resolvedOption : currentOption;

  const handleThemeChange = (value: string) => {
    if (isThemeOption(value)) {
      setTheme(value);
    }
  };

  const DisplayIcon = displayOption.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Cambiar tema (${displayOption.label})`}
          className="relative h-11 w-11 rounded-full border-border/60 bg-background/80 p-0 text-muted-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="sr-only">Cambiar tema</span>
          <span className="flex h-full w-full items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={displayOption.value}
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex"
              >
                <DisplayIcon size={ICON_SIZE} />
              </motion.span>
            </AnimatePresence>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        align="end"
        className="w-60"
      >
        <DropdownMenuLabel className="text-muted-foreground/80">
          Elige el ambiente
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentTheme}
          onValueChange={handleThemeChange}
        >
          {THEME_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-2 transition-all duration-200",
                "focus:bg-accent/60 focus:text-foreground data-[state=checked]:bg-accent/80 data-[state=checked]:text-foreground"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-muted/60 text-muted-foreground transition duration-200",
                  option.tint,
                  "group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-background group-data-[state=checked]:text-foreground"
                )}
              >
                <option.icon size={14} strokeWidth={1.8} />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-sm font-medium leading-tight tracking-normal">
                  {option.label}
                </span>
                <span className="text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground/70">
                  {option.description}
                </span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
