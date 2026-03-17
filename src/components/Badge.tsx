import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "purple" | "cyan" | "shipped" | "prototype" | "jam" | "mono";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-surface text-text-muted border-border",
    purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/25",
    cyan: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/25",
    shipped: "bg-accent-green/10 text-accent-green border-accent-green/25",
    prototype: "bg-accent-amber/10 text-accent-amber border-accent-amber/25",
    jam: "bg-accent-purple/10 text-accent-purple border-accent-purple/25",
    mono: "bg-surface text-text-muted border-border font-mono text-xs tracking-wider",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
