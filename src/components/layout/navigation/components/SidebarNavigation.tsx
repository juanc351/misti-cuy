import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { SidebarNavigationProps } from "../types/sidebar.types";
import SidebarSection from "../../SidebarSection";

type Props = SidebarNavigationProps & React.ComponentPropsWithoutRef<"nav">;

const SidebarNavigation = forwardRef<HTMLElement, Props>(
  ({ sections, className, ...props }, ref) => {
    if (!sections || sections.length === 0) return null;

    return (
      <nav
        ref={ref}
        className={cn("flex-1 overflow-y-auto p-3 space-y-4", className)}
        {...props}
      >
        {sections.map((section) => (
          <SidebarSection key={section.id} section={section} />
        ))}
      </nav>
    );
  },
);

SidebarNavigation.displayName = "SidebarNavigation";

export default SidebarNavigation;
