import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { StatsGrid } from './components';
import { dashboardMockData } from './data';

interface DashboardStatsProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
}

const DashboardStats = forwardRef<HTMLElement, DashboardStatsProps>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn('space-y-6', className)} {...props}>
      <StatsGrid items={dashboardMockData.stats} />
    </section>
  )
);

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;