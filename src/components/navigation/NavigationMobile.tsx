"use client";

import { usePathname, useRouter } from "next/navigation";

import { navigationItems } from "./navigation.constants";
import { AnimatedMenuButton } from "./icons";

export default function NavigationMobile() {
  const pathname = usePathname();
  const router = useRouter();

  const currentPageTitle =
    navigationItems.find((item) => item.href === pathname)?.title ?? "Inicio";

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
        <div className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/10 bg-black/20 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            <div className="justify-self-start">
              {pathname !== "/" ? (
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Volver"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white/90 transition-colors hover:bg-white/10"
                >
                  ←
                </button>
              ) : (
                <div className="h-10 w-10" />
              )}
            </div>

            <div className="justify-self-center">
              <span className="text-sm font-semibold text-white/90">
                {currentPageTitle}
              </span>
            </div>

            <div className="h-10 w-10" />
          </div>
        </div>
      </header>

      <div className="fixed right-3 top-3 z-[60] lg:hidden">
        <AnimatedMenuButton />
      </div>
    </>
  );
}
