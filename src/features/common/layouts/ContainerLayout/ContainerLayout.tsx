import type { ReactElement } from "react";

import { cn } from "@/lib/utils";

import type { ContainerLayoutProps } from "./types";

export default function ContainerLayout({
  children,
  className,
}: ContainerLayoutProps): ReactElement {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
