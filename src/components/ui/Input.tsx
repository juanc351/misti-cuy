import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

type InputVariant = 'default' | 'filled' | 'outline' | 'ghost';
type InputSize = 'small' | 'medium' | 'large';

interface InputBaseProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  success?: boolean;
  className?: string;
  id?: string;
}

type InputProps = InputBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'>;

const sizeContainerClasses: Record<InputSize, string> = {
  small: 'h-9 px-3 text-sm',
  medium: 'h-11 px-4 text-base',
  large: 'h-[52px] px-5 text-base',
};

const iconSizeClasses: Record<InputSize, string> = {
  small: 'w-4 h-4',
  medium: 'w-[18px] h-[18px]',
  large: 'w-5 h-5',
};

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-background text-foreground border-border',
  filled: 'bg-muted text-foreground border-transparent',
  outline: 'bg-background text-foreground border-border',
  ghost: 'bg-transparent text-muted-foreground border-transparent',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      variant = 'outline',
      size = 'medium',
      disabled = false,
      readonly = false,
      required = false,
      invalid = false,
      success = false,
      className,
      id: idProp,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = idProp || generatedId;
    const errorId = useId();
    const helperId = useId();

    const containerClassName = cn(
      'flex items-center w-full rounded-xl border transition-colors duration-200',
      sizeContainerClasses[size],
      variantClasses[variant],
      !disabled && !readonly && !invalid && !success && 'hover:border-muted-foreground',
      variant === 'filled' && !disabled && !readonly && !invalid && !success && 'hover:bg-muted/80',
      variant === 'ghost' && !disabled && !readonly && !invalid && !success && 'hover:bg-accent',
      disabled && 'opacity-50 cursor-not-allowed bg-muted',
      readonly && 'bg-background cursor-default',
      invalid && 'border-destructive',
      success && 'border-success',
      'focus-within:ring-2 focus-within:ring-offset-1',
      invalid && 'focus-within:ring-destructive',
      success && 'focus-within:ring-success',
      !invalid && !success && 'focus-within:border-primary focus-within:ring-ring',
      className
    );

    const inputClassName =
      'flex-1 bg-transparent border-0 outline-none w-full text-inherit placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground/50';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
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
          {prefix && <span className="text-muted-foreground pr-2 flex-shrink-0">{prefix}</span>}
          {leftIcon && (
            <span className={cn('mr-2 flex-shrink-0', iconSizeClasses[size])}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={
              invalid && errorMessage
                ? errorId
                : helperText
                ? helperId
                : undefined
            }
            className={inputClassName}
            {...rest}
          />
          {rightIcon && (
            <span className={cn('ml-2 flex-shrink-0', iconSizeClasses[size])}>
              {rightIcon}
            </span>
          )}
          {suffix && <span className="text-muted-foreground pl-2 flex-shrink-0">{suffix}</span>}
        </div>
        {invalid && errorMessage && (
          <p id={errorId} className="mt-1 text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}
        {!(invalid && errorMessage) && helperText && (
          <p id={helperId} className="mt-1 text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;