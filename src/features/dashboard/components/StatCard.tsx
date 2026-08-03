import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";

interface StatCardProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Card>,
  "children"
> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "positive" | "negative" | "neutral";
  trendLabel?: string;
  className?: string;
}

const trendConfig: Record<string, { arrow: React.ReactNode; color: string }> = {
  positive: {
    arrow: (
      <svg
        className="h-4 w-4 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    color: "text-green-600",
  },
  negative: {
    arrow: (
      <svg
        className="h-4 w-4 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    color: "text-red-600",
  },
  neutral: {
    arrow: null,
    color: "text-muted-foreground",
  },
};

const StatCard = forwardRef<HTMLElement, StatCardProps>(
  (
    {
      title,
      value,
      description = "",
      icon,
      trend = "neutral",
      trendLabel = "",
      className,
      ...props
    },
    ref,
  ) => {
    const currentTrend = trendConfig[trend] ?? trendConfig.neutral;

    return (
      <Card ref={ref} className={cn("p-6", className)} {...props}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>

        {(description || trendLabel) && (
          <div className="mt-4 flex items-center gap-2">
            {trendLabel && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  currentTrend.color,
                )}
              >
                {currentTrend.arrow}
                <span>{trendLabel}</span>
              </div>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </Card>
    );
  },
);

StatCard.displayName = "StatCard";

export default StatCard;
