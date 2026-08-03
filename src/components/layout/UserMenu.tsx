import { cn } from '@/lib/utils';
import React, { forwardRef, useMemo } from 'react';

interface UserMenuProps extends React.ComponentPropsWithoutRef<'button'> {
  name?: string;
  email?: string;
  avatar?: string;
  disabled?: boolean;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const UserMenu = forwardRef<HTMLButtonElement, UserMenuProps>(
  ({ name = 'Usuario', email = '', avatar = '', disabled = false, className, ...props }, ref) => {
    const initials = useMemo(() => getInitials(name), [name]);

    return (
      <button
        ref={ref}
        type="button"
        aria-label="User menu"
        disabled={disabled}
        className={cn(
          'flex items-center h-10 rounded-lg px-3 gap-3 transition-colors text-muted-foreground hover:bg-muted hover:text-foreground',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {avatar ? (
          <img src={avatar} alt={name} className="size-8 rounded-full object-cover" />
        ) : (
          <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {initials}
          </span>
        )}
        <div className="flex flex-col items-start text-left min-w-0">
          <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
            {name}
          </span>
          {email && (
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">{email}</span>
          )}
        </div>
        <ChevronDownIcon />
      </button>
    );
  }
);

UserMenu.displayName = 'UserMenu';

export default UserMenu;