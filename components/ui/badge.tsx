import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground shadow-soft transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/90 text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:-translate-y-0.5",
        destructive:
          "bg-destructive/90 text-destructive-foreground shadow-soft hover:-translate-y-0.5",
        outline:
          "bg-transparent text-foreground hover:bg-accent/60 hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
