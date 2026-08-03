import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type SpinnerVariant = "circular" | "dots";
type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  className?: string;
}

const sizeMap: Record<
  SpinnerSize,
  { container: string; borderWidth: string; dotSize: string; gap: string }
> = {
  xs: {
    container: "h-3 w-3",
    borderWidth: "border",
    dotSize: "h-1 w-1",
    gap: "gap-0.5",
  },
  sm: {
    container: "h-4 w-4",
    borderWidth: "border-2",
    dotSize: "h-1.5 w-1.5",
    gap: "gap-0.5",
  },
  md: {
    container: "h-6 w-6",
    borderWidth: "border-2",
    dotSize: "h-2 w-2",
    gap: "gap-1",
  },
  lg: {
    container: "h-8 w-8",
    borderWidth: "border-[3px]",
    dotSize: "h-2.5 w-2.5",
    gap: "gap-1",
  },
  xl: {
    container: "h-10 w-10",
    borderWidth: "border-4",
    dotSize: "h-3 w-3",
    gap: "gap-1.5",
  },
};

const dotKeyframes = `
@keyframes spinner-dot-pulse {
  0%, 100% { transform: scale(0.6); opacity: 0.6; }
  50% { transform: scale(1); opacity: 1; }
}
`;

const CircularSpinner = ({ size }: { size: SpinnerSize }) => {
  const { container, borderWidth } = sizeMap[size];
  return (
    <div
      className={cn(
        container,
        borderWidth,
        "rounded-full border-muted border-t-primary animate-spin",
      )}
    />
  );
};

const DotsSpinner = ({ size }: { size: SpinnerSize }) => {
  const { dotSize, gap } = sizeMap[size];
  return (
    <div className={cn("flex items-center", gap)}>
   
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            dotSize,
            "rounded-full bg-primary animate-mc-spinner-dot",
          )}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant = "circular", size = "md", className }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className={cn("inline-flex items-center justify-center", className)}
      >
        {variant === "circular" ? (
          <CircularSpinner size={size} />
        ) : (
          <DotsSpinner size={size} />
        )}
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);

Spinner.displayName = "Spinner";

export default Spinner;
