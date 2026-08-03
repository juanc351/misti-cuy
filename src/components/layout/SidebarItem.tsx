import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { SidebarItemProps } from "./navigation/types/sidebar.types";

type Props = SidebarItemProps & React.ComponentPropsWithoutRef<"button">;

const SidebarItem = forwardRef<HTMLButtonElement, Props>(
  ({ item, level = 0, className, ...props }, ref) => {
    const { label, icon, badge, disabled, children } = item;
    const hasChildren = children && children.length > 0;

    return (
      <button
        ref={ref}
        className={cn(
          "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 truncate text-left">{label}</span>
        {badge && (
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium",
              {
                "bg-muted text-muted-foreground":
                  badge.variant === "default" || !badge.variant,
                "bg-green-100 text-green-700": badge.variant === "success",
                "bg-yellow-100 text-yellow-700": badge.variant === "warning",
                "bg-red-100 text-red-700": badge.variant === "danger",
                "bg-sky-100 text-sky-700": badge.variant === "info",
              },
            )}
          >
            {badge.label}
          </span>
        )}
        {hasChildren && (
          <svg
            className="h-4 w-4 shrink-0 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>
    );
  },
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
