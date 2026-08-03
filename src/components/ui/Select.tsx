import React, {
  forwardRef,
  useId,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";

type SelectVariant = "default" | "filled" | "outline" | "ghost";
type SelectSize = "small" | "medium" | "large";

interface SelectBaseProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  children?: React.ReactNode;
  variant?: SelectVariant;
  size?: SelectSize;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  success?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

type SelectProps = SelectBaseProps &
  Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size" | "prefix" | "suffix" | "children"
  >;

const sizeVariants: Record<SelectSize, string> = {
  small: "h-9 text-sm px-3",
  medium: "h-11 text-base px-4",
  large: "h-[52px] text-base px-5",
};

const variantBackgrounds: Record<SelectVariant, string> = {
  default: "bg-background text-foreground border-border",
  filled: "bg-muted text-foreground border-transparent",
  outline: "bg-background text-foreground border-border",
  ghost: "bg-transparent text-muted-foreground border-transparent",
};

const variantHoverClasses: Record<SelectVariant, string> = {
  default: "hover:border-muted-foreground",
  filled: "hover:border-muted-foreground hover:bg-muted/80",
  outline: "hover:border-muted-foreground",
  ghost: "hover:border-muted-foreground hover:bg-accent",
};

const iconSizeVariants: Record<SelectSize, string> = {
  small: "w-4 h-4",
  medium: "w-[18px] h-[18px]",
  large: "w-5 h-5",
};

function getStateClasses(
  disabled: boolean,
  readonly: boolean,
  invalid: boolean,
  success: boolean,
): string {
  return cn(
    disabled && "opacity-50 cursor-not-allowed bg-muted",
    readonly && !disabled && "bg-background cursor-default",
    invalid && "border-destructive",
    success && "border-success",
  );
}

function getFocusRingClasses(invalid: boolean, success: boolean): string {
  return cn(
    "focus-within:ring-2 focus-within:ring-offset-1",
    invalid && "focus-within:ring-destructive",
    success && "focus-within:ring-success",
    !invalid &&
      !success &&
      "focus-within:border-primary focus-within:ring-ring",
  );
}

function extractOptionMap(children: React.ReactNode): Map<string, string> {
  const map = new Map<string, string>();
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement<React.OptionHTMLAttributes<HTMLOptionElement>>(
        child,
      ) &&
      child.type === "option"
    ) {
      const value = child.props.value as string | undefined;
      const label = child.props.children as string | undefined;
      if (value !== undefined && label !== undefined) {
        map.set(String(value), String(label));
      }
    }
  });
  return map;
}

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-4 h-4 text-muted-foreground", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      children,
      variant = "outline",
      size = "medium",
      disabled = false,
      readonly = false,
      required = false,
      invalid = false,
      success = false,
      className,
      id: idProp,
      value: controlledValue,
      defaultValue,
      onChange,
      name,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = idProp || generatedId;
    const errorId = useId();
    const helperId = useId();

    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(
      defaultValue !== undefined ? String(defaultValue) : "",
    );
    const selectedValue = isControlled
      ? String(controlledValue)
      : uncontrolledValue;

    const optionMap = useMemo(() => extractOptionMap(children), [children]);
    const displayLabel = selectedValue
      ? optionMap.get(selectedValue) || ""
      : "";

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!isControlled) {
          setUncontrolledValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const containerClassName = cn(
      "relative group flex items-center w-full rounded-xl border transition-colors duration-200",
      sizeVariants[size],
      variantBackgrounds[variant],
      !disabled &&
        !readonly &&
        !invalid &&
        !success &&
        variantHoverClasses[variant],
      getStateClasses(disabled, readonly, invalid, success),
      getFocusRingClasses(invalid, success),
      className,
    );

    const ariaDescribedby =
      [
        helperText && !(invalid && errorMessage) ? helperId : null,
        invalid && errorMessage ? errorId : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block mb-1 text-sm font-medium text-foreground"
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={containerClassName}>
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={selectedValue}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedby}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto disabled:cursor-not-allowed"
            {...rest}
          >
            {placeholder && !selectedValue && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="flex items-center w-full h-full pointer-events-none">
            {prefix && (
              <span className="text-muted-foreground pr-2 flex-shrink-0">
                {prefix}
              </span>
            )}
            {leftIcon && (
              <span
                className={cn("mr-2 flex-shrink-0", iconSizeVariants[size])}
              >
                {leftIcon}
              </span>
            )}
            <span
              className={cn(
                "flex-1 truncate",
                !selectedValue ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {selectedValue ? displayLabel : placeholder || ""}
            </span>
            {rightIcon && (
              <span
                className={cn("ml-2 flex-shrink-0", iconSizeVariants[size])}
              >
                {rightIcon}
              </span>
            )}
            {suffix && (
              <span className="text-muted-foreground pl-2 flex-shrink-0">
                {suffix}
              </span>
            )}
            <ChevronIcon className="ml-2 flex-shrink-0 transition-transform duration-200 group-focus-within:rotate-180" />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div>
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
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
