import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SidebarFooterProps extends React.ComponentPropsWithoutRef<'footer'> {
  children?: React.ReactNode;
}

const SidebarFooter = forwardRef<HTMLElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn('border-t border-border p-4', className)}
      {...props}
    >
      {children}
    </footer>
  )
);

SidebarFooter.displayName = 'SidebarFooter';

export default SidebarFooter;