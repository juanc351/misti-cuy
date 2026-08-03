import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type TabsVariant = "line" | "pills";
type TabsSize = "sm" | "md" | "lg";

interface TabsContextValue {
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsListContextValue {
  registerTrigger: (value: string, element: HTMLButtonElement) => void;
  unregisterTrigger: (value: string) => void;
}

const TabsListContext = createContext<TabsListContextValue | null>(null);

interface TabsProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  className?: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      variant = "line",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const baseId = useId();
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(
      defaultValue ?? "",
    );
    const selectedValue = isControlled ? value : uncontrolledValue;

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    const contextValue: TabsContextValue = {
      selectedValue,
      onValueChange: handleValueChange,
      variant,
      size,
      baseId,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

const listSizeClasses: Record<TabsSize, string> = {
  sm: "text-sm gap-1",
  md: "text-base gap-2",
  lg: "text-lg gap-3",
};

const listVariantClasses: Record<TabsVariant, string> = {
  line: "border-b border-border",
  pills: "",
};

interface TabsListProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const tabsContext = useContext(TabsContext);
    if (!tabsContext) throw new Error("TabsList must be used within Tabs");
    const { variant, size } = tabsContext;
    const triggersRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    const registerTrigger = useCallback(
      (value: string, element: HTMLButtonElement) => {
        triggersRef.current.set(value, element);
      },
      [],
    );

    const unregisterTrigger = useCallback((value: string) => {
      triggersRef.current.delete(value);
    }, []);

    const listContextValue: TabsListContextValue = {
      registerTrigger,
      unregisterTrigger,
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const triggers = Array.from(triggersRef.current.values());
      const currentIndex = triggers.findIndex(
        (el) => el === document.activeElement,
      );
      if (currentIndex === -1) return;

      let nextIndex: number | undefined;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % triggers.length;
          break;
        case "ArrowLeft":
          nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = triggers.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      triggers[nextIndex]?.focus();
    };

    return (
      <TabsListContext.Provider value={listContextValue}>
        <div
          ref={ref}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={cn(
            "flex items-center",
            listSizeClasses[size],
            listVariantClasses[variant],
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TabsListContext.Provider>
    );
  },
);
TabsList.displayName = "TabsList";

const triggerSizeClasses: Record<TabsSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1.5 text-base",
  lg: "px-4 py-2 text-lg",
};

const triggerVariantClasses: Record<TabsVariant, string> = {
  line: "border-b-2 border-transparent -mb-[1px]",
  pills: "rounded-md",
};

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  value: string;
  disabled?: boolean;
  className?: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const tabsContext = useContext(TabsContext);
    const listContext = useContext(TabsListContext);
    if (!tabsContext || !listContext)
      throw new Error("TabsTrigger must be used within Tabs and TabsList");

    const { selectedValue, onValueChange, variant, size, baseId } = tabsContext;
    const { registerTrigger, unregisterTrigger } = listContext;
    const isSelected = selectedValue === value;

    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    const localRef = useRef<HTMLButtonElement | null>(null);

    const combinedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (node) {
          registerTrigger(value, node);
        }
      },
      [ref, registerTrigger, value],
    );

    useEffect(() => {
      return () => {
        unregisterTrigger(value);
      };
    }, [unregisterTrigger, value]);

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value);
      }
    };

    const selectedClasses = isSelected
      ? variant === "line"
        ? "border-primary text-primary"
        : "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:text-foreground";

    return (
      <button
        ref={combinedRef}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          triggerSizeClasses[size],
          triggerVariantClasses[variant],
          selectedClasses,
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  className?: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const tabsContext = useContext(TabsContext);
    if (!tabsContext) throw new Error("TabsContent must be used within Tabs");

    const { selectedValue, baseId } = tabsContext;
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        className={cn("pt-3", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
