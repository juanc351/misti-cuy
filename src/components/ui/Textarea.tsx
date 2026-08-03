import React, { forwardRef, useId, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

type TextareaVariant = 'default' | 'filled' | 'outline' | 'ghost';
type TextareaSize = 'small' | 'medium' | 'large';
type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

interface TextareaBaseProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: TextareaResize;
  autoGrow?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  variant?: TextareaVariant;
  size?: TextareaSize;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  success?: boolean;
  className?: string;
  id?: string;
}

type TextareaProps = TextareaBaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'prefix' | 'suffix' | 'rows'>;

const sizeVariants: Record<TextareaSize, string> = {
  small: 'text-sm leading-5 px-3 py-2',
  medium: 'text-base leading-6 px-4 py-3',
  large: 'text-base leading-6 px-5 py-4',
};

const variantBackgrounds: Record<TextareaVariant, string> = {
  default: 'bg-background text-foreground border-border',
  filled: 'bg-muted text-foreground border-transparent',
  outline: 'bg-background text-foreground border-border',
  ghost: 'bg-transparent text-muted-foreground border-transparent',
};

const variantHoverClasses: Record<TextareaVariant, string> = {
  default: 'hover:border-muted-foreground',
  filled: 'hover:border-muted-foreground hover:bg-muted/80',
  outline: 'hover:border-muted-foreground',
  ghost: 'hover:border-muted-foreground hover:bg-accent',
};

const resizeVariants: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

const iconSizeVariants: Record<TextareaSize, string> = {
  small: 'w-4 h-4',
  medium: 'w-[18px] h-[18px]',
  large: 'w-5 h-5',
};

function getStateClasses(
  disabled: boolean,
  readonly: boolean,
  invalid: boolean,
  success: boolean
): string {
  return cn(
    disabled && 'opacity-50 cursor-not-allowed bg-muted',
    readonly && !disabled && 'bg-background cursor-default',
    invalid && 'border-destructive',
    success && 'border-success'
  );
}

function getFocusRingClasses(invalid: boolean, success: boolean): string {
  return cn(
    'focus-within:ring-2 focus-within:ring-offset-1',
    invalid && 'focus-within:ring-destructive',
    success && 'focus-within:ring-success',
    !invalid && !success && 'focus-within:border-primary focus-within:ring-ring'
  );
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      rows = 4,
      minRows,
      maxRows,
      resize = 'vertical',
      autoGrow = false,
      maxLength,
      showCharacterCount = false,
      variant = 'outline',
      size = 'medium',
      disabled = false,
      readonly = false,
      required = false,
      invalid = false,
      success = false,
      className,
      id: idProp,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = idProp || generatedId;
    const errorId = useId();
    const helperId = useId();
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const [charLength, setCharLength] = useState<number>(() =>
      typeof value === 'string' ? value.length : defaultValue ? String(defaultValue).length : 0
    );
    const [overflowY, setOverflowY] = useState<'hidden' | 'auto'>(autoGrow ? 'hidden' : 'auto');

    const adjustHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoGrow) return;

      el.style.height = 'auto';
      const computedStyle = window.getComputedStyle(el);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      if (isNaN(lineHeight)) return;

      const computedScrollHeight = el.scrollHeight;
      const effectiveMinRows = minRows ?? rows;
      const effectiveMaxRows = maxRows ?? Infinity;

      const minHeight = effectiveMinRows * lineHeight;
      const maxHeight = effectiveMaxRows * lineHeight;

      let newHeight = Math.max(computedScrollHeight, minHeight);
      let shouldScroll = false;

      if (effectiveMaxRows !== Infinity && newHeight >= maxHeight) {
        newHeight = maxHeight;
        shouldScroll = true;
      }

      el.style.height = `${newHeight}px`;
      setOverflowY(shouldScroll ? 'auto' : 'hidden');
    }, [autoGrow, minRows, rows, maxRows]);

    useLayoutEffect(() => {
      adjustHeight();
      if (innerRef.current) {
        setCharLength(innerRef.current.value.length);
      }
    }, [value, defaultValue, adjustHeight]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        setCharLength(e.target.value.length);
        adjustHeight();
      },
      [onChange, adjustHeight]
    );

    const containerClassName = cn(
      'flex items-start w-full rounded-xl border transition-colors duration-200',
      sizeVariants[size],
      variantBackgrounds[variant],
      !disabled && !readonly && !invalid && !success && variantHoverClasses[variant],
      getStateClasses(disabled, readonly, invalid, success),
      getFocusRingClasses(invalid, success),
      className
    );

    const textareaClassName = cn(
      'flex-1 bg-transparent border-0 outline-none w-full text-inherit placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground/50',
      resizeVariants[resize],
      sizeVariants[size].split(' ')[0] + ' ' + sizeVariants[size].split(' ')[1]
    );

    const charCount =
      showCharacterCount && maxLength !== undefined ? `${charLength}/${maxLength}` : null;

    const ariaDescribedby = [
      helperText && !(invalid && errorMessage) ? helperId : null,
      invalid && errorMessage ? errorId : null
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    const mergeRefs = (node: HTMLTextAreaElement) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block mb-1 text-sm font-medium text-foreground">
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={containerClassName}>
          {prefix && <span className="text-muted-foreground pr-2 flex-shrink-0 pt-0.5">{prefix}</span>}
          {leftIcon && (
            <span className={cn('mr-2 flex-shrink-0 pt-0.5', iconSizeVariants[size])}>
              {leftIcon}
            </span>
          )}
          <textarea
            ref={mergeRefs}
            id={textareaId}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedby}
            className={textareaClassName}
            style={{ overflowY }}
            {...rest}
          />
          {rightIcon && (
            <span className={cn('ml-2 flex-shrink-0 pt-0.5', iconSizeVariants[size])}>
              {rightIcon}
            </span>
          )}
          {suffix && <span className="text-muted-foreground pl-2 flex-shrink-0 pt-0.5">{suffix}</span>}
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
          {charCount && <p className="text-sm text-muted-foreground ml-auto">{charCount}</p>}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;