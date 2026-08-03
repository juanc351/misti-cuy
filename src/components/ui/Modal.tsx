import { cn } from '@/lib/utils';
import React, { forwardRef, useEffect, useId } from 'react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  heading?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, size = 'md', heading, children, footer, className, ...props }, ref) => {
    const titleId = useId();

    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={heading ? titleId : undefined}
          className={cn(
            'w-full rounded-lg bg-background p-6 shadow-xl',
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {heading && (
            <h2 id={titleId} className="mb-4 text-lg font-semibold text-foreground">
              {heading}
            </h2>
          )}
          {children && <div className="text-foreground">{children}</div>}
          {footer && (
            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;