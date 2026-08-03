import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

const SectionHeader = forwardRef<HTMLElement, SectionHeaderProps>(
  ({ title, description, actions, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
      {...props}
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;