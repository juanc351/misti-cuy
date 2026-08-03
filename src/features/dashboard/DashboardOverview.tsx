import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ProductionSummary, InfoCard } from './components';
import { dashboardMockData } from './data';

interface DashboardOverviewProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
}

const DashboardOverview = forwardRef<HTMLElement, DashboardOverviewProps>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn('', className)} {...props}>
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <ProductionSummary items={dashboardMockData.summary} />
        <div className="space-y-6">
          {dashboardMockData.overviewCards.map((card) => (
            <InfoCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
            >
              {card.children}
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  )
);

DashboardOverview.displayName = 'DashboardOverview';

export default DashboardOverview;