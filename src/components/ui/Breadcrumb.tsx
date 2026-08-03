import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  className?: string;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("flex items-center", className)}
      {...props}
    />
  ),
);
Breadcrumb.displayName = "Breadcrumb";

interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  className?: string;
}

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex items-center gap-2 list-none", className)}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  className?: string;
}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("flex items-center", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<
  typeof Link
> {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ href, className, children, ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  ),
);
BreadcrumbLink.displayName = "BreadcrumbLink";

interface BreadcrumbCurrentProps extends React.ComponentPropsWithoutRef<"span"> {
  className?: string;
}

const BreadcrumbCurrent = forwardRef<HTMLSpanElement, BreadcrumbCurrentProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-foreground font-medium truncate", className)}
      {...props}
    />
  ),
);
BreadcrumbCurrent.displayName = "BreadcrumbCurrent";

interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"span"> {
  className?: string;
}

const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("text-muted-foreground mx-1", className)}
    {...props}
  >
    {children ?? "/"}
  </span>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbCurrent,
  BreadcrumbSeparator,
};
