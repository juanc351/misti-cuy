import React, { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type DropdownMenuAlign = 'start' | 'center' | 'end';
type DropdownMenuSide = 'top' | 'bottom' | 'left' | 'right';

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

interface DropdownMenuContentContextValue {
  registerItem: (element: HTMLElement) => void;
  unregisterItem: (element: HTMLElement) => void;
}

const DropdownMenuContentContext = createContext<DropdownMenuContentContextValue | null>(null);

interface DropdownMenuProps extends React.ComponentPropsWithoutRef<'div'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, children, className, ...props }, ref) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) setUncontrolledOpen(value);
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange]
    );

    const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

    const contextValue: DropdownMenuContextValue = { open, setOpen, toggleOpen };

    return (
      <DropdownMenuContext.Provider value={contextValue}>
        <div ref={ref} className={cn('relative inline-block', className)} {...props}>
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(DropdownMenuContext);

    if (!ctx) {
      throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
    }

    const { open, toggleOpen } = ctx;

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={toggleOpen}
        className={cn('inline-flex', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const sideClasses: Record<DropdownMenuSide, string> = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

const alignClasses: Record<DropdownMenuAlign, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
};

interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
  align?: DropdownMenuAlign;
  side?: DropdownMenuSide;
}

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ align = 'start', side = 'bottom', className, children, ...props }, ref) => {
    const ctx = useContext(DropdownMenuContext);
    if (!ctx) throw new Error('DropdownMenuContent must be used within DropdownMenu');

    const { open, setOpen } = ctx;

    const itemsRef = useRef<HTMLElement[]>([]);

    const registerItem = useCallback((element: HTMLElement) => {
      itemsRef.current.push(element);
    }, []);

    const unregisterItem = useCallback((element: HTMLElement) => {
      itemsRef.current = itemsRef.current.filter((el) => el !== element);
    }, []);

    const contentContextValue: DropdownMenuContentContextValue = { registerItem, unregisterItem };

    useEffect(() => {
      if (open) {
        const firstItem = itemsRef.current.find((el) => !el.hasAttribute('aria-disabled'));
        firstItem?.focus();
      }
    }, [open]);

    useEffect(() => {
      if (!open) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const contentElement = document.querySelector('[data-dropdown-content]');
        if (contentElement && !contentElement.contains(target)) {
          setOpen(false);
        }
      };
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, setOpen]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const items = itemsRef.current.filter((el) => el.getAttribute('role') === 'menuitem');
      const currentIndex = items.findIndex((el) => el === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex: number | undefined;
      switch (event.key) {
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % items.length;
          break;
        case 'ArrowUp':
          nextIndex = (currentIndex - 1 + items.length) % items.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      items[nextIndex]?.focus();
    };

    if (!open) return null;

    return (
      <DropdownMenuContentContext.Provider value={contentContextValue}>
        <div
          ref={ref}
          role="menu"
          data-dropdown-content
          className={cn(
            'absolute z-50 min-w-[200px] overflow-hidden rounded-lg border border-border bg-background shadow-lg',
            sideClasses[side],
            alignClasses[align],
            className
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </DropdownMenuContentContext.Provider>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  disabled?: boolean;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ disabled = false, onSelect, className, children, ...props }, ref) => {
    const ctx = useContext(DropdownMenuContext);
    const contentCtx = useContext(DropdownMenuContentContext);
    if (!ctx || !contentCtx) throw new Error('DropdownMenuItem must be used within DropdownMenu and DropdownMenuContent');

    const { setOpen } = ctx;
    const { registerItem, unregisterItem } = contentCtx;
    const localRef = useRef<HTMLButtonElement | null>(null);

    const combinedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        localRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (node) {
          registerItem(node);
        }
      },
      [ref, registerItem]
    );

    useEffect(() => {
      return () => {
        if (localRef.current) unregisterItem(localRef.current);
      };
    }, [unregisterItem]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onSelect?.(e);
        setOpen(false);
      }
    };

    return (
      <button
        ref={combinedRef}
        type="button"
        role="menuitem"
        tabIndex={-1}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        className={cn(
          'flex w-full items-center px-3 py-2 text-sm text-foreground transition-colors focus:outline-none focus:bg-muted',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<'hr'> {
  className?: string;
}

const DropdownMenuSeparator = forwardRef<HTMLHRElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn('my-1 border-t border-border', className)}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<'span'> {
  className?: string;
}

const DropdownMenuLabel = forwardRef<HTMLSpanElement, DropdownMenuLabelProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('block px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider', className)}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};