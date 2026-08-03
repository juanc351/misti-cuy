import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ActivityItemProps extends React.ComponentPropsWithoutRef<'article'> {
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  className?: string;
}

const ActivityItem = forwardRef<HTMLElement, ActivityItemProps>(
  ({ title, description, timestamp, icon, className, ...props }, ref) => (
    <article
      ref={ref}
      className={cn(
        'flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50',
        className
      )}
      {...props}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        {icon ? (
          icon
        ) : (
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        {timestamp && (
          <p className="mt-2 text-xs text-muted-foreground">{timestamp}</p>
        )}
      </div>
    </article>
  )
);

ActivityItem.displayName = 'ActivityItem';

export default ActivityItem;