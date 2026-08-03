import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface NotificationsProps extends React.ComponentPropsWithoutRef<'button'> {
  badge?: number;
  disabled?: boolean;
  className?: string;
}

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const Notifications = forwardRef<HTMLButtonElement, NotificationsProps>(
  ({ badge = 0, disabled = false, className, ...props }, ref) => {
    const displayBadge = badge >= 99 ? '99+' : badge > 0 ? badge.toString() : null;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center size-10 rounded-full transition-colors text-muted-foreground hover:bg-muted hover:text-foreground',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        aria-label="Notifications"
        disabled={disabled}
        {...props}
      >
        <BellIcon />
        {displayBadge && (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold leading-none px-1">
            {displayBadge}
          </span>
        )}
      </button>
    );
  }
);

Notifications.displayName = 'Notifications';

export default Notifications;