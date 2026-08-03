import type { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {children}
    </section>
  );
}