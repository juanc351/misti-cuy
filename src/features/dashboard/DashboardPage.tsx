import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "./components";
import DashboardStats from "./DashboardStats";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardRecentActivity from "./DashboardRecentActivity";
import DashboardOverview from "./DashboardOverview";

interface DashboardPageProps extends React.ComponentPropsWithoutRef<"main"> {
  className?: string;
}

const DashboardPage = forwardRef<HTMLElement, DashboardPageProps>(
  ({ className, ...props }, ref) => (
    <main ref={ref} className={cn("space-y-8", className)} {...props}>
      <DashboardHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your workspace."
      />
      <DashboardStats />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <DashboardQuickActions />
        <DashboardRecentActivity />
      </div>
      <DashboardOverview />
    </main>
  ),
);

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
