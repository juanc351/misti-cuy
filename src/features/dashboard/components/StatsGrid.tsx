import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import StatCard from "./StatCard";

interface StatsGridItem {
  id: string;
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "positive" | "negative" | "neutral";
  trendLabel?: string;
}

interface StatsGridProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: StatsGridItem[];
  className?: string;
}

const StatsGrid = forwardRef<HTMLElement, StatsGridProps>(
  ({ items, className, ...props }, ref) => {
    if (items.length === 0) return null;

    return (
      <section
        ref={ref}
        className={cn(
          "grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
            trend={item.trend}
            trendLabel={item.trendLabel}
          />
        ))}
      </section>
    );
  },
);

StatsGrid.displayName = "StatsGrid";

export default StatsGrid;
