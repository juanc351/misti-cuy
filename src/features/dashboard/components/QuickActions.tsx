import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import SummaryCard from './SummaryCard';

interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface QuickActionsProps extends Omit<React.ComponentPropsWithoutRef<typeof SummaryCard>, 'title' | 'children'> {
  title?: string;
  actions: QuickAction[];
  className?: string;
}

const QuickActions = forwardRef<HTMLElement, QuickActionsProps>(
  ({ title = 'Quick Actions', actions, className, ...props }, ref) => {
    if (actions.length === 0) return null;

    return (
      <SummaryCard ref={ref} title={title} className={cn('', className)} {...props}>
        <div className="mt-4 flex flex-wrap gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </SummaryCard>
    );
  }
);

QuickActions.displayName = 'QuickActions';

export default QuickActions;