import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";
type AlertSize = "sm" | "md" | "lg";

interface AlertProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  variant?: AlertVariant;
  size?: AlertSize;
  heading?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}
const variantClasses: Record<AlertVariant, string> = {
  info: "bg-sky-50 text-sky-800 border-sky-200",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  error: "bg-red-50 text-red-800 border-red-200",
};

const sizeClasses: Record<AlertSize, string> = {
  sm: "p-3 text-sm",
  md: "p-4 text-base",
  lg: "p-5 text-lg",
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      size = "md",
      heading,
      children,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(
          "flex items-start rounded-lg border",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {icon && <div className="flex-shrink-0 mr-3 mt-0.5">{icon}</div>}
        <div className="flex-1 min-w-0">
          {heading && <div className="font-semibold mb-1">{heading}</div>}
          {children && <div className="opacity-90">{children}</div>}
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

export default Alert;
