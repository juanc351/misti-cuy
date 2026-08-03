import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { RecentActivity } from './components';
import { dashboardMockData } from './data';

interface DashboardRecentActivityProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
}

const DashboardRecentActivity = forwardRef<HTMLElement, DashboardRecentActivityProps>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn('space-y-6', className)} {...props}>
      <RecentActivity activities={dashboardMockData.recentActivities} />
    </section>
  )
);

DashboardRecentActivity.displayName = 'DashboardRecentActivity';

export default DashboardRecentActivity;