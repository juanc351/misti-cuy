import type { PropsWithChildren } from "react";

export default function LoaderContainer({
  children,
}: PropsWithChildren) {
  return (
    <div
      className="
        fixed
        inset-0
        z-9999
        flex
        items-center
        justify-center
        pointer-events-none
      "
    >
      {children}
    </div>
  );
}