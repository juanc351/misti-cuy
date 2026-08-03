import type { ReactNode, ElementType } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

const styles: Record<1 | 2 | 3 | 4, string> = {
  1: "text-4xl lg:text-5xl font-bold tracking-tight",
  2: "text-2xl lg:text-3xl font-bold",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
};

export default function Heading({
  children,
  level = 2,
  className = "",
}: HeadingProps) {
  const Tag: ElementType = `h${level}`;

  return (
    <Tag className={`${styles[level]} text-slate-900 ${className}`}>
      {children}
    </Tag>
  );
}