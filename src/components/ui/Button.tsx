import React, { forwardRef, useId } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type Rounded = "none" | "sm" | "md" | "lg" | "full";
type ButtonType = "button" | "submit" | "reset";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: Rounded;
  children?: React.ReactNode;
  type?: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string;
}

interface IconOnlyProps extends ButtonBaseProps {
  iconOnly: true;
  ariaLabel: string;
}

interface NonIconOnlyProps extends ButtonBaseProps {
  iconOnly?: false | undefined;
  ariaLabel?: string;
}

type ButtonProps = IconOnlyProps | NonIconOnlyProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border border-transparent shadow-sm hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-primary/80 active:shadow-sm disabled:bg-primary/50 disabled:text-primary-foreground/50 disabled:shadow-none disabled:cursor-not-allowed",
  secondary:
    "bg-secondary text-secondary-foreground border border-transparent shadow-sm hover:bg-secondary/80 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-secondary/70 active:shadow-sm disabled:bg-secondary/50 disabled:text-secondary-foreground/50 disabled:shadow-none disabled:cursor-not-allowed",
  outline:
    "bg-transparent text-primary border border-primary shadow-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-primary/20 disabled:border-muted disabled:text-muted-foreground disabled:hover:bg-transparent disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-foreground shadow-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-accent/70 disabled:text-muted-foreground disabled:hover:bg-transparent disabled:cursor-not-allowed",
  danger:
    "bg-destructive text-destructive-foreground border border-transparent shadow-sm hover:bg-destructive/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-destructive/80 active:shadow-sm disabled:bg-destructive/50 disabled:text-destructive-foreground/50 disabled:shadow-none disabled:cursor-not-allowed",
  link: "bg-transparent text-primary underline shadow-none hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary/70 disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-5 text-lg",
  xl: "h-14 px-6 text-xl",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  xs: "h-6 w-6 p-0",
  sm: "h-8 w-8 p-0",
  md: "h-10 w-10 p-0",
  lg: "h-12 w-12 p-0",
  xl: "h-14 w-14 p-0",
};

const roundedClasses: Record<Rounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      iconLeft,
      iconRight,
      iconOnly = false,
      fullWidth = false,
      rounded = "md",
      children,
      type = "button",
      ariaLabel,
      onClick,
      tooltip,
    },
    ref,
  ) => {
    const tooltipId = useId();
    const isDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      onClick?.(event);
    };

    const buttonClassName = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none",
      variantClasses[variant],
      !iconOnly && sizeClasses[size],
      iconOnly && iconOnlySizeClasses[size],
      roundedClasses[rounded],
      fullWidth && "w-full",
      loading && "cursor-wait",
      disabled && !loading && "cursor-not-allowed",
    );

    const content = (
      <>
        {loading && <Spinner />}
        {!loading && !iconOnly && iconLeft && (
          <span className="mr-2">{iconLeft}</span>
        )}
        {!iconOnly && children}
        {!iconOnly && iconRight && <span className="ml-2">{iconRight}</span>}
        {iconOnly && !loading && (iconLeft || iconRight)}
        {iconOnly && loading && <Spinner />}
      </>
    );

    const buttonElement = (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        aria-describedby={tooltip ? tooltipId : undefined}
        onClick={handleClick}
      >
        {content}
      </button>
    );

    if (tooltip) {
      return (
        <span
          className={cn("relative inline-flex group", fullWidth && "w-full")}
        >
          {buttonElement}
          <span
            id={tooltipId}
            role="tooltip"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-background bg-foreground rounded opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap"
          >
            {tooltip}
          </span>
        </span>
      );
    }

    return buttonElement;
  },
);

Button.displayName = "Button";

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize, Rounded };
