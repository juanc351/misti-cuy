import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  logo?: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ logo, title, subtitle, actions, className }, ref) => (
    <header
      ref={ref}
      className={cn('flex items-center gap-4 p-4 border-b border-border', className)}
    >
      {logo && <div className="shrink-0">{logo}</div>}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
);

SidebarHeader.displayName = 'SidebarHeader';

export default SidebarHeader;