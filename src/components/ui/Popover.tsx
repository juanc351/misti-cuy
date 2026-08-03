import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type PopoverSide = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

interface PopoverProps extends React.ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) setUncontrolledOpen(value);
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange],
    );

    const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

    const contextValue: PopoverContextValue = { open, setOpen, toggleOpen };

    return (
      <PopoverContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("relative inline-block", className)}
          {...props}
        >
          {children}
        </div>
      </PopoverContext.Provider>
    );
  },
);
Popover.displayName = "Popover";

const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(PopoverContext);
    if (!ctx) throw new Error("PopoverTrigger must be used within Popover");

    const { open, toggleOpen } = ctx;

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn("inline-flex", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

const sideClasses: Record<PopoverSide, string> = {
  top: "bottom-full mb-2",
  right: "left-full ml-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
};

const alignClasses: Record<PopoverAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

interface PopoverContentProps extends React.ComponentPropsWithoutRef<"div"> {
  side?: PopoverSide;
  align?: PopoverAlign;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { side = "bottom", align = "center", className, children, ...props },
    ref,
  ) => {
    const ctx = useContext(PopoverContext);
    if (!ctx) throw new Error("PopoverContent must be used within Popover");

    const { open, setOpen } = ctx;
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (open) {
        const firstFocusable = contentRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      }
    }, [open]);

    useEffect(() => {
      if (!open) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (contentRef.current && !contentRef.current.contains(target)) {
          setOpen(false);
        }
      };
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen]);

    if (!open) return null;

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="dialog"
        className={cn(
          "absolute z-50 w-72 rounded-lg border border-border bg-background p-4 shadow-lg",
          sideClasses[side],
          alignClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
