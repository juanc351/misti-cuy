import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useId } from "react";

type DrawerSide = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg";

interface DrawerProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "title"
> {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  heading?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeToWidth: Record<DrawerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const sizeToHeight: Record<DrawerSize, string> = {
  sm: "h-64",
  md: "h-80",
  lg: "h-96",
};

const sideClasses: Record<DrawerSide, { panel: string; borderRadius: string }> =
  {
    left: { panel: "left-0 top-0 h-full", borderRadius: "rounded-r-lg" },
    right: { panel: "right-0 top-0 h-full", borderRadius: "rounded-l-lg" },
    top: { panel: "left-0 top-0 w-full", borderRadius: "rounded-b-lg" },
    bottom: { panel: "left-0 bottom-0 w-full", borderRadius: "rounded-t-lg" },
  };

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      side = "right",
      size = "md",
      heading,
      children,
      footer,
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();

    useEffect(() => {
      if (!open) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const isHorizontal = side === "left" || side === "right";
    const sizeClass = isHorizontal ? sizeToWidth[size] : sizeToHeight[size];

    return (
      <div
        className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={heading ? titleId : undefined}
          className={cn(
            "absolute bg-background shadow-xl overflow-y-auto p-6",
            sideClasses[side].panel,
            sideClasses[side].borderRadius,
            sizeClass,
            isHorizontal ? "w-full sm:max-w-none" : "h-full sm:max-h-none",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {heading && (
            <h2
              id={titleId}
              className="mb-4 text-lg font-semibold text-foreground"
            >
              {heading}
            </h2>
          )}
          <div className="text-foreground">{children}</div>
          {footer && (
            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Drawer.displayName = "Drawer";

export default Drawer;
