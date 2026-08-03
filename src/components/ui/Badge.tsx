import React, { forwardRef } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline"
  | "ghost";

type BadgeSize = "small" | "medium" | "large";

interface BadgeBaseProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  children?: React.ReactNode;
  className?: string;
}

type BadgeProps<T extends React.ElementType = "span"> = BadgeBaseProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BadgeBaseProps | "as">;

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800 border border-transparent",
  primary: "bg-primary text-primary-foreground border border-transparent",
  secondary: "bg-secondary text-secondary-foreground border border-transparent",
  success: "bg-green-100 text-green-800 border border-transparent",
  warning: "bg-yellow-100 text-yellow-800 border border-transparent",
  danger: "bg-red-100 text-red-800 border border-transparent",
  info: "bg-sky-100 text-sky-800 border border-transparent",
  outline: "bg-transparent text-gray-700 border border-gray-400",
  ghost: "bg-transparent text-gray-600 border border-transparent",
};

const interactiveHoverClasses: Record<BadgeVariant, string> = {
  default: "hover:bg-gray-200",
  primary: "hover:bg-primary/80",
  secondary: "hover:bg-secondary/80",
  success: "hover:bg-green-200",
  warning: "hover:bg-yellow-200",
  danger: "hover:bg-red-200",
  info: "hover:bg-sky-200",
  outline: "hover:bg-gray-50",
  ghost: "hover:bg-gray-100",
};

const sizeClasses: Record<BadgeSize, string> = {
  small: "h-5 px-2 gap-1.5 text-xs font-medium",
  medium: "h-6 px-2.5 gap-1.5 text-[13px] font-medium",
  large: "h-7 px-3 gap-1.5 text-sm font-semibold",
};

const iconSizeClasses: Record<BadgeSize, string> = {
  small: "w-3 h-3",
  medium: "w-3.5 h-3.5",
  large: "w-4 h-4",
};

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "medium",
      icon,
      interactive = false,
      disabled = false,
      rounded = true,
      children,
      className,
      as,
      ...rest
    },
    ref,
  ) => {
    const Component = as ?? "span";
    const isInteractive = interactive && !disabled;

    const badgeClassName = cn(
      "inline-flex items-center whitespace-nowrap box-border overflow-visible",
      rounded ? "rounded-full" : "rounded-none",
      variantClasses[variant],
      sizeClasses[size],
      isInteractive &&
        `cursor-pointer transition-all duration-200 hover:shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${interactiveHoverClasses[variant]}`,
      disabled && "opacity-60 pointer-events-none",
      className,
    );

    return (
      <Component
        ref={ref}
        className={badgeClassName}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {icon && (
          <span
            className={cn(
              iconSizeClasses[size],
              "[&>*]:w-full [&>*]:h-full flex-shrink-0",
            )}
          >
            {icon}
          </span>
        )}
        {children}
      </Component>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;
