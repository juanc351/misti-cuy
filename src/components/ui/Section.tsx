import React, { forwardRef } from 'react';

type SectionVariant = 'default' | 'compact' | 'large' | 'hero' | 'gray' | 'dark' | 'transparent';

interface SectionBaseProps {
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
}

type SectionProps<T extends React.ElementType = 'section'> = SectionBaseProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof SectionBaseProps | 'as'>;

const variantPadding: Record<SectionVariant, string> = {
  default: 'pt-16 pb-16',
  compact: 'pt-10 pb-10',
  large: 'pt-24 pb-24',
  hero: 'pt-[120px] pb-[120px]',
  gray: 'pt-16 pb-16',
  dark: 'pt-16 pb-16',
  transparent: 'pt-16 pb-16',
};

const variantBackground: Partial<Record<SectionVariant, string>> = {
  default: 'bg-white',
  gray: 'bg-gray-100',
  dark: 'bg-green-900',
  transparent: 'bg-transparent',
};

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const Section = forwardRef<HTMLElement, SectionProps>(
  <T extends React.ElementType = 'section'>(
    { variant = 'default', className, children, as, ...rest }: SectionProps<T>,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Component = as ?? 'section';

    const combinedClassName = cn(
      'block w-full relative overflow-visible box-border',
      variantPadding[variant],
      variantBackground[variant] || '',
      className
    );

    return (
      <Component ref={ref} className={combinedClassName} {...rest}>
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

export default Section;