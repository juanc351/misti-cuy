import React, { forwardRef, useId, useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

type CheckboxVariant = 'default' | 'filled' | 'outline' | 'ghost';
type CheckboxSize = 'small' | 'medium' | 'large';

interface CheckboxBaseProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  success?: boolean;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  value?: string;
  name?: string;
  id?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type CheckboxProps = CheckboxBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'checked' | 'defaultChecked' | 'onChange' | 'value'>;

const sizeVariants: Record<CheckboxSize, string> = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

const iconSizeVariants: Record<CheckboxSize, string> = {
  small: 'h-3 w-3',
  medium: 'h-3.5 w-3.5',
  large: 'h-4 w-4',
};

const variantClasses: Record<CheckboxVariant, string> = {
  default: 'bg-background border-border',
  filled: 'bg-muted border-transparent',
  outline: 'bg-background border-border',
  ghost: 'bg-transparent border-transparent',
};

const checkedVariantClasses: Record<CheckboxVariant, string> = {
  default: 'bg-primary border-primary text-primary-foreground',
  filled: 'bg-primary border-primary text-primary-foreground',
  outline: 'bg-background border-primary text-primary',
  ghost: 'bg-primary/10 border-primary text-primary',
};

function getStateClasses(
  disabled: boolean,
  readonly: boolean,
  invalid: boolean,
  success: boolean,
  checked: boolean
): string {
  return cn(
    disabled && 'opacity-50 cursor-not-allowed',
    readonly && !disabled && 'cursor-default',
    invalid && !disabled && 'border-destructive',
    success && !disabled && !invalid && 'border-success',
    !disabled && !readonly && !invalid && !success && 'hover:border-muted-foreground'
  );
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('', className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IndeterminateIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('', className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      helperText,
      errorMessage,
      checked: controlledChecked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      readonly = false,
      required = false,
      invalid = false,
      success = false,
      variant = 'outline',
      size = 'medium',
      value,
      name,
      id: idProp,
      className,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = idProp || generatedId;
    const errorId = useId();
    const helperId = useId();
    const innerRef = useRef<HTMLInputElement | null>(null);

    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(
      defaultChecked ?? false
    );
    const checked = isControlled ? !!controlledChecked : uncontrolledChecked;

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

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
      [readonly, disabled, isControlled, onChange]
    );

    const checkboxBoxClassName = cn(
      'relative flex items-center justify-center rounded border transition-colors duration-200 flex-shrink-0',
      sizeVariants[size],
      checked || indeterminate
        ? checkedVariantClasses[variant]
        : variantClasses[variant],
      getStateClasses(disabled, readonly, invalid, success, checked || indeterminate),
      'focus-within:ring-2 focus-within:ring-offset-1',
      invalid ? 'focus-within:ring-destructive' : 'focus-within:ring-ring'
    );

    const ariaDescribedby = [
      helperText && !(invalid && errorMessage) ? helperId : null,
      invalid && errorMessage ? errorId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="inline-flex flex-col">
        <div className={cn('inline-flex items-start gap-2 group', className)}>
          <div className={checkboxBoxClassName}>
            <input
              ref={(node) => {
                innerRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              id={checkboxId}
              type="checkbox"
              checked={checked}
              defaultChecked={isControlled ? undefined : defaultChecked}
              onChange={handleChange}
              disabled={disabled}
              readOnly={readonly}
              required={required}
              value={value}
              name={name}
              aria-checked={indeterminate ? 'mixed' : checked}
              aria-invalid={invalid || undefined}
              aria-describedby={ariaDescribedby}
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              {...rest}
            />
            {indeterminate ? (
              <IndeterminateIcon className={cn(iconSizeVariants[size], 'pointer-events-none')} />
            ) : checked ? (
              <CheckIcon className={cn(iconSizeVariants[size], 'pointer-events-none')} />
            ) : null}
          </div>
          {(label || description) && (
            <div className="flex flex-col min-w-0">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className="text-sm font-medium text-foreground cursor-pointer select-none"
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
                <span className="text-sm text-muted-foreground">{description}</span>
              )}
            </div>
          )}
        </div>
        <div className="mt-1 ml-[calc(theme(spacing.5)+0.5rem)]">
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
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;