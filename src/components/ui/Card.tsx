import React, { forwardRef } from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat' | 'interactive';

interface CardBaseProps {
  variant?: CardVariant;
  interactive?: boolean;
  disabled?: boolean;
  header?: React.ReactNode;
  media?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

type CardProps<T extends React.ElementType = 'article'> = CardBaseProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof CardBaseProps | 'as'>;

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white',
  outlined: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-md',
  flat: 'bg-white',
  interactive: 'bg-white border border-gray-200',
};

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = 'default',
      interactive: interactiveProp,
      disabled = false,
      header,
      media,
      children,
      footer,
      className,
      as,
      ...rest
    },
    ref
  ) => {
    const Component = as ?? 'article';
    const isInteractive = variant === 'interactive' && interactiveProp !== false && !disabled;

    const cardClassName = cn(
      'flex flex-col w-full h-auto relative overflow-hidden box-border rounded-2xl p-6 gap-4',
      variantClasses[variant],
      isInteractive &&
        'cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:shadow-sm active:translate-y-0.5',
      disabled && 'opacity-60 pointer-events-none',
      className
    );

    return (
      <Component
        ref={ref}
        className={cardClassName}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {header && <div className="shrink-0">{header}</div>}
        {media && <div className="shrink-0">{media}</div>}
        {children && <div className="flex-1">{children}</div>}
        {footer && <div className="shrink-0">{footer}</div>}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;