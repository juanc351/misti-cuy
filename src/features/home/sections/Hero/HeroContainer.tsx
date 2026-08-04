import type { ReactElement, ReactNode } from "react";

interface HeroContainerProps {
  children: ReactNode;
}

export default function HeroContainer({
  children,
}: HeroContainerProps): ReactElement {
  return (
    <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto grid w-full max-w-7xl min-h-screen grid-cols-1 px-6 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:px-12 lg:pt-0">
        <div className="flex flex-col justify-center self-center lg:pr-10">
          <div className="w-full max-w-136">{children}</div>
        </div>

        <div className="hidden lg:block" />
      </div>
    </div>
  );
}
