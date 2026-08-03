import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import Notifications from "./Notifications";
import UserMenu from "./UserMenu";

interface TopbarProps extends React.ComponentPropsWithoutRef<"header"> {
  className?: string;
}

const Topbar = forwardRef<HTMLElement, TopbarProps>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-30 flex items-center h-16 px-6 bg-background/95 backdrop-blur border-b border-border",
        className,
      )}
      role="banner"
      {...props}
    >
      <div className="flex items-center gap-4">{children}</div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <Notifications />
        <UserMenu />
      </div>
    </header>
  ),
);

Topbar.displayName = "Topbar";

export default Topbar;
