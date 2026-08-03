import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import SummaryCard from './SummaryCard';

interface SummaryItem {
  id: string;
  label: string;
  value: React.ReactNode;
}

interface ProductionSummaryProps extends Omit<React.ComponentPropsWithoutRef<typeof SummaryCard>, 'title' | 'children'> {
  title?: string;
  items: SummaryItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const gridColsClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
};

const ProductionSummary = forwardRef<HTMLElement, ProductionSummaryProps>(
  ({ title = 'Summary', items, columns = 2, className, ...props }, ref) => {
    if (items.length === 0) return null;

    return (
      <SummaryCard ref={ref} title={title} className={cn('', className)} {...props}>
        <div className={cn('mt-4 grid gap-4', gridColsClasses[columns])}>
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border border-border p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </SummaryCard>
    );
  }
);

ProductionSummary.displayName = 'ProductionSummary';

export default ProductionSummary;