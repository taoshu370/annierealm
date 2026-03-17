import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function Section({ children, className = "", narrow = false }: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-7xl"} px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
