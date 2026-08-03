import React, { forwardRef, useId, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type SwitchVariant = "outline" | "filled" | "ghost";
type SwitchSize = "small" | "medium" | "large";

interface SwitchBaseProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  success?: boolean;
  variant?: SwitchVariant;
  size?: SwitchSize;
  value?: string;
  name?: string;
  id?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type SwitchProps = SwitchBaseProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "checked" | "defaultChecked" | "onChange" | "value"
  >;

const sizeVariants: Record<
  SwitchSize,
  { track: string; thumb: string; translate: string }
> = {
  small: {
    track: "h-5 w-9",
    thumb: "h-3.5 w-3.5",
    translate: "translate-x-4",
  },
  medium: {
    track: "h-6 w-11",
    thumb: "h-4.5 w-4.5",
    translate: "translate-x-5",
  },
  large: {
    track: "h-7 w-[52px]",
    thumb: "h-5 w-5",
    translate: "translate-x-6",
  },
};

const variantClasses: Record<SwitchVariant, { track: string; thumb: string }> =
  {
    outline: {
      track: "bg-transparent border border-border",
      thumb: "bg-muted-foreground",
    },
    filled: {
      track: "bg-muted border border-transparent",
      thumb: "bg-muted-foreground",
    },
    ghost: {
      track: "bg-transparent border border-transparent",
      thumb: "bg-muted-foreground",
    },
  };

const checkedVariantClasses: Record<
  SwitchVariant,
  { track: string; thumb: string }
> = {
  outline: {
    track: "bg-primary border-primary",
    thumb: "bg-primary-foreground",
  },
  filled: {
    track: "bg-primary border-primary",
    thumb: "bg-primary-foreground",
  },
  ghost: {
    track: "bg-primary/10 border-transparent",
    thumb: "bg-primary",
  },
};

function getStateClasses(
  disabled: boolean,
  readonly: boolean,
  invalid: boolean,
  success: boolean,
): string {
  return cn(
    disabled && "opacity-50 cursor-not-allowed",
    readonly && !disabled && "cursor-default",
    invalid && !disabled && "border-destructive",
    success && !disabled && !invalid && "border-success",
  );
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      helperText,
      errorMessage,
      checked: controlledChecked,
      defaultChecked,
      disabled = false,
      readonly = false,
      required = false,
      invalid = false,
      success = false,
      variant = "outline",
      size = "medium",
      value,
      name,
      id: idProp,
      className,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = idProp || generatedId;
    const errorId = useId();
    const helperId = useId();

    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(
      defaultChecked ?? false,
    );
    const checked = isControlled ? !!controlledChecked : uncontrolledChecked;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readonly || disabled) {
          e.preventDefault();
          return;
        }
        if (!isControlled) {
          setUncontrolledChecked(e.target.checked);
        }
        onChange?.(e);
      },
      [readonly, disabled, isControlled, onChange],
    );

    const currentVariant = checked
      ? checkedVariantClasses[variant]
      : variantClasses[variant];

    const trackClassName = cn(
      "relative inline-flex items-center rounded-full transition-colors duration-200",
      sizeVariants[size].track,
      currentVariant.track,
      getStateClasses(disabled, readonly, invalid, success),
      !disabled &&
        !readonly &&
        !invalid &&
        !success &&
        "hover:border-muted-foreground",
      "focus-within:ring-2 focus-within:ring-offset-1",
      invalid ? "focus-within:ring-destructive" : "focus-within:ring-ring",
    );

    const thumbClassName = cn(
      "absolute left-0.5 rounded-full transition-transform duration-200",
      sizeVariants[size].thumb,
      currentVariant.thumb,
      checked && sizeVariants[size].translate,
    );

    const labelCursorClass = disabled
      ? "cursor-not-allowed"
      : readonly
        ? "cursor-default"
        : "cursor-pointer";

    const ariaDescribedby =
      [
        helperText && !(invalid && errorMessage) ? helperId : null,
        invalid && errorMessage ? errorId : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className={cn("inline-flex flex-col", className)}>
        <div className="inline-flex items-start gap-2 group">
          <div
            className={cn(
              "relative inline-flex items-center justify-center",
              sizeVariants[size].track,
              "min-h-11 min-w-11",
            )}
          >
            <input
              ref={ref}
              id={switchId}
              type="checkbox"
              role="switch"
              checked={checked}
              defaultChecked={isControlled ? undefined : defaultChecked}
              onChange={handleChange}
              disabled={disabled}
              readOnly={readonly}
              required={required}
              value={value}
              name={name}
              aria-checked={checked}
              aria-invalid={invalid || undefined}
              aria-describedby={ariaDescribedby}
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              {...rest}
            />
            <div className={trackClassName}>
              <div className={thumbClassName} />
            </div>
          </div>
          {(label || description) && (
            <div className="flex flex-col min-w-0">
              {label && (
                <label
                  htmlFor={switchId}
                  className={cn(
                    "text-sm font-medium text-foreground select-none",
                    labelCursorClass,
                  )}
                >
                  {label}
                  {required && (
                    <span className="text-destructive ml-1" aria-hidden="true">
                      *
                    </span>
                  )}
                </label>
              )}
              {description && (
                <span className="text-sm text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="mt-1">
          {invalid && errorMessage && (
            <p id={errorId} className="text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          )}
          {!(invalid && errorMessage) && helperText && (
            <p id={helperId} className="text-sm text-muted-foreground">
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
