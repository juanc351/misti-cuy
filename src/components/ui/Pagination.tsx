import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  className?: string;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={cn('flex justify-center', className)}
      {...props}
    />
  )
);
Pagination.displayName = 'Pagination';

interface PaginationContentProps extends React.ComponentPropsWithoutRef<'ul'> {
  className?: string;
}

const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
);
PaginationContent.displayName = 'PaginationContent';

interface PaginationItemProps extends React.ComponentPropsWithoutRef<'li'> {
  className?: string;
}

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('flex', className)} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

interface PaginationLinkBaseProps {
  active?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type PaginationLinkProps = PaginationLinkBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof PaginationLinkBaseProps>;

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ active = false, disabled = false, className, children, href, ...props }, ref) => {
    const isClickable = !disabled && !active;

    const linkContent = (
      <span
        className={cn(
          'inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium transition-colors',
          active && 'bg-primary text-primary-foreground',
          !active && !disabled && 'text-foreground hover:bg-muted',
          disabled && 'text-muted-foreground opacity-50 pointer-events-none',
          className
        )}
      >
        {children}
      </span>
    );

    if (!isClickable) {
      return <span aria-current={active ? 'page' : undefined} aria-disabled={disabled || undefined}>{linkContent}</span>;
    }

    return (
      <Link
        ref={ref}
        href={href}
        className="inline-flex"
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {linkContent}
      </Link>
    );
  }
);
PaginationLink.displayName = 'PaginationLink';

interface PaginationPreviousProps {
  href: string;
  disabled?: boolean;
  className?: string;
}

const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  ({ href, disabled = false, className }, ref) => {
    return (
      <PaginationLink
        ref={ref}
        href={href}
        disabled={disabled}
        className={cn('gap-1', className)}
        aria-label="Go to previous page"
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="sr-only">Previous</span>
      </PaginationLink>
    );
  }
);
PaginationPrevious.displayName = 'PaginationPrevious';

interface PaginationNextProps {
  href: string;
  disabled?: boolean;
  className?: string;
}

const PaginationNext = forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ href, disabled = false, className }, ref) => {
    return (
      <PaginationLink
        ref={ref}
        href={href}
        disabled={disabled}
        className={cn('gap-1', className)}
        aria-label="Go to next page"
      >
        <span className="sr-only">Next</span>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </PaginationLink>
    );
  }
);
PaginationNext.displayName = 'PaginationNext';

interface PaginationEllipsisProps extends React.ComponentPropsWithoutRef<'span'> {
  className?: string;
}

const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn('flex h-10 w-10 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      ...
    </span>
  )
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};