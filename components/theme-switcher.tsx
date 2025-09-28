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
  swatchClass: string;
  accentClass: string;
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "light",
    label: "Claro",
    description: "Ideal para espacios luminosos.",
    icon: Sun,
    swatchClass: "from-amber-50 via-white to-amber-100",
    accentClass: "bg-amber-500/80 shadow-[0_0_0.6rem] shadow-amber-400/40",
  },
  {
    value: "dark",
    label: "Oscuro",
    description: "Cuida la vista en ambientes tenues.",
    icon: Moon,
    swatchClass: "from-slate-900 via-slate-800 to-slate-700",
    accentClass: "bg-indigo-400/90 shadow-[0_0_0.6rem] shadow-indigo-500/40",
  },
  {
    value: "system",
    label: "Sistema (auto)",
    description: "Se ajusta al modo de tu dispositivo.",
    icon: Laptop,
    swatchClass: "from-slate-200 via-white to-slate-300",
    accentClass: "bg-sky-500/80 shadow-[0_0_0.6rem] shadow-sky-400/40",
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

  const buttonSecondaryLabel =
    currentTheme === "system"
      ? `Modo ${resolvedOption.label.toLowerCase()}`
      : undefined;

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
          size="sm"
          aria-label="Cambiar tema"
          className="group relative h-9 min-w-[2.5rem] gap-2 rounded-full border border-border/60 bg-background/70 px-2 text-xs shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-border/40 hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-3"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--brand)/0.15)] via-transparent to-[hsl(var(--accent-cool)/0.15)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="relative flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground shadow-inner">
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
            <span className="hidden text-left sm:flex sm:flex-col sm:leading-tight">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                Tema
              </span>
              <span className="text-xs font-medium text-foreground">
                {currentOption.label}
              </span>
              {buttonSecondaryLabel ? (
                <span className="text-[0.6rem] text-muted-foreground">
                  {buttonSecondaryLabel}
                </span>
              ) : null}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={12}
        align="end"
        className="w-64 rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-xl backdrop-blur-md"
      >
        <DropdownMenuLabel className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/80">
          Elige el ambiente
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/60" />
        <DropdownMenuRadioGroup
          value={currentTheme}
          onValueChange={handleThemeChange}
        >
          {THEME_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className={cn(
                "group relative items-start gap-3 rounded-xl px-3 py-2 pl-10 pr-3 text-sm transition-all",
                "focus:bg-accent/70 focus:text-accent-foreground",
                "data-[state=checked]:bg-accent/80 data-[state=checked]:text-accent-foreground data-[state=checked]:shadow-[inset_0_0_0_1px_hsl(var(--border)/0.4)]",
              )}
            >
              <div className="flex w-full items-center gap-3">
                <div
                  aria-hidden
                  className={cn(
                    "relative flex h-9 w-12 items-center justify-center rounded-lg border border-border/70 bg-gradient-to-br transition-all",
                    option.swatchClass,
                    "group-data-[state=checked]:border-transparent group-data-[state=checked]:shadow-[0_18px_28px_-20px_hsl(var(--foreground)/0.45)]",
                  )}
                >
                  <span
                    className={cn(
                      "h-3 w-3 rounded-full transition-transform duration-200 ease-out",
                      option.accentClass,
                      "group-data-[state=checked]:scale-110",
                    )}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-none">
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground/80 group-data-[state=checked]:text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
