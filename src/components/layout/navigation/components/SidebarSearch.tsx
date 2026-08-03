import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

interface SidebarSearchProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  containerClassName?: string;
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-muted-foreground"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
  </svg>
);

const SidebarSearch = forwardRef<HTMLInputElement, SidebarSearchProps>(
  ({ label, containerClassName, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const inputId = externalId || generatedId;

    return (
      <div className={cn('px-3 py-2', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="block mb-1 text-xs font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            ref={ref}
            id={inputId}
            type="search"
            className={cn(
              'block w-full rounded-lg border border-input bg-background py-2 pl-10 pr-3 text-sm',
              'placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

SidebarSearch.displayName = 'SidebarSearch';

export default SidebarSearch;