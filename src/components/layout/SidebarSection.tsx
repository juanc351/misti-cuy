import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { SidebarSectionProps } from "./navigation/types/sidebar.types";
import SidebarItem from "./SidebarItem";

type Props = SidebarSectionProps & React.ComponentPropsWithoutRef<"section">;

const SidebarSection = forwardRef<HTMLElement, Props>(
  ({ section, className, ...props }, ref) => {
    if (!section.items || section.items.length === 0) return null;

    return (
      <section ref={ref} className={cn("space-y-1", className)} {...props}>
        {section.title && (
          <h3 className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {section.title}
          </h3>
        )}
        <ul className="space-y-1">
          {section.items.map((item) => (
            <li key={item.id}>
              <SidebarItem item={item} />
            </li>
          ))}
        </ul>
      </section>
    );
  },
);

SidebarSection.displayName = "SidebarSection";

export default SidebarSection;
