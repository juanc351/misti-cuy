import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface SummaryCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const SummaryCard = forwardRef<HTMLElement, SummaryCardProps>(
  ({ title, subtitle, icon, footer, children, className, ...props }, ref) => (
    <Card ref={ref} className={cn('p-6', className)} {...props}>
      <div className="flex items-start gap-4">
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
      {footer && (
        <div className="mt-6 pt-4 border-t border-border">{footer}</div>
      )}
    </Card>
  )
);

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;