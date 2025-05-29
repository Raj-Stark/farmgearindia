import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4" | "p" | "muted" | "small";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  h1: "text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  h2: "text-xl sm:text-3xl md:text-4xl font-semibold",
  h3: "text-lg sm:text-2xl md:text-3xl font-semibold",
  h4: "text-sm sm:text-xl md:text-2xl font-medium",
  p: "text-base sm:text-lg leading-relaxed",
  small: "text-xs",
  muted: "text-sm italic",
};

export const Typography = ({
  variant = "p",
  children,
  className,
  ...props
}: TypographyProps) => {
  const Component =
    variant === "p" || variant === "muted" || variant === "small"
      ? "p"
      : variant;

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
};
