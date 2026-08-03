import React, {
  createContext,
  forwardRef,
  useContext,
  useId,
  useCallback,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type RadioVariant = "outline" | "filled" | "ghost";
type RadioSize = "small" | "medium" | "large";

interface RadioBaseProps {
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
  variant?: RadioVariant;
  size?: RadioSize;
  value?: string;
  name?: string;
  id?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type RadioProps = RadioBaseProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "checked" | "defaultChecked" | "onChange" | "value"
  >;

const sizeVariants: Record<RadioSize, string> = {
  small: "h-4 w-4",
  medium: "h-5 w-5",
  large: "h-6 w-6",
};

const innerSizeVariants: Record<RadioSize, string> = {
  small: "h-2 w-2",
  medium: "h-2.5 w-2.5",
  large: "h-3 w-3",
};

const variantClasses: Record<RadioVariant, string> = {
  outline: "bg-background border-border",
  filled: "bg-muted border-transparent",
  ghost: "bg-transparent border-transparent",
};

const checkedVariantClasses: Record<RadioVariant, string> = {
  outline: "bg-background border-primary text-primary",
  filled: "bg-primary border-primary text-primary-foreground",
  ghost: "bg-primary/10 border-primary text-primary",
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
    !disabled &&
      !readonly &&
      !invalid &&
      !success &&
      "hover:border-muted-foreground",
  );
}

interface RadioGroupContextValue {
  name?: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  success?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  layout?: "vertical" | "horizontal";
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  helperText?: string;
  success?: boolean;
  children: React.ReactNode;
  className?: string;
}

const RadioGroup = ({
  layout = "vertical",
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  readonly = false,
  required = false,
  invalid = false,
  errorMessage,
  helperText,
  success = false,
  children,
  className,
}: RadioGroupProps) => {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue ?? "",
  );
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const contextValue: RadioGroupContextValue = {
    name,
    selectedValue,
    onChange: handleChange,
    disabled,
    readonly,
    required,
    invalid,
    success,
  };

  const errorId = useId();
  const helperId = useId();
  const ariaDescribedby =
    [
      helperText && !(invalid && errorMessage) ? helperId : null,
      invalid && errorMessage ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        aria-describedby={ariaDescribedby}
        className={cn(
          layout === "vertical"
            ? "flex flex-col gap-3"
            : "flex flex-row flex-wrap gap-4",
          className,
        )}
      >
        {children}
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
    </RadioGroupContext.Provider>
  );
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      disabled: disabledProp,
      readonly: readonlyProp,
      required: requiredProp,
      invalid: invalidProp,
      success: successProp,
      variant = "outline",
      size = "medium",
      value,
      name: nameProp,
      id: idProp,
      className,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const radioId = idProp || generatedId;

    const group = useContext(RadioGroupContext);

    const name = group?.name ?? nameProp;
    const disabled = group?.disabled ?? disabledProp ?? false;
    const readonly = group?.readonly ?? readonlyProp ?? false;
    const required = group?.required ?? requiredProp ?? false;
    const invalid = group?.invalid ?? invalidProp ?? false;
    const success = group?.success ?? successProp ?? false;

    const isControlled = group !== null || rest.checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(
      rest.defaultChecked ?? false,
    );

    let checked: boolean;
    if (group) {
      checked = group.selectedValue === value;
    } else if (rest.checked !== undefined) {
      checked = rest.checked;
    } else {
      checked = uncontrolledChecked;
    }

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readonly || disabled) {
          e.preventDefault();
          return;
        }
        if (group) {
          if (value !== undefined) {
            group.onChange?.(value);
          }
        } else {
          if (!isControlled) {
            setUncontrolledChecked(e.target.checked);
          }
          onChange?.(e);
        }
      },
      [readonly, disabled, group, value, isControlled, onChange],
    );

    const containerClassName = cn(
      "relative flex items-center justify-center rounded-full border transition-colors duration-200 shrink-0",
      sizeVariants[size],
      checked ? checkedVariantClasses[variant] : variantClasses[variant],
      getStateClasses(disabled, readonly, invalid, success),
      "focus-within:ring-2 focus-within:ring-offset-1",
      invalid ? "focus-within:ring-destructive" : "focus-within:ring-ring",
    );

    const labelCursorClass = disabled
      ? "cursor-not-allowed"
      : readonly
        ? "cursor-default"
        : "cursor-pointer";

    return (
      <div className={cn("inline-flex items-start gap-2 group", className)}>
        <div className={containerClassName}>
          <input
            ref={ref}
            id={radioId}
            type="radio"
            name={name}
            checked={checked}
            defaultChecked={group ? undefined : rest.defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            value={value}
            aria-checked={checked}
            aria-invalid={invalid || undefined}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...rest}
          />
          {checked && (
            <svg
              className={cn(innerSizeVariants[size], "pointer-events-none")}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8" />
            </svg>
          )}
        </div>
        {(label || description) && (
          <div className="flex flex-col min-w-0">
            {label && (
              <label
                htmlFor={radioId}
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
    );
  },
);

Radio.displayName = "Radio";

export default Radio;
export { RadioGroup };
