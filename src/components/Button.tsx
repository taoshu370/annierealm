import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "cyan" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space whitespace-nowrap";

  const variants = {
    primary:
      "bg-accent-purple text-white hover:bg-accent-purple/90 hover:shadow-glow focus:ring-accent-purple",
    ghost:
      "border border-border text-text hover:border-accent-purple/60 hover:text-accent-purple hover:bg-accent-purple/5 focus:ring-accent-purple",
    cyan:
      "border border-accent-cyan/40 text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/5 hover:shadow-glow-cyan focus:ring-accent-cyan",
    secondary:
      "bg-surface-2 text-text hover:bg-surface-2/80 border border-border focus:ring-border",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px] gap-1.5",
    md: "px-5 py-2.5 text-sm min-h-[44px] gap-2",
    lg: "px-7 py-3.5 text-base min-h-[50px] gap-2",
  };

  const disabledStyles = disabled ? "opacity-40 cursor-not-allowed" : "";
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
