import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import SummaryCard from './SummaryCard';
import ActivityItem from './ActivityItem';

interface Activity {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
}

interface RecentActivityProps extends Omit<React.ComponentPropsWithoutRef<typeof SummaryCard>, 'title' | 'children'> {
  title?: string;
  activities: Activity[];
  className?: string;
}

const RecentActivity = forwardRef<HTMLElement, RecentActivityProps>(
  ({ title = 'Recent Activity', activities, className, ...props }, ref) => {
    if (activities.length === 0) return null;

    return (
      <SummaryCard ref={ref} title={title} className={cn('', className)} {...props}>
        <div className="mt-4 space-y-2">
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              title={activity.title}
              description={activity.description}
              timestamp={activity.timestamp}
              icon={activity.icon}
            />
          ))}
        </div>
      </SummaryCard>
    );
  }
);

RecentActivity.displayName = 'RecentActivity';

export default RecentActivity;