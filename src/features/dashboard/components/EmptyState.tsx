import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.ComponentPropsWithoutRef<"section"> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = forwardRef<HTMLElement, EmptyStateProps>(
  ({ title, description, icon, action, className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-10 text-center",
        className,
      )}
      {...props}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </section>
  ),
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
