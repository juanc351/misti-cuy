import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

type SkeletonVariant = 'rectangle' | 'rounded' | 'circle' | 'text';
type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  width?: string;
  height?: string;
  radius?: string;
  animation?: SkeletonAnimation;
  className?: string;
}

const sizeDefaults: Record<SkeletonSize, { height: string; textBaseHeight: string }> = {
  xs: { height: 'h-2', textBaseHeight: 'h-2' },
  sm: { height: 'h-4', textBaseHeight: 'h-3' },
  md: { height: 'h-5', textBaseHeight: 'h-4' },
  lg: { height: 'h-6', textBaseHeight: 'h-5' },
  xl: { height: 'h-8', textBaseHeight: 'h-6' },
};

const lineWidths = ['w-full', 'w-3/4', 'w-1/2'];

const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangle',
      size = 'md',
      width,
      height,
      radius,
      animation = 'none',
      className,
      ...props
    },
    ref
  ) => {
    const isText = variant === 'text';
    const baseClasses = 'overflow-hidden relative isolate bg-muted';

    const roundingClass = (() => {
      if (radius) return radius;
      if (variant === 'circle') return 'rounded-full';
      if (variant === 'rounded') return 'rounded-lg';
      return 'rounded-none';
    })();

    const baseDimension = sizeDefaults[size];

    const hasCustomWidth = width !== undefined;
    const hasCustomHeight = height !== undefined;

    const customStyle: React.CSSProperties = {};
    if (hasCustomWidth) customStyle.width = width;
    if (hasCustomHeight) customStyle.height = height;

    const dimensionClasses = cn(
      !isText && !hasCustomHeight && baseDimension.height,
      !isText && !hasCustomWidth && 'w-full',
    );

    const shimmerOverlay = animation === 'shimmer' && (
      <>
       
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-mc-shimmer" />
      </>
    );

    const pulseClass = animation === 'pulse' && 'animate-pulse';

    if (isText) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-col gap-2', className)}
          style={hasCustomWidth ? { width } : undefined}
          aria-hidden="true"
          {...props}
        >
          {lineWidths.map((lineWidth, index) => (
            <div
              key={index}
              className={cn(
                baseClasses,
                pulseClass,
                roundingClass,
                !hasCustomHeight && baseDimension.textBaseHeight,
                lineWidth,
              )}
              style={hasCustomHeight ? { height } : undefined}
            >
              {shimmerOverlay}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, pulseClass, roundingClass, dimensionClasses, className)}
        style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
        aria-hidden="true"
        {...props}
      >
        {shimmerOverlay}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;