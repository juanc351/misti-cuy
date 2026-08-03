import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps extends Omit<React.ComponentPropsWithoutRef<'header'>, 'children'> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

const DashboardHeader = forwardRef<HTMLElement, DashboardHeaderProps>(
  ({ title, description, actions, badge, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
      {...props}
    >
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {badge}
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
);

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;