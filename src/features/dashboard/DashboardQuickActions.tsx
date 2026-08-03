import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { QuickActions } from "./components";
import { dashboardMockData } from "./data";

interface DashboardQuickActionsProps extends React.ComponentPropsWithoutRef<"section"> {
  className?: string;
}

const DashboardQuickActions = forwardRef<
  HTMLElement,
  DashboardQuickActionsProps
>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn("space-y-6", className)} {...props}>
    <QuickActions actions={dashboardMockData.quickActions} />
  </section>
));

DashboardQuickActions.displayName = "DashboardQuickActions";

export default DashboardQuickActions;
