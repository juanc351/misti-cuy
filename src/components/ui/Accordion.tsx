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

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  openValues: Set<string>;
  toggleItem: (value: string) => void;
  registerTrigger: (value: string, element: HTMLButtonElement) => void;
  unregisterTrigger: (value: string) => void;
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

interface AccordionBaseProps {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  className?: string;
}

type AccordionProps = AccordionBaseProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof AccordionBaseProps>;

function normalizeValue(
  value: string | string[] | undefined,
  type: AccordionType,
): Set<string> {
  if (value === undefined) return new Set();
  if (type === "single") {
    return typeof value === "string" ? new Set([value]) : new Set();
  }
  return Array.isArray(value) ? new Set(value) : new Set();
}

function denormalizeValue(
  set: Set<string>,
  type: AccordionType,
): string | string[] {
  if (type === "single") {
    return set.size > 0 ? Array.from(set)[0] : "";
  }
  return Array.from(set);
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      collapsible = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState<Set<string>>(
      normalizeValue(defaultValue, type),
    );
    const isControlled = controlledValue !== undefined;
    const openValues = isControlled
      ? normalizeValue(controlledValue, type)
      : uncontrolledOpen;

    const triggersRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    const registerTrigger = useCallback(
      (val: string, el: HTMLButtonElement) => {
        triggersRef.current.set(val, el);
      },
      [],
    );

    const unregisterTrigger = useCallback((val: string) => {
      triggersRef.current.delete(val);
    }, []);

    const toggleItem = useCallback(
      (itemValue: string) => {
        const newOpen = new Set(openValues);
        if (newOpen.has(itemValue)) {
          if (type === "single" && !collapsible) {
            return;
          }
          newOpen.delete(itemValue);
        } else {
          if (type === "single") {
            newOpen.clear();
          }
          newOpen.add(itemValue);
        }

        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onValueChange?.(denormalizeValue(newOpen, type));
      },
      [openValues, type, collapsible, isControlled, onValueChange],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const triggers = Array.from(triggersRef.current.entries());
      const currentIndex = triggers.findIndex(
        ([, el]) => el === document.activeElement,
      );
      if (currentIndex === -1) return;
      let nextIndex: number | undefined;
      switch (e.key) {
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % triggers.length;
          break;
        case "ArrowUp":
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
      e.preventDefault();
      const nextTrigger = triggers[nextIndex]?.[1];
      nextTrigger?.focus();
    };

    const contextValue: AccordionContextValue = {
      type,
      openValues,
      toggleItem,
      registerTrigger,
      unregisterTrigger,
      collapsible,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "divide-y divide-border rounded-lg border border-border overflow-hidden",
            className,
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "value"
> {
  value: string;
  disabled?: boolean;
  className?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const accordionCtx = useContext(AccordionContext);
    if (!accordionCtx)
      throw new Error("AccordionItem must be used within Accordion");

    const isOpen = accordionCtx.openValues.has(value);

    const itemContext: AccordionItemContextValue = { value, disabled, isOpen };

    return (
      <AccordionItemContext.Provider value={itemContext}>
        <div ref={ref} className={cn("overflow-hidden", className)} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<"button">,
  "value" | "disabled"
> {
  className?: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const accordionCtx = useContext(AccordionContext);
    const itemCtx = useContext(AccordionItemContext);
    if (!accordionCtx || !itemCtx)
      throw new Error(
        "AccordionTrigger must be used within Accordion and AccordionItem",
      );

    const { value, disabled, isOpen } = itemCtx;
    const { toggleItem, registerTrigger, unregisterTrigger } = accordionCtx;
    const triggerId = useId();
    const contentId = useId();

    const localRef = useRef<HTMLButtonElement | null>(null);

    const combinedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (node) registerTrigger(value, node);
      },
      [ref, registerTrigger, value],
    );

    useEffect(() => {
      return () => {
        unregisterTrigger(value);
      };
    }, [unregisterTrigger, value]);

    const handleClick = () => {
      if (!disabled) toggleItem(value);
    };

    return (
      <button
        ref={combinedRef}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between px-4 py-4 text-left font-medium transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const itemCtx = useContext(AccordionItemContext);
    if (!itemCtx)
      throw new Error("AccordionContent must be used within AccordionItem");

    const { isOpen } = itemCtx;
    if (!isOpen) return null;

    const triggerId = itemCtx.value ? `${itemCtx.value}-trigger` : undefined;
    const contentId = `${itemCtx.value}-content`;

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn("px-4 pb-4 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
