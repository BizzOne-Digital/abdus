import type { ElementType, HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: "default" | "light" | "pill";
  hover?: boolean;
  as?: ElementType;
};

export function LiquidGlass({
  children,
  variant = "default",
  hover = true,
  as: Tag = "div",
  className = "",
  ...rest
}: Props) {
  const classes = [
    "liquid-glass",
    hover ? "liquid-glass--hover" : "",
    variant === "light" ? "liquid-glass--light" : "",
    variant === "pill" ? "liquid-glass--pill" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
