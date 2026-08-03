import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

type ProgressVariant = 'linear';
type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ProgressVariant;
  value?: number;
  max?: number;
  size?: ProgressSize;
  indeterminate?: boolean;
  className?: string;
}

const sizeClasses: Record<ProgressSize, string> = {
  xs: 'h-[2px]',
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4',
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    { variant = 'linear', value = 0, max = 100, size = 'md', indeterminate = false, className, ...props },
    ref
  ) => {
    const clampedPercent = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label="Loading"
        className={cn('w-full overflow-hidden rounded-full bg-muted relative', sizeClasses[size], className)}
        {...props}
      >
        {indeterminate ? (
          <div className="absolute inset-y-0 w-1/4 bg-primary rounded-full animate-mc-progress-indeterminate" />
        ) : (
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${clampedPercent}%` }}
          />
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;