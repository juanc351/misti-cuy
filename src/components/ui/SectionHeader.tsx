import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  description,
  children,
}: SectionHeaderProps) {
  return (
    <div className="border-b border-slate-200 px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}