import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

import { Sidebar, SidebarProvider, sidebarNavigation } from "./navigation";

import Topbar from "./Topbar";
import MainContent from "./MainContent";

interface AppLayoutProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>(
  ({ className, children, ...props }, ref) => (
    <SidebarProvider>
      <div
        ref={ref}
        className={cn("flex h-screen overflow-hidden bg-background", className)}
        {...props}
      >
        <Sidebar sections={sidebarNavigation} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </SidebarProvider>
  )
);

AppLayout.displayName = "AppLayout";

export default AppLayout;