import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface MainContentProps extends React.ComponentPropsWithoutRef<"main"> {
  className?: string;
}

const MainContent = forwardRef<HTMLElement, MainContentProps>(
  ({ className, children, ...props }, ref) => (
    <main
      ref={ref}
      role="main"
      className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden bg-background p-6",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  ),
);

MainContent.displayName = "MainContent";

export default MainContent;
