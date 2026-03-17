import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = "", hover = false, glow = false }: CardProps) {
  const hoverStyles = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/40 hover:shadow-glow"
    : "";
  const glowStyles = glow ? "border-accent-purple/40 shadow-glow" : "";

  return (
    <div
      className={`glass rounded-xl border border-border shadow-card ${hoverStyles} ${glowStyles} ${className}`}
    >
      {children}
    </div>
  );
}
