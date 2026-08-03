import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

import SidebarHeader from "./navigation/components/SidebarHeader";
import SidebarSearch from "./navigation/components/SidebarSearch";
import SidebarNavigation from "./navigation/components/SidebarNavigation";
import SidebarFooter from "./navigation/components/SidebarFooter";

import type { SidebarProps } from "./navigation/types/sidebar.types";

type Props = SidebarProps & React.ComponentPropsWithoutRef<"aside">;

const Sidebar = forwardRef<HTMLElement, Props>(
  ({ sections, className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        "flex h-full w-72 flex-col border-r border-border bg-card",
        className
      )}
      {...props}
    >
      <SidebarHeader title="Misti Cuy" />
      <SidebarSearch placeholder="Buscar..." />
      <SidebarNavigation sections={sections} />
      <SidebarFooter />
    </aside>
  )
);

Sidebar.displayName = "Sidebar";

export default Sidebar;