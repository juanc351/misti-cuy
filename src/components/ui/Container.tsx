import React, { forwardRef } from "react";

type ContainerVariant = "default" | "narrow" | "wide" | "fluid" | "full";

interface ContainerProps {
  variant?: ContainerVariant;
  padding?: boolean;
  children: React.ReactNode;
}

const variantMaxWidths: Record<ContainerVariant, string> = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[1440px]",
  fluid: "max-w-full",
  full: "w-full",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ variant = "default", padding = true, children }, ref) => {
    const baseClasses =
      "block relative mx-auto box-border bg-transparent border-none shadow-none overflow-visible";

    const paddingClasses = padding
      ? "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      : "";

    const combinedClasses =
      `${baseClasses} ${variantMaxWidths[variant]} ${paddingClasses}`.trim();

    return (
      <div ref={ref} className={combinedClasses}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export default Container;
