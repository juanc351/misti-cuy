import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InfoCardProps extends React.ComponentPropsWithoutRef<'article'> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const InfoCard = forwardRef<HTMLElement, InfoCardProps>(
  ({ title, description, icon, actions, children, className, ...props }, ref) => (
    <article
      ref={ref}
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && <div className="shrink-0">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {children && <div className="mt-6">{children}</div>}
    </article>
  )
);

InfoCard.displayName = 'InfoCard';

export default InfoCard;