import type { PropsWithChildren } from "react";

import { LOADER } from "@/constants/loading";

import "./loader.css";

export default function LoaderTransition({
  children,
}: PropsWithChildren) {
  return (
    <div
      className="loader-transition"
      style={{
        animationDuration: `${LOADER.fadeInDuration}ms`,
      }}
    >
      {children}
    </div>
  );
}